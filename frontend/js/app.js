var app = app || {};
app.version = "0.8";
/**
 * App Defaults and Configuration
 * */
//default app configuration
app.config = {
	name: 'Todo',
	mode: 'offline', //@todo implement indexeddb and online mode
}
//default app state
app.state = {
	debug: false, //whether to log all the details
	isLoggedIn: false, //control variable for login state
	user: null, //object to store current logged-in user
	isNew: false, //flag to know whether database existed before or its a first time use
}
/**
 * Event Bus
 * 
 * */
console.log('loading event bus');
//app.bus = _.clone(Backbone.Events);
app.bus.on('all', function(event) { //for logging
	//console.log("bus triggered. event: ", event);
});
app.bus.on('app:loaded', function(e) {
	console.log('%capp.bus:loaded', 'color:darkblue');
});
app.bus.on("login:start", function(options) {
	database.login(options.data, function(data){
		options.success(data);
	});
});
app.bus.on("login:successful", function(options) {
	console.log("login successful. now saving state.");
	database.saveState();
});
app.bus.on('login:successful:rendered', function() {
	app.bus.trigger('alert', "Welcome " + app.state.user.name + "!");
});
app.bus.on("register", function(options) {
	database.register(options.data, function(data){
		options.success(data);
	});
});
app.bus.on("alert", function(message, flag) {
	views.navbarView.alert(message, flag);
});
app.bus.on('view:rendered', function(data) {
	if (data.hasOwnProperty('deferred')) {
		console.log("waiting for deferred function to resolve");
		data.deferred.then(function() {
			console.log('resolved');
			views.navbarView.update(data);
			views.navbarView.clearAlerts();
		});
	} else {
		console.log("no waiting, rendering navbar view");
		views.navbarView.update(data);
		views.navbarView.clearAlerts();
	}
});

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
document.addEventListener("DOMContentLoaded", function() {
	console.log('loading app version ', app.version);

	document.getElementsByTagName("title")[0].text = app.config.name;
	console.log('now connecting');
	database.connect(function(){
		app.bus.trigger("database:connected");
		//console.log("database connected. new state: ", app.state.isNew);
		if (app.state.isNew) {
			app.state.isNew = false;
			console.log('calling initroutes()');
			app.initRoutes(function(e){
				app.bus.trigger("app:loaded", e);
			});
		}
		else {
			database.getState(function(e){
				app.state = e;
				app.initRoutes(function(e) {
					app.bus.trigger("app:loaded", e);
				});
			});
		}

	});

	//create users collection
	app.users = new app.Users([]);
	
	//dom startup
	document.getElementById("app-spn-mode").textContent = app.config.mode;
	document.getElementById("app-spn-version").textContent = app.version;
	var cyrr = (new Date()).getFullYear();
	if (cyrr != "2018") {
		document.getElementById("app-spn-year-postfix").textContent = "-" + cyrr;
	}
});



