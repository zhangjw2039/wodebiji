window.addEventListener('load', function() {
    //获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var timer = null;
    //设置元素的ul,li的宽度
    ul.style.width = ul.children.length*100+'%';
    for(var i=0; i<ul.children.length; i++) {
        ul.children[i].style.width = (1/ul.children.length)*100+'%';
    }
    //设置ol里面li的个数
    for(var i=0; i<ul.children.length-2; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';
    //添加自动播放效果, 利用css3的动画效果
    var index = 0;
    timer = window.setInterval(function() {
        index++;
        //给ul添加过渡效果;
        ul.style.transition = 'all .4s';
        ul.style.transform = 'translateX('+-index*w+'px)';
        
    }, 2000)
    ul.addEventListener('transitionend', function() {
        console.log(ul.children.length);
        if(index >= ul.children.length-2) {
            index =0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX('+-index*w+'px)';
        }else if(index < 0){
            index=2;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX('+-index*w+'px)'
        }
        
        console.log(index);
        //让下面的ol跟着变大和变小
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })
    //触摸移动,当鼠标触摸ul是停止自动播放
    var touchX = 0;
    ul.addEventListener('touchstart', function(e) {
        window.clearInterval(timer);
        //记录手指触摸时的坐标值
        touchX = e.targetTouches[0].pageX;
        
    })
    var moveX = 0;
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX-touchX;
        //阻止该事件的默认行为(移动式防止屏幕滚动)
        e.preventDefault();
        //将改值赋值给ul
        var x = moveX-index*w;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+x+'px)';
    })
    //根据手指离开是播放上一张还是下一张
    ul.addEventListener('touchend', function() {
        
        if(Math.abs(moveX)>50) {
            if(moveX>0) {
                index--;
            }else {
                index++;
            }
            ul.style.transition = 'all .4s';
            ul.style.transform = 'translateX('+-index*w+'px)';
        }else {
            ul.style.transition = 'all .4s';
            ul.style.transform = 'translateX('+-index*w+'px)';
        }
        //手指离开的时候需要重开定时器
        timer = window.setInterval(function(){
            index++;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX('+-index*w+'px)';
        },2000)
        console.log(index);
    })
})