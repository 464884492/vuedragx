import Vue from 'vue'

Vue.directive('dragx', (el, binding, vnode) => {
    //  默认参数
    let defaultOpts = {
        moveDirection: 'n, e, s, w, ne, se, sw, nw, all',
        moveContainerId: '', //
        moveBarClass: '', // 类选择器
        resizeEdge: 10,
        dirctDom: true
    };
    let isMove = false;
    binding.value = binding.value || {};
    let cfg = Object.assign({}, defaultOpts, binding.value);

    // 获取目标元素 resize方向
    function getDirection(e) {
        let el = e.currentTarget;
        let dir = '';
        let rect = el.getBoundingClientRect();
        let win = el.ownerDocument.defaultView;
        let offset = {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset,
            right: rect.right + win.pageXOffset,
            bottom: rect.bottom + win.pageYOffset
        }
        if (e.pageY > offset.top && e.pageY < offset.top + 5) {
            dir += 'n';
        } else if (e.pageY < offset.bottom && e.pageY > offset.bottom - cfg.edge) {
            dir += 's';
        }
        if (e.pageX > offset.left && e.pageX < offset.left + cfg.edge) {
            dir += 'w';
        } else if (e.pageX < offset.right && e.pageX > offset.right - cfg.edge) {
            dir += 'e';
        }
        if (binding.value) {
            let handles = cfg.moveDirection.split(',');
            for (let i = 0; i < moveDirection.length; i++) {
                let handle = moveDirection[i].replace(/(^\s*)|(\s*$)/g, '');
                if (handle === 'all' || handle === dir) {
                    return dir;
                }
            }
        }
        return '';
    }

    el.onmousemove = function (e) {
        let dir = getDirection(e);
        if (dir === '') {
            el.style.cursor = '';
        } else {
            el.style.cursor = dir + '-resize';
        }
    }

    el.onmouseleave = function (e) {
        el.style.cursor = '';
    }

    el.onmousedown = function (e) {
        
        isMove = false;
        if (cfg.moveBarClass.length > 0 && e.target.classList.contains(cfg.moveBarClass)) {
            isMove = true;
            document.body.style.cursor = 'move';
        }
        let style = window.getComputedStyle(el);
        function getStyleNumValue(key) {
            return parseInt(style.getPropertyValue(key), 10);
        }
        let rect = el.getBoundingClientRect();
        let data = {
            width: getStyleNumValue("width"),
            height: getStyleNumValue("height"),
            left: getStyleNumValue("left"),
            top: getStyleNumValue("top"),
            deltX: e.pageX - rect.left,
            deltY: e.pageY - rect.top,
            startX: rect.left,
            startY: rect.top
        };
        let dir = getDirection(e);
        if (dir === '' && !isMove) return;
        // 创建遮罩
        let mask = document.createElement("div");
        mask.style.cssText = "position:absolute;top:0px;bottom:0px;left:0px;right:0px;";
        document.body.appendChild(mask);
        document.onmousemove = function (edom) {
            //  获取当前鼠标位置 2 border
            if (dir.indexOf("e") > -1) {
                data.width = edom.pageX - data.startX + 2;
            }
            if (dir.indexOf("s") > -1) {
                data.height = edom.pageY - data.startY + 2;
            }
            if (dir.indexOf("n") > -1) {
                let deltheight = data.startY + 2 - edom.pageY;
                data.height += deltheight;
                data.top -= deltheight;
                data.startY -= deltheight;
            }
            if (dir.indexOf("w") > -1) {
                let deltwidth = data.startX + 2 - edom.pageX;
                data.width += deltwidth;
                data.left -= deltwidth;
                data.startX -= deltwidth;
            }
            // 处理组件 移动
            if (isMove) {
                let targetPageX = edom.pageX;
                let targetPageY = edom.pageY;
                let deltX = targetPageX - data.startX - data.deltX;
                let deltY = targetPageY - data.startY - data.deltY;
                let newLeft = parseInt(getStyleNumValue("left") || '0', 10) + deltX;
                let newTop = parseInt(getStyleNumValue("top") || '0', 10) + deltY;
                data.left = newLeft;
                data.top = newTop;
                data.startX = data.startX + deltX;
                data.startY = data.startY + deltY;
            }
            if (cfg.dirctDom) {
                el.style.width = data.width + "px";
                el.style.height = data.height + "px";
                el.style.left = data.left + 'px';
                el.style.top = data.top + 'px';
            }
            el.dispatchEvent(new CustomEvent('boundingUpdate', { detail: data }));
        }

        document.onmouseup = function (e) {
            document.body.style.cursor = '';
            document.onmousemove = null;
            document.onmouseup = null;
            isMove = false;
            document.body.removeChild(mask);
        }
        document.body.style.cursor = dir + '-resize';
    }
});
