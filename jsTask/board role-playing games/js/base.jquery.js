//页面通用js文件
$(document.ready=function(){
	$("#back").click(function(){//返回按钮
		history.back();
	})
	$("#close").click(function() { //点击关闭按钮跳回主页
		location.href = "home.html";
	})
	$("#help").click(function(){//帮助按钮
		location.href = "help.html";
	})
	$("#set").click(function(){//设置
		location.href = "set.html";
	})
	$("#about").click(function(){//关于
		location.href = "about.html";
	})
	$("#notice").click(function(){//公告
		location.href = "notice.html";
	})
	localStorage.setItem("history",$("title").text());//将页面标题存入本地
})