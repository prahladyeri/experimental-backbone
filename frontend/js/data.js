/**
 * Database Service
 * 
 * */
var app = app || {};

app.dbs = {
	connect: function(callback) { //to local or remote database
		if (app.config.mode == 'offline') {
			//@todo: handle incompatible browsers
			if (!window.indexedDB) {
				console.log("Browser doesn't support indexedDB");
				return false;
			} else {
				var request = indexedDB.open("experiment");
				request.onupgradeneeded = function(event) {
					app.state.isNew = true;
					console.log("request:onupgradeneeded");
					//e.target.transaction.abort();
					var db = event.target.result;
					//create tables
					console.log("now creating store.");
					var store = db.createObjectStore("users", {keyPath: "email"});
					app.dbs.store = store;
					console.log("store created.");
					//store.createIndex("name", "name", {unique:false});
					store.createIndex("email", "email", {unique:true});
					//create another store.
					//var dbver =  parseInt(db.version);
					
					var stateStore = db.createObjectStore("state", {keyPath:'id', autoIncrement:true}); //, {keyPath: "email"}
					app.dbs.stateStore = stateStore;
					console.log("stateStore created. Now adding app.sate object to store.");
					//var trans = db.transaction('state','readwrite');
					var trans = event.target.transaction;
					console.log("transaction created.");
					var tstore = trans.objectStore('state');
					console.log("transaction store created.");
					var req = tstore.add(app.state);
					console.log("request created.");
					req.onsuccess = function(e) {
						console.log("transaction successful",e);
					}
					req.onerror = function(e) {
						console.log("transaction failed",e);
					}
				}
				request.oncomplete = function(e) {
					console.log("request:oncomplete: ", e);
					//callback(e); @todo: check why this is not firing
				}
				request.onsuccess = function(e) {
					console.log("request:onsuccess");
					app.dbs.db = e.target.result;
					callback(e);
				}
				request.onerror = function(event) {
					console.log("request:onerror: " + event.target.errorCode);
				}
				return true;
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
				if (dbuser !== undefined && user.password == dbuser.password) {
					//dbuser.collection = app.users;
					console.log('dbuser: ', dbuser);
					//app.state.user = new app.User(dbuser, {collection: app.users});
					app.state.user = dbuser;
					app.state.isLoggedIn = true;
					app.bus.trigger("login:successful");
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

	getState: function(callback) {
		console.log("getstate");
		var tstore = app.dbs.db.transaction('state','readwrite').objectStore('state');
		request = tstore.get(1);
		request.onsuccess = function(e) {
			console.log('getState:request:onsuccess');
			callback(e.target.result);
		}
	},
	
	saveState: function() {
		var tstore = app.dbs.db.transaction('state','readwrite').objectStore('state');
		var obj = _.extend(app.state, {id:1})
		console.log("saveState:obj", obj);
		request = tstore.put(obj);
		request.onsuccess = function(event) {
			console.log('saveState', event);
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
