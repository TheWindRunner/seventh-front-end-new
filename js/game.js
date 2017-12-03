var canvas=document.getElementById("canvas");//JavaScript 使用 id 来寻找 canvas 元素:
	canvas.width=1366;
	canvas.height=768;
	//canvas 对象的属性 
	//不建议用css设置宽高(默认300*150的,css设置宽高画布会被拉伸)
	if(canvas.getContext("2d"))
	{
		var context=canvas.getContext("2d")
		//canvas.getContext("2d")，调用一个canvas对象的getContext()方法，传入的参数是2d
		//获得的一个“绘图环境”对象上并保存在变量中，利用这个接口去绘制路径、矩形、圆形、字符以及添加图像。
	}
	else{
		alert("当前浏览器不支持canvas")
	}
    //画炮台
     var angle=0;
     context.fillStyle="brown";
     context.fillRect(500,280,100,40);
     var left;
     var right;
     var ball=new Array();//创建小球数组
     for(var i=0;i<30;i++){
     	ball[i]=new Array();
     	ball[i][0]=500;//x
     	ball[i][1]=300;//y
     	ball[i][2]=0;//vx
     	ball[i][3]=0;//vy
     }
     var num=-1;//储存小球个数
     var timer2;
     var timer
     var block=false;//表示画面中是否有方块
     var blockv=0.5;
     var blockx=0;
     var blocky=0;//表示小块的纵坐标
     var count=0;
     var hit=false;
     var timer1;
     var code;
 //     $("#body").keydown(function(event){
			
	// 　})   
 //     //画小球
    context.beginPath();
	context.arc(500,300,30,0,2*Math.PI,false)
	context.fillStyle="orange";
	context.strokeStyle="transparent";		
	context.fill();
	context.closePath(); //画圆
     $("#body").keyup(function(event){
     	if(event.keyCode == 37){//是否维持惯性	
		             clearInterval(timer2)		        
					 angle=angle-Math.PI/50;
					 code=37;
			}
		if(event.keyCode==39){
			clearInterval(timer2)
			angle = angle + Math.PI / 50;
			code = 39;
		}           
     	if(event.keyCode==13){
     		num++;
     		clearInterval(timer2);
     		if(num>=30){
     			ball.splice(0,1);//超过30个球就删掉第一个球
     			num=29;
     			ball[29]=[500,300,0,0]
     		}
     		ball[num][0]+=100*Math.cos(angle);
     		ball[num][1]+=100*Math.sin(angle);
     		ball[num][2]=10*Math.cos(angle);//vx
     		ball[num][3]=10*Math.sin(angle);//vy
     		code=13;
     	}	
     	if(event.keyCode==40){
     		clearInterval(timer2)
     		code=40;
     		if(block==false){//画面中没有小块才能释放小块
     			hit=false;
     			clearInterval(timer);
	            block=true;        
	     		if(Math.random()<=0.75){//emm,偷偷调整难度
	     		   blocky=Math.random()*160;
	     		}
	     		else{
	     		   blocky=400+Math.random()*328;
	     		}//确定小块纵坐欧，取随机数
	     		blockx=0;
	     	}
	    }
 		timer2=setInterval(
 			function(){
					console.log(angle);
						for (j = 0; j <= num; j++) {
							context.clearRect(0, 0, canvas.width, canvas.height)
							if (ball[j][1] + ball[j][3] > canvas.height - 8) {
								ball[j][3] = -ball[j][3] * 0.5
							} //下边框
							if (ball[j][1] + ball[j][3] < 8) {
								ball[j][3] = -ball[j][3] * 0.5
							} //上边框
							if (ball[j][0] + ball[j][2] > canvas.width - 8) {
								ball[j][2] = -ball[j][2] * 0.8
							} //右边框
							if (ball[j][0] + ball[j][2] < 8) {
								ball[j][2] = -ball[j][2] * 0.8
							} //左边框
							ball[j][0] += ball[j][2]; //更新x值
							ball[j][1] += ball[j][3]; //更新y值
							ball[j][3] += 0.1; //更新vy值;
						}	
						if (block == true) {
							blockx = blockx + blockv;
							if (blockx >= 1370) {
								block = false;
								blockx = 0;
								alert("GG");
								if (count <= 5) {
									alert("辣鸡 ( ╯-_-)╯┴—┴")
								} else if (count <= 10) {
									alert("一般般 (￢_￢)")
								} else if (count <= 25) {
									alert("差强人意 ╮(๑•́ ₃•̀๑)╭")
								} else if (count <= 50) {
									alert("不错（๑￫‿ฺ￩๑）")
								} else {
									alert("你很棒哦 o(>ω<)o")
								}
								alert("你的得分是：" + count)
								location.reload() //刷新页面;
							}
						}   
 				    context.clearRect(0,0,1366,768)      		    
					if (block == true) {
						context.beginPath();
						context.fillStyle = "yellow";
						context.fillRect(blockx, blocky, 40, 40);
						context.closePath();
						context.fill()
					} //画方块
				     context.stroke();	
					if (hit == false) {
						for (h = 0; h <= num; h++) {
							if (ball[h][0]+8 > blockx && ball[h][0]-8 < blockx + 40 && ball[h][1]+8 > blocky && ball[h][1] -8< blocky + 40) {//边界触碰即可，不必中心点
								count++;
								hit=true;
								document.getElementById("score").value=count;
							}
						}
				     }
				     if(hit==true){
			              context.clearRect(blockx, blocky, 40, 40);
			              block=false;
				     }
				     for(i=0;i<=29;i++){			
					    context.beginPath();
					    context.fillStyle="blue";
					    context.arc(ball[i][0],ball[i][1],8,0,2*Math.PI ,true)
					    context.closePath();
					    context.fill();
					} //画球
					context.save();
					context.translate(500,300)
					context.rotate(angle);
					context.translate(-500,-300); 
					context.fillStyle="brown";
					context.fillRect(500,280,100,40)
					context.restore(); 	 
					context.closePath();//画炮台

					context.beginPath();
					context.arc(500,300,30,0,2*Math.PI,false)
					context.fillStyle="orange";
					context.strokeStyle="transparent";		
					context.fill();
					context.closePath(); //画圆；
				        },1)     	
})

