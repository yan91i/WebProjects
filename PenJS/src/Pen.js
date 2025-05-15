(function(window) {
    var Pen = Pen || {};

    Pen._scriptList = ['Util.js', 'Loader.js', 'DocUtil.js', 'ClassManager.js', 'Event.js', 'ObjectPool.js',
            'Labeling.js', 'Timer.js', 'Stage.js', 'Sprite.js', 'Group.js', 'Sprites.js', 'Component.js', 'Shape.js',
            'Storage.js', 'Brush.js', 'Tween.js', 'Box.js'];

    Pen.config = {
        root: null,
        requires: [],
        canvas: null,
        resources: {},
        fullscreen: true
    };

    Pen.Base = function() {
    };

    Pen.Base.prototype.callParent = function(methodName) {
        var args = this.callParent.caller.arguments;
        if (this.__proto__ && this.__proto__[methodName]) {
            var result = this.__proto__[methodName].apply(this, args);
            return result;
        }
    };

    // TODO
    Pen.require = function(className) {
    };

    Pen.setConfig = function(config) {
        this.copy(this.config, config);
    };

    /**
     * 生成ID。
     */
    Pen.getId = (function() {
        var id = 0;

        return function() {
            return 'gen' + (++id);
        };
    })();

    Pen.isArray = ('isArray' in Array) ? Array.isArray : function(value) {
        return toString.call(value) === '[object Array]';
    };

    Pen.isSimpleObject = function(v) {
        return v instanceof Object && v.constructor === Object;
    };

    /**
     * 克隆对象。
     * 对于[数组]和[简单对象]，会迭代其[元素]和[属性]。
     * 
     * @param source 源对象
     * @param deep 是否进行深度克隆。默认不进行深度克隆。
     */
    Pen.clone = function(source, deep) {
        if (source != null) {
            // 对于[数组]，会迭代其[元素]。
            if (Pen.isSimpleObject(source) || (typeof source === 'object' && deep)) {
                var obj = {}, p;
                for (p in source) {
                    obj[p] = Pen.clone(source[p]);
                }

                return obj;
            }

            // 对于[简单对象]，会迭代其[属性]。
            if (Pen.isArray(source)) {
                var arr = [], i, len = source.length;
                for (i = 0; i < len; i++) {
                    arr.push(Pen.clone(source[i]));
                }

                return arr;
            }
        }

        return source;
    };

    // TODO
    Pen.copyDeep = function() {
    };

    /**
     * 将一个对象的属性合并到另一个对象。 注意：不会递归对象的属性，且不会克隆非基本类型的属性。
     * 
     * @param target 目标对象
     * @param source 源对象
     * @return 目标对象
     */
    Pen.copy = function(target, source) {
        if (source && target) {
            for ( var p in source) {
                target[p] = Pen.clone(source[p]);
            }
        }

        return target;
    };

    /**
     * 将一个对象的属性合并到另一个对象。 但是只拷贝目标对象中不存在的属性。 注意：不会递归对象的属性，且不会克隆非基本类型的属性。
     * 
     * @param target 目标对象
     * @param source 源对象
     * @return 目标对象
     */
    Pen.copyIf = function(target, source) {
        if (source && target) {
            for ( var p in source) {
                if (target[p] === undefined) {
                    target[p] = Pen.clone(source[p]);
                }
            }
        }

        return target;
    };

    /**
     * 加载js脚本。
     * 
     * @param path 脚本文件
     * @param callback 回调函数
     */
    Pen.loadJS = function(path, callback) {
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        script.onload = function() {
            if (callback) {
                callback();
            }
        };

        document.head.appendChild(script);
    };

    function getFullPath(dir, name) {
        if (null != dir) {
            if (dir.charAt(dir.length - 1) != '/') {
                dir += '/';
            }

            return dir + name;
        }

        return name;
    }

    /**
     * 并行地加载所有脚本。
     */
    Pen._loadAllJsParallelly = function(oncomplete) {
        var me = this;
        var list = me._scriptList.concat(me.config.requires), len = list.length, count = 0;
        var i, script;

        for (i in list) {
            script = list[i];

            (function(script) {
                me.loadJS(getFullPath(me.config.root, script), function() {
                    count++;
                    if (count == len) {
                        if (oncomplete) {
                            oncomplete();
                        }
                    }
                });
            })(script);
        }
    };

    /**
     * 串行地加载所有脚本。
     */
    Pen._loadAllJsSerially = function(oncomplete) {
        var me = this;
        var list = me._scriptList.concat(me.config.requires), len = list.length, count = 0;
        var i, script;

        var l = [];
        for (i in list) {
            script = list[i];
            (function(script) {
                l.push(function() {
                    me.loadJS(getFullPath(me.config.root, script), function() {
                        l.shift();
                        if (l.length > 0) {
                            l[0]();
                        }
                        else {
                            if (oncomplete) {
                                oncomplete();
                            }
                        }
                    });
                });
            })(script);
        }

        if (l.length > 0) {
            l[0]();
        }
    };

    /**
     * 根据实际需要加载所有脚本。
     * TODO
     */
    Pen._loadAllJsAsRequired = function(oncomplete) {
    };

    function getScriptPath() {
        var i, src, scripts = document.querySelectorAll('script');
        var re = /(.*[\/|\\])Pen.js$/;
        for (i in scripts) {
            var result = re.exec(scripts[i].src);
            if (null != result) { return result[1]; }
        }

        return '';
    }

    function getCanvas(config) {
        var c = config.canvas, canvas;

        if (null === c || undefined === c) {
            canvas = document.querySelector('canvas');
        }
        else if (typeof c == 'string') {
            canvas = document.getElementById(c);
            if (!canvas) {
                canvas = document.querySelectorAll(c)[0];
            }
        }

        if (!(canvas instanceof HTMLCanvasElement)) {
            Pen.Util.error('Failed to find <canvas> element with ' + c);
        }

        return canvas;
    };

    /**
     * 初始化Pen JS。
     */
    Pen.init = function(oncomplete, onprogress) {
        var me = this, config = me.config;

        if (!config.root) {
            config.root = getScriptPath();
        }

        me._loadAllJsSerially(function() {
            var canvas = getCanvas(config);
            if (config.fullscreen) {
                canvas.width = $(window).width();
                canvas.height = $(window).height();
            }
            
            var ctx = canvas.getContext('2d');
            var brush = new Pen.Brush(canvas);
            var stage = new Pen.Stage({
                brush: brush,
            });

            Pen.copy(Pen.Global, {
                canvas: canvas,
                ctx: ctx,
                brush: brush,
                stage: stage
            });

            Pen.Loader.load(config.resources, function() {
                if (oncomplete) {
                    oncomplete();
                }

            }, onprogress);
        });
    };

    Pen.Global = {};

    window.Pen = Pen;
    window.$P = Pen;

})(window);
