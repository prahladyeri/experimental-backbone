var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

router = new Router();
var flowerList = new FlowerList();

router.on('route:home', function(){
	console.log("We have loaded the home page.");
	flowerList.render();
});

Backbone.history.start();
