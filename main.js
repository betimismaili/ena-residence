import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/scss/app.scss';

import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


// Site Swiper
let swiper = null;

// Add the "hidden-menu" class to the header initially
const header = document.querySelector('header');
header.classList.add('hidden-menu');

function initSwiper() {
	const screenWidth = window.innerWidth;

	if (screenWidth > 992) {
		if (!swiper) {
			swiper = new Swiper('.main-swiper', {
				modules: [Pagination],
				direction: 'vertical',
				pagination: {
					el: '.main-pagination',
					clickable: true,
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
						const activeSlide = this.slides[this.activeIndex];
						const isWhiteDotsSlide = activeSlide.classList.contains('white-dots');
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
		}
	} else {
		if (swiper) {
			swiper.destroy();
			swiper = null;
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
	const targetSection = document.getElementById('next-section');

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