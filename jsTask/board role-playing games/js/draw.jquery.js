//翻牌页

$(document.ready = function() {
	$("#back").click(function() { //返回按钮
		history.back();
	})
	$("#close").click(function() {
		location.href = "index.html";
	})
	var roles = ["平民", "杀手", "平民", "平民","平民", "杀手", "平民", "平民"]; //玩家配比数组
	var words = ["康熙", "乾隆"];
	var look = false; //查看状态
	var complete = false; //所有玩家完成查看
	var num = 1; //玩家编号
	$("#role .thumbnail").show();
	$("#role .roleInfo").hide();
	$("#role .tip").hide();
	$("#roleNum").text(num);
	$("#look").text("查看" + num + "号身份");
	$("#look").click(function() {
		if(complete) {
			location.href = "judge.html";
		} else {
			if(look) {
				$("#role .thumbnail").show();
				$("#role .roleInfo").hide();
				$("#role .tip").hide();
				$("#look").text("查看" + num + "号身份");
				look = !look; //改变查看状态
			} else {
				$("#role .thumbnail").hide();
				$("#role .roleInfo").show();
				$("#role .tip").show();
				$("#roleNum").text(num);
				$("#identify").text("角色：" + roles[num - 1]);
				var word=(roles[num] == "杀手")?words[0]:words[1];
				$("#words").text("词组：" + word);//显示对应角色词组效果等同于下句注释
				//if(roles[num] == "杀手") { //杀手词组 $("#words").text("词组：" + words[0]);} else { //平民词组$("#words").text("词组：" + words[1]);}
				if(num == roles.length) { //角色查看完毕，改变查看完毕状态;否则继续查看
					$("#look").text("法官查看");
					complete = !complete;
				} else {
					$("#look").text("隐藏并传给" + (++num) + "号"); //传递给下1号玩家
				}
				look = !look; //改变查看状态
			}

		}

	})
})