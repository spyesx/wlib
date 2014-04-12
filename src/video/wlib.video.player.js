'use strict';

/*!
 * Weinto JavaScript Library - wlib
 * http://www.weinto.com/
 *
 *
 * Copyright 20011, 2013 Weinto, Nicolas Bages
 * nicolas.bages@weinto.com
 *
 */

var wlib = wlib || {};
wlib.video = wlib.video || {};
wlib.video.player = wlib.video.player || {};

wlib.video.player.main = (function(){

	var _driver = 'Driver';
	var _controls = 'Controls';


	function Player(){
			var _this = this;
	}

	Player.prototype.init = function(driver, controls){
		_driver = driver;
		_controls = controls;

		_controls.on('wlib.video.player.controls/play', _this.play);
		_controls.on('wlib.video.player.controls/', _this.pause);
		_controls.on('wlib.video.player.controls/', _this.stop);
		_controls.on('wlib.video.player.controls/', _this.setVolume);
		_controls.on('wlib.video.player.controls/', _this.seekTo);

		_driver.on('wlib.video.player.driver/progress', _progress);
		_driver.on('wlib.video.player.driver/ready', _ready);
	}


	_play = function(){
		scope.$emit 'videoPlayer.main.play'
		_isDriverOnProgress = true
		_timerProgress = requestTimeout( onProgress(), 35 );
	}

		null
	onProgress = ->
		if _isDriverOnProgress
			scope.$emit 'videoPlayer.main.askProgress'
			requestAnimFrame(onProgress)

	pause = ->
		_isDriverOnProgress = false
		scope.$emit 'videoPlayer.main.pause'
		null

	stop = ->
		_isDriverOnProgress = false
		scope.$emit 'videoPlayer.main.stop'
		null

	setVolume = (volume)->
		scope.$emit 'videoPlayer.main.setVolume', volume
		null

	seekTo = (e, datas)->
		time = _duration / 100 * datas.percent
		scope.$emit 'videoPlayer.main.seekTo', {time:time}
		null

	progress = (e, datas)->
		# if datas.time >= _duration
		# 	console.log(datas.time, _duration, 'pause')
		# 	pause()

		scope.$emit 'videoPlayer.main.progress', {time:datas.time, duration:_duration}
		null


	ready = (e, datas)->
		_duration = datas.duration
		scope.$emit 'videoPlayer.main.ready'
		play()



})