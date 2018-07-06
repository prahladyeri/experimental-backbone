/**
 * Helper functions
 * 
 * */
var helper =  _.extend(Backbone.Events);//helper || {};

helper.setFocus = function(form) {
	//console.log('now setting focus', form);
	form.find("input:first").focus();
}

helper.authenticate = function() {
	if (!app.state.isLoggedIn) {
		app.router.navigate("login", {'trigger':true}) //redirect to login page
		return false;
	} else {
		return true;
	}
}

helper.signout = function() {
	//app.router.navigate("/login", {'trigger': true});
	app.state.user = null;
	app.state.isLoggedIn = false;
	database.saveState();
}

helper.waitforTemplate = function(viewName, c) {
	if (!app[viewName].template) {
		//console.log("%c" + viewName + " template hasn't loaded yet.", "color:darkblue");
		helper.listenTo(app.bus, viewName + ':ontemplateload', function() {
			c();
		});
	} else { c(); }
}

helper.loadTemplate = function(filename, selector) {
	var selector = selector || "#div-main";
	console.log('loading template ', filename, selector);
	//var promise = new Promise();
	return new Promise(function(resolve) {
		$.get(filename, function(data) { //  + "?" + Date.now()
			//console.log(":get data:", data);
			//console.log('div.app contents: ', $("div.app").html());
			var tempstr =  data; //$(this).html(); //$("div.app").html();
			//console.log("template: ", tempstr);
			template = _.template(tempstr);
			//var ss = template.apply({'escape':true});
			var html = template({"users": app.users.toJSON()});
			//console.log('output: ', html);
			//thtml
			$ctrl = $(html);
			//console.log("jquery output: ", $ctrl.html());
			$(selector).html($ctrl.html()).show();
			//$("div.app").append("<h1>test</h1>").show();
			//if (callback != undefined) callback();
			resolve();
		});
	});
}


//setTimeout re-implemented using Promise API
app.sleep = function(interval) {
	return new Promise(function(resolve){
		setTimeout(resolve, interval);
		//resolve(100);
	});
}
