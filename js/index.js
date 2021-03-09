window.addEventListener('load', function() {
    //获取元素

    var prev = document.querySelector('.prev');
    var promo = document.querySelector('.promo');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var circle = 0;
    var num = 0;
    var flag = true;
    // 节流阀，当点击li会滚动到相应楼层，就会触发滚动事件，li元素遍历一层才会到相应位置
    var flat = true;
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }

    $(window).scroll(function() {
        // 打开页面就要判断一次页面的位置
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名


        if (flat) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();

                }
            })
        }



    });
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flat = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flat = true;
        });
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
    focus.addEventListener('mouseenter', function() {
        prev.style.display = 'block';
        promo.style.display = 'block';
        clearInterval(timer);
        timer = null;

    })
    focus.addEventListener('mouseleave', function() {
        prev.style.display = 'none';
        promo.style.display = 'none';
        timer = setInterval(function() {
            promo.click();
        }, 3000)
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.scroll');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 就当前小圆圈的索引号 通过自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面第一个小li设置为类名为current
    ol.children[0].className = 'current';
    // 克隆第一张图片放到ul后面,在生成小圆圈之后再克隆第一张图片,小圆圈不会增多
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    promo.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 节流阀打开
                flag = true;

            });
            circle++;
            //先清除其余小圆圈的current名;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    prev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.right = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                // 节流阀打开
                flag = true;

            });
            circle--;
            //先清除其余小圆圈的current名;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }

        ol.children[circle].className = 'current';

    }
    var timer = setInterval(function() {
        // 自动触发点击事件
        promo.click();
    }, 3000)
})