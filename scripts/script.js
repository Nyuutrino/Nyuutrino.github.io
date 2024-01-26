(function () {
	if (!AOS) {
		/*Hmmmm. Either the user went offline and deleted the cache, or something's really wrong here. I don't think it could be that the AOS library loaded before this, I already made sure that it wouldn't happen. Oh, well. Throw an error to report it.*/
		throw new ReferenceError("AOS is not defined");
	}
	/*AOS.init();*/
	/* You can also pass an optional settings object*/
	/*below listed default settings*/
	AOS.init({
		/*Global settings:*/
		disable: false, /*accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function*/
		startEvent: 'DOMContentLoaded', /*name of the event dispatched on the document, that AOS should initialize on*/
		initClassName: 'aos-init', /*class applied after initialization*/
		animatedClassName: 'aos-animate', /*class applied on animation*/
		useClassNames: false, /*if true, will add content of `data-aos` as classes on scroll*/
		disableMutationObserver: false, /*disables automatic mutations' detections (advanced)*/
		debounceDelay: 50, /*the delay on debounce used while resizing window (advanced)*/
		throttleDelay: 99, /*the delay on throttle used while scrolling the page (advanced)*/


		/*Settings that can be overridden on per-element basis, by `data-aos-*` attributes:*/
		offset: 130, /*offset (in px) from the original trigger point*/
		delay: 0, /*values from 0 to 3000, with step 50ms*/
		duration: 400, /*values from 0 to 3000, with step 50ms*/
		easing: 'ease', /*default easing for AOS animations*/
		once: false, /*whether animation should happen only once - while scrolling down*/
		mirror: true, /*whether elements should animate out while scrolling past them*/
		anchorPlacement: 'top-bottom', /*defines which position of the element regarding to window should trigger the animation*/

	});
	/*Hmmm, window.requestIdleCallback() is nice but it makes things too "glitchy".*/
	function tprint(string, element, textContent = true, timeoutLength = 80, clearText = true, innerHTMLFilter = true, triggerCharMode = false, triggerChar, requestOnIdle = false) {
		return new Promise(function (res, rej) {
			let e;
			string.toString();
			let arr = [];
			for (let chr of string) {
				arr.push(chr);
			}
			let f = 0;
			let k = arr.length;
			if (!element) {
				rej("Parameter \"element\" is not a valid element.");
				clearInterval(e);
				throw "PROMISE REJECTED";
			}
			if (clearText) {
				if (textContent) {
					element.textContent = "";
				}
				else {
					element.innerHTML = "";
				}
			}
			let str = "";
			if (!requestOnIdle) {
				e = window.setInterval(() => {
					if (k === f) {
						clearInterval(e);
						res("done");
					}
					else {
						str += arr[f];
						if (triggerCharMode) {
							if (!triggerChar) {
								rej("Trigger char mode is on, but no trigger char is set.");
								clearInterval(e);
								throw "PROMISE REJECTED";
							}
							if (typeof triggerChar !== typeof 0) {
								rej("Trigger char is not a number. This will prevent functionality.");
								clearInterval(e);
								throw "PROMISE REJECTED";
							}
							if (f === triggerChar) {
								element.textContent = "";
								element.innerHTML = str;
							}
							else if (f > triggerChar) {
								element.innerHTML = str;
							}
							else {
								element.textContent = str;
							}
						}
						else {
							if (!textContent) {
								if (innerHTMLFilter) {
									element.innerHTML += arr[f];
								}
								else {
									str += arr[f];
									element.innerHTML = str;
								}
							}
							else if (textContent) {
								element.textContent += arr[f];
							}
						}
						f++;
					}
				}, timeoutLength);
			}
			else {
				let idleCallback = function () {
					if (k === f) {
						clearInterval(e);
						res("done");
					}
					else {
						str += arr[f];
						if (triggerCharMode) {
							if (!triggerChar) {
								rej("Trigger char mode is on, but no trigger char is set.");
								clearInterval(e);
								throw "PROMISE REJECTED";
							}
							if (typeof triggerChar !== typeof 0) {
								rej("Trigger char is not a number. This will prevent functionality.");
								clearInterval(e);
								throw "PROMISE REJECTED";
							}
							if (f === triggerChar) {
								element.textContent = "";
								element.innerHTML = str;
							}
							else if (f > triggerChar) {
								element.innerHTML = str;
							}
							else {
								element.textContent = str;
							}
						}
						else {
							if (!textContent) {
								if (innerHTMLFilter) {
									element.innerHTML += arr[f];
								}
								else {
									str += arr[f];
									element.innerHTML = str;
								}
							}
							else if (textContent) {
								element.textContent += arr[f];
							}
						}
						f++;
						window.setTimeout(function () {
							window.requestIdleCallback(idleCallback);
						}, timeoutLength);
					}
				};
				window.requestIdleCallback(idleCallback);
			}
		});
	}
	function glitch(element, severity) {
		if (typeof severity !== typeof 0) {
			throw new TypeError("Parameter \"severity\" is not of type \"number\"");
		}
		if (severity > 100 || severity < 1) {
			throw new RangeError("Paramter \"severity\" is out of range (1-100)");
		}
		let glitchChars = ["0", "1", "*", "!!!!", "ERROR"];
		let max = Math.floor(100 / severity);
		let recursive = function () {
			let random = Math.floor(Math.random() * max) + 1;
			if (random === max) {
				let oTxt = element.innerHTML;
				let nTxt = "";
				for (let x of oTxt) {
					let glitchChance = Math.floor(Math.random() * 5) + 1;
					if (glitchChance === 5) {
						nTxt += glitchChars[Math.floor(Math.random() * glitchChars.length)];
					}
					else {
						nTxt += x;
					}
				}
				element.innerHTML = nTxt;
				window.setTimeout(function () {
					element.innerHTML = oTxt;
					requestAnimationFrame(recursive);
				}, 40);
			}
			else {
				requestAnimationFrame(recursive);
			}
		};
		recursive();
	}
	document.getElementById("science-data").innerHTML = `azodicarbonamide

1,2,3-trinitroxypropane

5-hydroxytryptamine

Adenosine triphosphate

ΔX = (Xf - Xi)

F=MA

g=G*M/R^2`;
	let tPrintElements = document.querySelectorAll('[data-slowprint="true"]');
	let callback = function (entries, observer) {
		entries.forEach(function (entry) {
			/*Each entry describes an intersection change for one observed
			target element:
			entry.boundingClientRect
			entry.intersectionRatio
			entry.intersectionRect
			entry.isIntersecting
			entry.rootBounds
			entry.target
			entry.time*/
			if (entry.isIntersecting) {
				entry.target.style = "opacity:1;user-select:text;";
				if (entry.target.hasAttribute("printing")) {
				}
				else {
					let speed;
					if (entry.target.dataset.customTypeSpeed === "true") {
						speed = Number(entry.target.dataset.typeSpeed);
					}
					else {
						speed = 50;
					}
					if (entry.target.dataset.innerHtml === "true") {
						if (entry.target.dataset.htmlInjection === "true") {
							if (entry.target.dataset.triggerCharMode === "true") {
								entry.target.setAttribute("printing", "true");
								tprint(entry.target.innerHTML, entry.target, true, speed, true, false, true, Number(entry.target.dataset.triggerChar)).then(function () {
									entry.target.removeAttribute("printing");
								});
							}
							else {
								entry.target.setAttribute("printing", "true");
								tprint(entry.target.innerHTML, entry.target, true, speed, true, false).then(function () {
									entry.target.removeAttribute("printing");
									let txt = entry.target.textContent;
									console.log(txt);
									entry.target.textContent = "";
									entry.target.innerHTML = txt;
								});
							}
						}
						else {
							entry.target.setAttribute("printing", "true");
							tprint(entry.target.innerHTML, entry.target, false, speed, true, true).then(function () {
								entry.target.removeAttribute("printing");
							});
						}
					}
					else {
						entry.target.setAttribute("printing", "true");
						tprint(entry.target.textContent, entry.target, true, speed, true).then(function () {
							entry.target.removeAttribute("printing");
						});
					}
				}
			}
			else {
				entry.target.style = "opacity:0;user-select:none;";
			}
		});
	};
	let interObserver = new IntersectionObserver(callback, {
		rootMargin: "0px",
		threshold: 0.1
	});
	for (let x of tPrintElements) {
		interObserver.observe(x);
	}
	let imgObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.src = entry.target.dataset.src;
			}
		});
	}, {
		rootMargin: "600px",
		threshold: 1.0
	});
	for (let i = 0; i < document.getElementsByClassName("image-show-when-onscreen").length; i++) {
		imgObserver.observe(document.getElementsByClassName("image-show-when-onscreen")[i]);
	}
	let glitchElements = document.querySelectorAll('[data-glitch="true"]');
	for (let x of glitchElements) {
		glitch(x, 10);
	}
	let iframeInterObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting && entry.target.dataset.setSrc !== "true") {
				entry.target.src = entry.target.dataset.src;
				entry.target.dataset.setSrc = "true";
			}
		});
	}, {
		rootMatgin: "0px",
		threshold: 1.0
	});
	let iframeInterElements = document.querySelectorAll('[data-iframe-set-when-intersected="true"]');
	for (let x of iframeInterElements) {
		iframeInterObserver.observe(x);
	}
	let backgroundImgIntersectionObserver = new IntersectionObserver(function (entries, observer) {
		/*TODO: AOS doesn't trigger on elements created from an intersection observer (it's already in view which AOS doesn't record). Find a way to work around.*/
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				if (document.getElementById("background-image-when-intersected")) {
					document.getElementById("background-image-when-intersected").remove();
				}
				let div = document.createElement("div");
				div.style = "position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;background-image:url(" + entry.target.dataset.imgUrl + ");background-repeat:no-repeat;background-position:center center;z-index:-1;opacity:1;" + entry.target.dataset.additionalStyles;
				div.setAttribute("id", "background-image-when-intersected");
				div.setAttribute("data-aos", "fade-in");
				div.setAttribute("data-aos-duration", "2000");
				document.body.appendChild(div);
			}
			else {
				if (document.getElementById("background-image-when-intersected")) {
					document.getElementById("background-image-when-intersected").remove();
				}
			}
		});
	}, {
		rootMargin: "0px",
		threshold: 1
	});
	let backgroundImgElements = document.querySelectorAll('[data-change-background-on-intersecting="true"]');
	for (let x of backgroundImgElements) {
		backgroundImgIntersectionObserver.observe(x);
	}
	// let backgroundImgObserver = new IntersectionObserver(function(entries,observer){
	//   entries.forEach(function(entry){
	//     if(entry.isIntersecting){
	//       entry.target.style.background = "url(" + entry.target.dataset.src + ")";
	//       entry.target.style.backgroundRepeat = "no-repeat";
	//       entry.target.style.backgroundPosition = "center";
	//       entry.target.style.backgroundSize = "cover";
	//     }
	//   });
	// },{
	//   rootMargin: "0px",
	//   threshold:1.0
	// });
	// let backgroundImgObserverElements = document.querySelectorAll('[data-show-background-image-when-intersected="true"]');
	// for(let x of backgroundImgObserverElements){
	//   backgroundImgObserver.observe(x);
	// }
	document.getElementsByClassName("codearea-run-code-button")[0].addEventListener("click", function () {
		let buttonScope = this;
		function run() {
			buttonScope.dataset.running = "true";
			let input = document.getElementsByClassName("codearea-code-textarea")[0].value;
			document.getElementsByClassName("codearea-output")[0].style.transform = "scale(1,1)";
			document.getElementsByClassName("codearea-output")[0].setAttribute("srcdoc", input);
			buttonScope.setAttribute("id", "codearea-run-code-button-running");
			buttonScope.textContent = "Stop";
		}
		function stop() {
			buttonScope.dataset.running = "false";
			document.getElementsByClassName("codearea-output")[0].style.transform = "scale(0,0)";
			document.getElementsByClassName("codearea-output")[0].setAttribute("srcdoc", "");
			buttonScope.setAttribute("id", "codearea-run-code-button-stopped");
			buttonScope.textContent = "Run Code";
		}
		if (this.dataset.running === "true") {
			stop();
		}
		else if (this.dataset.running === "false" || this.dataset.running === void (0)) {
			run();
		}
	});
	document.getElementsByClassName("codearea-code-textarea")[0].value = `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <h1>I love Coding!</h1>
  </body>
</html>`;
	document.getElementsByClassName("known-languages-run-button")[0].addEventListener("click", function () {
		let buttonScope = this;
		function run() {
			buttonScope.dataset.running = "true";
			let input = document.getElementsByClassName("known-languages-code")[0].value;
			document.getElementsByClassName("known-languages-output")[0].style.transform = "scale(1,1)";
			localStorage.setItem("running-known-languages", "true");
			buttonScope.setAttribute("id", "known-languages-run-button-running");
			buttonScope.textContent = "Stop";
		}
		function stop() {
			buttonScope.dataset.running = "false";
			document.getElementsByClassName("known-languages-output")[0].style.transform = "scale(0,0)";
			localStorage.setItem("running-known-languages", "false");
			buttonScope.setAttribute("id", "known-languages-run-button-stopped");
			buttonScope.textContent = "Run Code";
		}
		if (this.dataset.running === void (0)) {
			localStorage.setItem("running-known-languages", "false");
		}
		if (this.dataset.running === "true") {
			stop();
		}
		else if (this.dataset.running === "false" || this.dataset.running === void (0)) {
			if (!document.getElementsByClassName("known-languages-code")[0].hasAttribute("printing")) {
				run();
			}
		}
	});
})();