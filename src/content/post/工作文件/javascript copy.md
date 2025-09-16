---
title: Javascript1
description: axure交互
dateFormatted: "2024-06-05"
---


###### Axure侧边栏加信息
`(window.parent.document).find('#sitemapHeader').append("<img src="+url+"/>");`
###### 中继器标签颜色
```js
javascript: 
$axure('#u1-[[Item.index]]').css({'color':'[[Item.color]]'});
$axure('#u1-[[Item.index]]_div').css({'background-color':'[[Item.bg_color]]','border':'1px solid [[Item.bd_color]]'});
```

###### 固定元件位置
```js
javascript: $('[data-label="your_DP_name"]').css('position', 'fixed'); $(window).scroll(function(event) { $('[data-label="your_DP_name"]').css("margin-left", -$(document).scrollLeft()); });
```

###### 文本超长省略号
```js
javascript: $('[data-label="your_DP_name"] span').css({'display':'-webkit-box', '-webkit-box-orient':'vertical','-webkit-line-clamp':'2','overflow':'hidden','text-overflow':'ellipsis'});
```

###### axure毛玻璃背景
设置元件样式为mohu
```js
javascript:  $('<style> .mohu div{ backdrop-filter: saturate(180%) blur(16px) !important; background: linear-gradient(180deg, rgb(232 243 255 / 80%) 4%, rgb(247 248 250 / 90%) 100%)!important; } </style>').appendTo('head');
```
```js
javascript: $('[data-label="mohu"] div').css({'backdrop-filter':'saturate(180%) blur(16px)', 'background':'linear-gradient(180deg, rgb(232 243 255 / 80%) 4%, rgb(247 248 250 / 90%) 100%)'});
```

###### 自定义图片颜色
```js
data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='100%' height='100%' fill='[[Item.color.replace('#','%23')]]' /></svg>
```

###### 禁用浏览器右键
```js
javascript:window.oncontextmenu=e=>e.preventDefault()
```

###### 获取中继器数据
```js
javascript:
// 获取中继器数据
var $ax;
$axure.internal(function(ax) {
    $ax = ax;
});

function getRepeater(repeaterId) {
    var repeater;
    $axure(function(obj) {
        return obj.type == 'repeater';
    }).each(function(obj, id) {
        if (id == repeaterId) {
            repeater = obj;
        }
    });
    return repeater;
}

function getIDfromAxureName(axureName) {
    return $axure('@' + axureName).getElementIds()[0];
}

function getRepeaterData(axureName) {
    var repeaterId = getIDfromAxureName(axureName);
    var ids = $ax.repeater.getAllItemIds(repeaterId);
    var columns = getRepeater(repeaterId).dataProps;
    rows = [];
    for (var i = 0, il = ids.length; i < il; i++) {
        var row = {};
        for (var j = 0, jl = columns.length; j < jl; j++) {
            var name = columns[j].toLowerCase();
            var id = ids[i];
            if ((typeof (id) == 'string') && (id.indexOf('-') != -1))
                id = $ax.repeater.getItemIdFromElementId(id);
            var value = $ax.repeater.getData({}, repeaterId, ids[i], name, 'data');
            if (typeof (value) == 'object') {
                value = $ax.deepCopy(value);
                if (value.type === undefined)
                    value.type = 'text';
                row[name] = value;
            } else {
                row[name] = {
                    type: 'text',
                    text: value
                };
            }
        }
        rows.push(row);
    }
    return rows;
}
var repeaterdata = getRepeaterData('Rep1');
console.log(repeaterdata);

```

设为全局函数方便调用
```js

// 获取数据并导出为 CSV 设为全局函数
window.exportCSV = function () {
    // 数据
    let data = $axure('@Topology').getRepeaterData({ format: 'default' });
  
    // 构建 CSV 数据
    var csvContent = "data:text/csv;charset=utf-8,"
        + Object.keys(data[0]).join(",") + "\n"; // 添加表头
  
    data.forEach(function (row) {
        var rowData = [];
        for (var key in row) {
            if (row.hasOwnProperty(key)) {
                rowData.push(row[key].text);
            }
        }
        csvContent += rowData.join(",") + "\n";
    });
  
    // 创建一个链接并下载 CSV 文件
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    console.log(data);
  
    link.click(); // 模拟点击链接进行下载
  }
```

