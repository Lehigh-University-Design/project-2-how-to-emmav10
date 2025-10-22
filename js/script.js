// Start JS script code, feel free to not use this or remove it

document.addEventListener('DOMContentLoaded', () => {
		// Play/pause videos on hover inside the flex card area (hand animations)
		// and any video explicitly marked with class 'hover-play'
		const hoverVideos = Array.from(document.querySelectorAll('.flex-card-inner video'))
			.concat(Array.from(document.querySelectorAll('video.hover-play')));

	hoverVideos.forEach(v => {
		// make sure the video is muted so browsers allow programmatic play on hover
		v.muted = true;
		v.preload = 'metadata';

		// play on mouseenter, pause + reset on mouseleave
		v.addEventListener('mouseenter', () => {
			v.currentTime = 0;
			v.play().catch(() => {});
		});

		v.addEventListener('mouseleave', () => {
			v.pause();
			try { v.currentTime = 0; } catch(e) {}
		});

		// touch devices: toggle play/pause on touch
		v.addEventListener('touchstart', (e) => {
			// prevent the subsequent mouse events
			e.preventDefault();
			if (v.paused) {
				v.play().catch(() => {});
			} else {
				v.pause();
				try { v.currentTime = 0; } catch(e) {}
			}
		});
	});
});