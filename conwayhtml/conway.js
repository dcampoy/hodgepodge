var Conway = {
	ticks: 0,
	lastLoop: null,
	init: function(width, height, cellSize) {
		var canvas;
		this._cellSize = cellSize;
		this._width = width;
		this._height = height;
		canvas = document.getElementById('board');

		this._ctx = canvas.getContext("2d");
		this._ctx.fillStyle = "white";
		this._ctx.fillRect(0,0,this._width * this._cellSize, this._height * this._cellSize);
		this._interval = null;

		// Assign events
		var paintEvent = function (e) {
			var size = this._cellSize;
			this.markCellAsLive(Math.floor(e.offsetX / size), Math.floor(e.offsetY / size));
		}.bind(this);

		var onCanvasMouseDown = function(e) {
			e.preventDefault();
			var size = this._cellSize;
			if (e.which == 1) {
				canvas.addEventListener('mousemove', paintEvent);
				this.markCellAsLive(Math.floor(e.offsetX / size), Math.floor(e.offsetY / size));
				//enterPaintMode();
			} else if (e.which == 3) {
				this.markCellAsDead(Math.floor(e.offsetX / size), Math.floor(e.offsetY / size));
			} else if (e.which == 2 && this._interval == null) {
				this.run();
			} else if (e.which == 2 && this._interval != null) {
				this.stop();
			}
		};

		var onCanvasMouseUp = function(e) {
			if (e.which == 1) {
				canvas.removeEventListener('mousemove', paintEvent);
			}
		}
		canvas.addEventListener('mousedown', onCanvasMouseDown.bind(this), false);
		canvas.addEventListener('mouseup', onCanvasMouseUp.bind(this), false);
		canvas.oncontextmenu = function() { return false; };

		this.lastLoop = new Date;
	},
	markCellAsLive: function(x,y) {
		this._drawLiveCell(x,y);
	},
	markCellAsDead: function(x,y) {
		this._drawDeadCell(x,y);
	},
	isCellAlive: function(x,y) {
		var size = this._cellSize;
		var imgData = this._ctx.getImageData(x * size, y * size, 1, 1).data;
		return imgData[0] === 0?true:false;
	},
	step: function() {
		var i, j,
			aux, pos,
			width = this._width,
			height = this._height,
			thisLoop = new Date,
			fps = 1000 / (thisLoop - this.lastLoop);
		aux = [];
		for (i = 0; i < height * width; i++) {
			aux.push(0); 
		}
		for (j = 0; j < height; j++) {
			for (i = 0; i < width; i++) {
				if (this.isCellAlive(i,j)) {
					aux[this._flatPosition(i-1,j-1)]++;
					aux[this._flatPosition(i-1,j)]++;
					aux[this._flatPosition(i-1,j+1)]++;

					aux[this._flatPosition(i,j-1)]++;
					aux[this._flatPosition(i,j+1)]++;

					aux[this._flatPosition(i+1,j-1)]++;
					aux[this._flatPosition(i+1,j)]++;
					aux[this._flatPosition(i+1,j+1)]++;
				}
			}
		} 

		for (j = 0; j < height; j++) {
			for (i = 0; i < width; i++) {
				var food = aux[this._flatPosition(i,j)]; 
				if (this.isCellAlive(i,j)) {
					if (food < 2 || food > 3) {
						this.markCellAsDead(i,j);
					}
				} else {
					if (food == 3) {
						this.markCellAsLive(i,j);
					}
				}
			}
		}

		document.getElementById('fps').innerText = fps.toFixed(2);
		this.lastLoop = thisLoop;
	},
	run: function(msec) {
		msec = msec || 0;
		this._interval = setInterval(function() { Conway.step() }, msec);
	},
	stop: function() {
		clearInterval(this._interval);
		this._interval = null;
	},
	_drawLiveCell: function(x,y) {
		var size = this._cellSize;
		this._ctx.fillStyle = "black";
		this._ctx.fillRect(x * size, y * size, size, size);
	},
	_drawDeadCell: function(x,y) {
		var size = this._cellSize;
		this._ctx.fillStyle = "white";
		this._ctx.fillRect(x * size, y * size, size, size);
	},
	_flatPosition: function(x,y) {
		var height = this._height,
		width = this._width;
		x = (x + width) % width ;
		y = (y + height) % height;
		return y * width + x;
	}
};

window.onload = function() { Conway.init(60,40,10) };
