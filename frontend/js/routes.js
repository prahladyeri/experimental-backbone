console.log("loading routes");
var Router = Backbone.Router.extend({
	routes: {
		"": 'home'
	}
});

var router = new Router();
var userList = new UserList();
var menuList = new MenuList();

router.on('route:home', function() {
	console.log("route:home");
	loadView("partials/login.html");
	userList.render();
	menuList.render();
});

Backbone.history.start(); //@todo: check what this does.

function loadView(filename) {
	$("<div></div>").load(filename, function() {
		//console.log('div.app contents: ', $("div.app").html());
		var tempstr =  $(this).html(); //$("div.app").html();
		//console.log("template: ", tempstr);
		template = _.template(tempstr);
		//var ss = template.apply({'escape':true});
		//console.log('ss', ss);
		var html = template({users: [user1, user2]});
		//console.log('output: ', html);
		//thtml
		$ctrl = $(html);
		console.log("jquery output: ", $ctrl.html());
		$("#app").append($ctrl.html()).show();
		//$("div.app").append("<h1>test</h1>").show();
		return;
	});

}
