var ConwayCanvas = function(canvas, cellSize) {
    this._cellSize = cellSize;

    this._ctx = canvas.getContext("2d");

    this._width = canvas.width / cellSize;
    this._height = canvas.height / cellSize;
    this._ctx.fillStyle = "white";
    this._ctx.fillRect(0,0,this._width * this._cellSize, this._height * this._cellSize);
    this._interval = null;
    this.ticks = 0;
    this._impl = [];
    this.lastLoop = null;

    this._assignEvents(canvas);
};

ConwayCanvas.prototype = {

	attach: function(impl) {
        this._impl.push(impl);

        impl.onBorn = this._drawLiveCell.bind(this);
        impl.onDie = this._drawDeadCell.bind(this);
    },

	markCellAsLive: function(x,y) {
        for (i in this._impl) {
            this._impl[i].markAsLive(x,y);
        }
	},

	markCellAsDead: function(x,y) {
        for (i in this._impl) {
            this._impl[i].markAsDead(x,y);
        }
	},

	step: function() {
        for (i in this._impl) {
            this._impl[i].step();
        }
	},

	run: function(msec) {
		msec = msec || 0;
		this._interval = setInterval(function() { this.step() }.bind(this), msec);
	},

	stop: function() {
		clearInterval(this._interval);
		this._interval = null;
	},

    _getCell: function (canvasPosX, canvasPosY) {
        return [ Math.floor(canvasPosX / this._cellSize), Math.floor(canvasPosY / this._cellSize) ];
    },

    _assignEvents: function(canvas) {

		var paintEvent = function (e) {
            var cell = this._getCell(e.offsetX, e.offsetY);
			this.markCellAsLive(cell[0], cell[1]);
		}.bind(this);

		var onCanvasMouseDown = function(e) {
			e.preventDefault();
            var cell = this._getCell(e.offsetX, e.offsetY);

			if (e.which == 1) {
				canvas.addEventListener('mousemove', paintEvent);
				this.markCellAsLive(cell[0], cell[1]);
			} else if (e.which == 3) {
				this.markCellAsDead(cell[0], cell[1]);
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

	_drawLiveCell: function(x,y, color) {
        var size = this._cellSize;
		this._ctx.fillStyle = color;
        this._ctx.fillRect(x * size, y * size, size, size);				
	},

	_drawDeadCell: function(x,y) {
        var size = this._cellSize;
		this._ctx.fillStyle = "white";
        this._ctx.fillRect(x * size, y * size, size, size);				

	}
};

