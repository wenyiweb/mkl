//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';//资源文件地址
var filelist = ['images/bg.jpg','images/star.png','images/award.png','images/y1.png','images/y2.png','images/y3.png','images/y4.png','images/y5.png','images/y6.png','images/y7.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png','images/share.png'];
var audio;
var canv;
function fade(id,type,cb){
	var ele = document.querySelector(id);
	if(type == 'out'){
		ele.style.cssText += ';opacity:0;';
	}else if (type == 'in'){
		ele.style.cssText += ';opacity:0;';
		ele.style.display = 'block';
		setTimeout(function(){
			ele.style.cssText += ';opacity:1;';
		},10);
	}
	ele.addEventListener('webkitTransitionEnd',function(){
		if(type == 'out') {
			ele.style.display = 'none';
		}
		if(cb) cb();
		ele.removeEventListener('webkitTransitionEnd', arguments.callee);
	} ,false);
}
/**
 * 云层处理
 * @return {[type]} [description]
 */
function coverFn(){	
	$('.door-content').on('touchend',function(e){
		e.preventDefault();
		$('.yun-content .yun,.door-content .door,.huayuan').addClass('on');
		$('.huayuan').one('webkitTransitionEnd',function(){
			$('.yun-content,.door-content').hide();
			setTimeout(productFn,2000);
		})
	});
}

