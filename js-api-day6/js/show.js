
    function show(obj, target, callback) {
        window.clearInterval(obj.move);
        obj.move = window.setInterval(function() {
            if(obj.offsetLeft == target){
                window.clearInterval(obj.move);
                callback && callback();
                return false;
            }
            var step = (target-obj.offsetLeft)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            obj.style.left = obj.offsetLeft + step +'px';
        },15)
    }