###### 获取中继器数据并导出csv
```js
javascript: var $ax;

$axure.internal(function (ax) {

$ax = ax;

});

function getRepeater(repeaterId) {

var repeater;

$axure(function (obj) {

return obj.type == "repeater";

}).each(function (obj, id) {

if (id == repeaterId) {

repeater = obj;

}

});

return repeater;

}

function getIDfromAxureName(axureName) {

return $axure("@" + axureName).getElementIds()[0];

}

function getRepeaterData(axureName) {

var repeaterId = getIDfromAxureName(axureName);

var ids = $ax.repeater.getAllItemIds(repeaterId);

var columns = getRepeater(repeaterId).dataProps;

rows = [];

for (var i = 0, il = ids.length; i < il; i++) {

var row = {};

for (var j = 0, jl = columns.length; j < jl; j++) {

var name = columns[j].toLowerCase();

var id = ids[i];

if (typeof id == "string" && id.indexOf("-") != -1)

id = $ax.repeater.getItemIdFromElementId(id);

var value = $ax.repeater.getData({}, repeaterId, ids[i], name, "data");

if (typeof value == "object") {

value = $ax.deepCopy(value);

if (value.type === undefined) value.type = "text";

row[name] = value;

} else {

row[name] = { type: "text", text: value };

}

}

rows.push(row);

}

return rows;

}

var data = getRepeaterData("material");

var csvContent =

"data:text/csv;charset=utf-8," + Object.keys(data[0]).join(",") + "\n";

data.forEach(function (row) {

var rowData = [];

for (var key in row) {

if (row.hasOwnProperty(key)) {

rowData.push(row[key].text);

}

}

csvContent += rowData.join(",") + "\n";

});

var encodedUri = encodeURI(csvContent);

var currentTime = new Date().toISOString().replace(/[:.]/g, "-");

var fileName = "物资清单-" + currentTime + ".csv";

var link = document.createElement("a");

link.setAttribute("href", encodedUri);

link.setAttribute("download", fileName);

document.body.appendChild(link);

link.click();
```
###### 打开全屏
```js
javascript:
function requestFullScreen(element) {
    var de = document.querySelector(element) || document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
requestFullScreen();
```
###### 退出全屏
```js
javascript:
function exitFull() { 
    var exitMethod = document.exitFullscreen || 
    document.mozCancelFullScreen || 
    document.webkitExitFullscreen || 
    document.webkitExitFullscreen; 
    if (exitMethod) {
        exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
        }
    }
};
exitFull();
```

###### 一键复制
```js
javascript:
 function copyToClipboard(s) {
            if (window.clipboardData) {
                window.clipboardData.setData('text', s);
            } else {
                (function(s) {
                    document.oncopy = function(e) {
                        e.clipboardData.setData('text', s);
                        e.preventDefault();
                        document.oncopy = null;
                    }
                })(s);
                document.execCommand('Copy');
            }
        }
copyToClipboard('[[LVAR1]]');
```

```js
javascript: var columnItemId = $axure('@form input').getElementIds(); var columnWgtId = columnItemId[[[Item.index-1]]]; document.getElementById(columnWgtId).setAttribute('type','[[item.type]]')
```

```js
javascript: var $ax; $axure.internal(function(ax) {     $ax = ax; });  function getRepeater(repeaterId) {     var repeater;     $axure(function(obj) {         return obj.type == 'repeater';     }).each(function(obj, id) {         if (id == repeaterId) {             repeater = obj;         }     });     return repeater; }  function getIDfromAxureName(axureName) {     return $axure('@' + axureName).getElementIds()[0]; }  function getRepeaterData(axureName) {     var repeaterId = getIDfromAxureName(axureName);     var ids = $ax.repeater.getAllItemIds(repeaterId);     var columns = getRepeater(repeaterId).dataProps;     rows = [];     for (var i = 0, il = ids.length; i < il; i++) {         var row = {};         for (var j = 0, jl = columns.length; j < jl; j++) {             var name = columns[j].toLowerCase();             var id = ids[i];             if ((typeof (id) == 'string') && (id.indexOf('-') != -1))                 id = $ax.repeater.getItemIdFromElementId(id);             var value = $ax.repeater.getData({}, repeaterId, ids[i], name, 'data');             if (typeof (value) == 'object') {                 value = $ax.deepCopy(value);                 if (value.type === undefined)                     value.type = 'text';                 row[name] = value;             } else {                 row[name] = {                     type: 'text',                     text: value                 };             }         }         rows.push(row);     }     return rows; } var data = getRepeaterData('material'); var csvContent = "data:text/csv;charset=utf-8," + Object.keys(data[0]).join(",") + "\n";  data.forEach(function (row) { var rowData = []; for (var key in row) {     if (row.hasOwnProperty(key)) {         rowData.push(row[key].text);     } } csvContent += rowData.join(",") + "\n"; });  var encodedUri = encodeURI(csvContent); var link = document.createElement("a"); link.setAttribute("href", encodedUri); link.setAttribute("download", "物资清单.csv"); document.body.appendChild(link);  link.click();
```
```
[[(Item.value/((Item.max-Item.min)/(Item.width-10))).toFixed(1)]]
[[((Math.abs(this.x)*((Item.max-Item.min)/(Item.width-20))).toFixed(1)]]

```
[[中继器]]