/*
调用手写签名
需要文件
<link rel="stylesheet" href="css/jysvgsign.css" />
<script src="js/jysvgsign.js"></script>
页面调用
$(jysvgsign());
<div id="jysvgsign" data-size="size2"></div>
*/
/*-----手写签名-----*/
function jysvgsign(){
	var jysvgcon='<div class="hint">在这块区域内绘制你的手写签名</div><div class="svgbox"><svg id="outsvg" xmlns="http://www.w3.org/2000/svg"></svg></div><div class="btnbox"><div class="colorbtn"><button class="jy_title btn" data-title="颜色"><i class="icon_20"></i></button><div class="celect"><span>&ensp;颜色</span><br><button style=" background: #333333;"></button><button style=" background: #3399ff;"></button><button style=" background: #ffaa33;"></button><button style=" background: #00bb66;"></button><button style=" background: #ee5555;"></button><button style=" background: #772d00;"></button><button style=" background: #ff7799;"></button><button style=" background: #aaff33;"></button><button style=" background: #7744ee;"></button></div></div><div class="typebtn"><button class="jy_title btn" data-title="笔迹"><i class="icon_20"></i></button><div class="celect"><span>&ensp;笔迹</span><br><button data-btn="type1"><i class="icon_20" style="background-position: -200px -140px;"></i></button><button data-btn="type2"><i class="icon_20" style="background-position: -200px -160px;"></i></button></div></div><div class="sizebtn"><button class="jy_title btn" data-title="尺寸"><i class="icon_20"></i></button><div class="celect"><span>&ensp;尺寸</span><br><button><i style=" width: 2px; height: 2px;"></i></button><button><i style=" width: 4px; height: 4px;"></i></button><button><i style=" width: 6px; height: 6px;"></i></button><button><i style=" width: 8px; height: 8px;"></i></button><button><i style=" width: 10px; height: 10px;"></i></button></div></div><div class="undobtn"><button class="jy_title btn" data-title="撤销"><i class="icon_20"></i></button></div><div class="clearbtn"><button class="jy_title btn" data-title="清空"><i class="icon_20"></i></button></div></div>';
	$('#jysvgsign').append(jysvgcon);
	var svgele,context;
	svgele = document.getElementById('outsvg');
	var point = {x1:0,y1:0,bx1:0,by1:0,x2:0,y2:0,bx2:0,by2:0,drag:false,notFirst:false};
	svgele.addEventListener("mousedown", svgelemousedown);
	svgele.addEventListener("mousemove", svgelemousemove);
	document.addEventListener("mouseup", svgelemouseup);
	svgele.addEventListener("touchstart", svgeletouchdown);
	svgele.addEventListener("touchmove", svgeletouchmove);
	document.addEventListener("touchend", svgeletouchup);
	var svgX = new Array();
	var svgY = new Array();
	var svgDrag = new Array();
	var paint;
	
	function addClick(x, y, dragging) {
		svgX.push(x);
		svgY.push(y);
		svgDrag.push(dragging);
	}
	function svgelemousedown(e){
		/*e.stopPropagation();*/
		e.preventDefault();
		var mouseX = e.pageX - this.getBoundingClientRect().left - $(document).scrollLeft();
		var mouseY = e.pageY - this.getBoundingClientRect().top - $(document).scrollTop();
		paint = true;
		addClick(mouseX,mouseY);
		redraw();
		document.addEventListener("mousemove", outscreen);
	};
	function svgelemousemove(e){
		if (paint) {
			/*e.stopPropagation();*/
			e.preventDefault();
			var mouseX = e.pageX - this.getBoundingClientRect().left - $(document).scrollLeft();
			var mouseY = e.pageY - this.getBoundingClientRect().top - $(document).scrollTop();
			addClick(mouseX,mouseY, true);
			redraw(e);
		}
	};
	function svgelemouseup(e){
				point.x1 = svgX[svgX.length-1];
				point.y1 = svgY[svgY.length-1];
				point.x2 = svgX[svgX.length-1];
				point.y2 = svgY[svgY.length-1];
				point.drag = svgDrag.pop();
				svgpoints1.push('L'+point.x1+' '+point.y1);
				svgpoints2.push('L'+point.x2+' '+point.y2);
				var text2=svgpoints2.toString();
				var svgpoints2re = new Array();
				svgpoints2re=text2.split(',');
				svgpoints2re.reverse();
				$('#outsvg path[data-pos=active]').attr({
					'd':svgpoints1.concat(svgpoints2re).join(' ')
				});
		
		paint = false;
		$('#outsvg path').removeAttr('data-pos');
		svgX.splice(0,svgX.length);
		svgY.splice(0,svgY.length);
		svgpoints1.splice(0,svgpoints1.length);
		svgpoints2.splice(0,svgpoints2.length);
		point.notFirst = false;
		document.removeEventListener("mousemove", outscreen);
	};
	function svgeletouchdown(e){
		/*e.stopPropagation();*/
		e.preventDefault();
		var touch = e.targetTouches[0];
		var mouseX= touch.pageX - this.getBoundingClientRect().left - $(document).scrollLeft();
		var mouseY = touch.pageY - this.getBoundingClientRect().top - $(document).scrollTop();
		paint = true;
		addClick(mouseX,mouseY);
		redraw();
	};
	function svgeletouchmove(e){
		if (paint) {
			/*e.stopPropagation();*/
			e.preventDefault();
			var touch = e.targetTouches[0];
			var mouseX= touch.pageX - this.getBoundingClientRect().left - $(document).scrollLeft();
			var mouseY = touch.pageY - this.getBoundingClientRect().top - $(document).scrollTop();
			addClick(mouseX,mouseY, true);
			redraw(e);
		}
	};
	function svgeletouchup(e){
				point.x1 = svgX[svgX.length-1];
				point.y1 = svgY[svgY.length-1];
				point.x2 = svgX[svgX.length-1];
				point.y2 = svgY[svgY.length-1];
				point.drag = svgDrag.pop();
				svgpoints1.push('L'+point.x1+' '+point.y1);
				svgpoints2.push('L'+point.x2+' '+point.y2);
				var text2=svgpoints2.toString();
				var svgpoints2re = new Array();
				/*var svgpoints3=new Array();
				svgpoints3.push('c'+'5 0 5 -10 0 -10');*/
				svgpoints2re=text2.split(',');
				svgpoints2re.reverse();
				//svgpoints3.push('q50 50 10 -10 t0 -500');
				$('#outsvg path[data-pos=active]').attr({
					'd':svgpoints1.concat(/*svgpoints3,*/svgpoints2re).join(' ')
				});
		
		paint = false;
		$('#outsvg path').removeAttr('data-pos');
		svgX.splice(0,svgX.length);
		svgY.splice(0,svgY.length);
		svgpoints1.splice(0,svgpoints1.length);
		svgpoints2.splice(0,svgpoints2.length);
		point.notFirst = false;
	};
	function outscreen(e){
		var screentop=svgele.parentNode.getBoundingClientRect().top;
		var screenbottom=svgele.parentNode.getBoundingClientRect().bottom;
		var screenleft=svgele.parentNode.getBoundingClientRect().left;
		var screenright=svgele.parentNode.getBoundingClientRect().right;
		if(drawmt(e).x<screenleft || drawmt(e).x>screenright || drawmt(e).y<screentop || drawmt(e).y>screenbottom){
			svgelemouseup();
			svgeletouchup();
		};
	};
	document.addEventListener("mousedown", caculateSpeed);
	document.addEventListener("mousemove", caculateSpeed);
	document.addEventListener("touchstart", caculateSpeed);
	document.addEventListener("touchmove", caculateSpeed);
	var contextcolor='#333333';
	var svgpoints1 = new Array();
	var svgpoints2 = new Array();
	var movei=0;
	function redraw(e) {
		if(svgX.length==1){
			if (point.drag && point.notFirst) {
			} else {
				point.drag=true;
				point.x1 = svgX[0];
				point.y1 = svgY[0];
				point.notFirst = true;
				svgpoints1.push('M'+point.x1+' '+point.y1);
				var con=document.createElementNS("http://www.w3.org/2000/svg", "path");
				var $con=$(con);
				$con.attr({
					'data-pos':'active',
					'd':svgpoints1.join(' '),
					'fill':contextcolor,
					'style':'stroke-width: 0px;'
				});
				$('#outsvg').append($con);
			};
		}else{
			if(svgX.length==2){
				if (point.drag && point.notFirst) {
					//距离：勾股定理a^2+b^2=c^2
					var tempX = Math.pow(drawmt(e).x - pre.x, 2); //返回底数的指定次幂
					var tempY = Math.pow(drawmt(e).y - pre.y, 2);
					var dist = Math.sqrt(tempX + tempY); // 移动的距离
					if(dist==0){dist=1;};
			        //角度计算开始，余弦定理
			        var x_mouse = drawmt(e).x - pre.x; //x轴长度
			        var y_mouse = drawmt(e).y - pre.y; //y轴长度
					console.log(x_mouse+'##'+y_mouse+'##'+dist);
			        if(y_mouse<=0){
						pre.angle=-parseInt(Math.asin(x_mouse/dist)*180/Math.PI)+90;//上
			        }else{
			        	if(x_mouse<=0){
			        		pre.angle=270-parseInt(Math.acos(y_mouse/dist)*180/Math.PI);//下左
			        	}else{
			        		pre.angle=270+parseInt(Math.acos(y_mouse/dist)*180/Math.PI);//下右
			        	};
			        };
			        //角度计算结束
			        anglex=ms.y*Math.sin(pre.angle*Math.PI/180);
			        angley=ms.y*Math.cos(pre.angle*Math.PI/180);
					point.x1 = svgX[1]+anglex;
					point.y1 = svgY[1]+angley;
					point.bx1 = svgX[0]+anglex;
					point.by1 = svgY[0]+angley;
					point.x2 = svgX[0]-anglex;
					point.y2 = svgY[0]-angley;
					point.bx2 = svgX[0];
					point.by2 = svgY[0];
					svgpoints1.push('Q'+point.bx1+' '+point.by1+' '+point.x1+' '+point.y1);
					svgpoints2.push('Q'+point.x2+' '+point.y2+' '+point.bx2+' '+point.by2);
					var text2=svgpoints2.toString();
					var svgpoints2re = new Array();
					svgpoints2re=text2.split(',');
					svgpoints2re.reverse();
					$('#outsvg path[data-pos=active]').attr({
						'd':svgpoints1.concat(svgpoints2re).join(' ')
					});
				};
			}else{
				if(svgX.length>2){
					if (point.drag && point.notFirst) {
						point.x1 = svgX[svgX.length-2]+anglex;
						point.y1 = svgY[svgY.length-2]+angley;
						point.bx1 = svgX[svgX.length-2]-((svgX[svgX.length-1]-svgX[svgX.length-3])/10)+anglex;
						point.by1 = svgY[svgY.length-2]-((svgY[svgY.length-1]-svgY[svgY.length-3])/10)+angley;
						point.x2 = svgX[svgX.length-2]-anglex;
						point.y2 = svgY[svgY.length-2]-angley;
						point.bx2 = svgX[svgX.length-2]-((svgX[svgX.length-1]-svgX[svgX.length-3])/10)-anglex;
						point.by2 = svgY[svgY.length-2]-((svgY[svgY.length-1]-svgY[svgY.length-3])/10)-angley;
						point.drag = svgDrag.pop();
						var aa=point.bx1+' '+point.by1+' '+point.x1+' '+point.y1;
						if(aa.indexOf('NaN')>=0){return false}
						svgpoints1.push('S'+point.bx1+' '+point.by1+' '+point.x1+' '+point.y1);
						svgpoints2.push('S'+point.x2+' '+point.y2+' '+point.bx2+' '+point.by2);
						var text2=svgpoints2.toString();
						var svgpoints2re = new Array();
						svgpoints2re=text2.split(',');
						svgpoints2re.reverse();
						$('#outsvg path[data-pos=active]').attr({
							'd':svgpoints1.concat(svgpoints2re).join(' ')
						});
					};
				};
			};
		};
	};
	//检测鼠标速度
	var init = 0;
	var pre = { x: 0, y: 0, angle: 0, speed: 0, time: 0};
	var ms={x:0,y:0};
	var maxsize=6;
	var pentype='type1';
	var anglex=0;
	var angley=0;
	var degf=35;
	//检测鼠标开始
	function caculateSpeed(event) {
        // 初始化X,Y坐标
        if (init == 0) {
            init = 1;
            pre.x = drawmt(event).x;
            pre.y = drawmt(event).y;
            pre.time = new Date().getTime();
        }
		//距离：勾股定理a^2+b^2=c^2
		var tempX = Math.pow(drawmt(event).x - pre.x, 2); //返回底数的指定次幂
		var tempY = Math.pow(drawmt(event).y - pre.y, 2);
		var dist = Math.sqrt(tempX + tempY); // 移动的距离
        //角度计算开始，余弦定理
        var x_mouse = drawmt(event).x - pre.x; //x轴长度
        var y_mouse = drawmt(event).y - pre.y; //y轴长度
        if(y_mouse<=0){
			var m_angle=-parseInt(Math.asin(x_mouse/dist)*180/Math.PI)+90;//上
        }else{
        	if(x_mouse<=0){
        		var m_angle=270-parseInt(Math.acos(y_mouse/dist)*180/Math.PI);//下左
        	}else{
        		var m_angle=270+parseInt(Math.acos(y_mouse/dist)*180/Math.PI);//下右
        	};
        };
        //角度计算结束
        anglex=ms.y*Math.sin(m_angle*Math.PI/180);
        angley=ms.y*Math.cos(m_angle*Math.PI/180);
        pre.angle=m_angle;
        /*$('.ccc').text(pre.angle);
        anglex=10;
        angley=10;*/
		//速度计算
		var t = new Date().getTime() - pre.time;
		pre.speed = t > 0 ? dist / t*1000 : dist;
		// 记录X,Y坐标
	    pre.x = drawmt(event).x;
	    pre.y = drawmt(event).y;
	    pre.time = new Date().getTime();
		if(pentype=='type1'){
			var size=(((maxsize-1)*300)-pre.speed)/((maxsize-1)*300)*maxsize;
			if(size<=2){
				ms.y=2;
			}else{
				if(size>=maxsize){
					ms.y=maxsize;
				}else{
					ms.y=size;
				};
			};
		};
		if(pentype=='type2'){
			ms.y=maxsize;
		};
	};
	//接触坐标
	function drawmt(event){
		var mouse = event || window.event;
		if(event.clientX!=undefined){
			var mouse = event || window.event;
			return{
				x:event.clientX,
				y:event.clientY
			};
		}else{
			var touch = event.targetTouches[0];
			return{
				x:touch.pageX,
				y:touch.pageY
			};
		};
	};
	//几个颜色
	$(document).on('click','#jysvgsign .btn',function(){
		if($(this).parent().find('.celect').css('display')=='block'){
			$(this).parent().find('.celect').hide();
		}else{
			$('#jysvgsign .celect').hide();
			$(this).parent().find('.celect').show();
		};
	});
	$(document).on('click','#jysvgsign .celect button',function(){
		$('#jysvgsign .celect').hide();
	});
	$(document).on('click','#jysvgsign .colorbtn .celect button',function(){
		contextcolor=$(this).css('background-color');
	});
	$(document).on('click','#jysvgsign .typebtn .celect button',function(){
		pentype=$(this).attr('data-btn');
	});
	$(document).on('click','#jysvgsign .sizebtn .celect button',function(){
		maxsize=parseInt($(this).find('i').css('width'));
	});
	$(document).on('click','#jysvgsign .undobtn .btn',function(){
		$('#outsvg path').eq(-1).remove();
	});
	$(document).on('click','#jysvgsign .clearbtn .btn',function(){
		$('#outsvg path').remove();
	});
};
/*-----手写签名结束-----*/
