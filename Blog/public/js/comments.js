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
                console.log(res);
            }
        })
    })

})