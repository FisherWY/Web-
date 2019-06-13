var picSrc = null
var newsTitle = null
var newsDetail = null

var data = [
	{
		"title": "恭喜马刺夺得19-20赛季NBA总冠军",
		"detail": "经过4轮艰苦卓绝的比赛之后，马刺获得了19-20赛季NBA总冠军！"
	},
	{
		"title": "SLC Summer League Announces Game Schedule",
		"detail": "SALT LAKE CITY (May 22, 2019) – Organizers announced today the schedule of daily doubleheaders for the Salt Lake City Summer League presented by University of Utah Health and the Utah Sports Commission on July 1-3 at Vivint Smart Home Arena."
	},
	{
		"title": "SPURS HOST FAN APPRECIATION NIGHT IN FINAL GAME OF THE REGULAR SEASON",
		"detail": "SAN ANTONIO (April 4, 2019) – The San Antonio Spurs will thank their faithful followers with Fan Appreciation Night during the last game of the regular season on Wednesday, April 10 vs. the Dallas Mavericks. All attendees will receive Spurs sunglasses, while hundreds of items from official Spurs partners will be given to supporters throughout the game. Tipoff is set for 7 p.m."
	},
	{
		"title": "SPURS VS. NUGGETS GAME 6 PLAYOFFS TICKETS ON SALE NOW",
		"detail": "SAN ANTONIO (April 20, 2019) – Tickets for Game 6 in the best-of-seven first round NBA Playoffs series between the San Antonio Spurs and Denver Nuggets are on sale now. The series is tied 2-2 and the Spurs will host the Nuggets at the AT&T Center on Thursday, April 25 for Game 6. A time for tipoff is 7:00 PM. The Spurs 2019 Playoffs are presented by H-E-B."
	},
	{
		"title": "SPURS TO OPEN NEW FAN SHOP LOCATION AT THE SHOPS AT LA CANTERA",
		"detail": "SAN ANTONIO (April 5, 2019) – The San Antonio Spurs and Aramark announced today that the partners will open a new Spurs Fan Shop location, at The Shops at La Cantera on San Antonio’s Northwest side, on Saturday, April 6 at 10 a.m. The store’s grand opening and a free Spurs Playoffs tipoff party will officially christen the new retail location on Friday, April 12."
	}
]

window.onload = function() {
	// 获得当前url的传参
	var url = window.location.search;
	// 将参数解析
	var args = url.substring(1, url.length).split("&");

	newsTitle = document.getElementById('newsTitle')
	newsDetail = document.getElementById('newsDetail')
	picSrc = document.getElementById('newsImg')

	var pic = args[0].split("=")[1]
	var no = args[1].split("=")[1]
	console.log(no)
	
	picSrc.src = "./img/" + pic
	newsTitle.innerHTML = data[no].title
	newsDetail.innerHTML = data[no].detail
}

function exit() {
	window.location = "./login.html"
}