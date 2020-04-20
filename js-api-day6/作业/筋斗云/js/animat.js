function animat(obj, target, callback) {
   // window.clearInterval(obj.uname);
    window.setInterval(function() {
        if(obj.offsetLeft >= target) {
            window.clearInterval(obj.uname);
            callback && callback();
        }
        var step = (target - obj.offsetLeft)/10;
        var step = step>0?Math.ceil(step):Math.floor(step);
        obj.style.left = obj.offsetLeft+step+'px';
    }, 15)
}