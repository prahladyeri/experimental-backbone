/**
 * Views
 * 
 * */
var app = app || {};
console.log("loading views");

app.NavbarView = Backbone.View.extend({
	render: function() {
		return new Promise(function(resolve) {
			app.loadTemplate("partials/navbar.html", "#div-navbar")
			.then(function(){
				resolve();
			});
		});
	}
});

app.LoginView = Backbone.View.extend({
	el: '#div-main',
	title: "Login",
	initialize: function() {
		//_.bindAll(this, "login");
		//$("body").on('click', '#frm-login #btn-login', this.login);
	},
	events: {
		"submit #frm-login": function() {
			console.log("Form submitted!");
			app.bus.trigger("login", {
				"email": this.$el.find("#email").val(),
				"password": this.$el.find("#password").val(),
				});
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
	el: '#div-main',
	title: "Register",
	initialize: function() {
		console.log("Initialized.");
	},
	events: {
		"submit #frm-register": function(event) {
			//console.log('esm:', event, selector, method);
			//event.preventDefault();
			console.log('called');
			var pwd = this.$el.find("#password").val() ;
			var cnf = this.$el.find("#confirm").val() ;
			if (pwd !== cnf) {
				alert("New and confirm passwords should match.")
				return;
			}
			app.bus.trigger("register", {
				'name': this.$el.find("#name").val(),
				'email': this.$el.find("#email").val(),
				'password': this.$el.find("#password").val(),
				'confirm': this.$el.find("#confirm").val(),
			});
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
