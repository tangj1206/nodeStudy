$(function () {

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