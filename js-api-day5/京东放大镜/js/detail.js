window.onload = function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var f = null
    preview_img.addEventListener('mouseover', function(e) {
        mask.style.display = 'block';
        big.style.display = 'block';
        preview_img.addEventListener('mousemove', f)
        f = function (e) {
            var x = e.pageX - preview_img.offsetLeft;
            var y = e.pageY - preview_img.offsetTop;
    
            var top = y-mask.offsetHeight/2;
            var left = x-mask.offsetWidth/2;
            if(left<= 0){
                left = 0;
            }else if(left>= this.offsetWidth-mask.offsetWidth){
                left = this.offsetWidth-mask.offsetWidth
            }
            if(top<= 0){
                top = 0;
            }else if(top>= this.offsetWidth-mask.offsetWidth){
                top = this.offsetHeight-mask.offsetHeight
            }
            mask.style.top = top+'px';
            mask.style.left = left+'px';
            console.log(x,y);
        }
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
        preview_img.removeEventListener('mousemove', f);
    })
    
}