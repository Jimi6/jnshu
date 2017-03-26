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
var sum;
//杀手人数
var killerNumber;
//平民人数
var civilianNumber;
//杀手数组
var killers=[];

//平民数组
var civilian=[];
//角色存放数组
var roles = [];
//显示结果HTMl
var resultHTML="";

//点击增/减按钮发生的动作
function sumChange(x) {
	sum += x;
//总人数大于18时，置为18；小于4时，置为4；	
//	if(sum > 18) {
//		sum = 18;
//	} else if(sum < 4) {
//		sum = 18;
//	}
	sum=(sum>18&&18)||(sum<4&&4)||sum;
	getSum.value = sum;
	getRange.value = getSum.value;
}

//点击增加按钮值加1；
getIncrease.onclick = function() {
	var x = 1;
	sumChange(x);
}
//点击减少按钮值减1;
getReduce.onclick = function() {
	var x = -1;
	sumChange(x);
}

//分配角色人数
function distribute() {
	sum = parseInt(getSum.value);
	killerNumber = Math.floor(sum / 4);
	civilianNumber = sum - killerNumber;
	console.log("玩家总人数" + sum);
	console.log("杀手人数" + killerNumber);
	console.log("平民人数" + civilianNumber);
}

//角色数组赋值
function rolesCreate() {
	distribute();
	killers.length=0;
	civilian.length=0;
	roles.length=0;
	for(var i = 0; i < killerNumber; i++) {
		killers.push("杀&emsp;手");
	}
	for(var j = 0; j < civilianNumber; j++) {
		civilian.push("平&emsp;民");
	}
//	组合杀手数组和平民数组给角色数组
	roles=killers.concat(civilian);
}
//匹配结果显示区域
function showHTML(){
	matchResult.innerHTML=resultHTML;	
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
	resultHTML = '<ul><li><i class="square"></i>' + rolesResult.join('</li><li><i class="square"></i>') + '</li></ul>';
	showHTML();
}


//点击返回按钮，返回上一页
back.onclick = function() {
	window.history.back();
}
getSetBtn.onclick=setRole;

//总人数获取焦点执行
getSum.onfocus = function() {
	rolesCreate();
	resultHTML = '<ul>	<li><i class="square"></i>' + '杀&emsp;手' + killerNumber + '人' + '</li><li><i class="square"></i>' + '平&emsp;民' + civilianNumber + '人' + '</li></ul>';
     showHTML();
}
window.onload = function() {
	rolesCreate();
	resultHTML = '<ul>	<li><i class="square"></i>' + '杀&emsp;手' + killerNumber + '人' + '</li><li><i class="square"></i>' + '平&emsp;民' + civilianNumber + '人' + '</li></ul>';
	showHTML();
}

deal.onclick = function() {
	window.location.href = "draw.html";
}