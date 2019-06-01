var myvedio = null
var playtag = null
var volumetag = null

var slider = {
	use: function(id) {
		var self = this
		self.slider = document.getElementById(id)
		self.bar = self.slider.querySelector('.progress-bar')
		self.thumb = self.slider.querySelector('.progress-thumb')
		self.slider.addEventListener('mousedown', function(e) {
			if (e.button == 0) {
				self.mDown = true
				if (!self.inited) {
					self.beginX = e.offsetX
					self.positionX = e.offsetX
					self.beginClientX = e.clientX
					self.sliderLong = parseInt(self.getStyle(self.slider, 'width'))
					var per = parseInt(self.positionX / self.sliderLong * 100)
					self.bar.style.width = per + '%'
				}
				self.inited = true
			}
		})
		document.addEventListener('mousemove', function(e) {
			if (self.mDown) {
				var moveX = e.clientX - self.beginClientX
				self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX
				var per = parseInt(self.positionX / self.sliderLong * 100)
				self.bar.style.width = per +'%'
				myvedio.currentTime = myvedio.duration * per / 100
			}
		})
		document.addEventListener('mouseup', function(e) {
			if (e.button == 0) {
				if (self.mDown) {
					var moveX = e.clientX - self.beginClientX
					self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX
					var per = parseInt(self.positionX / self.sliderLong * 100)
					self.bar.style.width = per +'%'
					myvedio.currentTime = myvedio.duration * per / 100
					self.mDown = false
				}
			}
		})
	},
	getStyle: function(obj, styleName) {
		if (obj.currentStyle) {
			return obj.currentStyle[styleName]
		} else {
			return getComputedStyle(obj, null)[styleName]
		}
	},
	setBar: function(progress) {
		var self = this
		self.positionX = progress / 100 * self.sliderLong
		self.bar.style.width = progress +'%'
	}
}

window.onload = function() {
	myvedio = document.getElementById('myvedio')
	playtag = document.getElementById('playtag')
	volumetag = document.getElementById('volumetag')
	slider.use('progresstag')
	window.setInterval("calctime()", 100)
}

function play() {
	if (myvedio.paused) {
		myvedio.play()
		playtag.innerHTML = "暂停"
	} else {
		myvedio.pause()
		playtag.innerHTML = "播放"
	}
}

function mute() {
	if (myvedio.volume != 0) {
		myvedio.volume = 0
		volumetag.innerHTML = "取消静音"
	} else {
		myvedio.volume = 1
		volumetag.innerHTML = "静音"
	}
}

function fullscreen() {
	myvedio.requestFullscreen()
}

function calctime() {
	slider.setBar(parseInt(myvedio.currentTime / myvedio.duration * 100))
}


