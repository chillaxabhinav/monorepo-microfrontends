import React from "react";
import type { StaticContextServerProps } from '../../types/notFound';

const NotFound: React.FC<StaticContextServerProps> = ({ staticContext }: StaticContextServerProps) => {

    if (staticContext) {
        staticContext.notFound = true;
    }

    return (
        <div>
            oops, page not found
        </div>
    )
};

export default NotFound;