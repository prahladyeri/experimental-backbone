/**
 * Views
 * 
 * */
var app = app || {};
console.log("loading views");

app.NavbarView = Backbone.View.extend({
	render: function() {
		return new Promise(function(resolve) {
			app.loadTemplate("partials/navbar.html", "#nav-box")
			.then(function(){
				resolve();
			});
		});
	}
});

app.LoginView = Backbone.View.extend({
	el: '#app',
	title: "Login",
	initialize: function() {
		//_.bindAll(this, "login");
		//$("body").on('click', '#frm-login #btn-login', this.login);
	},
	events: {
		"submit #frm-login": function() {
			console.log("Form submitted!");
		}
	},
	render: function() {
		$("#spn-title").text(this.title);
		app.loadTemplate("partials/login.html")
		.then(function() {
			var form = $("#frm-login");
			app.setFocus(form);
		});
	},
});


app.RegisterView = Backbone.View.extend({
	el: '#app',
	title: "Register",
	initialize: function() {
	},
	events: {
		"submit #frm-register": function() {
			console.log("Form submitted!");
		}
	},
	render: function() {
		$("#spn-title").text(this.title);
		app.loadTemplate("partials/register.html")
		.then(function() {
			var form = $("#frm-register");
			app.setFocus(form);
		});

	},
});
