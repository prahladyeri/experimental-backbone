function loadView(filename) {
	//var promise = new Promise();
	return new Promise(function(resolve) {
		$("<div></div>").load(filename, function() {
			//console.log('div.app contents: ', $("div.app").html());
			var tempstr =  $(this).html(); //$("div.app").html();
			//console.log("template: ", tempstr);
			template = _.template(tempstr);
			//var ss = template.apply({'escape':true});
			//console.log('ss', ss);
			var html = template({users: [app.user1, app.user2]});
			//console.log('output: ', html);
			//thtml
			$ctrl = $(html);
			//console.log("jquery output: ", $ctrl.html());
			$("#app").append($ctrl.html()).show();
			//$("div.app").append("<h1>test</h1>").show();
			//if (callback != undefined) callback();
			resolve();
		});
	});
}


//setTimeout re-implemented using Promise API
function sleep(interval) {
	return new Promise(function(resolve){
		setTimeout(resolve, interval);
		//resolve(100);
	});
}
