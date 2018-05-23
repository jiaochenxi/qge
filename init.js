/*(function() {
 document.addEventListener('DOMContentLoaded', function() {
 var html = document.documentElement;
 var windowWidth = html.clientWidth;

 html.style.fontSize = 100 * windowWidth / 720 + 'px';
 // 等价于html.style.fontSize = windowWidth / 720 * 100 + 'px'; 当720 px时,1rem = 100px
 }, false);
 document.addEventListener('resize', function() {
 var html = document.documentElement;
 var windowWidth = html.clientWidth;

 html.style.fontSize = 100 * windowWidth / 1280 + 'px';
 // 等价于html.style.fontSize = windowWidth / 720 * 100 + 'px'; 当720 px时,1rem = 100px
 }, false);

 })();
 String.prototype.getWidth = function(id, fontSize, width) {
 var str = '';
 id.style.fontSize = fontSize + "rem";
 for (var i = 0; i < this.length; i++) {
 str = str + this.charAt(i);
 id.innerText = str;

 if (id.offsetWidth >= width) {
 return str.substring(0, i - 1) + "...";
 }
 }
 return str;
 };*/

/*(function () {
 document.addEventListener('DOMContentLoaded', function () {
 var html = document.documentElement;
 var windowWidth = html.clientHeight;

 html.style.fontSize = 100*windowWidth /1280 + 'px';
 // 等价于html.style.fontSize = windowWidth / 720 * 100 + 'px'; 当720 px时,1rem = 100px
 }, false);
 })();

 String.prototype.getWidth = function(id,fontSize,width)
 {


 var str = '';
 id.style.fontSize = fontSize + "rem";
 for(var i=0;i<this.length;i++)
 {
 str = str + this.charAt(i);
 id.innerText = str;

 if(id.offsetWidth >= width)
 {
 return str.substring(0,i-1) + "...";
 }
 }
 return str;
 }*/

/*function hengshuping() {

 if (window.orientation == undefined) {
 var html = document.documentElement;
 var windowWidth = html.clientHeight;
 html.style.fontSize = 100 * windowWidth /1280+ 'px';
 }
 if (window.orientation == 180 || window.orientation == 0) {
 var html = document.documentElement;
 var windowWidth = html.clientWidth;
 alert(windowWidth)
 html.style.fontSize = 100 * windowWidth/640+ 'px';
 // 等价于html.style.fontSize = windowWidth / 720 * 100 + 'px'; 当720
 // px时,1rem = 100px

 }
 if (window.orientation == 90 || window.orientation == -90) {
 var html = document.documentElement;
 var windowWidth = html.clientWidth;
 html.style.fontSize = 100 * windowWidth / 720 + 'px';
 // 等价于html.style.fontSize = windowWidth / 720 * 100 + 'px'; 当720
 // px时,1rem = 100px
 }
 }
 window.addEventListener("onorientationchange" in window ? "orientationchange"
 : "resize", hengshuping, false);
 hengshuping();*/
/*(function(){
 var a =function (){
 var raines = this;
 raines.width = 720;//设置默认最大宽度
 raines.fontSize = 100;//默认字体大小
 raines.maxSize = 720;//设置最大宽度，超过这一宽度，字体大小不再变大，设置为0意思为不做限制
 raines.minSize = 320;//设置最小宽度，小于这一宽度，字体大小不再变小，设置为0意思为不做限制
 var dpr = window.devicePixelRatio || 1;
 var scale = 1 / dpr;
 var metaEl=document.querySelector('meta[name="viewport"]');
 var p=document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth;
 if(raines.maxSize >0 ){
 p= p >raines.maxSize?raines.maxSize:p;
 }
 if(raines.minSize >0 ){
 p= p <raines.minSize?raines.minSize:p;
 }
 raines.widthProportion = function(){var i = p/raines.width;return i<0.5?0.5:i;};
 raines.changePage = function(){
 document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+raines.widthProportion()*raines.fontSize*dpr+"px !important");
 metaEl.setAttribute('content', 'width=' + dpr * p + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
 };
 raines.changePage();
 };
 a();
 /*  说明：
 **  引入该文件，头部别忘记加<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=0">
 **
 **  焦晨曦
 **
 ***
 })();*/

