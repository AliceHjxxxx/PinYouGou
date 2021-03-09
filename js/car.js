$(function() {
    // 全不选功能模块
    $(".checkall").change(function() {
        // 将全选选按钮的状态赋值给三个小按钮
        $(".checkall,.j-checkbox").prop("checked", $(this).prop("checked"));
        if ($(".checkall").prop('checked') == true) {
            getSum();
            // 让所有的商品添加类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".amount-sum em").text(0);
            $(".price-sum em").text("￥" + 0);
            $(".cart-item").removeClass("check-cart-item")
        }
    })
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked") == true) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        }
        if ($(this).prop("checked") == false) {
            $(this).parents(".cart-item").removeClass("check-cart-item");

        }
        getSum();
    })
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));
        getSum();

    })
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) { return 0; }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));

        getSum();
    })
    $(".itxt").change(function() {
            var n = $(this).val();
            if (n == 0 || n == "") {
                alert("商品件数无效！")
                $(this).val(1);
                n = 1;
            }
            var p = $(this).parents(".p-num").siblings(".p-price").text();
            p = p.substr(1);
            $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));
            getSum();
        })
        // 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function(i, ele) {
            if ($(ele).parents(".p-num").siblings(".p-checkbox").children(".j-checkbox").prop("checked") == true)
                count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            if ($(ele).siblings(".p-checkbox").children(".j-checkbox").prop("checked") == true)
                money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();

    })
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();

    })
})