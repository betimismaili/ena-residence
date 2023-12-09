import '/src/scss/app.scss';

import Swiper, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

let swiper = null;
function initSwiper() {
	const screenWidth = window.innerWidth;
	if (screenWidth > 992) {
		// Initialize Swiper
		if (!swiper) {
			swiper = new Swiper('.swiper', {
				modules: [Pagination],
				direction: 'vertical',
				pagination: {
					el: '.swiper-pagination',
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
			document.querySelector('.swiper-wrapper').style.transform = 'translate3d(0px, 0px, 0px)';
			document.querySelectorAll('.swiper-slide').forEach((slide) => {
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