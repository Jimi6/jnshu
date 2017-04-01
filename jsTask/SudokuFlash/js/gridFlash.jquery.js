//JQuery实现
$(document.ready = function() {
	var initColor = $(".grid:first").css("background-color"); //获取格子默认颜色
	var grids = $(".grid"); //将获取所有格子对象赋值给数组grids
	var gridArr = []; //创建数组,用于存放随机获取格子。等同于:var gridArr=new Array;
	var colorArr = []; //创建数组，用于存放随机获取的颜色
	var changeNum = 3; //设置变色格子数变量
	changeNum = (changeNum > grids.length) ? grids.length : changeNum; //变色格子数若超过格子总数，则设为格子总数。//效果同此句：(changeNum>grids.length)?changeNum=grids.length:changeNum=changeNum;
	function getGrid() { //随机获取不重复格子
		grids.sort(function(a,b){return Math.random()>.5?1:-1;})
		for(gridArr.length = 0;gridArr.length<changeNum;gridArr[gridArr.length]=grids[gridArr.length++]);//方法一：将格子数组grids乱序，然后取前3个元素给新数组。
/*		gridArr.length = 0;//方法二：从格子数组grids随机取3个未取过的格子，push到新数组gridArr后
		do {
			var randomNum = Math.floor(Math.random() * grids.length); //取格子总数范围内随机数；即所获取格子数组的下标
			if(gridArr.indexOf(grids[randomNum]) < 0) { //	将未取过的格子push至暂存数组gridArr后面。
				gridArr.push(grids[randomNum]); //以下代码效果同上if代码段：(gridArr.indexOf(grids[randomNum]) < 0) &&gridArr.push(grids[randomNum]);
			}
		} while (gridArr.length < changeNum) //取够之前一直执行              */
	}

	function getColor() { //随机取不重复颜色，且不能是格子默认颜色。
		colorArr.length = 0;
		do {
			var randomColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16); //		取随机颜色
			if((colorArr.indexOf(randomColor) < 0) && (randomColor != initColor)) { //将未取过的颜色push到暂存数组colorArr后；且该颜色不是格子默认颜色。
				colorArr.push(randomColor);
			}
		} while (colorArr.length < changeNum)

	}

	function changeColor() { //所取格子变色
		getGrid();
		getColor();
		for(var j = 0; j < gridArr.length; gridArr[j].style.backgroundColor = colorArr[j++]); //效果等同于		for(var j = 0; j < gridArr.length; j++) {//			gridArr[j].style.backgroundColor = colorArr[j];//		}
	}

	var timer; //声明定时器
	$("#flash").click(function() { //开始闪
		timer = setInterval(function() { //每隔500毫秒执行一次
			$(".grid").css("background-color", initColor); //重置所有格子颜色
			changeColor(); //改变选取格子颜色
		}, 500)
	})
	$("#stop").click(function() { //结束闪
		clearInterval(timer);
		$(".grid").css("background-color", initColor);;
	})

})