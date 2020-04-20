window.onload = function() {
    //先获取目标元素
    var box = document.querySelector('.box');
    var ul = box.querySelector('ul');
    var right = document.querySelector('.right');
    var left = document.querySelector('.left');
    var ol = document.querySelector('.cricle');
    //console.log(box,ul);
    //动态设置ul的宽度 = 子元素*子元素的个数
    ul.style.width = (ul.children.length+1)*ul.children[0].offsetWidth+'px';
    //console.log(ul.children[0].offsetWidth);
    //当鼠标移动到box上让左右键隐藏和显示
    box.addEventListener('mouseenter', function() {
        right.style.display = 'block';
        left.style.display = 'block';
        window.clearInterval(timer);
        timer = null;
    })
    box.addEventListener('mouseleave', function() {
        right.style.display = 'none';
        left.style.display = 'none';
        timer = window.setInterval(function(){
            right.click();
        },1500)
    })
    // 动态设置轮播图下面的小圆圈 和添加点击事件
    var cri = 0;
    for(var i=0; i<ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index',i)
        ol.appendChild(li);
        li.addEventListener('click', function() {
            //排他思想
            for(var i=0; i<ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //移动图片
            var index = this.getAttribute('data-index');
            num = index;
            show(ul,-index*box.offsetWidth);
        })
    }
    ol.children[0].className = 'current';

    //给left和right添加点击事件
    //在外面定一个变量，来记录点击的次数
    //无缝链接  克隆
    var last = ul.children[0].cloneNode(true);
    ul.appendChild(last);
    var num = 0;
    var num2 = 0;
    var flag = true;
    right.addEventListener('click', function() {
        if(flag) {
            flag = false;
            //如何让下面的ol随着点击而改变

            //每次点击让ul移动一次
            if(num == ol.children.length) {
                ul.style.left = 0+'px';
                num=0;
            }
            num++;
            show(ul,-num*box.offsetWidth, function() {
                flag = true;
            });
            //排他思想
            for(var i=0; i<ol.children.length;i++) {
                ol.children[i].className='';
            }
            if(num == ol.children.length) {
                num2=0;
            }else {
                num2 = num;
            }
            
            ol.children[num2].className = 'current';
        }
    })
    left.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == 0) {
                ul.style.left = -ol.children.length*box.offsetWidth+'px';
                num = ol.children.length;
            }
            num--;
            show(ul,-num*box.offsetWidth,function() {
                flag = true;
            });
            for(var i=0; i<ol.children.length;i++) {
                ol.children[i].className='';
            }
            
            num2 = num;
            
            ol.children[num2].className = 'current';
        }
    })
    //自动轮播
    var timer = window.setInterval(function(){
        right.click();
    },1500)
    
}