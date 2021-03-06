//翻牌页
$(function() {
	function illegal(){//未进行玩家配比进入页面处理
		if(confirm("玩家配比后才可进行游戏，前往配比？")){
			location.href="matchPage.html";
		}else {//返回主页，后期考虑改成直接关闭页面。
			alert("玩家未配比不能继续游戏!");
			location.href="home.html";
		}
	}
    var roles=JSON.parse(sessionStorage.getItem("roles"))||illegal();//  var roles=JSON.parse(localStorage.getItem("roles"))||illegal();//获取角色数组，若非法进入游戏则先行玩家配比
	var words=JSON.parse(sessionStorage.getItem("words"));//获取玩家词组//	var words=JSON.parse(localStorage.getItem("words"));//获取玩家词组
	var look = false; //角色查看状态
	var complete = false; //所有玩家完成查看
	var num = 1; //玩家编号
	function showBackFace() { //显示背面
		$("#role .backface").show(); //	显示背面信息     $("#role .backface").fadeIn(1000);//背面淡入
		$("#role .front").hide(); //隐藏正面信息
		$("#look").text("查看" + num + "号身份"); //改变按钮信息
		$("#roleNum").text(num); //显示玩家编号
	}

	function showFront() { //显示正面
		$("#role .backface").hide(); //	隐藏背面
		$("#role .front").show(); //显示正面    $("#role .front").fadeIn(1000)//淡入正面
		$("#roleNum").text(num); //玩家编号信息
		$("#identify").text("角色：" + roles[num - 1]); //玩家身份信息
		var word = (roles[num] == "平民") ? words[0] : words[1];
		$("#words").text("词组：" + word); //玩家词组。      效果等同于下句注释
		//if(roles[num] == "杀手") { //杀手词组 $("#words").text("词组：" + words[0]);} else { //平民词组$("#words").text("词组：" + words[1]);}
	}
	$("#look").click(function() { //点击按钮
		if(complete) { //检若所有玩家完成查看；则跳转至法官日志页
			location.href = "judge.html";
		} else {
			if(look) { //若已查看，则显示背面
				showBackFace(); //显示正面
				look = !look; //改变查看状态
			} else { //若还未查看，则显示身份信息；
				showFront();
				if(num == roles.length) { //已查看至最后一个玩家，即读取角色数组最后1个元素值。
					$("#look").text("法官查看"); //改变按钮信息
					complete = !complete; //改变所有角色完成状态为：完成。
				} else {
					$("#look").text("隐藏并传给" + (++num) + "号"); //传递给下1号玩家
				}
				look = !look; //改变查看状态
			}
		}
	})
	showBackFace(); //页面加载默认显示背面
})