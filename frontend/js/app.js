var app = app || {};
/**
 * Event Bus
 * 
 * */
app.bus = _.clone(Backbone.Events);
app.bus.on('all', function(event) { //for logging
	console.log("bus triggered. event: ", event, "arguments: ", arguments);
});
app.bus.on("login", function(options) {
	app.dbs.login(options.data, function(data){
		options.success(data);
	});
});
app.bus.on("login:successful", function(options) {
	//to be overridden
});
app.bus.on("register", function(options) {
	app.dbs.register(options.data, function(data){
		options.success(data);
	});
});
app.bus.on("alert", function(message, flag) {
	app.navbarView.alert(message, flag);
});
app.bus.on('view:rendered', function(data) {
	app.navbarView.update(data);
	app.navbarView.clearAlerts();
});

/**
 * Bind some views to listen for some bus events
 * */
//~ app.navbarView.listenTo(app.bus, "login:successful", function() {
	//~ console.log("now showing welcome screen.");
	//~ var welcome = "Welcome " + app.state.user.get('name') + "!";
	//~ this.alert(welcome);
//~ });


/**
 * Backbone Sync Override
 * 
 * */
Backbone.sync = function(method, object, options) {
	if (object instanceof Backbone.Model) {
		console.log('object is a model');
	}
	else if (object instanceof Backbone.Collection) {
		console.log('object is a collection');
	}
	console.log("Backbone.sync args: ", arguments);
	console.log("Backbone.sync method: ", method);
	console.log("Backbone.sync object: ", object);
	console.log("Backbone.sync object.url: ", object.url);
}; //@todo override globally all save/fetch events


/**
 * App Start/Configuration
 * 
 * */
app.version = "0.6";
console.log('loading app version ', app.version);
app.config = {
	mode: 'offline', //@todo implement indexeddb and online mode
}
//@todo fill this after login:
app.state = {
	isLoggedIn: false,
	user: null,
}
app.dbs.connect(function(){
	app.dbs.getState(function(e){
		console.log("dbs.connect", e);
		app.state = e;
		app.state.user = new app.User(e, {collection: app.users});
	});
});

app.users = new app.Users([]);
