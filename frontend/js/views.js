var app = app || {};

/* Views */
var FlowerList = Backbone.View.extend({
	el: '.main',
	render: function() {
		//console.log(typeof this.$el);
		//console.log(Object.prototype.toString.call(this.$el));
		this.$el.html("CONTENT SHOULD BE SHOWN HERE!");
	}
	});
