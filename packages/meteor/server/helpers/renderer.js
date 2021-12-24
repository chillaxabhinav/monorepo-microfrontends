import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import SSRApp from '../node';
import generate from './generateHTML';

const renderer = async (req, res, store, context) => {

    const extractor = new ChunkExtractor({
        statsFile: path.resolve(__dirname, '..', 'client', 'build-stats.json'),
        entrypoints: ['main']
    });

    const router = extractor.collectChunks(SSRApp({ req, context, store }));

    const markup = renderToString(router);

    const htmlContent = await generate.generateHtml(markup, extractor, store);
    
    return htmlContent;
}

export default renderer;
