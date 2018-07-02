var app = app || {};
app.version = "0.7";
/**
 * Event Bus
 * 
 * */
console.log('loading event bus');
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
	console.log("login successful. now saving state.");
	app.dbs.saveState();
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
	console.log('now updating view title');
	app.navbarView.update(data);
	app.navbarView.clearAlerts();
});

/**
 * Bind some views to listen for some bus events
 * */
//~ app.navbarView.listenTo(app.bus, "login:successful", function() {
	//~ console.log("now showing welcome screen.");
	//~ var welcome = "Welcome " + app.state.user.name + "!";
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
document.addEventListener("DOMContentLoaded", function(){
	console.log('loading app version ', app.version);
	app.config = {
		mode: 'offline', //@todo implement indexeddb and online mode
	}
	//@todo fill this after login:
	app.state = {
		isLoggedIn: false,
		user: null,
		isNew: false, //first time use, database didn't exist before
	}
	app.dbs.connect(function(){
		app.bus.trigger("database:connected");
		console.log("database connected. new state: ", app.state.isNew);
		if (app.state.isNew) {
			app.state.isNew = false;
			app.initRoutes();
		}
		else {
			console.log("now calling getState.");
			app.dbs.getState(function(e){
				console.log("dbs.connect:getState", e);
				app.state = e;
				app.initRoutes();
			});
		}

	});

	//create users collection
	app.users = new app.Users([]);
	
	//trivia
	document.getElementById("app-spn-mode").textContent = app.config.mode;
	document.getElementById("app-spn-version").textContent = app.version;
	var cyrr = (new Date()).getFullYear();
	if (cyrr != "2018") {
		document.getElementById("app-spn-year-postfix").textContent = "-" + cyrr;
	}
});



