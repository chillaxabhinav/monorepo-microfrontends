import ua from 'express-useragent';
const useragentMiddleWare: import('express').RequestHandler<{}> = function (req, res, next) {
    ua.express()(req, res, () => {
        const {
            isBot = false,
            isMobile,
            // version,
            // isMac,
            // source,
            // isiPhone,
            // isChrome,
            // iPad,
            // isSafari,
            // isUC,
            // isAndroid,
            // platform,
            // os,
            // browser
        } = (req.useragent || {})as ua.Details

        res.locals.useragent = {
            isMobile,
            isBot
            // not adding exhaustive list of fields that is available. will add as usage arises
        }
        // this is set by express-useragent middleware
        delete req.useragent;
        return next();
    });
}

export default useragentMiddleWare;