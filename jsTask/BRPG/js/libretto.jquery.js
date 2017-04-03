//法官台本
$(function() { //	JSON.parse(a);JSON.stringify(b)
	var state = "杀手杀人" //初始化游戏状态
	var states=["杀手杀人","亡灵发表遗言","玩家依次发言","全民投票"];
	var jump = false; //是否跳转至投票页
	var progress=JSON.parse(sessionStorage.getItem("progress"))||{"daily":1,"dailyState":"白天","step":1};//获取当前游戏时间段及游戏步骤，初始为第1天白天第1步
	function loadPage(){//载入页面
		var mainHTML="";
		for(var i=0;i<progress.daily;){
			mainHTML+='<div class="gameState"><h3 class="date">第'+(++i)+'天</h3><div class="detail"><div class="night"><div class="icon"></div><button class="btn btn-step"><i></i>杀手杀人</button></div><div class="day"><div class="icon"></div><button class="btn btn-step"><i></i>亡灵发表遗言<p class="byKilled"></p></button><button class="btn btn-step"><i></i>玩家依次发言</button><button class="btn btn-step"><i></i>全民投票</button></div></div></div>'	
		}
		$("#main").html(mainHTML);
		var num=parseInt(progress.step)-1;
		$(".btn-step:lt("+num+")").removeClass("btn-step");
	}
    var gameState={toggle:function($this){
    	state = sessionStorage.getItem("state") || state//从本地存储获取当前游戏状态，若无存储则不获取。
		switch(state) {
			case states[0]:
				sessionStorage.setItem("state",states[1]);
				sessionStorage.setItem("roleState",state);
				progress.step++;
				sessionStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				{location.href="judge.html"}
				break;
			case states[1]:
				sessionStorage.setItem("state", states[2]);
				confirm("请死者亮明身份并发表遗言");
				var byKilled=JSON.parse(sessionStorage.getItem("byKilled"))//获取当前被杀信息。
				$this.find(".byKilled").text(byKilled);
				$this.removeClass("btn-step");//改变步骤完成状态
				progress.step++;
				sessionStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				break;
			case states[2]:
				sessionStorage.setItem("state", states[3]);
				confirm("玩家依次发言讨论");
				$this.removeClass("btn-step");//改变步骤完成状态
				progress.step++;
				sessionStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				break;
			case states[3]:
				sessionStorage.setItem("state", states[0]);
				sessionStorage.setItem("roleState",state)
				progress.daily++;
				progress.step++;
				sessionStorage.setItem("progress",JSON.stringify(progress));//跳转页面前存入游戏状态
				{location.href="judge.html"}
				break;
			default:
				console.log("无效状态！");
				sessionStorage.setItem("state", "无效状态！");
				break;
		}
		$this.removeClass("btn-step");
    }}
   	loadPage();//更新页面
	$(".btn.btn-step").click(function() {
		var $this = $(this);
		gameState.toggle($this);//切换游戏状态
	})

	$("#gameover").click(function() {
		if(confirm("还没定出胜负，确定要结束游戏？")){
			location.href = "home.html";
		}
	})
	$("#notes").click(function() {
		sessionStorage.setItem("roleState","法官日志");
		location.href = "judge.html";
	})
})