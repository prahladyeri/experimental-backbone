var app = app || {};
console.log("loading views");

app.NavbarView = Backbone.View.extend({
	render: function() {
		loadView("partials/navbar.html", "#nav-box")
		.then(function(){
			//@todo
		});
	}
});

app.LoginView = Backbone.View.extend({
	el: '#app',
	initialize: function() {
		_.bindAll(this, "login");
		console.log("LENGTH IS ", $("body").length);
		$("body").on('click', '#frm-login #btn-login', this.login);
	},
	render: function() {
		//~ loadView("partials/login.html", function(){
			//~ var form = $("#frm-login");
			//~ console.log('formNow', form);
			//~ console.log('formNow', typeof form);
			//~ app.setFocus(form);
		//~ });
		loadView("partials/login.html")
		.then(function() {
			var form = $("#frm-login");
			console.log('formNow', form);
			console.log('formNow', typeof form);
			app.setFocus(form);
		});

	},
	login: function() {
		console.log("login() triggered.");
	}
});
