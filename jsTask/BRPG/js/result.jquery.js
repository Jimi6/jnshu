$(function(){
	var killers=JSON.parse(sessionStorage.getItem("killers"));
	var civilians=JSON.parse(sessionStorage.getItem("civilians"));
	var liveRole='剩余玩家：<span>杀  手'+killers.length+'人</span><span>平  民'+civilians.length+'人</span>'
	$("#liveRole").html(liveRole);
	var words=JSON.parse(sessionStorage.getItem("words"));
	var wordGroup='<div class="row"><span>平民词汇：'+words[0]+'</span></div><div class="row"><span>杀手词汇：'+words[1]+'</span></div>'
	$("#wordGroup").html(wordGroup);
	$("#result-txt").text(JSON.parse(sessionStorage.getItem("result")));//比赛结果
	var deadLog=JSON.parse(sessionStorage.getItem("deadLog"));
	for(var i=0;i<(deadLog.length/2);i++){
			var itemHTML='<div class="time-wrapper"><span class="date">第'+(i+1)+'天</span></div><p class="muted">晚上 : '+deadLog[i*2].killdeLog+'</p><p class="muted">白天：'+deadLog[i*2+1].killdeLog+'</p>'
			var listItem=document.createElement("li");
			listItem.className="list-group-item";
			listItem.innerHTML=itemHTML;
			$("#deadList").append(listItem);//将每日死亡记录插入列表
	}
	$("#btn-again").click(function(){
			location.href="matchPage.html";
	})
})
