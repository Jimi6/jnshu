//翻牌页

$(document.ready = function() {
	$("#back").click(function() { //返回按钮
		history.back();
	})
	$("#close").click(function() {
		location.href = "index.html";
	})
	var complete = false; //所有角色整体查看完毕
	var look = false; //角色查看状态
	$("#footerBtn").click(function() {

		//		complete="ture";
		var $role = $("#role");
		var test = 4;
		if(look) {
			$("#role .thumbnail").hide();
			$("#role .roleInfo").show();
			$("#role .tip").show();
			var num = $("#role~.roleNumber").text()
			$("#role~.roleNumber").text(parseInt(num) + 1);
			look = false;
			if(test--) {
				complete = "ture";
			}

		} else if(complete) { //角色查看完毕，跳转法至官页面
			location.href = "judge.html";
		} else {
			$("#role .thumbnail").show();
			$("#role .roleInfo").hide();
			$("#role .tip").hide();
			look = "ture";
		}
	})
})