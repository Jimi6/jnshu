$(document).ready(function())

$(function() {
	var str1 = localStorage.getItem("roles"); //从本地存储获取角色配比字符串   //传值前测试用 	var roles = ["平民", "杀手", "平民", "平民", "平民", "杀手", "平民", "平民"]; //玩家配比数组
	var roles = str1.split(","); //角色数组   将字符串分割成数组
	var rolesLive = [] //玩家生死状态数组
	var killed=false;//是否杀过
	for(i in roles) {
		rolesLive[i] = true; //默认玩家存活
		var liveState; //当前玩家存活状态
		liveState = (rolesLive[i] && "活") || "死";
		console.log(parseInt(i) + 1 + "号" + liveState)
	}
function initRoleList() { //初始化角色列表
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
			role.className = "role";
			role.append(roleInfo);
			role.append(tool);
			$("#roleList").append(role);
		}
	}
	function showTitle(title) { //显示主题
		$("title").text(title);
		$("#title").text(title);
	}
    function hideKill(){//隐藏杀人按钮
    	$(".role").hover(function(){
    		$(this).find(".tool-kill").hide();
    	},function(){
    		$(this).find(".tool-kill").hide();
    	})
    }
    function changeToDie(roleState){//状态变死亡
		$(".role").click(function(){
			$roleName=$(this).find(".role-name");
			if(roleState=="杀手杀人"){
				if($roleName.text()=="杀手"){
					alert("坑货！不能杀自己人！");
				}else {
					var i=$(this).find(".role-num").text();
					rolesLive[parseInt(i)-1]=false;
					localStorage.setItem("deadNum",i);//将死者号码存入本地
					console.log(i+"号死了！");
					$roleName.css("background-color","#83b09a").css("color","#fff");
				}
			}
		});
    	
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
				break;
			case "玩家投票":
				showTitle("投票");
				$("#operate").text("确定");
				changeToDie(roleState);
				break;
			default:
				alert("程序故障，请联系开发人员！");
				break;
		}
	}
	initRoleList(); //初始化角色列表 
	roleAndState() //根据不同身份做出响应
	console.log(roles.length);
	$("#operate").click(function() {
		location.href = "libretto.html";
	})
})