//#region src/js/custom/audio-player.js
document.addEventListener("DOMContentLoaded", () => {
	const audio = new Audio();
	let isPlaying = false;
	let currentBtn = null;
	const playBtn = document.getElementById("audio-play-btn");
	const iconPlay = document.getElementById("audio-icon-play");
	const iconPause = document.getElementById("audio-icon-pause");
	const titleEl = document.getElementById("audio-current-title");
	const lengthEl = document.getElementById("audio-current-length");
	const modelEl = document.getElementById("audio-current-model");
	const bpmEl = document.getElementById("audio-current-bpm");
	const waveline = document.getElementById("audio-waveline");
	const trackButtons = document.querySelectorAll(".track-btn");
	if (waveline) {
		waveline.innerHTML = "";
		for (let i = 0; i < 40; i++) {
			const bar = document.createElement("span");
			bar.style.animationDelay = `${i % 12 * -.13}s`;
			waveline.appendChild(bar);
		}
	}
	function togglePlayState(play) {
		isPlaying = play;
		if (isPlaying) {
			iconPlay?.classList.add("hidden");
			iconPause?.classList.remove("hidden");
			waveline?.classList.add("is-active");
		} else {
			iconPlay?.classList.remove("hidden");
			iconPause?.classList.add("hidden");
			waveline?.classList.remove("is-active");
		}
	}
	function loadTrack(btn) {
		currentBtn = btn;
		const { src, title, length, model, bpm } = btn.dataset;
		audio.src = src;
		if (titleEl) titleEl.textContent = title;
		if (lengthEl) lengthEl.textContent = length;
		if (modelEl) modelEl.textContent = model;
		if (bpmEl) bpmEl.textContent = bpm;
		trackButtons.forEach((b) => b.classList.remove("bg-zinc-900/40"));
		btn.classList.add("bg-zinc-900/40");
	}
	trackButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const isSameTrack = currentBtn === btn;
			if (isSameTrack && isPlaying) {
				audio.pause();
				togglePlayState(false);
			} else {
				if (!isSameTrack) loadTrack(btn);
				document.querySelectorAll("video").forEach((v) => v.pause());
				audio.play().then(() => togglePlayState(true)).catch(() => {});
			}
		});
	});
	playBtn?.addEventListener("click", () => {
		if (!currentBtn && trackButtons.length > 0) loadTrack(trackButtons[0]);
		if (isPlaying) {
			audio.pause();
			togglePlayState(false);
		} else {
			document.querySelectorAll("video").forEach((v) => v.pause());
			audio.play().then(() => togglePlayState(true)).catch(() => {});
		}
	});
	audio.addEventListener("ended", () => {
		if (!currentBtn) return;
		loadTrack((currentBtn.closest("li")?.nextElementSibling)?.querySelector(".track-btn") || trackButtons[0]);
		audio.play().then(() => togglePlayState(true));
	});
	if (trackButtons.length > 0) loadTrack(trackButtons[0]);
});
//#endregion
