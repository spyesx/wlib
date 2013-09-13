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

wlib.player = wlib.player || {};


wlib.player.video = function()
{

	this.v = undefined;
	this.canvas = undefined;
	this.context = undefined;

	var _draw = function(v, c, bc,cw,ch)
	{


		if(v.paused || v.ended)	return false;
		// First, draw it into the backing canvas
		bc.drawImage(v,0,0,cw,ch);
		// Grab the pixel data from the backing canvas
		var idata = bc.getImageData(0,0,cw,ch);
		var data = idata.data;
		var w = idata.width;
		var limit = data.length
		// Loop through the subpixels, convoluting each using an edge-detection matrix.
		// for(var i = 0; i < limit; i++) {
		// 	if( i%4 == 3 ) continue;
		// 	data[i] = 127 + 2*data[i] - data[i + 4] - data[i + w*4];
		// }

		var gradient = c.createLinearGradient(50,50,250,250);
		gradient.addColorStop(0,"blue");     // Départ
		gradient.addColorStop(0.8,"yellow"); // Intermédiaire
		gradient.addColorStop(1,"green");    // Arrivée
		c.fillStyle = gradient;            // Affectation au remplissage
		c.fillRect(0,0,c.width,c.height);

		// Draw the pixels onto the visible canvas
		c.putImageData(idata,0,0);
		// Start over!
		setTimeout(_draw, 20, v, c, bc, cw, ch);
	}

	this.attach = function(videoID, canvasID)
	{
		var self = this;

		console.log('attach', self);

		self.v          = document.getElementById(videoID);
		self.canvas     = document.getElementById(canvasID);
		self.context 	= self.canvas.getContext('2d');

		if(!self.v || !self.canvas)
		{
			wlib.console.error('Missing : Video id or canvas id');
			return;
		}

		self.context    = self.canvas.getContext('2d');
		var back        = document.createElement('canvas')
		var backcontext = back.getContext('2d');

		var cw,ch;

		console.log(self.v);

		self.v.addEventListener('play', function()
		{
			console.log("v is playing");

			cw                 = self.v.clientWidth;
			ch                 = self.v.clientHeight;
			self.canvas.width  = cw;
			self.canvas.height = ch;
			back.width         = cw;
			back.height        = ch;
			_draw(self.v, self.context, backcontext,cw,ch);
		},false);
	}

	this.play = function()
	{

	}

	this.pause = function()
	{

	}

	this.stop = function()
	{

	}

	this.speed_increase = function(value)
	{

	}

	this.speed_decrease = function(value)
	{

	}

	this.volume_up = function(value)
	{

	}

	this.volume_down = function(value)
	{

	}

	this.volume_mute = function()
	{

	}

	this.effect = function(callback)
	{
		callback();
	}



}