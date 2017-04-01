//javascript实现                 本脚本适用于：任意总数格子，任意数量格子变色（不大于总格子数）；只需对应修改变色格子数变量changeNumber数值即可
var grids = document.getElementsByClassName("grid"); //将获取所有格子对象赋值给数组grids
var defaultColor = grids[0].style.backgroundColor; //获取格子默认颜色
var gridTemp = []; //创建数组,用于存放随机获取格子。等同于:var gridTemp=new Array;
var colorTemp = []; //创建数组，用于存放随机获取的颜色
var changeNumber = 3; //设置变色格子数变量
changeNumber = (changeNumber > grids.length) ? grids.length : changeNumber; //变色格子数若超过格子总数，则设为格子总数。//效果同此句：(changeNumber>grids.length)?changeNumber=grids.length:changeNumber=changeNumber;
function getGrid() { //随机获取不重复格子
	gridTemp.length = 0;
	do {
		var randomNumber = Math.floor(Math.random() * grids.length); //取格子总数范围内随机数
		if(gridTemp.indexOf(grids[randomNumber]) < 0) { //	将未取过的格子push至暂存数组gridTemp后面。
			gridTemp.push(grids[randomNumber]); //以下代码效果同上if代码段：(gridTemp.indexOf(grids[randomNumber]) < 0) &&gridTemp.push(grids[randomNumber]);
		}
	} while (gridTemp.length < changeNumber) //取够之前一直执行

}

function getColor() { //随机取不重复颜色，且不能是格子默认颜色。
	colorTemp.length = 0;
	do {
		var randomColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16); //		取随机颜色
		if((colorTemp.indexOf(randomColor) < 0) && (randomColor != defaultColor)) { //将未取过的颜色push到暂存数组colorTemp后；且该颜色不是格子默认颜色。
			colorTemp.push(randomColor);
		}
	} while (colorTemp.length < changeNumber)

}

function changeColor() { //所取格子变色
	getGrid();
	getColor();
	for(var j = 0; j < gridTemp.length; j++) {
		gridTemp[j].style.backgroundColor = colorTemp[j];
	}
}

function resetColor() { //重置所有格子颜色
	for(var i = 0; i < grids.length; grids[i++].style.backgroundColor = defaultColor); //效果等同	for(var i = 0; i < grids.length; i++) {//		grids[i].style.backgroundColor = defaultColor;//	}
}
var timer;
var getFlash = document.getElementById("flash"); //获取开始闪按钮
var getStop = document.getElementById("stop"); //获取结束闪按钮
getFlash.onclick = function flash() { //开始闪
	timer = setInterval(function() {
		resetColor();
		changeColor();
	}, 500);

}
getStop.onclick = function stop() { //结束闪
	clearInterval(timer);
	resetColor();
}