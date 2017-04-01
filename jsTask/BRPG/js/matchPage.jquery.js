//JQuery实现
$(function(){//页面载入时，$(document).ready(function(){})
	var killers = []; //杀手数组
	var civilians = []; //平民数组
	var roles = []; //角色存放数组
	var matched=false;//配比状态
	function rolesCreate() { //角色数组初始化
		var sum = parseInt($("#sum").val()); //获取总人数
		var killersNum = Math.floor(sum / 4); //杀手人数
		var civiliansNum = sum - killersNum; //平民人数
		console.log("玩家总人数：" + sum + "杀手人数：" + killersNum + "平民人数：" + civiliansNum);
		roles.length = civilians.length = killers.length = 0; //清空数组		killers.length = 0;civilians.length = 0;roles.length = 0;
		for(var i = 0; i < killersNum; i++,killers.push("杀手"));//此句效果等同于for(var i = 0; i < killersNum; i++){killers.push("杀手");}
		for(var j = 0; j < civiliansNum; j++,civilians.push("平民")); 
		roles = killers.concat(civilians); //	组合杀手数组和平民数组给角色数组
	}

	function showRole() { //	显示各角色人数
		rolesCreate();
		$("#matchResult").html('<ul><li><i class="square2"></i>' + killers[0] + killers.length + '人' + '</li><li><i class="square"></i>' + civilians[0] + civilians.length + '人' + '</li></ul>');//显示具体角色人数
	}

	function sumChange(x) { //点击增/减按钮发生的动作
		var sum = parseInt($("#sum").val()); //获取总人数
		sum += x;
		$("#sum").val(sum);
		$("#range").val(sum);
		checkNum();
		showRole();
		matched=false;
	}

	function checkNum() { //检查玩家人数是否符合要求(4-18)；并进行重置和提示。
		var sum = parseInt($("#sum").val()); //获取总人数
		var max = 18; //	最大数
		var min = 4; //最小人数
		$("#tip").html((sum > max && "最多支持" + max + "人同时游戏！") || (sum < min && "亲！至少" + min + "个人才能进行游戏哦！") || "可以配比玩家！");//效果参照下句注释
		$("#sum").val(sum = (sum > max && max) || (sum < min && min) || sum); //	输入框和滑块值等于sum；超过最大则等于最大，小于最小则等于最小；
		//sum = (sum > max && max) || (sum < min && min) || sum  此句效果等同于   
		//if(sum>max){sum=max;}else if(sum<min){sum=min;}else{sum=sum;}
		$("#range").val($("#sum").val()); //滑块值等于输入框值
	}
	$("#sum").bind("input propertychange", function() { //数字输入框输入时执行。效果等同于原生oninput
		$("#range").val($("#sum").val()); //	滑块值=输入框值
		showRole();
		matched=false;//配比状态设为否
	}).blur(function() { //输入框失去焦点时检查输入是否合法,并显示角色配比人数
		checkNum();
		showRole();
	})
	$("#match").click(function setRole() { //点击设置具体角色
		$("#matchResult ul li").remove();//	清空配比结果内容  $("#matchResult").html("");//		var roleList = $("<ul></ul>"); //	创建角色列表标签
		rolesCreate();
		roles.sort(function(a, b) { return Math.random() > .5 ? -1 : 1; }); //数组乱序
		for(var m in roles) {
			var roleTag = $("<li></li>"); //		创建角色整体标签
			var content = $("<span></span>").html((parseInt(m) + 1) + "号:" + roles[m]); //		创建角色内容标签  此句效果等同于  var content = $("<span>"+(parseInt(m) + 1) + "号:" + roles[m]+"</span>") 
			var square = $("<i></i>").addClass((roles[m] == killers[0] && "square2") || "square"); //		创建正方形图标标签。如果是杀手，i标签的类名是"square2",平民则为"square"。                             添加类名 方法一：addClass 方法二.attr("class", (roles[m] == killers[0] && "square2") || "square")
			$("#matchResult ul").append(roleTag.append(square).append(content)); //			roleList.append(role.append(square).append(content)); //添加正方形,内容至角色标签后;添加角色至角色列表标签后。
			console.log(content.html()); //控制台打印角色配比内容
		}//		$("#matchResult").append(roleList); //	设置玩家后显示内容
		matched=!matched;//配比状态设为是
		$("#tip").text("完成配比！");
	})
	//点击增加按钮值加1；
	$("#increase").click(function() {
		sumChange(1);
	})
	$("#reduce").click(function() { //点击减少按钮值减1;
		sumChange(-1);
	})
	//滑动滑块时
	$("#range").change(function() { //	数字输入框至等于滑块值。
		$("#sum").val($("#range").val()); //	$("#sum").attr("value", $("#range").val());此句输入框输入后再滑动滑块不生效；不知何故
		showRole(); //显示角色人数
		matched=false;
		$("#tip").text("可以配比玩家!");
	})
	$("#back").click(function() { history.back();}) //返回上一页;若无访问历史，则无反应
	$("#deal").click(function() { //去发牌按钮
		var $word=$(".playerWrods");//获取用户词组输入框
		var words=[$word.length];//玩家词组
		var wordInput=true;//玩家词组设置状态
		if(matched){//检测配比状态
			for(var i=0;i<$word.length;i++){
				if($word[i].value==""){//检测玩家词组设置状态
					wordInput=false;
					$("#tip").text("请先设置"+$word[i].placeholder);//玩家词组若未设置完成，给出提示
				}else{
					wordInput=true;
				}
				words[i]=$word[i].value;
				console.log($word[i].placeholder+"："+$word[i].value);
			}
			if(wordInput){
				location.href = "draw.html"; 
				localStorage.setItem("roles",roles);//将玩家配比信息存入本地存储
				localStorage.setItem("words",words);//将玩家词组信息存入本地存储
			}
		}else{
			$("#tip").text("请先配比角色，才能发牌！");
		}
	}) //发牌按钮跳转
	showRole();////页面载入时，显示默认玩家配置信息
})