(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    if (metaEl) {
//将根据已有的meta标签来设置缩放比例
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
// 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);

    
    


    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }



    var porMetaEl = doc.createElement('meta');
    porMetaEl.setAttribute('name', 'x5-orientation');
    porMetaEl.setAttribute('content', 'portrait');
    metaEl.parentNode.insertBefore(porMetaEl,metaEl);
    var porMetaEl2 = doc.createElement('meta');
    porMetaEl2.setAttribute('name', 'screen-orientation');
    porMetaEl2.setAttribute('content', 'portrait');
    metaEl.parentNode.insertBefore(porMetaEl2,metaEl);


    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 720) {
            width = 720 * dpr;
        }
        if (width / dpr < 320) {
            width = 320 * dpr;
        }
        var rem = width / 7.2;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
        if (window.orientation == 90 || window.orientation == -90) {
            var width = docEl.getBoundingClientRect().height;
            if (width / dpr > 720) {
                width = 720 * dpr;
            }
            if (width / dpr < 320) {
                width = 320 * dpr;
            }
            var rem = width / 7.2;
            docEl.style.fontSize = rem + 'px';
            flexible.rem = win.rem = rem;
        }
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    refreshRem();
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));


;(function (prototype) {

    var pixelRatio = (function (context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;

            return (window.devicePixelRatio || 1) / backingStore;
        })(prototype),

        forEach = function (obj, func) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    func(obj[p], p);
                }
            }
        },

        ratioArgs = {
            'fillRect': 'all',
            'clearRect': 'all',
            'strokeRect': 'all',
            'moveTo': 'all',
            'lineTo': 'all',
            'arc': [0, 1, 2],
            'arcTo': 'all',
            'bezierCurveTo': 'all',
            'isPointinPath': 'all',
            'isPointinStroke': 'all',
            'quadraticCurveTo': 'all',
            'rect': 'all',
            'translate': 'all',
            'createRadialGradient': 'all',
            'createLinearGradient': 'all'
        };

    if (pixelRatio === 1) return;

    forEach(ratioArgs, function (value, key) {
        prototype[key] = (function (_super) {
            return function () {
                var i, len,
                    args = Array.prototype.slice.call(arguments);

                if (value === 'all') {
                    args = args.map(function (a) {
                        return a * pixelRatio;
                    });
                }
                else if (Array.isArray(value)) {
                    for (i = 0, len = value.length; i < len; i++) {
                        args[value[i]] *= pixelRatio;
                    }
                }

                return _super.apply(this, args);
            };
        })(prototype[key]);
    });

    // Stroke lineWidth adjustment
    prototype.stroke = (function (_super) {
        return function () {
            this.lineWidth *= pixelRatio;
            _super.apply(this, arguments);
            this.lineWidth /= pixelRatio;
        };
    })(prototype.stroke);

    // Text
    //
    prototype.fillText = (function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.fillText);

    prototype.strokeText = (function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.strokeText);
})(CanvasRenderingContext2D.prototype);
;(function (prototype) {
    prototype.getContext = (function (_super) {
        return function (type) {
            var backingStore, ratio,
                context = _super.call(this, type);

            if (type === '2d') {

                backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;

                ratio = (window.devicePixelRatio || 1) / backingStore;

                if (ratio > 1) {
                    this.style.height = this.height + 'px';
                    this.style.width = this.width + 'px';
                    this.width *= ratio;
                    this.height *= ratio;
                }
            }

            return context;
        };
    })(prototype.getContext);
})(HTMLCanvasElement.prototype);

/*if (/iP(hone|od|ad)/.test(navigator.userAgent)) {
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
        version = parseInt(v[1], 10);
    if(version >= 8){
        document.documentElement.classList.add('hairlines')
    }
}*/




var baseUrl = "/" + window.location.href.split("#")[0].split("/")[window.location.href.split("#")[0].split("/").length - 2];  
