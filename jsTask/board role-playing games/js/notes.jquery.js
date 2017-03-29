//法官日记
$(document.ready=function(){
	$("#close").click(function(){
		location.href="home.html"
	})
	localStorage.setItem("history",$("title").text());//将页面标题存入本地
})
