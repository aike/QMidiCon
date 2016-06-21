(function() {

	function nextSlide() {
		var btn = document.querySelectorAll(".slide_controller_btn");
		btn[1].click();
	}

	function prevSlide() {
		var btn = document.querySelectorAll(".slide_controller_btn");
		btn[0].click();
	}

	var MidiInterface = function() {
		var self = this;

		navigator.requestMIDIAccess().then(
			function(midi) {
				if (midi === undefined) return;
				for (var input of midi.inputs.values()) {
					input.onmidimessage = self.onMidi(e);
				}
			},
			function(msg) { console.log(msg); });

		this.onMidi = function(e) {
			if (e.data.length >= 3) {
				if (((e.data[0] & 0xF0) === 0x90) && (e.data[2] > 0)) {
					// note on
					if (e.data[1] % 2 === 0) { // note number
						nextSlide();
					} else {
						prevSlide();
					}
				}
			}
		}
	}

	var midi;
	midi = new MidiInterface();
})();
