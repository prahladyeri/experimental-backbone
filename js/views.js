/**
 * Views
 * 
 * */
var app = app || {};
console.log("loading views");

app.NavbarView = Backbone.View.extend({
	el: "#div-navbar",
	initialize: function() {
	},
	render: function() {
		return new Promise(function(resolve) {
			app.loadTemplate("partials/navbar.html", "#div-navbar")
			.then(function(){
				resolve();
			});
		});
	},
	update: function(data) {
		var icon = data.icon || "bug";
		this.$el.find("#icon-title").removeClass();
		this.$el.find("#icon-title").addClass("fa fa-" + icon);
		this.$el.find("#spn-title").text(data.title);
	},
	refresh: function() {
		//~ if (app.state.isLoggedIn) {
			//~ $("#navbar-user-block").removeClass('hidden');
		//~ }
		//~ else {
			//~ $("#navbar-user-block").addClass('hidden');
		//~ }
	},
	alert: function(message, flag) {
		var flag = flag || "success";
		var closeAnchor = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
		var html = '<div class="alert alert-' + flag +  '">' + closeAnchor + message + '</div>';
		this.$el.find("#nav-alert-block").html(html);
		//$("#div-main").append(html);
	},
	clearAlerts: function() {
		this.$el.find("#nav-alert-block").html("");
	}
});

app.TestView = Backbone.View.extend({
	el: "#div-main",
	title: 'Test Page',
	render: function(){
		title = this.title;
		app.loadTemplate("partials/test.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'file'});
			console.log("test page loaded");
		});
	},
});

app.AboutView = Backbone.View.extend({
	el: "#div-main",
	title: "About Experimental",
	render: function() {
		var temp = this;
		title = this.title;
		app.loadTemplate("partials/about.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'info-circle'});			
		});
	},
});


app.HomeView = Backbone.View.extend({
	el: "#div-main",
	title: 'Home',
	render: function(){
		var temp = this;
		title = this.title;
		app.loadTemplate("partials/home.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'bug'});
			var ss = "";
			ss += "Application Configuration: <br>";
			ss += _.template("<pre><%= content %></pre>")({"content": JSON.stringify(app.config)});
			ss += "Application State: <br>";
			ss += _.template("<pre><%= content %></pre>")({"content": JSON.stringify(app.state)});
			temp.$el.find("#div-info").html(ss);
			console.log("home template loaded");
		});
	},
});

app.LoginView = Backbone.View.extend({
	el: '#div-main',
	title: "Login",
	initialize: function() {
		//_.bindAll(this, "login"); //@todo: check why is bindAll needed
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
					if (!data) {
						app.bus.trigger('alert', "Incorrect Email/Password.", 'danger');
					}
					else {
						//sign-in successful
						app.router.navigate("", {'trigger':true});
						console.log("now showing welcome screen.");
						var welcome = "Welcome " + app.state.user.name + "!";
						app.navbarView.render()
						.then(function(){
							//app.navbarView.refresh();
							app.navbarView.update({'title': app.homeView.title});
							app.navbarView.alert(welcome);
						});
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
		app.signout();
		app.navbarView.render();
		title = this.title;
		app.loadTemplate("partials/login.html")
		.then(function() {
			var form = $("#frm-login");
			app.setFocus(form);
			app.bus.trigger("view:rendered", {title: title, icon: 'user'});
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
				app.bus.trigger('alert', "New and confirm passwords should match.", 'danger');
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
					//console.log('Data Received from server! ', data);
					if (data) {
						app.bus.trigger('alert', "You have successfully registered! <a href='#login'>Click here</a> to login.");
					} else {
						app.bus.trigger('alert', "There was some problem during registration. Account with this email may already exist.", 'danger');
					}
				}
			});
		}
	},
	render: function() {
		app.bus.trigger("view:rendered", {title: this.title, icon: 'register'});
		app.loadTemplate("partials/register.html")
		.then(function() {
			var form = $("#frm-register");
			app.setFocus(form);
		});

	},
});

app.loginView = new app.LoginView();
app.registerView = new app.RegisterView();
app.navbarView = new app.NavbarView();
app.homeView = new app.HomeView();
app.testView = new app.TestView();
app.aboutView = new app.AboutView();
