//法官台本
$(function() { //	JSON.parse(a);JSON.stringify(b)
	var currentState = "杀手杀人" //初始化游戏状态
//	var initHTML=$("#main").html();//获取初始主体内容
//localStorage.clear("day");
//localStorage.clear("step");
	var jump = false; //是否跳转至投票页
	var progress={"day":localStorage.getItem("day")||1,"step":localStorage.getItem("step")||1};//获取当前游戏进度
	function loadPage(){//载入页面
		var mainHTML="";
		for(var i=0;i<progress.day;){
			mainHTML+='<div class="gameState"><h3 class="date">第'+(++i)+'天</h3><div class="detail"><div class="night"><div class="icon"></div><button class="btn btn-step"><i></i>杀手杀人</button></div><div class="day"><div class="icon"></div><button class="btn btn-step"><i></i>亡灵发表遗言</button><button class="btn btn-step"><i></i>玩家依次发言</button><button class="btn btn-step"><i></i>全民投票</button></div></div></div>'	
		}
		$("#main").html(mainHTML);
		$(".btn-step:lt["+progress.step+"]").removeClass("btn-step");
	}
	
	loadPage();
	
	
	
	
	
//	var mainHTML =localStorage.getItem("mainHTML")//从本地存储获取游戏内容
//	$("#main").html(mainHTML||initHTML);//获取发生改变后的游戏内容
	function toggleGameState($this) { //游戏进行状态切换
		currentState = localStorage.getItem("currentState") || currentState; //从本地存储获取当前游戏状态，若无存储则不获取。
		var $clone = $this.parents(".gameState").clone(true); //复制当前按钮父标签的游戏状态模块
		switch(currentState) {
			case "杀手杀人":
				localStorage.setItem("身份", "杀手");
				localStorage.setItem("currentState", "亡灵发表遗言");
				localStorage.setItem("roleState",currentState);
				location.href="judge.html";
				break;
			case "亡灵发表遗言":
				localStorage.setItem("currentState", "玩家依次发言");
				confirm("请死者亮明身份并发表遗言");
				break;
			case "玩家依次发言":
				localStorage.setItem("currentState", "玩家投票");
				confirm("玩家依次发言讨论");
				break;
			case "玩家投票":
				$("#main").append($clone); //复制1份游戏进度内容
				mainHTML = $this.parents("#main").html(); //获取当前主体内容
				localStorage.setItem("身份", "普通玩家");
				localStorage.setItem("currentState", "杀手杀人");
				localStorage.setItem("roleState",currentState)
				localStorage.setItem("mainHTML", mainHTML);
				console.log(mainHTML);
				progress.day++;
				localStorage.setItem("day",progress.day);
				location.href="judge.html";
				break;
			default:
				console.log("无效状态！");
				localStorage.setItem("currentState", "无效状态！");
				break;
		}
		localStorage.setItem("step",++progress.step);
		$this.removeClass("btn-step");
		console.log(currentState);
	}
	$(".btn-step").click(function() {
		var $this = $(this);
		toggleGameState($this); //执行代码并切换游戏状态
	})

	$("#gameover").click(function() {
		location.href = "home.html";
	})
	$("#notes").click(function() {
		localStorage.setItem("roleState","法官日志");
		location.href = "judge.html";
	})

	//	if(today.state.vote){//若完成一天，进入下一天，重置今日游戏状态
	//		today={"today":state};
	//	}

})