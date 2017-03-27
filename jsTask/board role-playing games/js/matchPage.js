//原生javascript实现
var back = document.getElementById("back"); //返回按钮
var getSum = document.getElementById("sum"); //获取玩家总人数输入框
var tip = document.getElementById("tip"); //获取提示区
var getIncrease = document.getElementById("increase"); //获取增加按钮
var getReduce = document.getElementById("reduce"); //获取减少按钮
var getRange = document.getElementById("range"); //获取滑动条
var getSetBtn = document.getElementById("set"); //获取设置按钮
var matchResult = document.getElementById("matchResult"); //获取角色匹配结果模块标签
var deal = document.getElementById("deal"); //点击发牌按钮，跳转至翻牌页面
var killers = []; //杀手数组
var civilians = []; //平民数组
var roles = []; //角色存放数组
var sum = parseInt(getSum.value);

function sumChange(x) { //点击增/减按钮发生的动作
	sum += x;
	getSum.value = sum;
	getRange.value = getSum.value;
	checkNum();
}

function inputChange() {
	//	getSum.value=getSum.value.replace(/\D/g, '');
	//	checkNum();
	getRange.value = getSum.value;
	showRole();
}

function checkNum() { //检查玩家人数是否符合要求(4-18)；并进行重置和提示。
	var maxNum = 18; //最大人数
	var minNum = 4; //最小人数
	//	if(sum>maxNum){
	//		tip.innerHTML="亲！本游戏最多支持"+maxNum+"人哦！建议分队进行！";
	//		sum=maxNum;
	//	}else if(sum<minNum){
	//		tip.innerHTML="亲！至少"+minNum+"个人才能进行游戏哦！";
	//		sum=minNum;
	//	}else{
	//		tip.innerHTML="亲！你所选择的玩家人数为"+sum+"人。设置后可进行游戏！";
	//		sum=sum;
	//	}
	//以下2句效果同上if语句；
	tip.innerHTML = (sum > maxNum && "最多支持" + maxNum + "人同时游戏！") || (sum < minNum && "亲！至少" + minNum + "个人才能进行游戏哦！") || "配比玩家后进行游戏！";
	sum = (sum > maxNum && maxNum) || (sum < minNum && minNum) || sum;
	getSum.value = sum;
	getRange.value = getSum.value;
}

function rolesCreate() { //角色数组初始化
	var killersNum = Math.floor(sum / 4);
	var civiliansNum = sum - killersNum;
	console.log("玩家总人数" + sum);
	console.log("杀手人数" + killersNum);
	console.log("平民人数" + civiliansNum);
	killers.length = 0;
	civilians.length = 0;
	roles.length = 0;
	for(var i = 0; i < killersNum; i++) {
		killers.push("杀手");
	}
	for(var j = 0; j < civiliansNum; j++) {
		civilians.push("平民");
	}
	roles = killers.concat(civilians); //	组合杀手数组和平民数组给角色数组
}
//显示角色各自人数
function showRole() {
	rolesCreate();
	matchResult.innerHTML = '<ul><li><i class="square2"></i>' + killers[0] + killers.length + '人' + '</li><li><i class="square"></i>' + civilians[0] + civilians.length + '人' + '</li></ul>';
}

function setRole() { //设置角色
	matchResult.innerHTML = ""; //	清空配比结果内容
	var rolesResult = []; //玩家匹配结果数组
	var roleList = document.createElement("ul"); //	创建角色列表标签
	rolesCreate();
	roles.sort(function(a, b) { return Math.random() > .5 ? -1 : 1; }); //数组乱序
	for(var m in roles) {
		var role = document.createElement("li"); //		创建角色整体标签
		var content = document.createElement("span"); //		创建角色内容标签
		content.innerHTML = parseInt(m) + 1 + "号:" + roles[m];
		console.log(content.innerHTML);
		var square = document.createElement("i"); //		创建正方形图标标签
		square.className = (roles[m] == killers[0] && "square2") || "square"; //如果是杀手，i标签的类名是"square2",平民则为"square"；
		role.appendChild(square); //		添加正方形标签至角色标签后
		role.appendChild(content); //添加内容标签至角色标签后
		roleList.appendChild(role); //添加角色标签至角色列表标签后
	}
	//	设置玩家后显示内容 resultHTML = '<ul><li><i class="square2"></i>' + rolesResult.join('</li><li><i class="square2"></i>') + '</li></ul>';
	matchResult.appendChild(roleList);
}
window.onload = showRole; //当页面加载时，显示默认玩家配比
back.onclick = function() { //点击返回按钮，返回上一页
	window.history.back();
}
getSum.oninput = inputChange; ////数字输入框输入时执行。onfocus，oninput,onchange，onblur。
//getSum.onpropertychange=inputChange;
getSum.onblur = function() {
	//	if (isNaN(parseInt(getSum.value))==false){
	//		tip.innerHTML="你输入的是数字！";
	//	}
	checkNum();
	showRole();
}
getSetBtn.onclick = setRole; //设置具体角色
getIncrease.onclick = function() { //点击增加按钮值加1；
	sumChange(1);
	showRole();
}
getReduce.onclick = function() { //点击减少按钮值减1;
	sumChange(-1);
	showRole();
}
getRange.onchange = function rangeChange() { //滑动滑块
	getSum.value = getRange.value;
	showRole();
}
deal.onclick = function() { //发牌按钮
	window.location.href = "draw.html";
}