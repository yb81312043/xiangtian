var ybUtils = {
    ybGet: function (url, fn) {
        $.ajax({
            type: "GET",
            timeout: 2000, //超时时间设置，单位毫秒
            url: url,
            dataType: "json",
            success: function (data) {
                if(data.isOk == 1){
                    fn(data);
                }else{
                    alert(data.msg)
                }
            },
            error: function (e) {
                alert(e)
            }
        });
    },
    ybPost: function (url, parame, fn) {
        $.ajax({
            type: "POST",
            timeout: 2000, //超时时间设置，单位毫秒
            url: url,
            data: parame,
            dataType: "json",
            success: function (data) {
                if(data.isOk == 1){
                    fn(data);
                }else{
                    alert(data.msg)
                }
            },
            error: function (e) {
                alert(e)
            }
        });
    }
}