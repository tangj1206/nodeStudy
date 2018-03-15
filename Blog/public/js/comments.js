$(function () {
    var perpage = 2;
    var page = 1;
    var pages = 0;
    var comments = [];

    //每次页面重载的时候获取一下该文章的所有评论
    $.ajax({
        type: 'GET',
        url: '/api/comment',
        data: {
            contentId: $('#contentId').val()
        },
        success: function (res) {
            comments = res.data.reverse();
            renderComment();
        }
    })

    //提交评论
    $('#messageBtn').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/api/comment/post',
            data: {
                contentId: $('#contentId').val(),
                content: $('#messageContent').val()
            },
            success: function (res) {
                comments = res.data.comments.reverse();
                $('#messageContent').val('');
                renderComment();
            }
        })
    })

    $('.pager').delegate('a','click',function () {
        if ($(this).parent().hasClass('previous')) {
            page--;
        }else{
            page++;
        }
        renderComment();
    })

    function renderComment() {

        $('#messageCount').html(comments.length);

        pages =Math.max(1, Math.ceil(comments.length / perpage));
        var start =Math.max(0, (page-1) * perpage);
        var end =Math.min( start + perpage, comments.length);

        var $li = $('.pager li');
        $li.eq(1).html(page + '/' + pages);

        if (page <= 1) {
            page = 1;
            $li.eq(0).html('<span>没有上一页了</span>');
        }else{
            $li.eq(0).html('<a href="javascript:;">上一页</a>');
        }
        if (page >= pages) {
            page=pages;
            $li.eq(2).html('<span>没有上一页了</span>');
        }else{
            $li.eq(2).html('<a href="javascript:;">下一页</a>');
        }

        if (comments.length == 0) {
            $('#messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
        } else {
            var html = '';
        for (let i = start; i < end; i++) {
            html += `<div class="messageBox">
                        <p class="name clear">
                            <span class="fl">`+comments[i].username+`</span>
                            <span class="fr">`+formatDate(comments[i].postTime)+`</span>
                        </p>
                        <p>`+comments[i].content+`</p>
                    </div>`;
        }
        }

        
        $('#messageList').html(html);
    }

    function formatDate(d) {
        var date1 = new Date(d);
        return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate() + '日' + 
        date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
    }
})