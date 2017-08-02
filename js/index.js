$(function () {
    // 获取所有人员信息
    getAllInfo();

    // 为添加按钮添加点击事件
    $('.add').click(function (e) {
        e.preventDefault();

        var $parent = $(this).parent();
        var $input = $parent.find('input[type="text"]');
        var info = {
            name: $input[0].value,
            number: $input[1].value,
            phone: $input[2].value
        };

        if (checkInfo(info)) {
            sendRequest('info/add', 'POST', info, function (data) {
                if (data.status == 1) {
                    window.location.reload(true);
                }
            });
        }
    });
});

function createInfo(data) {
    // 创建HTML结构
    var $infoHTML = $('\
        <li class="item" data-id="' + data.id + '">\
            <span>' + data.name + '</span>\
            <input type="text" spellcheck="false" placeholder="姓名" style="display: none;" value="' + data.name + '" />\
            <span>' + data.number + '</span>\
            <input type="text" spellcheck="false" placeholder="学号" style="display: none;" value="' + data.number + '" />\
            <span>' + data.phone + '</span>\
            <input type="text" spellcheck="false" placeholder="手机号码" style="display: none;" value="' + data.phone + '" />\
            <button type="button" class="modify">修改</button>\
            <button type="button" class="complete" style="display: none;">完成</button>\
            <button type="button" class="delete">删除</button>\
        </li>\
        ');

    $('ul.container').append($infoHTML);

    // 为修改，完成，删除按钮添加点击事件
    $('.modify:eq(-1)').click(function () {
        var $parent = $(this).parent();

        $(this).css('display', 'none');
        $parent.find('span').css('display', 'none');
        $parent.find('.complete').css('display', 'inline-block');
        $parent.find('input').css('display', 'block');

    });
    $('.complete:eq(-1)').click(function () {
        var $parent = $(this).parent();

        var info = {
            id: $parent.attr('data-id'),
            name: $parent.find('input:eq(0)').val(),
            number: $parent.find('input:eq(1)').val(),
            phone: $parent.find('input:eq(2)').val()
        };

        if (checkInfo(info)) {
            sendRequest('info/modify', 'POST', info, function (data) {
                if (data.status == 1) {
                    window.location.reload(true);
                }
            });

            $(this).css('display', 'none');
            $parent.find('span').css('display', 'block');
            $parent.find('.modify').css('display', 'inline-block');
            $parent.find('input').css('display', 'none');
        }
    });
    $('.delete:eq(-1)').click(function () {
        var $parent = $(this).parent();
        console.log($(this));
        sendRequest('info/delete', 'POST', { id: $parent.attr('data-id') }, function (data) {
            if (data.status == 1) {
                window.location.reload(true);
            }
        });
    });
}

function sendRequest(path, type, data, cb) {
    $.ajax({
        url: 'http://localhost:8888/' + path,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            cb.call(null, data);
        },
        error: function (err) {
            alert("errorStatus: " + err.status);
        }
    });
}

/**
 * 获取所有信息
 */
function getAllInfo() {
    sendRequest('info/all', 'POST', {}, function (data) {
        data.data.forEach(function (item) {
            createInfo(item);
        });
    });
}

/**
 * 验证输入字段
 */
function checkInfo(data) {
    var numberPattern = /^U20\d{7}$/;
    var phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^1[3|4|5|6|7|8|9][0-9]{9}$)/;
    var flag = false;

    if (!data.name) {
        alert('请输入姓名');
    }
    else if (!data.number) {
        alert('请输入学号');
    }
    else if (!numberPattern.test(data.number)) {
        alert('请输入正确的学号');
    }
    else if (!data.phone) {
        alert('请输入手机号码');
    }
    else if (!phonePattern.test(data.phone)) {s
        alert('请输入正确的手机号码');
    }
    else {
        flag = true;
    }

    return flag;
}