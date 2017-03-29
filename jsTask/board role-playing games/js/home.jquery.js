//			window.onload = function() {//点击“简化版”按钮跳转至玩家配比页
//				var game = document.getElementById("game-simple")
//				game.onclick = function() {
//					window.location.href = "matchPage.html";
//				}
//			}
$(document.ready = function() {
	var historyPage=localStorage.getItem("history");//获取历史记录标题
	$("#history .txt").text("游戏历史："+historyPage);
	$("#game-simple").click(function() { //点击“简化版”按钮跳转至玩家配比页
		location.href = "matchPage.html";
	})
	$("#history").click(function() { //暂未实现
		window.history.back();
	})
})