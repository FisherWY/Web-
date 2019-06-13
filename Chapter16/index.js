var ajax = null
var GetMethod = "GET"
var Url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=10&w="

window.onload = function() {
	init()
}

function init() {
	if (window.XMLHttpRequest) {
		// IE 7+, FireFox, Chrome, Opera, Safari, Edge
		ajax = new XMLHttpRequest()
	} else {
		// IE6,5 support
		ajax = new ActiveXObject("Microsoft.XMLHTTP")
	}

	// 设置请求回调
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status==200) {
			var res = JSON.parse(ajax.responseText.substring(9,ajax.responseText.length-1))
			console.log(res)
			result(res)
			return
		} else {
			// alert("浏览器阻止了跨域请求，需要禁用浏览器跨域安全策略")
		}
		if (ajax.readyState == 4) {
			alert("浏览器阻止了跨域请求，需要禁用浏览器跨域安全策略")
		}
	}
}

function search() {
	var data = Url + document.getElementById('StudentNO').value
	ajax.open(GetMethod, data, true)
	ajax.setRequestHeader("Content-Type", "application/x-javascript;charset=utf-8")
	ajax.setRequestHeader("Accept", "*/*")
	ajax.send()
}

function result(res) {
	var table = document.getElementById('ResultTable')
	// 清空表格
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i)
	}

	// 插入搜索结果
	var list = res.data.song.list
	for (var i = 0; i < list.length; i++) {
		// 插入一行
		var row = table.insertRow(table.rows.length)
		// 插入列
		var songname = row.insertCell(0)
		var albumname = row.insertCell(1)
		var singer = row.insertCell(2)
		var url = row.insertCell(3)
		// 赋值
		songname.innerHTML = list[i].songname
		albumname.innerHTML = list[i].albumname
		singer.innerHTML = list[i].singer[0].name
		if (list[i].songurl != "" && list[i].songurl != undefined) {
			url.innerHTML = "<a href='" + list[i].songurl + "'>链接</a>"
		} else {
			url.innerHTML = "暂无链接"
		}
		
	}
}