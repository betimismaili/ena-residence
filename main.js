import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'popper.js'
import '/src/scss/app.scss';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


// On load animation
document.addEventListener("DOMContentLoaded", function () {
	var animationContainer = document.querySelector(".animation");
	if (animationContainer) {
		// Trigger the animation by adding the "show" class to the animation-container
		animationContainer.classList.add("show");

		var animationWrapper = document.querySelector(".animation-wrapper");
		// Remove animation-wrapper with fade-out effect after the animation completes
		animationWrapper.addEventListener("animationend", function () {
			setTimeout(function () {
				if (animationWrapper.parentNode) {
					// Add fade-out effect to animation-wrapper by manipulating opacity
					animationWrapper.style.transition = "opacity 0.4s ease-out";
					animationWrapper.style.opacity = 0;

					// Wait for .. second after fading out animation-wrapper
					setTimeout(function () {
						var parent = animationWrapper.parentNode;
						if (parent) {
							parent.removeChild(animationWrapper);

							// Reset opacity for the next use (if necessary)
							animationWrapper.style.opacity = 1;

							// Fade-out effect for the main container
							animationContainer.style.transition = "opacity 0.4s ease-out";
							animationContainer.style.opacity = 0;

							// Wait after fading out the main container
							setTimeout(function () {
								var mainParent = animationContainer.parentNode;
								if (mainParent) {
									mainParent.removeChild(animationContainer);
								}
							}, 300);
						}
					}, 400);
				}
			}, 4800);
		});
	}
});


// Site Swiper
let swiper = null;

// Add the "hidden-menu" class to the header initially
const header = document.querySelector('header');
header.classList.add('hidden-menu');

function initSwiper() {
	const screenWidth = window.innerWidth;

	// Destroy existing Swiper instance if it's initialized
	if (swiper) {
		swiper.destroy();
		swiper = null;
	}

	// Check if required elements exist
	const swiperContainer = document.querySelector('.main-swiper');
	const paginationContainer = document.querySelector('.main-pagination');
	const slides = document.querySelectorAll('.main-swiper-slide');

	if (screenWidth > 992 && swiperContainer && paginationContainer && slides.length > 0) {
		swiper = new Swiper('.main-swiper', {
			modules: [Pagination],
			direction: 'vertical',
			effect: "slide",
			mousewheelSensitivity: 1,
			mousewheel: {
				releaseOnEdges: true,
			},
			touchReleaseOnEdges:true,
			keyboard: true,
			pagination: {
				el: paginationContainer,
				clickable: true,
				bulletClass: 'swiper-pagination-bullet',
				bulletActiveClass: 'swiper-pagination-bullet-active',
			},

			on: {
				init: function () {
					const initialSlide = this.slides[this.activeIndex];
					const isWhiteDotsSlide = initialSlide.classList.contains('white-dots');
					const pagination = document.querySelector('.main-pagination');

					if (isWhiteDotsSlide) {
						pagination.classList.add('white-dots');
					}

					// Remove the "hidden-menu" class from the first slide on Swiper initialization
					if (this.activeIndex === 0) {
						header.classList.remove('hidden-menu');
					}

					// Check if the initial slide has the class "white-header" and add the class to the header
					if (initialSlide.classList.contains('white-header')) {
						header.classList.add('header-white');
					} else {
						header.classList.remove('header-white');
					}
				},
				slideChangeTransitionEnd: function () {
					// Check if the active slide has the "white-dots" class
					const activeSlide = this.slides[this.activeIndex];
					const isWhiteDotsSlide = activeSlide.classList.contains('white-dots');

					// Add or remove the class from the pagination element accordingly
					const pagination = document.querySelector('.main-pagination');
					if (isWhiteDotsSlide) {
						pagination.classList.add('white-dots');
					} else {
						pagination.classList.remove('white-dots');
					}

					// Add the "hidden-menu" class on slide change
					header.classList.add('hidden-menu');

					// Check if the active slide has the class "white-header" and add the class to the header
					if (activeSlide.classList.contains('white-header')) {
						header.classList.add('header-white');
					} else {
						header.classList.remove('header-white');
					}
				},
			},
		});

		const paginationBullets = document.querySelectorAll('.main-pagination .swiper-pagination-bullet');
		paginationBullets.forEach((bullet, index) => {
			const tooltip = slides[index].dataset.tooltip;

			tippy(bullet, {
				content: tooltip,
				arrow: false,
				placement: 'left',
				duration: 200,
				animation: 'fade',
				theme: 'custom',
			});
		});
	}
	 else {
		// Destroy Swiper if it's already initialized
		if (swiper) {
			swiper.destroy();
			swiper = null;

			// Manually set styles for the slides and container when Swiper is disabled
			document.querySelector('.main-swiper-wrapper').style.transform = 'translate3d(0px, 0px, 0px)';
			document.querySelectorAll('.main-swiper-slide').forEach((slide) => {
				slide.style.width = '';
				slide.style.height = '';
			});
		}
	}
}

