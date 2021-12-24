import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import GlobalStyles from "./globalStyles";
import routes from 'moduleRoutes';

export default function App() {
    return <Fragment>
        <GlobalStyles />
        {renderRoutes(routes)}
    </Fragment>
}
