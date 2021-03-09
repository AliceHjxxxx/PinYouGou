$(function() {

    // 为输入框绑定keyup事件
    $('#ipt').on("keyup", function() {
        var keywords = $(this).val().trim()
        if (keywords.length <= 0) {
            $('.hotwords').show();
            return $('#suggest-list').empty().hide();

        }
        // 获取建议列表
        console.log(keywords);
        getSuggestList(keywords);
        $('.hotwords').hide();

    })

    function getSuggestList(kw) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function(res) {
                console.log(res)
                renderSuggestList(res)

            }
        })
    }
    // 渲染UI结构
    function renderSuggestList(res) {
        if (res.result.length <= 0) {
            return $('#suggest-list').empty().hide()
        }
        var htmlStr = template('tpl-suggestlist', res)

        $('#suggest-list').html(htmlStr).show()
    }
})