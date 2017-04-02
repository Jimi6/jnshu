//法官台本
$(window).load(function() { //	JSON.parse(a);JSON.stringify(b)
	var state = "杀手杀人" //初始化游戏状态
	var states=["杀手杀人","亡灵发表遗言","玩家依次发言","全民投票"];
	var jump = false; //是否跳转至投票页
//	localStorage.clear("progress");
//localStorage.clear("state");
	var progress=JSON.parse(localStorage.getItem("progress"))||{"daily":1,"dailyState":"白天","step":1};//获取当前游戏时间段及游戏步骤，初始为第1天白天第1步
	function loadPage(){//载入页面
		var mainHTML="";
		for(var i=0;i<progress.daily;){
			mainHTML+='<div class="gameState"><h3 class="date">第'+(++i)+'天</h3><div class="detail"><div class="night"><div class="icon"></div><button class="btn btn-step"><i></i>杀手杀人</button></div><div class="day"><div class="icon"></div><button class="btn btn-step"><i></i>亡灵发表遗言</button><button class="btn btn-step"><i></i>玩家依次发言</button><button class="btn btn-step"><i></i>全民投票</button></div></div></div>'	
		}
		$("#main").html(mainHTML);
		var num=parseInt(progress.step)-1;
		$(".btn-step:lt("+num+")").removeClass("btn-step");
	}
	
	loadPage();
    var gameState={toggle:function($this){
    	state = localStorage.getItem("state") || state//从本地存储获取当前游戏状态，若无存储则不获取。
		switch(state) {
			case states[0]:
				localStorage.setItem("state",states[1]);
				localStorage.setItem("roleState",state);
				progress.step++;
				localStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				{location.href="judge.html"}
				break;
			case states[1]:
				localStorage.setItem("state", states[2]);
				confirm("请死者亮明身份并发表遗言");
				$this.removeClass("btn-step");//改变步骤完成状态
				progress.step++;
				localStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				break;
			case states[2]:
				localStorage.setItem("state", states[3]);
				confirm("玩家依次发言讨论");
				$this.removeClass("btn-step");//改变步骤完成状态
				progress.step++;
				localStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				break;
			case states[3]:
				localStorage.setItem("state", states[0]);
				localStorage.setItem("roleState",state)
				progress.daily++;
				progress.step++;
				localStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				{location.href="judge.html"}
				break;
			default:
				console.log("无效状态！");
				localStorage.setItem("state", "无效状态！");
				break;
		}
		$this.removeClass("btn-step");
    }}
    
	$(".btn.btn-step").click(function() {
		var $this = $(this);
		gameState.toggle($this);//切换游戏状态
	})

	$("#gameover").click(function() {
		location.href = "home.html";
	})
	$("#notes").click(function() {
		localStorage.setItem("roleState","法官日志");
		location.href = "judge.html";
	})
})