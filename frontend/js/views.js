/**
 * Views
 * 
 * */
var app = app || {};
console.log("loading views");

app.NavbarView = Backbone.View.extend({
	el: "#div-navbar",
	render: function() {
		return new Promise(function(resolve) {
			app.loadTemplate("partials/navbar.html", "#div-navbar")
			.then(function(){
				resolve();
			});
		});
	},
	update: function(data) {
		this.$el.find("#spn-title").text(data.title);
	},
	refresh: function() {
		if (app.state.isLoggedIn) {
			$("#navbar-user-block").removeClass('hidden');
		}
		else {
			$("#navbar-user-block").addClass('hidden');
		}
	},
	alert: function(message, flag) {
		var flag = flag || "success";
		var closeAnchor = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
		var html = '<div class="alert alert-' + flag +  '">' + closeAnchor + message + '</div>';
		this.$el.find("#nav-alert-block").html(html);
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
				data: {
					"email": this.$el.find("#email").val(),
					"password": this.$el.find("#password").val(),
				},
				success: function(data) {
					//console.log('Data Received from server! ', data);
					if (!data) {
						app.bus.trigger('alert', "Incorrect Username/Password", 'danger');
					}
					else {
						app.bus.trigger('alert', "You've signed in " + app.state.user.get('name') + "!", 'success');
					}
				}
			});
		}
	},
	render: function() {
		//$("#spn-title").text(this.title);
		//~ app.navbarView.update({
			//~ title: this.title,
		//~ });
		app.bus.trigger("view:rendered", this.title);
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
			console.log('called');
			var pwd = this.$el.find("#password").val() ;
			var cnf = this.$el.find("#confirm").val() ;
			if (pwd !== cnf) {
				alert("New and confirm passwords should match.")
				return;
			}
			app.bus.trigger("register", {
				data: {
					'name': this.$el.find("#name").val(),
					'email': this.$el.find("#email").val(),
					'password': this.$el.find("#password").val(),
					'confirm': this.$el.find("#confirm").val(),
				},
				success: function(data){
					console.log('Data Received from server! ', data);
				}
			});
		}
	},
	render: function() {
		app.bus.trigger("view:rendered", this.title);
		app.loadTemplate("partials/register.html")
		.then(function() {
			var form = $("#frm-register");
			app.setFocus(form);
		});

	},
});
