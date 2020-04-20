function animat(obj, target, callback) {
    window.clearInterval(obj.uname);
    obj.uname = window.setInterval(function() {
        if(obj.offsetLeft == target) {
            window.clearInterval(obj.uname);
            callback && callback();
        }
        var step = (target - obj.offsetLeft)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        obj.style.left = obj.offsetLeft+step+'px';
    }, 15)
}


window.addEventListener('load', function() {
    var span = document.querySelector('span');
    var lis = document.querySelectorAll('li');

    var current=0;
    for(var i=0; i<lis.length; i++) {
        lis[i].addEventListener('mouseenter', function() {
            animat(span, this.offsetLeft);
            console.log(this.offsetLeft)
        })
        lis[i].addEventListener('mouseleave', function() {
            animat(span, current);
        })
        lis[i].addEventListener('click', function() {
            current = this.offsetLeft;
            animat(span, current);
        })
    }
})