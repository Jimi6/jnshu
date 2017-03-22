//将获取所有格子对象赋值给数组grids
var grids = document.getElementsByClassName("grid");
//获取格子默认颜色
var defaultColor = grids[0].style.backgroundColor;
//创建数组,用于存放随机获取格子。等同于:var gridTemp=new Array;
var gridTemp = [];
//创建数组，用于存放随机获取的颜色
var colorTemp = [];
//变色格数3
var changeNumber = 3;

//随机获取3个不重复格子
function getGrid() {
	gridTemp.length = 0;
	do {
		//取格子数(此处9)范围内随机数
		var randomNumber = Math.floor(Math.random() * grids.length);;
		//	判断随机获取的格子是否存在数组gridTemp中,若不存在,就把所取格子push其后。
		if(gridTemp.indexOf(grids[randomNumber]) < 0) {
			gridTemp.push(grids[randomNumber]);
		}
	} while (gridTemp.length < changeNumber) //取够之前一直执行

}
//随机取3个不重复且不是黄色的颜色

function getColor() {
	colorTemp.length = 0;
	do {
		//		取随机颜色
		var randomColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
		//若所取随机颜色不存在数组colorTemp中，在把索取颜色push到该数组后面，以此避免重复；同时所取颜色不能和默认颜色相同。	
		if((colorTemp.indexOf(randomColor) < 0) && (randomColor != defaultColor)) {
			colorTemp.push(randomColor);
		}
	} while (colorTemp.length < changeNumber)

}
//改变格子颜色
function changeColor() {
	getGrid();
	getColor();
	for(var j = 0; j < gridTemp.length; j++) {
		gridTemp[j].style.backgroundColor = colorTemp[j];
	}
}
//重置格子颜色
function resetColor() {
	for(var i = 0; i < grids.length; i++) {
		grids[i].style.backgroundColor = defaultColor;
	}
}
var timer;
//开始闪
function flash() {
	timer = setInterval(function() {
		resetColor();
		changeColor();
	}, 500);

}
//结束闪
function stop() {
	clearInterval(timer);
	resetColor();
}