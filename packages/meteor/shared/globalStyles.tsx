import React from 'react';
import { GlobalStyles as BaseStyles } from 'twin.macro';
import { css, Global } from '@emotion/react'
import ixiTypeFont from './fonts/ixiType';

const globalCss = css`
    ${ixiTypeFont()}
`

const GlobalStyles = () => (<React.Fragment>
    <BaseStyles />
    <Global styles={globalCss}/>
</React.Fragment>);
  
export default GlobalStyles;
