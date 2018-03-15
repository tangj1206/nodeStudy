$(function () {
    //每次页面重载的时候获取一下该文章的所有评论
    $.ajax({
        type: 'GET',
        url: '/api/comment',
        data: {
            contentId: $('#contentId').val()
        },
        success: function (res) {
            renderComment(res.data.reverse());
        }
    })


    var perpage = 2;
    var page = 1;
    var pages = 0;

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
                $('#messageContent').val('');
                renderComment(res.data.comments.reverse());
            }
        })
    })


    function renderComment(comments) {

        $('#messageCount').html(comments.length);

        var pages = Math.ceil(comments.length / perpage);
        var start = (page-1) * perpage;
        var end = start + perpage;

        var $li = $('.pager li');
        $li.eq(1).html(page + '/' + pages);

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
        $('#messageList').html(html);
    }

    function formatDate(d) {
        var date1 = new Date(d);
        return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate() + '日' + 
        date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
    }
})