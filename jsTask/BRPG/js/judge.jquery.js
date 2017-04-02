$(function() {
    var roles=JSON.parse(localStorage.getItem("roles"));//获取配比玩家数组
	var killed = false; //是否杀过
	var judge=true;//是否法官
	var killers=[];//杀手存活数组
	var civilians=[]//平民存活数组
	var rolesLive=[];//所有玩家存活状态
	for(i in rolesLive){
		rolesLive[i]=true;
	}

	rolesLive=JSON.parse(localStorage.getItem("rolesLive"))||rolesLive;//从本地存储获取玩家生存状态，无存储前初始化
//	localStorage.clear("progress");
	function liveState(){
		for(i in roles){
			if(roles[i]=="杀手"){
				killers.push(roles[i]);
			}else{
				civilians.push(roles[i]);
			}
		}
	}
	liveState();//初始化角色存活数组
	killers=JSON.parse(localStorage.getItem("killers"))||killers;//从本地存储获取存活杀手数组，无存储则初始化数组
	civilians=JSON.parse(localStorage.getItem("civilians"))||civilians;////从本地存储获取存活平民数组，无存储则初始化数组
	function gameOver(){//判断游戏胜负
		var result="还没判出胜负";
		if(killers.length==0){
			result=civilians[0]+"胜利";
			localStorage.setItem("result",result);
			location.href="result.html";
		}else if(killers.length>=civilians.length){
			result=killer[0]+"胜利";
			localStorage.setItem("result",result);
			location.href="result.html";
		}
		else{
			console.log(result);
		}
		

	}
	function lodePage() { //初始化角色列表
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
			for(var j = 0; j < 4; j++) {
				var toolItem = document.createElement("button");
				switch(j) {
					case 0:
						toolItem.className = "tool-item tool-kill"; //杀人按钮
						break;
					case 1:
						toolItem.className = "tool-item tool-search"; //搜索按钮
						break;
					case 2:
						toolItem.className = "tool-item tool-mark"; //标记按钮
						break;
					case 3:
						toolItem.className = "tool-item tool-add"; //增加按钮
						break;
					default:
						break;
				}
				tool.append(toolItem);
			}
			var role = document.createElement("li");
//			if(rolesLive[i]){
//				role.className = "role role-live";//存活玩家类名
//			}else{
//				role.className = "role";//死亡玩家类名
//			}
			role.className = "role role-live";//存活玩家类名
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

	function changeToDie(roleState) { //状态变死亡
		$(".role.role-live").click(function() {//存活角色才可被杀
			$roleName = $(this).find(".role-name");
			
			if(roleState == "杀手杀人"||"全民投票") {
				if(killed){
					confirm("一次只能杀一个人！");
				}else if(roleState == "杀手杀人"&&$roleName.text() == "杀手"){
					alert("坑货！不能杀自己人！");
						
				}else{
					var i = $(this).find(".role-num").text();
					rolesLive[parseInt(i) - 1] = false;
					localStorage.setItem("rolesLive",JSON.stringify(rolesLive));
//					var progress=JSON.parse(localStorage.getItem("progress"));
//					var log={"daily":progress.daily,"dailyState":progress.dailyState,"num":i}
//					var a=[];
//					var deadLog=JSON.parse(localStorage.getItem("deadLog"))||a;//获取死亡日志，若无存储则初始化一个数组
//					deadLog.push(log);
//					console.log("第"+deadLog.daily+"天"+deadLog.num+"号被杀死");
//					localStorage.setItem("deadLog", deadLog); //将死者号码存入本地
					console.log(i + "号死了！");
//					$roleName.css("background-color", "#83b09a").css("color", "#fff");
					if($roleName.text()==killers[0]){//若死者是杀手，则从杀手存活数组删除一个
						killers.pop(killers[0]);
						localStorage.setItem("killers",JSON.stringify(killers));//将杀手存活数组存入本地
					}else{//若死者是平民，则从平民存活数组删除一个
						civilians.pop(civilians[0]);
						localStorage.setItem("killers",JSON.stringify(killers));//将平民存活数组存入本地
					}
					killed=true;
					$(this).removeClass("role-live");//改变生存状态
				}
			}		
		});
		gameOver();
	}
	function roleAndState() { //判断玩家身份和状态
		var roleState = localStorage.getItem("roleState") || "法官开始"; //从本地存储获取当前身份和状态；
		switch(roleState) {
			case "法官开始":
				showTitle("法官日志");
				$("#operate").text("开始游戏");
				hideKill();
				break;
			case "法官日志":
				showTitle(roleState);
				$("#operate").text("返回");
				hideKill();
				break;
			case "杀手杀人":
				showTitle(roleState);
				$("#operate").text("确定");
				changeToDie(roleState);
				judge=false;
				break;
			case "全民投票":
				showTitle("投票");
				$("#operate").text("确定");
				changeToDie(roleState);
				judge=false;
				break;
			default:
				alert("程序故障，请联系开发人员！");
				break;
		}
	}
	lodePage(); //初始化角色列表 
	roleAndState() //根据不同身份做出响应
	console.log(roles.length);
	$("#operate").click(function() {
		if(judge){//法官点击可直接跳转
			location.href = "libretto.html";
		}else if(killed){//杀人和投票环节，杀了1个人后可以跳转
			location.href = "libretto.html";
		}else{
			alert("今天要杀死1个人才能离开！")
		}
		
	})
})