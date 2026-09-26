import "./audio-player.min.js";
//#region src/js/common/functions.js
var bodyLockStatus = true;
var bodyLockToggle = (delay = 500) => {
	if (document.documentElement.hasAttribute("data-fls-scrolllock")) bodyUnlock(delay);
	else bodyLock(delay);
};
var bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		setTimeout(() => {
			lockPaddingElements.forEach((lockPaddingElement) => {
				lockPaddingElement.style.paddingRight = "";
			});
			document.body.style.paddingRight = "";
			document.documentElement.removeAttribute("data-fls-scrolllock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
var bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
		lockPaddingElements.forEach((lockPaddingElement) => {
			lockPaddingElement.style.paddingRight = lockPaddingValue;
		});
		document.body.style.paddingRight = lockPaddingValue;
		document.documentElement.setAttribute("data-fls-scrolllock", "");
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
function uniqArray(array) {
	return array.filter((item, index, self) => self.indexOf(item) === index);
}
//#endregion
//#region src/js/custom/video-grid.js
document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".video-card");
	const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
	function stopAllVideos(currentVideo = null) {
		cards.forEach((card) => {
			const video = card.querySelector(".video-element");
			const overlay = card.querySelector(".overlay-info");
			if (video && video !== currentVideo) {
				video.pause();
				video.currentTime = 0;
				if (overlay) overlay.classList.remove("is-active");
			}
		});
	}
	cards.forEach((card) => {
		const video = card.querySelector(".video-element");
		const overlay = card.querySelector(".overlay-info");
		if (!video) return;
		if (isTouchDevice) card.addEventListener("click", () => {
			if (video.paused) {
				stopAllVideos(video);
				video.play().catch(() => {});
				if (overlay) overlay.classList.add("is-active");
			} else {
				video.pause();
				if (overlay) overlay.classList.remove("is-active");
			}
		});
		else {
			card.addEventListener("mouseenter", () => {
				video.play().catch(() => {});
			});
			card.addEventListener("mouseleave", () => {
				video.pause();
				video.currentTime = 0;
			});
		}
	});
});
//#endregion
export { bodyLockToggle as n, uniqArray as r, bodyLockStatus as t };