//产品页处理
function productFn(){
	$('.cover').addClass('out');
	$('.product').addClass('on');
	$('.product').one('webkitTransitionEnd',function(){
		$('.cover').hide();
		$(document).snowfall('clear');
	    $(document).snowfall({
	        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABLCAMAAAAI0lTNAAAC+lBMVEUAAABHGQBHGQBJGwNHGQBIGQFHGQBHGQBHGQBHGQBHGQBIGgFHGQBHGQBHGQBHGQDteGxHGQBHGQBHGQBHGQBIGQDm09L15+i7Xk9jLRbvhYP97PDzoK7jdGTFYk/99vfMcWdvNh763+T84NfzrLv2vrX98vPac2amY1766uv329+ibFZ7OSX79fX8+PjbipT16Onv6OX68fPx6+nq19bse3Xxtc/sgYL+8/b528zuoJr97/Dvr8rmemz+9vn1r7n98/bqo6DivanZn5nUlYr+9/f50tvmjov73eL1z9OqWTv9+fmgTDuQQy/Dd32hVEji0MH9+Pj87/KQZVZuMRzhhYGmW1b89vftgo70sbXwlpr99vjrhnv4xM/3wMvuh5Hzq7Tmmq798/bomK/0sbrba1vcbmDu1MX77uTngHPPbmvPZ1fYt5zTalnmgILRj4e+g37henTUkKHWd2rmpK+eTDioeGDfzsPf0sf37u/RvbSgTDn97vP+8vX+8fT+7/X97fL+7/P98/f96/H+8fb96O797fH85+350NP+7vH96vD96u775ez73uD95uv2xdr1tMr73+j84eX61eT4zd/619v84+f61OL5z+D72N762uf83+T3yd3619n1tbn0q7H0raz0paH95en5ys33vsL2ubj2trP1sa/zqK30pafymqD/8/b+8Pb84OL50eL61Nv2wtj60tb3wdL0r7T0qqjyl57xlprwjJjxkJXviZH61db2vM/4xcfzoqTvhon61+T72+D4zNv5z9D5zND2uc73v77xlabufXf72tv73dn1vtf5zdP51c/4x833wcf1sMXzpbzyoLfxlq7wkZ/zn57zm5v+7ev62OD849/0qcT2srXxnbHzoKnynaTympbufXz+8O763On73OH629752tPzs9L5xsr5z8j2t8T5ycL1sr3xm7jynq3vgYLvfWj/9Pj/8/T73+r73dT1rsjyorP1s6fxk4LvgXzuenP97eL85tv709D0ppfynYmkE61RAAAAfHRSTlMABQ4KFU8iTDIuGUAeEUhD/j02KSU5AxmLT/797tuknHBXQv79/crDdXFlXl1SRT8yKyEQCff09PLx7uvq5uXi2s++uq2srJKNi4R6eXBnZmNhTTUz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",
	        flakeCount:3,
	        minSize: 50,
	        maxSize: 82,
	        maxSpeed: 3,
	    });
	})
	/*fade('.product','in',function(){
		$('.product').addClass('on');
		$('.cover').hide();
	});*/
	/*$('.product').fadeIn('1000',function(){
		$('.product').addClass('on');
		$('.cover').hide();
	})*/
	$('.product .open').on('tap',function(){
		$(document).snowfall('clear');
		searchRose();
	});
	/*$('.product .tip .hand').one('webkitAnimationEnd',function(){
		$('.product .tip').fadeOut();
	});	*/
}
//寻找玫瑰
function searchRose(){
	

	var rosecount = 0;
	$('.product').addClass('out');
	$('.search-rose').addClass('on');
	$('.search-rose').one('webkitTransitionEnd',function(){
		$('.product').removeClass('on').hide();
		$(document).snowfall('clear');
	    $(document).snowfall({
	        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABLCAMAAAAI0lTNAAAC+lBMVEUAAABHGQBHGQBJGwNHGQBIGQFHGQBHGQBHGQBHGQBHGQBIGgFHGQBHGQBHGQBHGQDteGxHGQBHGQBHGQBHGQBIGQDm09L15+i7Xk9jLRbvhYP97PDzoK7jdGTFYk/99vfMcWdvNh763+T84NfzrLv2vrX98vPac2amY1766uv329+ibFZ7OSX79fX8+PjbipT16Onv6OX68fPx6+nq19bse3Xxtc/sgYL+8/b528zuoJr97/Dvr8rmemz+9vn1r7n98/bqo6DivanZn5nUlYr+9/f50tvmjov73eL1z9OqWTv9+fmgTDuQQy/Dd32hVEji0MH9+Pj87/KQZVZuMRzhhYGmW1b89vftgo70sbXwlpr99vjrhnv4xM/3wMvuh5Hzq7Tmmq798/bomK/0sbrba1vcbmDu1MX77uTngHPPbmvPZ1fYt5zTalnmgILRj4e+g37henTUkKHWd2rmpK+eTDioeGDfzsPf0sf37u/RvbSgTDn97vP+8vX+8fT+7/X97fL+7/P98/f96/H+8fb96O797fH85+350NP+7vH96vD96u775ez73uD95uv2xdr1tMr73+j84eX61eT4zd/619v84+f61OL5z+D72N762uf83+T3yd3619n1tbn0q7H0raz0paH95en5ys33vsL2ubj2trP1sa/zqK30pafymqD/8/b+8Pb84OL50eL61Nv2wtj60tb3wdL0r7T0qqjyl57xlprwjJjxkJXviZH61db2vM/4xcfzoqTvhon61+T72+D4zNv5z9D5zND2uc73v77xlabufXf72tv73dn1vtf5zdP51c/4x833wcf1sMXzpbzyoLfxlq7wkZ/zn57zm5v+7ev62OD849/0qcT2srXxnbHzoKnynaTympbufXz+8O763On73OH629752tPzs9L5xsr5z8j2t8T5ycL1sr3xm7jynq3vgYLvfWj/9Pj/8/T73+r73dT1rsjyorP1s6fxk4LvgXzuenP97eL85tv709D0ppfynYmkE61RAAAAfHRSTlMABQ4KFU8iTDIuGUAeEUhD/j02KSU5AxmLT/797tuknHBXQv79/crDdXFlXl1SRT8yKyEQCff09PLx7uvq5uXi2s++uq2srJKNi4R6eXBnZmNhTTUz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",
	        flakeCount:6,
	        minSize: 30,
	        maxSize: 62,
	        maxSpeed: 2,
	    });
	});
	$('.search-rose .rose').one('touchend',function(){
		$('.search-rose .tip').css('-webkit-animation','none').fadeOut();
		rosecount++;
		var id = $(this).data('id');
		$(this).addClass('animatenone');
		if(id==1){
			$('.search-rose .rose1').css({
				'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose1').offset().left+27)+'px,'+($('.basket').offset().top-$('.rose1').offset().top+176)+'px,0)'
			});
		}else if(id == 2){
			$('.search-rose .rose2').css({
				'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose2').offset().left+125)+'px,'+($('.basket').offset().top-$('.rose2').offset().top+132)+'px,0)'
			});
		}else if(id == 3){
			$('.search-rose .rose3').css({
				'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose3').offset().left+66)+'px,'+($('.basket').offset().top-$('.rose3').offset().top+149)+'px,0)'
			});
		}else if(id == 4){
			$('.search-rose .rose4').css({
				'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose4').offset().left+130)+'px,'+($('.basket').offset().top-$('.rose4').offset().top+200)+'px,0)'
			});
		}
		if(rosecount == 4){
			$('.rose'+id).on('webkitTransitionEnd',function(){
				collectRose();
			});	
		}
		/*if(rosecount==4){
			$(document).snowfall('clear');
			//$('.rose-content .rose').addClass('animatenone');
			$('.search-rose .mask').fadeIn('600',function(){
				$('.search-rose .rose1').css({
					'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose1').offset().left+27)+'px,'+($('.basket').offset().top-$('.rose1').offset().top+176)+'px,0)'
				});
				$('.search-rose .rose2').css({
					'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose2').offset().left+125)+'px,'+($('.basket').offset().top-$('.rose2').offset().top+132)+'px,0)'
				});
				$('.search-rose .rose3').css({
					'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose3').offset().left+66)+'px,'+($('.basket').offset().top-$('.rose3').offset().top+149)+'px,0)'
				});
				$('.search-rose .rose4').css({
					'-webkit-transform':'translate3d('+($('.basket').offset().left-$('.rose4').offset().left+130)+'px,'+($('.basket').offset().top-$('.rose4').offset().top+200)+'px,0)'
				});
			});
		}*/
	});
	/*$('.rose4').on('webkitTransitionEnd',function(){
		collectRose();
	});	*/
}
//收集玫瑰
function collectRose(){
	var rosecount = 0;
	$(document).snowfall('clear');
	$('.search-rose').addClass('out');
	$('.collect-rose').addClass('on');
	$('.collect-rose').one('webkitTransitionEnd',function(){
		$('.search-rose').removeClass('on').hide();
	});
	$('.collect-rose .rose').one('touchend',function(){
		$('.collect-rose .tip,.collect-rose .hand').fadeOut();
		rosecount++;
		$(this).css('-webkit-animation','none');
		if(rosecount==4){
			crease();
		}
	});
}
//canvas
function crease(){	
	$('.collect-rose').addClass('out');
	$('.mkl-po').addClass('on');
	$('.mkl-po').one('webkitTransitionEnd',function(){
		$('.collect-rose').removeClass('on').hide();
	});
	canv.handle();
	/*$('.mkl-po').fadeIn(function(){
		canv.handle();
	});*/
	
}
//apply
function applyFn(){
	$('.mkl-po').addClass('out');
	$('.apply-page').addClass('on');
	$('.apply-page').one('webkitTransitionEnd',function(){
		$('.mkl-po').removeClass('on').hide();
	});
	$('.apply').on('click',function(){
		addUser();
	})
}
//报名
function addUser(){
		var url = "http://www.cosmopolitan.com.cn/files/eventapi.php?c=EventApiNew&a=AddEvent&indexsId=617&callbackfun=addUserCallback";  
		var name = $('#form_name').val();
		var phone = $('#form_tel').val();
		var wish = $('#form_wish').val();
		var phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/;
		if(name==''||name=='姓名'){
			alert('万一中奖了，怎么称呼您？');
			$('#form_name').focus();
			return false;
		}
		if(phone==''){
			alert('万一中奖了，没电话怎么联系您啊');
			$('#form_tel').focus();
			return;
		}else if(!phone.match(phoneReg)){
			alert('请输入正确的手机号码');
			$('#form_tel').focus();
			return false;
		}
		if(wish==''){
			alert('不输入愿望吗？');
			$('#form_wish').focus();
			return false;
		}
		var data = { 
			"data[2473]": phone,//手机 
			"data[2474]": name,//真实姓名 
			"data[2475]": wish,//願望
		};
		$.ajax({
			url:url,
			data:data,
			type:"GET",
			dataType:'jsonp',
		});
	}
	function addUserCallback(res){
		if(res.status == 1){
			//alert('成功')
			applySucc();
		}else{
			alert(res.info);
		}
	}
	function applySucc(){
		$('.suc').fadeOut(function(){
			$('.apply-page p').fadeIn();
		});
		
	}
