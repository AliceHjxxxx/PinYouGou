window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function() {

        mask.style.display = 'block';
        big.style.display = 'block';

    })
    preview_img.addEventListener('mousemove', function(e) {

        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片移动距离=遮挡层移动距离*大图片最大移动的距离/遮挡层的最大移动距离
        var bigImg = document.querySelector('.bigImg');
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        var bigX = maskX * bigMaxX / maskMaxX;
        var bigY = maskY * bigMaxY / maskMaxY;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';


    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';


    })
})
$(function() {
    $(".detail_tab_list li").click(function() {
        $(this).addClass("current").siblings().removeClass("current");
        var index = $(this).index();
        $(".detail_tab_con .item").eq(index).show().siblings().hide();
    })
})