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

	// Play/pause videos when they scroll into view (for background/hero video)
	// Targets <video class="play-on-scroll"> elements
	const scrollVideos = document.querySelectorAll('video.play-on-scroll');
	if (scrollVideos.length) {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const options = { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.5 };
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const vid = entry.target;
				if (prefersReduced) return; // respect user preference
				if (entry.isIntersecting) {
					vid.muted = true; // ensure muted so browsers allow play
					// If the video is marked to play once, play then stop observing so it doesn't replay
					if (vid.dataset.playOnce === 'true') {
						vid.play().catch(() => {});
						observer.unobserve(vid);
					} else {
						vid.play().catch(() => {});
					}
				} else {
					// Only pause if the video is not set to play once (otherwise it was unobserved)
					if (vid.dataset.playOnce !== 'true') {
						vid.pause();
					}
				}
			});
		}, options);

		scrollVideos.forEach(v => {
			v.preload = 'metadata';
			v.muted = true;
			observer.observe(v);
		});
	}
});