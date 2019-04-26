// 拖拽开始
function drag(e) {
    e.dataTransfer.effectAllowed="link";
    e.dataTransfer.setData("text/plain", e.target.id);
}

// 拖拽结束
function drop(e) {
    allowDrop(e);
    var data = e.dataTransfer.getData("text");
    if (e.target.tagName == "DIV") {
        e.target.appendChild(document.getElementById(data));
    }
}

// 是否允许拖拽
function allowDrop(e) {
    // 通知浏览器不再执行事件相关的默认动作
    e.preventDefault();
    // 阻止事件冒泡
    e.stopPropagation();
}