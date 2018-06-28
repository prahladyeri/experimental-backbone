var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

router = new Router();
var userList = new UserList();

router.on('route:home', function() {
	console.log("We have loaded the home page.");
	userList.render();
});

Backbone.history.start();
