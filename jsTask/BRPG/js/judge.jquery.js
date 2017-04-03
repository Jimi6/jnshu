$(function() {
	function illegal() { //未进行玩家配比进入页面处理
		if(confirm("玩家配比后才可进行游戏，前往配比？")) {
			location.href = "matchPage.html";
		} else { //返回主页，后期考虑改成直接关闭页面。
			alert("玩家未配比不能继续游戏!");
			location.href = "home.html";
		}
	}
	var killed = false; //是否杀过
	var judge = true; //是否法官
	var roles = JSON.parse(sessionStorage.getItem("roles")); //获取配比玩家数组
	var killers = JSON.parse(sessionStorage.getItem("killers")) || illegal(); //获取杀手存活数组
	var civilians = JSON.parse(sessionStorage.getItem("civilians")); //获取平民存活数组
	var deadLog = [];//初始化死亡记录
	var rolesLive = []; //所有玩家存活状态
	for(i in roles) { //将角色数组绑定对应的生存状态数组，初始化为活
		rolesLive[i] = true;
	}
	console.log("初始化的生存状态" + rolesLive);
	function lodePage() { //初始化角色列表
		rolesLive = JSON.parse(sessionStorage.getItem("rolesLive")) || rolesLive; //从本地存储更新玩家生存状态，无存储前初始化
		console.log("更新后的生存状态" + rolesLive);
		for(var i = 0; i < roles.length; i++) {
			var roleName = document.createElement("div"); //角色名
			roleName.className = "role-name";
			roleName.innerText = roles[i]
			var roleNum = document.createElement("div"); //角色编号
			roleNum.className = "role-num";
			roleNum.innerText = i + 1;
			var roleInfo = document.createElement("div"); //角色信息
			roleInfo.setAttribute("class", "role-info");
			roleInfo.append(roleName);
			roleInfo.append(roleNum);
			var tool = document.createElement("div"); //小工具
			tool.className = "tool";
			var toolItems = ["kill", "search", "mark", "add"]; //杀人按钮//搜索按钮//标记按钮//增加按钮
			for(var j = 0; j < 4; j++) {
				var toolItem = document.createElement("button");
				toolItem.className = "tool-item tool-" + toolItems[j];
				tool.append(toolItem);
			}
			var role = document.createElement("li");
			if(rolesLive[i]==true) {
				role.className = "role role-live"; //存活玩家类名
			} else {
				role.className = "role"; //死亡玩家类名
			}
			//			role.className = "role role-live"; //存活玩家类名
			role.append(roleInfo);
			role.append(tool);
			$("#roleList").append(role);
		}
	}

	function showTitle(title) { //显示页面标题
		$("title").text(title);
		$("#title").text(title);
	}

	function hideKill() { //隐藏杀人按钮
		$(".role").hover(function() {
			$(this).find(".tool-kill").hide();
		}, function() {
			$(this).find(".tool-kill").hide();
		})
	}

	function gameOver() { //判断游戏胜负
		killers = JSON.parse(sessionStorage.getItem("killers")) //从本地存储更新杀手存活数组
		civilians = JSON.parse(sessionStorage.getItem("civilians")); //从本地存储更新平民存活数组
		var result = "还没判出胜负";
		if(killers.length == 0) {
			result = civilians[0] + "胜利";
			sessionStorage.setItem("result",JSON.stringify(result));
			return true;
		} else if(killers.length >= civilians.length) {
			result = killers[0] + "胜利";
			sessionStorage.setItem("result",JSON.stringify(result));
			return true;
		} else {
			console.log(result);
		}
	}

	function changeToDie(roleState) { //状态变死亡
		$(".role.role-live").click(function() { //存活角色才可被杀
			$roleName = $(this).find(".role-name");
			if(roleState == "杀手杀人" || "全民投票") {
				if(killed) {
					confirm("一次只能杀一个人！");
				} else if(roleState == "杀手杀人" && $roleName.text() == "杀手") {
					alert("坑货！不能杀自己人！");

				} else {
					if($roleName.text() == killers[0]) { //将死者从对应数组删除，并存入本地存储
						killers.splice(0, 1);
						sessionStorage.setItem("killers", JSON.stringify(killers));
					} else {
						civilians.splice(0, 1);
						sessionStorage.setItem("civilians", JSON.stringify(civilians));
					}
					killed = true; //更新本次操作状态为已经杀死1个人
					var num = $(this).find(".role-num").text();
					$(this).removeClass("role-live"); //改变生存状态
					rolesLive[parseInt(num) - 1] = false; //将被杀死对象生存状态设为死
					sessionStorage.setItem("rolesLive", JSON.stringify(rolesLive));
					if(roleState == "杀手杀人") {
						var deadMethod = "被杀死";
					} else {
						var deadMethod = "被投死";
					}
					var killedLog = num + "号" + deadMethod + "，真实身份是" + $(this).find(".role-name").text(); //死亡信息
					var progress = JSON.parse(sessionStorage.getItem("progress")); //获取当前游戏时间段及游戏步骤
					var log = { "daily": progress.daily, "dailyState": progress.daily, "killdeLog": killedLog };
					deadLog = JSON.parse(sessionStorage.getItem("deadLog")) || deadLog; //获取死亡记录，无记录则初始化。
					deadLog.push(log);
					sessionStorage.setItem("deadLog", JSON.stringify(deadLog)); //更新死亡记录至本地存储
					console.log(deadLog);
					if(roleState=="杀手杀人"){
						sessionStorage.setItem("byKilled",JSON.stringify(killedLog));//将当前被杀信息存入本地
					}
					if(gameOver()) { //判断游戏是否结束
						if(confirm("游戏结束，立即查看结果？")) {
							location.href = "result.html"
						} else {
							$("#operate").text("查看结果");
							$("#operate").click(function() {
								location.href = "result.html"
							})
						}
					}
				}
			}
		});
	}

	function roleAndState() { //判断玩家身份和状态
		var roleState = sessionStorage.getItem("roleState") || "法官开始"; //从本地存储获取当前身份和状态；
		switch(roleState) {
			case "法官开始":
				showTitle("法官日志");
				$("#tip").hide();
				$("#operate").text("开始游戏");
				hideKill();
				break;
			case "法官日志":
				showTitle(roleState);
				$("#tip").hide();
				$("#operate").text("返回");
				hideKill();
				break;
			case "杀手杀人":
				showTitle(roleState);
				$("#tip").show();
				$("#tip1Txt").text("杀手请睁眼，选择要杀的对象");
				$("#tip2Txt").text("点击被杀的玩家的头像，进行标记");
				$("#operate").text("确定");
				changeToDie(roleState); //杀人
				judge = false;
				break;
			case "全民投票":
				showTitle("投票");
				$("#tip").show();
				$("#tip1Txt").text("发言讨论结束，请大家投票");
				$("#tip2Txt").text("点击得票数最多人的头像");
				$("#operate").text("确定");
				changeToDie(roleState); //投票
				judge = false;
				break;
			default:
				alert("程序故障，请联系开发人员！");
				break;
		}
	}
	$("#operate").click(function() {
		if(judge) { //法官点击可直接跳转
			location.href = "libretto.html";
		} else if(killed) { //杀人和投票环节，杀了1个人后可以跳转
			location.href = "libretto.html";
		} else {
			alert("今天要杀死1个人才能离开！")
		}
	})
	$("#play").click(function() { //音频控制按钮
		if($("#audio").hasClass("play")) {
			$("#audio").trigger("pause");
			$("#audio").removeClass("play");
		} else {
			$("#audio").trigger("play");
			$("#audio").addClass("play");
		}
	})
	lodePage(); //初始化角色列表 
	roleAndState(); //根据不同身份做出响应
})