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
        var html = '';
        for (let i = 0; i < comments.length; i++) {
            html += `<div class="messageBox">
                        <p class="name clear">
                            <span class="fl">`+comments[i].username+`</span>
                            <span class="fr">`+comments[i].postTime+`</span>
                        </p>
                        <p>`+comments[i].content+`</p>
                    </div>`;
        }
        $('#messageList').append(html);
    }
})