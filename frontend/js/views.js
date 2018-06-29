console.log("loading views");
var UserList = Backbone.View.extend({
	el: '.main',
	render: function() {
		this.$el.html("CONTENT SHOULD BE SHOWN HERE!");
	}
});


var MenuList = Backbone.View.extend({
	el: '.main',
	render: function() {
		this.$el.html("THIS IS A MENU");
	}
});
