import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
	plugins: [
		handlebars({
			partialDirectory: [
				resolve(__dirname, 'partials'),
				resolve(__dirname, 'partials/shq/hyrja_a'),
				resolve(__dirname, 'partials/shq/hyrja_b'),
				resolve(__dirname, 'partials/en'),
				resolve(__dirname, 'partials/de')
			],
			root: resolve(__dirname, 'src'),
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				en: resolve(__dirname, "en/index.html"),
				de: resolve(__dirname, "de/index.html"),
			},
		},
	},
};
