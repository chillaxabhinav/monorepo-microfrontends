import qs from 'query-string';
import {
    cancel, isCancelled,
    AbortError,
    HttpErrorResponse,
    ExtraFetchOptions,
    InterceptorConfig,
    RequestConfig,
    SuccessResponse,
    withError,
    Fetch
} from '../shared/interceptor';
import type { CookieHelpers } from '../types/cookie';

const CONFIG = {
	apiKey: 'ixiweb!2$',
	clientId: 'ixiweb'
};

const CONFIG_mobile = {
	apiKey: 'iximweb!2$',
	clientId: 'iximweb'
};

const blacklistedStatuses = [401];

function getHeaders(config: InterceptorConfig & ExtraFetchOptions, helpers: CookieHelpers) {
    const {
        ixiUID: deviceId,
        clientId,
        apiKey,
        uuid,
        appVersion,
        at
    } = helpers.getAllCookies();
	const headers: Record<string, string> = {};
	let clientConfig = config.isMobile ? CONFIG_mobile : CONFIG;

	headers['apiKey'] = (apiKey || clientConfig.apiKey) as string;
	headers['ixiSrc'] = (clientId || clientConfig.clientId) as string;
	headers['clientId'] = (clientId || clientConfig.clientId) as string;
	if (deviceId) {
		headers.deviceId = deviceId as string;
	}
	appVersion ? (headers['appVersion'] = appVersion as string) : '';

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
		uuid ? (headers['uuid'] = uuid as string) : deviceId ? (headers['uuid'] = deviceId as string) : '';
	}
	return headers;
}

export function interceptor(config: InterceptorConfig, helpers: CookieHelpers): Fetch {

    return async function _fetch<T>(input: RequestConfig, extraOptions: ExtraFetchOptions = {}): Promise<SuccessResponse<T>> {
        let {
            cancelPrevious = false,
            redirect = 'follow',
            contentType = 'application/json; charset=UTF-8',
            query = {},
            url, // need to come up with some common endpoint for all api call like graphql for default scenarios
            method = 'get',
            body,
            headers = {},
            log = true, // need to add logging support
            parser = 'json',
            apiName,
            controller, // purley for logging purpose
            ...fetchConfig
        } = input
        const token = apiName && cancelPrevious && cancel(apiName, true);
    
        Object.keys(query).length &&
            (url = qs.stringifyUrl({url, query}))
    
        const isRelative = !url.startsWith('http');
        const isIxigoApi = /http.*ixigo\.com/.test(url) || isRelative;
        if(isRelative) {
            url = `/napi/${url.replace(/^\/+/, '')}`;
        }
        const response = await withError(fetch(url, {
            ...fetchConfig,
            redirect,
            headers: {
                ...headers,
                ...(isIxigoApi && getHeaders({...extraOptions, ...config}, helpers)),
                'content-type': contentType
            },
            method,
            body: body
                ? typeof body === 'object' && !(body instanceof FormData)
                    ? JSON.stringify(body)
                    : body
                : undefined
        }).then(res => {
            if(apiName && token && isCancelled(apiName, token)) {
                throw new AbortError("Request aborted");
            }
            return res;
        }));

        if(response[0] !== undefined) {
            const res = response[0];
            // this res can be a success(res.ok is true) or error response but assuming backend has responded with a body in both scenario
            const [body, parseError] = await withError(res[parser]());
            if(parseError) {
                // backend responded but there is any error while parsing the response
                throw new HttpErrorResponse({
                    status: res.status,
                    statusText: res.statusText,
                    message: parseError.message,
                    stack: parseError.stack
                });
            }
            if(!res.ok) {
                // backend responded but there is any error while parsing the response
                throw new HttpErrorResponse({
                    status: res.status,
                    statusText: res.statusText,
                    message: res.statusText,
                    body,
                });
            }
            return { config: input, body, status: res.status, extraOptions: extraOptions}
        }
        const error = response[1];
        // should end up here only in case of client side error
        throw new HttpErrorResponse({
            message: error.message || "Something went wrong.",
            status: 0,
            stack: error.stack,
            isAborted: error instanceof AbortError
        });

            // we'll end up only when there is a client side error like network or abort error


            //.catch(async (res) => {
            //     return { status: res.status || 512, message: res.message || '', rawRes: res }
            // })
            // .then((res) => {
            //     if (apiName && isCancelled(apiName, token)) {
            //         return { status: 410, cancelled: true, rawRes: res.rawRes || res }
            //     }
            //     return res
            // })
            // .then(async (res) => {
            //     let data;
            //     // @ts-ignore
            //     const { status, message, cancelled, rawRes = res } = res
            //     const error = status >= 400 && status <= 600
            //     let err
            //     if (error) {
            //         // const params = { body, query };
            //         const msg = `API Failed: ${apiName}, Status: ${status} - ${message || ''}`;
            //         // const tags = ['api:' + apiName, 'status:' + status];
            //         err = new Error(msg)
            //         // err.status = status
            //         // err.tags = tags
            //         // err.params = params
            //         // err.api_url = apiName
            //         // err.controller = controller
            //     }
    
            //     if (error && !cancelled && blacklistedStatuses.indexOf(status) < 0) {
            //         log && console.error('', err)
            //     }
            //     if (!cancelled) {
            //         try {
            //             data = await rawRes[parser]();
            //         } catch(e){
            //             console.log(e);
                        
            //         }
            //     }
            //     if (error) {
            //         // err.data = data
            //         return Promise.reject(err)
            //     }
            //     return { config: input, data, status, cancelled };
            // });
    }
} 
