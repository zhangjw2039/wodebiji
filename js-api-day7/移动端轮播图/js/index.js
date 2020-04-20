//移动端动画js
window.addEventListener('load', function() {
    //获取元素
    var box = document.querySelector('.box');
    var content = document.querySelector('.content');
    var focus = document.querySelectorAll('.focus');
    var ol = document.querySelector('.point');
    //设置结构和样式
        //设置小点样式
    for(var i=0; i<content.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';
    var fristNode = focus[0].cloneNode(true);
    var lastNode = focus[focus.length-1].cloneNode(true);
    content.insertBefore(lastNode, content.children[0]);
    content.appendChild(fristNode);
        
        //设置宽度和高度
    content.style.width = content.children.length*100+'%';
    for(var i=0; i<content.children.length; i++) {
        content.children[i].style.width = 1/content.children.length*100+'%';
    }

    //实现自动播放的效果
    var w = box.offsetWidth;
    var index = 0;
    var f = window.setInterval(function() {
        index++;
        content.style.transition = 'all .3s';
        content.style.left = -index*w+'px';
    }, 2000)

    //给content添加事件结束事件
    content.addEventListener('transitionend', function() {
        if(index >= ol.children.length) {
            index=0;
        }else if(index<=0) {
            index = 2;
        }
        content.style.transition = '';
        content.style.left = -index*w+'px';
        //给ol中的li添加效果
        document.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    //给content添加华东效果 当手机在上面的是禁止自动播放
    var startX = 0;
    var flag = false;
    content.addEventListener('touchstart', function(e) {
        window.clearInterval(f);
        f = null;
        startX = e.targetTouches[0].pageX;
    })
    
    content.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var moveX = e.targetTouches[0].pageX - startX;
        content.style.left = -index*w+moveX+'px';
        flag = true;
    })
    content.addEventListener('touchend', function(e) {
        //优化代码，如果当手机没有移动时不需要执行以下代码
        if(flag) {
            var endX = e.changedTouches[0].pageX;
            var x = endX - startX;
            if(Math.abs(x)>50) {
                if(x>0) {
                    index--;
                }else if(x<0) {
                    index++;
                }
            }
            content.style.transition = 'all .3s'
            content.style.left = -index*w+'px';
            
        }

        //当手指离开之后再继续播放
        window.clearInterval(f);
        f = window.setInterval(function() {
            index++;
            content.style.transition = 'all .3s';
            content.style.left = -index*w+'px';
        }, 2000)
    })
})