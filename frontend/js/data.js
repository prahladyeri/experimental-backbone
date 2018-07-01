/**
 * Database Service
 * 
 * */
var app = app || {};

app.dbs = {
	connect: function() { //to local or remote database
		if (app.config.mode == 'offline') {
			//@todo: handle incompatible browsers
			if (!window.indexedDB) {
				console.log("Browser doesn't support indexedDB");
				return false;
			} else {
				var request = indexedDB.open("experiment");
				request.onupgradeneeded = function(event) {
					console.log("database doesn't exist yet!"); //@todo check if this works
					//e.target.transaction.abort();
					var db = event.target.result;
					var store = db.createObjectStore("users", {keyPath: "email"});
					store.createIndex("name", "name", {unique:false});
					store.createIndex("email", "email", {unique:true});
					//~ store.transaction.oncomplete = function(event) {
						
					//~ };
					app.dbs.store = store;
					return true;
				}
				request.onsuccess = function(event) {
					app.dbs.db = event.target.result;
					return true;
				}
				request.onerror = function(event) {
					console.log("Database connect error: " + event.target.errorCode);
					return false;
				}
			}
		}
		else {
			return false;
		}
	},
	login: function(user, callback) {
		if (app.config.mode == 'offline') {
			var store = app.dbs.db.transaction("users","readonly").objectStore("users");
			var request = store.get(user.email);
			request.onsuccess = function(e) {
				console.log("request.success", e);
				var dbuser = e.target.result;
				if (user.password == dbuser.password) {
					dbuser.collection = app.users;
					console.log('dbuser: ', dbuser);
					app.state.user = new app.User(dbuser);
					app.state.isLoggedIn = true;
					callback(true);
				}
				else {
					callback(false);
				}
			};
			//~ if (user.email == 'johndoe@nowhere.com' && user.password == 'foobar') {
				//~ app.state.user = new app.User({
						//~ 'id': 1,
						//~ 'name': 'John Doe',
						//~ 'email': 'johndoe@nowhere.com',
						//~ 'password': '1234',
						//~ 'type': 'Admin',
						//~ 'collection': app.users,
					//~ });
				//~ app.state.isLoggedIn = true;
				//~ callback(true);
			//~ }
			//~ else {
				//~ callback(false);
			//~ }
		}
		else {
			app.bus.trigger('alert', "Online mode not implemented yet.");
		}
	},
	register: function(user, callback) {
		if (app.config.mode == 'offline') {
			delete user.confirm;
			console.log("trying to store");
			var store = app.dbs.db.transaction("users","readwrite").objectStore("users");
			var request = store.add(user);
			request.onerror = function(e){
				console.log("store.onfailure", e);
				callback(false);
			};
			request.onsuccess = function(e) {
				console.log("store.onsuccess", e);
				callback(true);
			};
		}
		else {
			app.bus.trigger('alert', "Online mode not implemented yet.");
		}
	},
	save: function(object) {
		//object can be a model or collection
		if (object instanceof Backbone.Model) {
			console.log("saving model: ", object);
		}
		else if (object instanceof Backbone.Collection) {
			console.log("saving collection: ", object);
		}
	},
}
