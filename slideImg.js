
/*
    email:cgf_150@163.com


    new SlideImage({
        slideTrigger:'.figs li', //点击切换元素
        imgContainer:'.qfileAnimate', //图片容器
        imgs:['./images/pic1.png','./images/pic2.png','./images/pic3.png'] //轮播图片
    });
*/

function SlideImage(config){

    if(!window.$){
        throw '需要引入JQuery';
        return;
    }

    this._init(config);
}

SlideImage.prototype={

    constructor:SlideImage,

    autoTimer:null,

    _index:0,

    bindEvent:function(){

        var _this=this;

        this.config.slideTrigger.mouseover(function(){

            clearTimeout(_this.autoTimer);
            _this.autoTimer=null;

            _this._index=$(this).index();

            _this.slideImage(_this._index);
        })


        this.config.slideTrigger.mouseout(function(){
            _this.autoSlide();
        })
    },

    autoSlide:function(){
        var _this = this;

        _this.slideImage(_this._index);

        _this.autoTimer=setInterval(function(){

            _this._index++;

            if(_this._index>2){
                _this._index=0;
            }

            _this.slideImage(_this._index);

        },_this.config.slideTime);
    },

    slideImage:function(index){
        this.config.slideTrigger.eq(index).addClass('active')
                                .siblings().removeClass('active');

        this.config.imgContainer.css('background','transparent url('+this.config.imgs[index]+') no-repeat 0 0');
    },

    _init:function(config){

        this.config={
            slideTrigger:$(config.slideTrigger),
            imgContainer:$(config.imgContainer),
            imgs:config.imgs||[],
            slideTime:config.slideTime||2000
        }

        this.bindEvent();

        this.autoSlide();
    }
}