import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'partials'),
			root: resolve(__dirname, 'src'),
		}),
	],
	base: '/ena-residence/',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
		},
	},
};
