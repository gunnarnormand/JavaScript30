// get our elements
const player = document.querySelector('.player'),
      video = player.querySelector('.viewer'),
      progress = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress__filled'),
      toggle = player.querySelector('.toggle'),
      skipButtons = player.querySelectorAll('[data-skip]'),
      ranges = player.querySelectorAll('.player__slider');

// build out functions

function togglePlay() {

	// if (video.paused) {
	// 	video.play();
	// } else {
	// 	video.pause();
	// }

	const method = video.paused ? 'play' : 'pause';
	video[method]();
}









function updateButton() {

	// 'this' is bound to the video itself through the addEventListener
	const icon = this.paused ? '►' : '❚❚';
	toggle.textContent = icon;
}

function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	if (!isPressing) return;

	video[this.name] = this.value;
	console.log(this.value);
	console.log(this.name);
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
	// console.log(e);
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}





// hook up the event listeners

video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let isPressing = false;

ranges.forEach(range => range.addEventListener('mousedown', (e) => {
	isPressing = true;
}));

ranges.forEach(range => range.addEventListener('mouseup', () => isPressing = false));

ranges.forEach(range => range.addEventListener('mouseout', () => isPressing = false));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);












