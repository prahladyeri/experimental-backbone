console.log("loading views");
var LoginView = Backbone.View.extend({
	el: '#app',
	initialize: function() {
		_.bindAll(this, "login");
		console.log("LENGTH IS ", $("body").length);
		$("body").on('click', '#frm-login #btn-login', this.login);
	},
	render: function() {
		loadView("partials/login.html", function(){
			var form = $("#frm-login");
			console.log('formNow', form);
			console.log('formNow', typeof form);
			setFocus(form);
		});
	},
	login: function() {
		console.log("login() triggered.");
	}
});
