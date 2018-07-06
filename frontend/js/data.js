/**
 * Database Service
 * 
 * */
var app = app || {};
//dbs = {};
//app.dbs = dbs;
var database = {};

database.connect = function(callback) { //to local or remote database
	//debugger;
	//@todo: handle incompatible browsers
	if (!window.indexedDB) {
		alert("Browser doesn't support indexedDB");
		return false;
	}
	var request = indexedDB.open("experiment");
	request.onupgradeneeded = function(event) {
		app.state.isNew = true;
		console.log("request:onupgradeneeded");
		//e.target.transaction.abort();
		var db = event.target.result;
		if (app.config.mode == 'offline') {
			//create users store
			var store = db.createObjectStore("users", {keyPath: "email"});
			database.store = store;
			store.createIndex("email", "email", {unique:true});
		}
		//create state store
		var stateStore = db.createObjectStore("state", {keyPath:'id', autoIncrement:true}); //, {keyPath: "email"}
		database.stateStore = stateStore;
		//add object to state store
		var trans = event.target.transaction;
		var tstore = trans.objectStore('state');
		var req = tstore.add(app.state);
		req.onsuccess = function(e) {
			console.log("%cstore:transaction:success", "color:darkgreen");
		}
		req.onerror = function(e) {
			console.log("%cstore:transaction:error","color:darkred", e);
		}
	}
	request.oncomplete = function(e) {
		console.log("request:oncomplete: ", e);
		//callback(e); @todo: check why this is not firing
	}
	request.onsuccess = function(e) {
		console.log("%cdbs:request:onsuccess", "color: darkgreen;");
		database.db = e.target.result;
		callback(e);
	}
	request.onerror = function(e) {
		console.log("%cdbs:request:onerror:","color:darkred", e);
	}
	return true;
};

database.login = function(user, callback) {
		if (app.config.mode == 'offline') {
			var store = database.db.transaction("users","readonly").objectStore("users");
			var request = store.get(user.email);
			request.onsuccess = function(e) {
				console.log("request.success");
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
		}
		else {
			app.bus.trigger('alert', "Online mode not implemented yet.");
		}
	}

database.register = function(user, callback) {
	if (app.config.mode == 'offline') {
		delete user.confirm;
		var store = database.db.transaction("users","readwrite").objectStore("users");
		var request = store.add(user);
		request.onsuccess = function(e) {
			console.log("store.success", e);
			callback(true);
		};
		request.onerror = function(e){
			console.log("store.error", e);
			callback(false);
		};
	}
	else {
		app.bus.trigger('alert', "Online mode not implemented yet.");
	}
}

database.getState = function(callback) {
	var tstore = database.db.transaction('state','readwrite').objectStore('state');
	request = tstore.get(1);
	request.onsuccess = function(e) {
		console.log('%cgetState:success', 'color: darkgreen');
		callback(e.target.result);
	}
	request.onerror = function(e) {
		console.log('%cgetState:error', 'color: darkred', e);
		callback(e.target.result);
	}
}	

database.saveState = function() {
	var tstore = database.db.transaction('state','readwrite').objectStore('state');
	var obj = _.extend(app.state, {id:1})
	request = tstore.put(obj);
	request.onsuccess = function(e) {
		console.log('%csaveState:success', 'color:darkgreen');
	}
	request.onerror = function(e) {
		console.log('%csaveState:error', 'color:darkred', e);
	}
}

database.save = function(object) {
	//object can be a model or collection
	if (object instanceof Backbone.Model) {
		console.log("saving model: ", object);
	}
	else if (object instanceof Backbone.Collection) {
		console.log("saving collection: ", object);
	}
}
