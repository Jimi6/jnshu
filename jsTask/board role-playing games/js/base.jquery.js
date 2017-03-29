//页面通用js文件
$(document.ready=function(){
	$("#back").click(function(){//返回按钮
		history.back();
	})
	$("#close").click(function() { //点击关闭按钮跳回主页
		location.href = "home.html";
	})
	$("#help").click(function(){
		location.href = "help.html";
	})
	$("#set").click(function(){
		location.href = "set.html";
	})
	$("#about").click(function(){
		location.href = "about.html";
	})
	$("#notice").click(function(){
		location.href = "notice.html";
	})
})