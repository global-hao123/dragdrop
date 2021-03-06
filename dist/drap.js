var Drap = function(t) {
    var e = this;
    e.opts = $.extend({
        id: "drapBox",
        direct: "xy",
        move: e.move,
        moveCallback: null,
        circlimit: !0
    }, t), e.top = 0, e.left = 0, e.status = 0, e.eventNamespace = e.opts.id;
};

Drap.prototype = {
    enable: function() {
        var t = this;
        t.opts.obj = $(t.opts.id === t.opts.id + "" ? "#" + t.opts.id : t.opts.id), $(document).on("mousedown." + t.eventNamespace + " mousemove." + t.eventNamespace + " mouseup." + t.eventNamespace, function(e) {
            t.handleEvent(e);
        });
    },
    unable: function() {
        var t = this;
        $(document).off("mousedown." + t.eventNamespace + " mousemove." + t.eventNamespace + " mouseup." + t.eventNamespace);
    },
    handleEvent: function(t) {
        var e = this, o = t.target, s = e.opts;
        switch (t.type) {
          case "mousedown":
            if (o.id === s.id) {
                var i = e.opts.obj.position();
                position_top = i.top, position_left = i.left, t.preventDefault(), e.status = 1, 
                e.startpositon = {
                    x: t.pageX,
                    y: t.pageY
                }, e.diff = {
                    x: e.startpositon.x - position_left,
                    y: e.startpositon.y - position_top
                };
            }
            break;

          case "mousemove":
            1 === e.status && (e.endposition = {
                x: t.pageX,
                y: t.pageY
            }, e.left = e.endposition.x - e.diff.x, e.top = e.endposition.y - e.diff.y, e.move());
            break;

          case "mouseup":
            e.status = 0;
        }
    },
    fixTop: function() {
        var t = this, e = t.opts, o = $(document.getElementById(e.id).offsetParent), s = o.height() - e.obj.outerHeight();
        return t.top < 0 ? 0 : t.top > s ? s : t.top;
    },
    fixLeft: function() {
        var t = this, e = t.opts, o = $(document.getElementById(e.id).offsetParent), s = o.width() - e.obj.outerWidth();
        return t.left < 0 ? 0 : t.left > s ? s : t.left;
    },
    move: function() {
        var t = this, e = t.opts;
        e.circlimit && (t.top = t.fixTop(), t.left = t.fixLeft()), "xy" === e.direct && e.obj.css({
            top: t.top + "px",
            left: t.left + "px"
        }), "x" === e.direct && e.obj.css({
            left: t.left + "px"
        }), "y" === e.direct && e.obj.css({
            top: t.top + "px"
        }), e.moveCallback && e.moveCallback.apply(t);
    }
};