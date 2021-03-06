(function () {
    $(function () {
        ybUtils.ybLog(cId, 29); 
        let start = ybUtils.getUrl("start");
        let end = ybUtils.getUrl("end");
        $(".header ul li:eq(2)").addClass('active');
        $("#query").on('click', function () {
            let start = $("#start").val();
            let end = $("#end").val();
            ybUtils.ybLog(cId, 30); 
            window.location.href = '/xiangtian/continuedCard?start=' + start + '&end=' + end;
        });
        $("#start").attr('value', start);
        $("#end").attr('value', end);
        $("#generate").on('click', function () {
            $("#generate i").show();
            var jsono = [];
            var ybData = JSON.parse($("#data").val());
            for (var i = 0; i < ybData.length; i++) {
                var obj = {
                    "id": ybData[i].id,
                    "姓名": ybData[i].name,
                    "电话": ybData[i].telphone,
                    "订奶种类": ybData[i].typeName,
                    "地址": ybData[i].address,
                    "订购日期": ybData[i].reserveTime,
                    "总数（瓶）": ybData[i].total,
                    "消耗（瓶）": ybData[i].consume,
                    "剩余（瓶）": ybData[i].total - ybData[i].consume,
                    "每天杯数": ybData[i].everyNum,
                    "周几送": ybData[i].weekSendOut,
                    "备注": ybData[i].remarks,
                    "收款人": ybData[i].payee,
                    "收款金额": ybData[i].money,
                    "收款时间": ybData[i].receivablesTime,
                }
                jsono.push(obj);
            }
            ybUtils.ybLog(cId, 31); 
            downloadExl(jsono);
        })
        var tmpDown; //导出的二进制对象
        function downloadExl(json, type) {
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = []; //获取keys
            //keyMap =Object.keys(json[0]);
            for (var k in tmpdata) {
                keyMap.push(k);
                json[0][k] = k;
            }
            var tmpdata = [];//用来保存转换好的json 
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            });
            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['mySheet'], //保存的表标题
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, //内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                        })
                }
            };
            tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
                { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
            ))], {
                    type: ""
                }); //创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            document.getElementById("hf").href = href; //绑定a标签
            document.getElementById("hf").click(); //模拟点击实现下载
            setTimeout(function () { //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
                $("#generate i").hide();
            }, 100);
        }

        function s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        function getCharCol(n) {
            let temCol = '',
                s = '',
                m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        }
    });
})();