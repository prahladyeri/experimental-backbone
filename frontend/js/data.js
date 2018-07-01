/**
 * Database Service
 * 
 * */
var app = app || {};

app.dbs = {
	connect: function() {
		//@todo: add connect logic
	},
	login: function(user, callback) {
		if (app.config.mode == 'offline') {
			if (user.email == 'johndoe@nowhere.com' && user.password == 'foobar') {
				app.state.user = new app.User({
						'id': 1,
						'name': 'John Doe',
						'email': 'johndoe@nowhere.com',
						'password': '1234',
						'type': 'Admin',
						'collection': app.users,
					});
				app.state.isLoggedIn = true;
				callback(true);
			}
			else {
				callback(false);
			}
		}
		else {
			console.log('NOT IMPLEMENTED');
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
	open: function() {
		
	}
}
