onload = function() {
    //获取元素
    var right = document.querySelector('.right');
    var bg = document.querySelector('.bg');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.big img');
    //当鼠标移动到right的时候 bg和big显示和隐藏
    right.addEventListener('mouseenter', function(e) {
        bg.style.display='block';
        big.style.display='block';
    })
    right.addEventListener('mouseleave', function(e) {
        bg.style.display = 'none';
        big.style.display = 'none';
    })

    //当鼠标在right移动的时候，bg跟着一起移动
    right.addEventListener('mousemove', function(e) {
        var x = e.pageX-right.offsetLeft-bg.offsetWidth/2;
        var y = e.pageY-right.offsetTop-bg.offsetHeight/2;
        //console.log(x,y);
        //防止bg移动到外面需要加判断
        if(x<0) {
            x=0;
        }else if(x>right.clientWidth-bg.offsetWidth) {
            x=right.clientWidth-bg.offsetWidth
        }
        if(y<0) {
            y=0;
        }else if(y>right.clientHeight-bg.offsetHeight) {
            y=right.clientHeight-bg.offsetHeight;
        }
        
        bg.style.left = x+'px';
        bg.style.top = y+'px';
        //当bg移动的时候big里面的图片也要跟着一起移动
        bigImg.style.left = -x*(bigImg.offsetWidth-big.clientWidth)/(right.clientHeight-bg.offsetHeight)+'px';
        bigImg.style.top = -y*(bigImg.offsetHeight-big.clientHeight)/(right.clientHeight-bg.offsetHeight)+'px';
    })
}