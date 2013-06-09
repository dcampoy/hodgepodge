var VimSimulator = function() {};

VimSimulator.prototype = {
	MODE_NORMAL: 0,
	MODE_INSERT: 1,
	MODE_EXTENDED: 2,

	currentMode: 0,
	shiftPressed: false,

	cursor: {
		line:0,
		column:0
	},

	keyDownHandler: function(e) {
		var code = e.which;
		switch (code) {
			case 16:
				this.shiftPressed = true;
				break;
		}

		if (this.currentMode == this.MODE_NORMAL) {
			switch (code) {
				case 37:
				case 38:
				case 39:
				case 40:
					break; // default behavour for arrows
				case 73: // i
					this.changeInsertMode();
					e.preventDefault();
					break;
				case 65: // a
				default:
					e.preventDefault();
			}
			console.log(code);
		} else if (this.currentMode == this.MODE_INSERT) {
			switch (code) {
				case 27:
					this.changeNormalMode();
					break;
				default:
			}
		}
	},

	keyUpHandler: function(e) {
		var code = e.which;
		switch (code) {
			case 16:
				this.shiftPressed = false;
				break;
		}
	},

	changeNormalMode: function() {
		this.currentMode = this.MODE_NORMAL;
		$('#mode').text("  ");	
	},

	changeInsertMode: function() {
		this.currentMode = this.MODE_INSERT;
		$('#mode').text("-- INSERT --");
		$('#buffer').focus();
	}

};

$(function() {
	var env = new VimSimulator();
	$(document).keydown(env.keyDownHandler.bind(env));
	$(document).keyup(env.keyUpHandler.bind(env));
});
