$(document.ready = function() {
	localStorage.setItem("history",$("title").text());//将页面标题存入本地
	function jumpurl() { 
		window.location.href = "home.html";
	}
	setTimeout(jumpurl, 3000);//冷启动页面3秒后跳转至主页
})