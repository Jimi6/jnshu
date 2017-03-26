//返回按钮
var back = document.getElementById("back");
//获取玩家总人数输入框
var getSum = document.getElementById("sum");
//获取增加按钮
var getIncrease = document.getElementById("increase");
//获取减少按钮
var getReduce = document.getElementById("reduce");
//获取滑动条
var getRange = document.getElementById("range");

//获取设置按钮
var getSetBtn = document.getElementById("set");
//获取角色匹配结果模块标签
var matchResult = document.getElementById("matchResult");
//点击发牌按钮，跳转至翻牌页面
var deal = document.getElementById("deal");
//玩家总人数
var sum = parseInt(getSum.value);
//杀手人数
var killerNumber;
//平民人数
var civilianNumber;
//杀手数组
var killers = [];

//平民数组
var civilian = [];
//角色存放数组
var roles = [];
//显示结果HTMl
var resultHTML = "";

//点击增/减按钮发生的动作
function sumChange(x) {
	sum += x;
	//总人数大于18时，置为18；小于4时，置为4；	
	//	if(sum > 18) {
	//		sum = 18;
	//	} else if(sum < 4) {
	//		sum = 18;
	//	}
	sum = (sum > 18 && 18) || (sum < 4 && 4) || sum;
	getSum.value = sum;
	getRange.value = getSum.value;
}

//getSum.onfocus=function sumOnChange() {
//	sum = getSum.value;
//	sum = (sum > 18 && 18) || (sum < 4 && 4) || sum;
//	getSum.value = sum;
//	getRange.value = getSum.value;
//	showRole();
//}
getSum.onblur=function (){
sum = getSum.value;
	sum = (sum > 18 && 18) || (sum < 4 && 4) || sum;
	getSum.value = sum;
	getRange.value = getSum.value;
	showRole();	
}



//角色数组初始化
function rolesCreate() {
	sum = parseInt(getSum.value);
	killerNumber = Math.floor(sum / 4);
	civilianNumber = sum - killerNumber;
	console.log("玩家总人数" + sum);
	console.log("杀手人数" + killerNumber);
	console.log("平民人数" + civilianNumber);
	killers.length = 0;
	civilian.length = 0;
	roles.length = 0;
	for(var i = 0; i < killerNumber; i++) {
		killers.push("杀手");
	}
	for(var j = 0; j < civilianNumber; j++) {
		civilian.push("平民");
	}
	//	组合杀手数组和平民数组给角色数组
	roles = killers.concat(civilian);
}
//匹配结果显示区域
function showHTML() {
	matchResult.innerHTML = resultHTML;
}
//显示角色各自人数
function showRole() {
	rolesCreate();
	resultHTML = '<ul>	<li><i class="square2"></i>' + killers[0] + killers.length + '人' + '</li><li><i class="square"></i>' + civilian[0] + civilian.length + '人' + '</li></ul>';
	showHTML();
}

//设置角色
function setRole() {
	//玩家匹配结果数组
	var rolesResult = [];
	rolesCreate();
	//数组乱序
	roles.sort(function(a, b) { return Math.random() > .5 ? -1 : 1; });
	for(var m in roles) {
		console.log(m + "号是：" + roles[m]);
		rolesResult[m] = parseInt(m) + 1 + "号:" + roles[m];
	}
	//	设置玩家后显示内容
	resultHTML = '<ul><li><i class="square2"></i>' + rolesResult.join('</li><li><i class="square2"></i>') + '</li></ul>';
	showHTML();
}
//当页面加载时，显示默认玩家配比
window.onload = showRole();
//点击返回按钮，返回上一页
back.onclick = function() {
	window.history.back();
}

//设置具体角色
getSetBtn.onclick = setRole;

//点击增加按钮值加1；
getIncrease.onclick = function() {
	sumChange(1);
	showRole();
}
//点击减少按钮值减1;
getReduce.onclick = function() {
	sumChange(-1);
	showRole();
}

//滑动滑块
getRange.onchange=function rangeChange(){
	getSum.value=getRange.value;
}
//发牌按钮
deal.onclick = function() {
	window.location.href = "draw.html";
}
//window.onload = function() {
//	//监听总人数输入框	
//	if("\v" == "v") { //true为IE浏览器，感兴趣的同学可以去搜下，据说是现有最流行的判断浏览器的方法
//		getSum.attachEvent("onporpertychange", function(e) {
//			sumOnChange();
//		});
//	} else {
//		getSum.addEventListener("onporpertychange", function(e) {
//			sumOnChange();
//		});
//	}
//}

