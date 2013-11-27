/*
   @param
	    "id":"drapBox",//元素id
		"direct":"xy",//移动方向
		"move":that.move, //移动的处理方法
		"moveCallback":null,//移动后回调
		"circlimit":true //是否限制在父区域移动


	使用
	var d = new Drap({
    	id:"d",
    	circlimit:false,
    	direct:"x"
    })
    d.enable();
*/
;;var Drap = function(opts){
	var that = this;
	
	that.opts = $.extend({
		"id":"drapBox",
		"direct":"xy",//移动方向
		"move":that.move,
		"moveCallback":null,
		"circlimit":true //是否限制在父区域移动
	},opts);

	that.top = 0;
	that.left = 0;
	that.status = 0;
	//事件命名空间。
	that.eventNamespace = that.opts.id;
};

Drap.prototype = {
	//启用
	enable:function(){
		var that = this;
		that.opts.obj = $("#" + that.opts.id);
		$(document).on("mousedown." + that.eventNamespace + " mousemove." + that.eventNamespace + " mouseup."+ that.eventNamespace,function(e){that.handleEvent(e)});
	},
	//禁用
	unable:function(){
		var that = this;
		$(document).off("mousedown." + that.eventNamespace + " mousemove." + that.eventNamespace + " mouseup."+ that.eventNamespace);
	},
	handleEvent:function(event){
		var that = this,
			ele = event.target,
			opts = that.opts;
		switch(event.type){
			case "mousedown":
				if(ele.id === opts.id){
					var position = that.opts.obj.position();
						position_top = position.top,
						position_left = position.left;

					//阻止选中
					event.preventDefault();
					that.status = 1;
					that.startpositon = {x:event.pageX,y:event.pageY};
					that.diff = {x:that.startpositon.x-position_left,y:that.startpositon.y-position_top};
				}
				break;
			case "mousemove":
				if(that.status === 1)
				{
					that.endposition = {x:event.pageX,y:event.pageY};
					that.left = that.endposition.x - that.diff.x;
					that.top = that.endposition.y - that.diff.y;
					that.move();
				}
				break;
			case "mouseup":
				that.status = 0;
				break;
			default:break;
		}
	},
	//修正y方向的高度
	fixTop:function(){
		var that = this,	
			opts = that.opts,
			$pobk = $(document.getElementById(opts.id).offsetParent),
			height = $pobk.height()-opts.obj.outerHeight();

			return that.top < 0?0:(that.top > height?height:that.top);
	},
	//修正x方向的高度
	fixLeft:function(){
		var that = this,	
			opts = that.opts,
			$pobk = $(document.getElementById(opts.id).offsetParent),
			width = $pobk.width()-opts.obj.outerWidth();

			return that.left < 0?0:(that.left > width?width:that.left);
	},
	//移动方法
	move:function(){
		var that = this,	
			opts = that.opts;
		if(opts.circlimit){
			that.top = that.fixTop();
			that.left = that.fixLeft();
		}
		if(opts.direct === "xy"){
			opts.obj.css({"top":that.top + "px","left":that.left + "px"});
		}
		if(opts.direct === "x"){
			opts.obj.css({"left":that.left + "px"});
		}
		if(opts.direct === "y"){
			opts.obj.css({"top":that.top + "px"});
		}

		if(opts.moveCallback)
		{
			opts.moveCallback.apply(that);
		}
	}
};

