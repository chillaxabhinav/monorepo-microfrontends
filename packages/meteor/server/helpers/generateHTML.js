import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

// The path is relative from server bundle to client bundle, not the source
const templatePath = path.join(__dirname, '..', 'client', 'index.html');

const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

const generateHtml = async (markup, extractor, store) => {
	// Get the serer-rendering values for the <head />
	const helmet = Helmet.renderStatic();

	const $template = cheerio.load(HTML_TEMPLATE);

	$template('body').append(`
		<script>
			window.__INITIAL_STATE__ = ${serialize(store.getState())};
			window.__SSR__ = true
		</script>
	`);

	$template('head').append(
		helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
	);

	// add link preloads
	$template('head').append(extractor.getLinkTags()); // gets link tags to preload style and scripts

	$template('head').append(extractor.getStyleTags()); // add link tags for style

	$template('#root').html(markup);

	$template('body').append(extractor.getScriptTags());

	return $template.html();

};

export default {
  generateHtml
};
