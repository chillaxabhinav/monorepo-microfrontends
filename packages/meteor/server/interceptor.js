import qs from 'query-string';
import { cancel } from '../shared/interceptor';

const CONFIG = {
	apiKey: 'ixiweb!2$',
	clientId: 'ixiweb'
};

const CONFIG_mobile = {
	apiKey: 'iximweb!2$',
	clientId: 'iximweb'
};

function getHeaders(config) {
    const {
        ixiUID: deviceId,
        clientId,
        apiKey,
        uuid,
        appVersion,
        at
    } = parseCookies();
	const headers = {};
	let clientConfig = config.isMobile ? CONFIG_mobile : CONFIG;

	headers['apiKey'] = apiKey || clientConfig.apiKey;
	headers['ixiSrc'] = clientId || clientConfig.clientId;
	headers['clientId'] = clientId || clientConfig.clientId;
	if (deviceId) {
		headers.deviceId = deviceId;
	}
	appVersion ? (headers['appVersion'] = appVersion) : '';

	// if (AJAX.loginTypeParam == 'alexa') {
	// 	config = {
	// 		apiKey: 'iximacb!2$',
	// 		clientId: 'iximacb'
	// 	};
	// 	headers['apiKey'] = config.apiKey;
	// 	headers['ixiSrc'] = config.clientId;
	// 	headers['deviceId'] = 'alexa';
	// 	headers['clientId'] = config.clientId;
	// }
	// if (clientId === FlipkartConfig.clientId || clientId === "iximatr" || clientId === "iximaio") {
	// 	headers['Accept-Language'] = 'en-US';
	// }
	const shouldSetUUID = config.shouldSetUUID || !at;
	if (at) {
		headers['Authorization'] = 'Bearer ' + at;
	}
	if(shouldSetUUID){
		uuid ? (headers['uuid'] = uuid) : deviceId ? (headers['uuid'] = deviceId) : '';
	}
	return headers;
}


export function interceptor(req, res) {

    return function _fetch(config) {
        // work in progress
        let {
            cancelPrevious = false,
            redirect = 'follow',
            contentType = 'application/json; charset=UTF-8',
            query = {},
            url, // need to come up with some common endpoint for all api call like graphql for default scenarios
            method = 'get',
            body,
            headers = {},
            // log = true, // need to add logging support
            parser = 'json',
            timeout = 10000,
            apiName,
            controller, // purley for logging purpose
            ...fetchConfig
        } = config
        const token = apiName && cancelPrevious && cancel(apiName, true);
    
        Object.keys(query).length &&
            (url = qs.stringifyUrl({url, query: query}))
    
        const isIxigoApi = /http.*ixigo\.com/.test(url) || !url.startsWith('http');

        return Promise.resolve({});
    }
}
