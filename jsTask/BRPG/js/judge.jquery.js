$(function() {
    var roles=JSON.parse(sessionStorage.getItem("roles"));//获取配比玩家数组
	var killed = false; //是否杀过
	var judge=true;//是否法官
	var killers=JSON.parse(sessionStorage.getItem("killers"))||illegal();//获取杀手存活数组
	var civilians=JSON.parse(sessionStorage.getItem("civilians"));//获取平民存活数组
	function illegal(){//未进行玩家配比进入页面处理
		if(confirm("玩家配比后才可进行游戏，前往配比？")){
			location.href="matchPage.html";
		}else {//返回主页，后期考虑改成直接关闭页面。
			alert("玩家未配比不能继续游戏!");
			location.href="home.html";
		}
	}
	var rolesLive=[];//所有玩家存活状态
	for(i in rolesLive){
		rolesLive[i]=true;
	}
	rolesLive=JSON.parse(sessionStorage.getItem("rolesLive"))||rolesLive;//从本地存储获取玩家生存状态，无存储前初始化
	function lookResult(result){
		console.log(result);
		sessionStorage.setItem("result",result);
		sessionStorage.clear("roleState");//游戏结束前清理角色状态，以便重开一局
		$("#operate").text("游戏结束");
		$("#operate").click(function(){
			location.href="result.html";
		})
	}
	function gameOver(){//判断游戏胜负
		killers=JSON.parse(sessionStorage.getItem("killers"))//获取杀手存活数组
		civilians=JSON.parse(sessionStorage.getItem("civilians"));//获取平民存活数组
		var result="还没判出胜负";
		if(killers.length==0){
			result=civilians[0]+"胜利";
			lookResult(result);
		}else if(killers.length>=civilians.length){
			result=killer[0]+"胜利";
			lookResult(result);
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
			var toolItems=["kill","search","mark","add"];//杀人按钮//搜索按钮//标记按钮//增加按钮
			for(var j = 0; j < 4; j++) {
				var toolItem = document.createElement("button");
				toolItem.className="tool-item tool-"+toolItems[j];
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
					sessionStorage.setItem("rolesLive",JSON.stringify(rolesLive));
					console.log(i + "号死了！");
					if($roleName.text()==killers[0]){//将死者从对应数组删除，并存入本地存储
						killers.splice(0,1);
						sessionStorage.setItem("killers",JSON.stringify(killers));
					}else{
						civilians.splice(0,1);
						sessionStorage.setItem("civilians",JSON.stringify(civilians));
					}
					killed=true;
					$(this).removeClass("role-live");//改变生存状态
					gameOver();//判断游戏是否结束
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
				changeToDie(roleState);
				judge=false;
				break;
			case "全民投票":
				showTitle("投票");
				$("#tip").show();
				$("#tip1Txt").text("发言讨论结束，请大家投票");
				$("#tip2Txt").text("点击得票数最多人的头像");
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
	roleAndState(); //根据不同身份做出响应
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
	$("#play").click(function(){
		if($("#audio").hasClass("play")){
			$("#audio").trigger("pause");
			$("#audio").removeClass("play");
		}else{
			$("#audio").trigger("play");
			$("#audio").addClass("play");
		}
	})
})
