import boldTtf from './ixi_Bold.ttf';
import boldWoff2 from './ixi_Bold.woff2';

import regularTtf from './ixi_Regular.ttf';
import regularWoff2 from './ixi_Regular.woff2';

import mediumTtf from './ixi_Medium.ttf';
import mediumWoff2 from './ixi_Medium.woff2';

import thinTtf from './ixi_Thin.ttf';
import thinWoff2 from './ixi_Thin.woff2';


export default function mobileFont() {
    return `
        @font-face {
            font-family: 'ixi-type';
            font-display: 'swap';
            font-weight: 300;
            font-style: normal;
            src: url('${thinWoff2}') format('woff2'), url('${thinTtf}') format('truetype');
        }
        @font-face {
            font-family: 'ixi-type';
            font-display: 'swap';
            font-weight: 400;
            font-style: normal;
            src: url('${regularWoff2}') format('woff2'), url('${regularTtf}') format('truetype');
        }
        @font-face {
            font-family: 'ixi-type';
            font-display: 'swap';
            font-weight: 600;
            font-style: normal;
            src: url('${mediumWoff2}') format('woff2'), url('${mediumTtf}') format('truetype');
        }
        @font-face {
            font-family: 'ixi-type';
            font-display: 'swap';
            font-weight: 300;
            font-style: normal;
            src: url('${boldWoff2}') format('woff2'), url('${boldTtf}') format('truetype');
        }
        html {
            font-size: 13px;
        }
    `;
}