function canvas(id,src){

  var canvas,ctx,x1,y1,a=60,timer,
	width = document.documentElement.clientWidth,
	height=document.documentElement.clientHeight;
  

  function init(){
	canvas = document.getElementById(id);
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	var img = new Image();
	img.src = src;
	img.onload = function(){
	  var w = img.width , h = img.height;
	  var x = 0,
		y = h*(width/w) - canvas.height,
		h2 = h*(width/w);
	  
	  //canvas.height = h*(width/w);
	 // ctx.drawImage(img,0,0,w,h,0,-y/2,canvas.width,h2)
	 ctx.drawImage(img,0,0,canvas.width,canvas.height);
	// handle();
	}
  }


  function handle(){
	var hastouch = "ontouchstart" in window?true:false,
	  tapstart = hastouch?"touchstart":"mousedown",
	  tapmove = hastouch?"touchmove":"mousemove",
	  tapend = hastouch?"touchend":"mouseup";
	  
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.lineWidth = a*2;
	ctx.globalCompositeOperation = "destination-out";
	
	canvas.addEventListener(tapstart , drawPoint,false)
	canvas.addEventListener(tapmove , drawPoint,false);
	canvas.addEventListener(tapend , function(){
	  clear(timer);
	  timer = setTimeout(function(){
		var per = getTransparentPercent();
		if(per >= 40){
		  end();
		}
	  },100)
	},false);
  }

  function end(){
  	canvas.style.display = 'none';
  	$('.mkl-po .content').fadeIn();
  	setTimeout(function(){
  		applyFn();
  	},2000);
	canvas.addEventListener('webkitTransitionEnd',function(){
	  canvas.style.display = 'none';
	 // box.add(2);
	  //document.querySelector('.m-tip').classList.add('m-tip2');
	},false)
	canvas.classList.add('hide');
  }
  function clear(){
	clearTimeout(timer);
	timer = null;
  }
  function getTransparentPercent() {
		var imgData = ctx.getImageData(0, 0, width, height),
			pixles = imgData.data,
			transPixs = [];
		for (var i = 0, j = pixles.length; i < j; i += 4) {
			var a = pixles[i + 3];
			if (a < 128) {
				transPixs.push(i);
			}
		}
		return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
	}
  function drawPoint(e){
  	$('.mkl-po .hand-tip').fadeOut();
	clear(timer);
	e.preventDefault();
	e.stopPropagation();
	x1 = e.targetTouches[0].pageX;
	y1 = e.targetTouches[0].pageY;
	
	ctx.save();
	ctx.beginPath()
	var radgrad = ctx.createRadialGradient(x1, y1, 0, x1, y1, a);
			radgrad.addColorStop(0, 'rgba(255, 255, 255,0.4)');
			radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = radgrad;
		ctx.arc(x1, y1, a, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.restore();
  }

  function show(cb){
	canvas.classList.add('on')
	cb&&cb();
  }

  init();

  return {
	show : show,
	handle: handle
  }

}
function  load(cb){
  var _load = document.querySelector('.loading'),
	per = _load.querySelector('.loadingpercent'),
	logo = document.querySelector('.loading .logo'),
	timer,
	src = 'images/bg.jpg',
	img = new Image();
	logo.addEventListener('webkitTransitionEnd',function(){
		if(timer) return;
		timer = setTimeout(function(){
		  num();
		  timer = null;
		},300)
	  },false)
  var n = 5,t;
  function num(){
	n++;
	if(document.readyState == 'complete'){
	  clearTimeout(t);
	  t= null;
	  per.innerHTML = 100 + '%';
	  // start
	  setTimeout(function(){
		hide()
	  },1000)
	  return;
	}
	per.innerHTML = n + '%';
	if(n==90){
	  n--;
	}
	t = setTimeout(num,100)
  }

  function hide(){
  	fade('.loading','out',function(){
  		cb&&cb();
  	});
  	$('.cover').addClass('on');
  }
  img.onload = function(){
	_load.classList.add('on');
  }
  img.src = src;
}
var wh =  $(window).height();
var ww = $(window).width();
$('body,.loading,.cover,.product,.search-rose,.collect-rose,.mkl-po,.apply-page').css({
	'overflow':'hidden',
	'height':wh,
	'width':ww
});

//$('.loading').height(wh).css({'overflow':'hidden'});
load(function(){
	coverFn();
	canv = canvas('canvas',canvasImg);
	//blingFn.testplay();
	audio = new Audio();
	audio.init();
});

function Audio(){
	this.aud = document.querySelector('.audio');
	this.audio = document.querySelector('.audio audio');
}
Audio.prototype = {
	init:function(){
		this.aud.style.display = 'block';
		this.eventFn();
		this.autoplay();
	},
	autoplay:function(){
		var _this = this;
		_this.audio.play();
		_this.aud.classList.add('on');
	},
	play:function(){
		var _this = this;
		if(_this.audio.pause) {
			_this.audio.play();
			this.aud.classList.add('on');
		}
	},
	pause:function(){
		var _this = this;
		if(_this.audio.play){
			 _this.audio.pause();
			 this.aud.classList.remove('on');
		}
	},
	eventFn:function(){
		var _this = this;
		_this.aud.addEventListener('touchstart', function(){
			if(this.classList.contains('on')){
				_this.pause();
			}else{
				_this.play();
			}
		}, false);
	}
}
/**
 * 定制音乐
 * @return {[type]} [description]
 */
var blingFn = {
	ad: document.querySelector('.bling audio'),
	init: function(){
		//audio.pause();
		this.ad.play();
		////blingFn.eventInit();
	},
	m1play:function(){
		document.querySelector('.bling #m1').play();
	},
	m2play:function(){
		document.querySelector('.bling #m2').play();
	},
	m3play:function(){
		document.querySelector('.bling #m3').play();
	},
	m4play:function(){
		document.querySelector('.bling #m4').play();
	},
	testplay:function(){
		var _this = this;
		for(var i=0;i<_this.ad.length;i++){
			_this.ad[i].play();
			_this.ad[i].pause();
		}
	},
	eventInit: function(){
		this.ad.addEventListener('ended', blingFn.endContr, false);
	},
	endContr: function(){
		//audio.play();
		this.ad.pause();
	}
}
//share
$(function(){
	$.getJSON('http://m.cosmopolitan.com.cn/files/eventapi.php?c=Cosmom_Jssdk&type=json&url='+String(window.location.href),function(data){
		wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'previewImage'
          ]
      });
	});
});
	
wx.ready(function () {
	wx.error(function(res){
	    //console,log(res);
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

	});

	wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	    }
	});

	wx.onMenuShareAppMessage(shareData);
	wx.onMenuShareTimeline(shareData);
	wx.onMenuShareQQ(shareData);
	wx.onMenuShareWeibo(shareData);
});