//获取九宫格的格子,并赋值给数组grid
var grid = document.getElementsByClassName("grid");

//创建数组,用于存放3个随机获取格子
var gridTemp = [];
//创建数组，用于存放3个随机获取的颜色
var colorTemp=[];
//	取随机色
function randomColor() {
	return "#" + Math.floor(Math.random() * 256).toString();
}

//取0-8随机数
function randomNumber() {
	return Math.floor(Math.random() * 9);
}

//随机获取3个不重复格子
function getGrid() {
	gridTemp.length = 0;
	do {

		var temp = randomNumber();
		//	判断随机获取的格子是否存在数组gridTemp中,若不存在,就把获取的随机格子元素复制到其中.
		if(gridTemp.indexOf(grid[temp]) < 0) {
			gridTemp.push(grid[temp]);
		}
	}while (gridTemp.length < 3)
	
}
//随机取3个不重复且不是黄色的颜色

function getColor(){
	colorTemp.length=0;
	do{
		var temp=randomColor();
		if(colorTemp.indexOf(temp)<0&&temp!="#ffa500"){
			colorTemp.push(temp);
		}
	}while(colorTemp.length<3)
	
}
//改变所取3格子的颜色
function changeColor() {
	getGrid();
	getColor();
	for(var j = 0; j < gridTemp.length;j++) {
		gridTemp[j].style.backgroundColor = colorTemp[j];
	}
}
//重置所有格子颜色为初始颜色（黄色）
function resetColor() {
	for(var i = 0; i < 9; i++) {
		grid[i].style.backgroundColor = "orange";
	}
}
var t;
//开始闪
function flash(){
t=setInterval(function(){resetColor();changeColor();},1000);

	
}
//结束闪
function stop(){
	clearInterval(t);
	resetColor();
}
