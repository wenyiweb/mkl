//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';//资源文件地址
var filelist = ['images/bg.jpg','images/star.png','images/award.png','images/y1.png','images/y2.png','images/y3.png','images/y4.png','images/y5.png','images/y6.png','images/y7.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png','images/share.png'];
var audio;
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
	})
}

//产品页处理
function productFn(){
	$('.cover').addClass('out').css('opacity',0);
	/*fade('.product','in',function(){
		$('.product').addClass('on');
		$('.cover').hide();
	});*/
	$('.product').fadeIn('1000',function(){
		$('.product').addClass('on');
		$('.cover').hide();
	})
	$('.product .tip .hand').one('webkitAnimationEnd',function(){
		$('.product .tip').fadeOut();
	})
	$('.open').on('click',function(){
		searchRose();
	})
}
//寻找玫瑰
function searchRose(){
	var rosecount = 0;
	$('.product').fadeOut('slow');
	$('.search-rose').fadeIn('slow').addClass('on');
	$('.rose-content .rose').one('touchend',function(){
		rosecount++;
		console.log(rosecount)
		if(rosecount==4){
			$('.rose-content .rose').addClass('animatenone');
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
		}
	});
	$('.rose4').on('webkitTransitionEnd',function(){
		collectRose();
	})
	
}
//收集玫瑰
function collectRose(){
	var rosecount = 0;
	$('.search-rose').fadeOut();
	$('.collect-rose').fadeIn().addClass('on');
	$('.collect-rose .rose').one('touchend',function(){
		rosecount++;
		$(this).css('-webkit-animation','none');
		if(rosecount==4){
			crease();
		}
	});
}
//canvas
function crease(){
	var canv = canvas('canvas',canvasImg);
	$('collect-rose').fadeOut();
	$('.mkl-po').fadeIn(function(){
		canv.handle();
	});
	
}
//apply
function applyFn(){
	$('.mkl-po').fadeOut();
	$('.apply-page').fadeIn();
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
  	setTimeout(function(){
  		applyFn();
  	},3000);
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
$('body').css('height',wh);

$('.loading').height(wh).css({'overflow':'hidden'});
load(function(){
	coverFn();
	//blingFn.testplay();
	//audio = new Audio();
	//audio.init();
});
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
			wishFn();
		}else{
			alert(res.info);
		}
	}

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