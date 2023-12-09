import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/scss/app.scss';

import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// Site Swiper
let swiper = null;
function initSwiper() {
	const screenWidth = window.innerWidth;

	if (screenWidth > 992) {
		// Initialize Swiper if it's not already initialized
		if (!swiper) {
			swiper = new Swiper('.main-swiper', {
				modules: [Pagination],
				direction: 'vertical',
				pagination: {
					el: '.main-pagination',
					clickable: true,
				},
			});
		}
	} else {
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
// Initial call to set up Swiper based on initial screen width
initSwiper();
window.addEventListener('resize', function () {
	initSwiper();
});

// About us Swiper
const aboutSwiper = new Swiper('.about-swiper', {
	modules: [Autoplay],
	autoplay: {
		delay: 500,
	},
	loop: true,
	forceLoop: true,
	direction: 'vertical',
	slidesPerView: 3,
});

// Standards Swiper
const standardsSwiper = new Swiper('.standards-swiper', {
	loop: true,
	direction: 'horizontal',
});