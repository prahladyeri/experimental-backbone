/**
 * Views
 * 
 * */
var views = views || {};
console.log("loading views");

views.NavbarView = Backbone.View.extend({
	el: "#div-navbar",
	initialize: function() {
		var temp = this;
		$.get("partials/navbar.html", function(e){
			temp.template = _.template(e, {});
			app.bus.trigger('navbarView:ontemplateload');
			console.log('%cnavbarView:ontemplateload','color:darkblue');
		});
		console.log('%cnavbarview:initialize','color:darkred');
		this.listenTo(app.bus, 'app:loaded', function(e){
			console.log('%capp.bus:loaded', 'color:darkred');
			$(".show-on-start").removeClass('hidden');
		});
	},
	//~ waitforTemplate: function(c) {
		//~ if (!this.template) {
			//~ console.log("%cnavbar template hasn't loaded yet.", "color:darkblue");
			//~ this.listenTo(app.bus, 'navbarView:ontemplateload', function() {
				//~ c();
			//~ });
		//~ } else { c(); }
	//~ },
	render: function() {
		var t = this;
		helper.waitforTemplate('navbarView', function() {
			t.$el.html(t.template());
			app.bus.trigger('navbarView:onrender');
		});
	},
	update: function(data) {
		var t = this;
		helper.waitforTemplate('navbarView', function(){
			console.log("%cnavbarView:onupdatestart","color:darkblue");
			var icon = data.icon || "bug";
			$("#icon-title").removeClass();
			$("#icon-title").addClass("fa fa-" + icon);
			$("#spn-title").text(data.title);
		});
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

views.TestView = Backbone.View.extend({
	el: "#div-main",
	title: 'Test Page',
	render: function(){
		title = this.title;
		helper.loadTemplate("partials/test.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'file'});
			console.log("test page loaded");
		});
	},
});

views.AboutView = Backbone.View.extend({
	el: "#div-main",
	title: "About ",
	render: function() {
		this.title = "About " + app.config.name;
		var temp = this;
		title = this.title;
		helper.loadTemplate("partials/about.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'info-circle'});			
		});
	},
});

views.HomeView = Backbone.View.extend({
	el: "#div-main",
	title: 'Home',
	render: function(){
		var temp = this;
		title = this.title;
		helper.loadTemplate("partials/home.html")
		.then(function() {
			app.bus.trigger("view:rendered", {title: title, icon: 'bug'});
			var ss = "";
			ss += "Application Configuration: <br>";
			ss += _.template("<pre><%= content %></pre>")({"content": JSON.stringify(app.config)});
			ss += "Application State: <br>";
			ss += _.template("<pre><%= content %></pre>")({"content": JSON.stringify(app.state)});
			temp.$el.find("#div-info").html(ss);
		});
	},
});

views.LoginView = Backbone.View.extend({
	el: '#div-main',
	title: "Login",
	initialize: function(){
		const temp = this;
		$.get("partials/login.html", function(e) {
			temp.template = _.template(e, {});
			app.bus.trigger("loginView:ontemplateload");
		});
	},
	events: {
		"submit #frm-login": function() {
			console.log("Form submitted!");
			app.bus.trigger("login:start", {
				data: {
					"email": this.$el.find("#email").val(),
					"password": this.$el.find("#password").val(),
				},
				success: function(data) {
					if (!data) {
						app.bus.trigger('alert', "Incorrect Email/Password.", 'danger');
					}
					else {
						//~ app.router.navigate("#", {'trigger':true});
						//sign-in successful
						app.bus.trigger('login:successful:rendered');
						views.navbarView.render();
						app.router.navigate("#", {'trigger':true});
					}
				}
			});
		}
	},
	render: function() {
		if (!this.template) {
			console.log("%clogin template hasn't loaded yet", "color:darkblue");
			this.listenTo(app.bus, "loginView:ontemplateload", function() {
				this.render();
			});
			return;
		}
		helper.signout();
		title = this.title;
		views.navbarView.render();
		console.log("login template loaded");
		this.$el.html(this.template({}));
		app.bus.trigger("view:rendered", {title: title, icon: 'user'});
		var $form = this.$el.find("#frm-login");
		helper.setFocus($form);
	},
});

views.RegisterView = Backbone.View.extend({
	el: '#div-main',
	title: "Register",
	initialize: function() {
		const temp = this;
		$.get("partials/register.html", function(e){
			//console.log('loading temploate: ', e);
			temp.template = _.template(e, {});
			app.bus.trigger("registerView:ontemplateload");
		});
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
					'type': 'Admin',
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
		if (!this.template) {
			console.log("register template not loaded yet");
			this.listenTo(app.bus, "registerView:ontemplateload", function() {
				this.render();
			});
			return;
		}
		helper.signout();
		title = this.title;
		views.navbarView.render();
		this.$el.html(this.template({}));
		app.bus.trigger("view:rendered", {title: this.title, icon: 'register'});
		$form = this.$el.find("#frm-register");
		helper.setFocus($form);
	},
});


views.loginView = new views.LoginView();
views.registerView = new views.RegisterView();
views.navbarView = new views.NavbarView();
views.homeView = new views.HomeView();
views.testView = new views.TestView();
views.aboutView = new views.AboutView();
