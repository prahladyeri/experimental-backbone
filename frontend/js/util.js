function loadView(filename, callback) {
	$("<div></div>").load(filename, function() {
		//console.log('div.app contents: ', $("div.app").html());
		var tempstr =  $(this).html(); //$("div.app").html();
		//console.log("template: ", tempstr);
		template = _.template(tempstr);
		//var ss = template.apply({'escape':true});
		//console.log('ss', ss);
		var html = template({users: [user1, user2]});
		//console.log('output: ', html);
		//thtml
		$ctrl = $(html);
		//console.log("jquery output: ", $ctrl.html());
		$("#app").append($ctrl.html()).show();
		//$("div.app").append("<h1>test</h1>").show();
		if (callback != undefined) callback();
		return;
	});
}
