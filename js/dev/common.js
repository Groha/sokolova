import "./audio-player.min.js";
//#region src/js/common/functions.js
function getHash() {
	if (location.hash) return location.hash.replace("#", "");
}
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
var gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = "";
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = "header.header";
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains("--header-scroll")) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add("--header-scroll");
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove("--header-scroll");
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else headerItemHeight = headerElement.offsetHeight;
		}
		if (document.documentElement.hasAttribute("data-fls-menu-open")) {
			bodyUnlock();
			document.documentElement.removeAttribute("data-fls-menu-open");
		}
		let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
		targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
		targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
		window.scrollTo({
			top: targetBlockElementPosition,
			behavior: "smooth"
		});
	}
};
//#endregion
//#region src/js/custom/video-grid.js
document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".video-card");
	const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
		const playIndicator = card.querySelector(".video-play");
		if (!video) return;
		video.addEventListener("play", () => {
			if (playIndicator) playIndicator.hidden = true;
		});
		video.addEventListener("pause", () => {
			if (playIndicator) playIndicator.hidden = false;
		});
		card.addEventListener("click", () => {
			if (video.paused) {
				stopAllVideos(video);
				video.play().catch(() => {});
				if (overlay) overlay.classList.add("is-active");
			} else {
				video.pause();
				if (overlay) overlay.classList.remove("is-active");
			}
		});
		if (canHover) {
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
export { gotoBlock as a, getHash as i, bodyLockToggle as n, uniqArray as o, bodyUnlock as r, bodyLockStatus as t };
