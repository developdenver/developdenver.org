function throttle(type, name, obj) {
	var obj = obj || window;
	var running = false;
	var func = function() {
		if (running) {
			return;
		}
		running = true;
		requestAnimationFrame(function() {
			obj.dispatchEvent(new CustomEvent(name));
			running = false;
		});
	};
	obj.addEventListener(type, func);
}

function parallaxElement(element, scrollpos, pagePosition, speed) {
	let wh = window.innerHeight;
	let elementOffset = element.offsetTop - scrollpos;
	let skewElement = 0;
	let xElement = 0;
	if (elementOffset < wh - wh / pagePosition) {
		skewElement = (elementOffset - (wh - wh / pagePosition)) / speed;

		if (skewElement > -wh) {
			element.style.webkitTransform = `translateY(${skewElement}px)`;
		}
	} else {
		xElement = 0;
		skewElement = 0;
		element.style.webkitTransform = `translateY(${skewElement}px)`;
	}
}

export { parallaxElement, throttle };
