window.setInterval("updateTime()",1000);

function updateTime() {
	var date = new Date();
	var imgSrc0 = "./img/";
	var imgSrc1 = ".jpg";

	var yearTime = date.getFullYear();
	var monthTime = date.getMonth() + 1;
	var dayTime = date.getDate();
	var hourTime = date.getHours();
	var minTime = date.getMinutes();
	var secTime = date.getSeconds();

	// 更新年
	for (var i = 0; i < 4; i++) {
		var year = document.getElementById('year'+(3-i));
		year.src = imgSrc0 + yearTime%10 + imgSrc1;
		yearTime = Math.floor(yearTime/10);
	}
	// 更新月
	for (var i = 0; i < 2; i++) {
		var month = document.getElementById('month'+(1-i));
		month.src = imgSrc0 + monthTime%10 + imgSrc1;
		monthTime = Math.floor(monthTime/10);
	}
	// 更新日
	for (var i = 0; i < 2; i++) {
		var day = document.getElementById('day'+(1-i));
		day.src = imgSrc0 + dayTime%10 + imgSrc1;
		dayTime = Math.floor(dayTime/10);
	}
	// 更新时
	for (var i = 0; i < 2; i++) {
		var hour = document.getElementById('hour'+(1-i));
		hour.src = imgSrc0 + hourTime%10 + imgSrc1;
		hourTime = Math.floor(hourTime/10);
	}
	// 更新分
	for (var i = 0; i < 2; i++) {
		var min = document.getElementById('min'+(1-i));
		min.src = imgSrc0 + minTime%10 + imgSrc1;
		minTime = Math.floor(minTime/10);
	}
	// 更新秒
	for (var i = 0; i < 2; i++) {
		var sec = document.getElementById('sec'+(1-i));
		sec.src = imgSrc0 + secTime%10 + imgSrc1;
		secTime = Math.floor(secTime/10);
	}
}