function updateHeaderClass() {
	const activeSlide = swiper ? swiper.slides[swiper.activeIndex] : null;
	const isWhiteHeaderSlide = activeSlide && activeSlide.classList.contains('white-header');
	const header = document.querySelector('header');

	if (isWhiteHeaderSlide) {
		header.classList.add('header-white');
	} else {
		header.classList.remove('header-white');
	}
}

window.addEventListener('resize', function () {
	initSwiper();
});
initSwiper();

// Add event listener for clicking on the logo to remove the "hidden-menu" class
const logoColumn = document.querySelector('.logo');
if (logoColumn) {
	logoColumn.addEventListener('click', function (event) {
		// Remove the "hidden-menu" class when clicking on the logo
		header.classList.remove('hidden-menu');
		// Prevent the click event from propagating to the document click event
		event.stopPropagation();
	});
}

// Add event listener for scrolling to add the "hidden-menu" class and updateHeaderClass
document.addEventListener('scroll', function () {
	const isFirstSlide = swiper && swiper.activeIndex === 0;

	// Add the "hidden-menu" class on scroll if not on the first slide
	if (!isFirstSlide) {
		header.classList.add('hidden-menu');
	}

	updateHeaderClass();
});

// Scroll down button on the first slide
document.addEventListener('DOMContentLoaded', function () {
	const scrollDownButton = document.getElementById('scroll-down-btn');
	const targetSection = document.getElementById('overview');

	// Check if scrollDownButton element exists
	if (scrollDownButton) {
		scrollDownButton.addEventListener('click', function () {
			// Check if Swiper is active
			if (swiper) {
				// Use Swiper's built-in method to slide to the next section
				swiper.slideNext();
			} else {
				// Swiper is not active, scroll to the target section manually
				targetSection.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}
});



// About us Swiper
document.addEventListener('DOMContentLoaded', function () {
	const aboutSwiper = new Swiper('.about-swiper', {
		modules: [Autoplay],
		autoplay: {
			delay: 2000,
		},
		loop: true,
		forceLoop: true,
		direction: 'vertical',
		slidesPerView: 3,
	});

	function updateSwiperDirection() {
		const windowWidth = window.innerWidth;
		if (windowWidth <= 992) {
			aboutSwiper.params.direction = 'horizontal';
			aboutSwiper.update();
		} else {
			aboutSwiper.params.direction = 'vertical';
			aboutSwiper.update();
		}
	}
	updateSwiperDirection();
	window.addEventListener('resize', updateSwiperDirection);
});


// Standards Swiper
const standardsSwiper = new Swiper('.standards-swiper', {
	loop: true,
	direction: 'horizontal',
});


// Apartments section - change images on links hover (Hyrja A, Hyrja B)
document.addEventListener('DOMContentLoaded', function () {
	const btns = document.querySelectorAll('.o-apartments__content__btn');
	const imagesContainer = document.querySelector('.o-apartments__images');

	// Check if imagesContainer is present before attaching event listeners
	if (imagesContainer) {
		btns.forEach(function (btn, index) {
			btn.addEventListener('mouseenter', function () {
				// Add "row-reverse" class when hovering over every nth child
				if ((index + 1) % 2 === 0) {
					imagesContainer.classList.add('row-reverse');
				}
			});
			btn.addEventListener('mouseleave', function () {
				// Remove "row-reverse" class when mouse leaves
				imagesContainer.classList.remove('row-reverse');
			});
		});
	}
});


// Apartments section - horizontal menu of floors
function setupScrolling(id) {
	var container = document.getElementById(id);

	if (container) {
		var isDragging = false;
		var startX, scrollLeft;

		container.addEventListener('wheel', function (event) {
			event.preventDefault();
			container.scrollLeft += event.deltaY;
		});

		container.addEventListener('mousedown', function (e) {
			isDragging = true;
			startX = e.pageX - container.offsetLeft;
			scrollLeft = container.scrollLeft;
		});

		container.addEventListener('mouseup', function () {
			isDragging = false;
		});

		container.addEventListener('mousemove', function (e) {
			if (!isDragging) return;
			var x = e.pageX - container.offsetLeft;
			var walk = (x - startX) * 2;
			container.scrollLeft = scrollLeft - walk;
		});
	}
}
setupScrolling('firstEntryTab');
setupScrolling('secondEntryTab');


function setupOffcanvasEvents(offcanvasId, headerId) {
	var offcanvas = document.getElementById(offcanvasId);
	var header = document.getElementById(headerId);

	if (offcanvas) {
		offcanvas.addEventListener('show.bs.offcanvas', function () {
			// When offcanvas is opened, hide the header
			if (header) {
				header.style.display = "none";
			}
		});

		offcanvas.addEventListener('hide.bs.offcanvas', function () {
			// When offcanvas is closed, show the header
			if (header) {
				header.style.display = "block";
			}
		});
	}
}
setupOffcanvasEvents('offcanvasFirstEntry', 'header');
setupOffcanvasEvents('offcanvasSecondEntry', 'header');


// Links on header
document.addEventListener("DOMContentLoaded", function () {
	// Get all links
	var links = document.querySelectorAll('.o-header a');

	// Add click event listener to each link
	links.forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();

			// Get the target section's id from the data-target-id attribute
			var targetId = link.getAttribute('data-target-id');
			var targetSection = document.getElementById(targetId);

			if (targetSection) {
				// Find the index of the target section in the Swiper slides
				var targetIndex = Array.from(targetSection.parentNode.children).indexOf(targetSection);

				// Slide to the target section with smooth behavior using Swiper
				if (swiper && targetIndex !== -1) {
					swiper.slideTo(targetIndex);
				} else {
					// Swiper is not active or target section not found, scroll to the target section manually
					targetSection.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	});
});


// Mobile Menu
document.addEventListener("DOMContentLoaded", function () {
	openMenu();

	// Smooth scroll to sections using data-target-id
	document.querySelectorAll('[data-target-id]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('data-target-id');
			const targetElement = document.getElementById(targetId);
			const header = document.querySelector('.o-header');

			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - header.offsetHeight,
					behavior: 'smooth'
				});

				// Close the menu after the scroll
				closeMenu();
			}
		});
	});

	function openMenu() {
		var toggleButton = document.querySelector('.o-header__hamburger');
		var body = document.querySelector('body');

		if (toggleButton) toggleButton.addEventListener('click', function () {
			var header = document.querySelector('.o-header');
			if (this.classList.contains('active')) {
				closeMenu(header);
			} else {
				header.classList.add("open-menu");
				this.classList.add('active');
				body.classList.add('overflow-hidden');
			}
		});
	}

	function closeMenu() {
		var header = document.querySelector('.o-header');
		var toggleButton = document.querySelector('.o-header__hamburger');
		var body = document.querySelector('body');

		// Close the menu immediately
		header.classList.remove("open-menu");
		toggleButton.classList.remove('active');
		body.classList.remove('overflow-hidden');

		// Ensure the menu is closed after a short delay
		setTimeout(function () {
			header.classList.remove('close-menu');
		}, 0);
	}
});