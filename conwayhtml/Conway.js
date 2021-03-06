var Conway = function(width, height, color, board) {

    var i,j;

    this.width = width;
    this.height = height;
    this._cells = [];
    this.color = color;

	for (i=0; i<width; i++) {
        this._cells[i] = [];
		for (j=0; j<height; j++) {
            this._cells[i][j] = 0;
        }
    }

    board.attach(this);
};

Conway.prototype = {

    step: function() {

		var i, j,
			aux, pos;

		aux = [];
		for (i=0; i<this.height * this.width; i++) {
			aux.push(0); 
		}

		for (i=0; i<this.width; i++) {
			for (j=0; j<this.height; j++) {
				if (this.isAlive(i,j)) {
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

        var minFood = 2,
            maxFood = 3;

		for (i=0; i<this.width; i++) {
			for (j=0; j<this.height; j++) {
				var food = aux[this._flatPosition(i,j)]; 
				if (this.isAlive(i,j)) {
					if (food < minFood || food > maxFood) {
						this.markAsDead(i,j);
					}
				} else {
					if (food <= maxFood && food > minFood) {
						this.markAsLive(i,j);
					}
				}
			}
		}
    },

    markAsLive: function(i, j) {
        this._cells[i][j] = 1;
        if (typeof(this.onBorn) == 'function') this.onBorn(i, j, this.color);
    },

    markAsDead: function(i, j) {
        this._cells[i][j] = 0;
        if (typeof(this.onDie) == 'function') this.onDie(i, j);
    },

    isAlive: function(i,j) {
        return this._cells[i][j];
	},

    onBorn: null,

    onDie: null,

	_flatPosition: function(x,y) {
		var height = this.height,
		    width = this.width;

		x = (x + width) % width ;
		y = (y + height) % height;
		return y * width + x;
	}
};
