//页面通用js文件
$(function(){
	$("#back").click(function(){//返回按钮
		history.back();
	})
	$("#close").click(function() { //点击关闭按钮跳回主页
		location.href = "home.html";
	})
	$(".jump").click(function(){//跳转到和ID名相同的页面
		location.href=$(this).attr("id")+".html";
	})
	localStorage.setItem("history",$("title").text());//将页面标题存入本地
})