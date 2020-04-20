window.addEventListener('load', function() {
    //获取元素
    var box = document.querySelector('.box');
    var content = document.querySelector('.content');
    var focus = document.querySelectorAll('.focus');
    var ol = document.querySelector('.point');
    arrow_r = document.querySelector('.arrow-r');
    arrow_l = document.querySelector('.arrow-l');
    //设置结构和样式
    var w = box.offsetWidth;
    for(var i=0; i<focus.length; i++) {
        var li = document.createElement('li');
        //给每个li添加自定义属性
        li.setAttribute('data-index', i);
        ol.append(li);
        //点击每个小li来移动content,
        li.addEventListener('click', function() {
            index = this.getAttribute('data-index');
            animat(content, -index*w);
            for(var i=0; i<ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
        })
    }
    ol.children[0].className='current';
    var fristNode = focus[0].cloneNode(true);
    content.append(fristNode);
    content.style.width = content.children.length*100+'%';
    for(var i=0; i<content.children.length; i++) {
        content.children[i].style.width = 1/content.children.length*100+'%';
    }

    //当鼠标移动到box上 arrow显示和隐藏
    box.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标移进是，禁止自动播放
        window.clearInterval(f);
        f = null;
    })
    box.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标移进是，开启自动播放
        f = window.setInterval(function() {
            arrow_r.click();
        }, 1500)
    })
    
    //当鼠标点击左右箭头时，切换图片
    var index=0;
    arrow_r.addEventListener('click', function() {
        if(index >= ol.children.length) {
            index=0;
            content.style.left = 0;
        }
        index++;
        animat(content, -index*w);
        //下面的小圆圈也需要跟着一起移动
        var num = index>=4?0:index;
        for(var i=0; i<ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[num].className = 'current';
    })
    arrow_l.addEventListener('click', function() {
        if(index<=0) {
            index=ol.children.length;
            content.style.left = -index*w+'px';
        }
        index--;
        animat(content, -index*w);
        var num = index>=4?0:index;
        for(var i=0; i<ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[num].className = 'current';
    })
    //自动播放
    var f = window.setInterval(function(){
        arrow_r.click();
    }, 1500)

})