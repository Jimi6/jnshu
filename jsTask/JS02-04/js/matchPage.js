//返回按钮
var back=document.getElementById("back");
back.onclick=function (){
	window.history.back();
}

//获取玩家总人数输入框
var playersNumber=document.getElementById("playersNumber");
//玩家总人数
var sumNumber=playersNumber.value;
//杀手人数
var killerNumber=Math.floor(sumNumber/4);
//平民人数
var civilianNumber=sumNumber-killerNumber;
//设置角色

//角色存放数组
var roles=[];

//角色数组赋值
function rolesCreate(){
	roles.length=0;
	
	for(var i=0;i<killerNumber;i++){
		roles.push("杀&emsp;手");
	}
	for(var j=0;j<civilianNumber;j++){
		roles.push("平&emsp;民");
	}
}

//数组乱序（洗牌）
//function shuffle(arr){
//	var arr2=[];
//	var temp=Math.floor(Math.random()*arr.length);
//	return arr2;
//}
//获取角色匹配结果模块标签
var matchResult=document.getElementById("matchResult");
//获取设置按钮
var setRole=document.getElementById("setRole");
setRole.onclick=function (){
	console.log("玩家总人数"+sumNumber);
	console.log("杀手人数"+killerNumber);
	console.log("平民人数"+civilianNumber);
	rolesCreate();
	//数组乱序
	roles.sort(function(a,b){return Math.random()>.5?-1:1;});
	for(var n in roles){
		console.log(n+"号是："+roles[n]);
	}
	//玩家匹配结果数组
	var rolesResult=[];
	for(var m in roles){
		rolesResult[m]=m+"号&emsp;"+roles[m];
	}
	matchResult.innerHTML='<ul><li><i class="square"></i>' + rolesResult.join('</li><li><i class="square"></i>') + '</li></ul>';
	
}
