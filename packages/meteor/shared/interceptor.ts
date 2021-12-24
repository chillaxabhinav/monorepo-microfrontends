const apiTokens: Record<string, string | number> = {
    // apiName: lastUuid
  }
const cancelTokens: Record<string, Array<string | number>> = {
// apiName: [uuidToCancel]
}

export function cancel (apiName: string, generateNewToken: boolean) {
    let token = apiTokens[apiName];
    let cancelToken = cancelTokens[apiName] || [];
    if (token) {
        cancelToken.push(token);
    }
    if(generateNewToken) {
        const token = Date.now();
        apiTokens[apiName] = token;
        return token;
    }
}



export function isCancelled(apiName: string, token: string | number) {
    const { [apiName]: tokens = [] } = cancelTokens;
    const index = tokens.indexOf(token);
    if (apiName && index >= 0) {
        tokens.splice(index, 1);
        cancelTokens[apiName] = tokens;
        return true;
    }
    return false;
}

// TODO: would be improved or may be we will need to pass entire store later on
export interface InterceptorConfig {
    isMobile: boolean
}

export interface ExtraFetchOptions {
    shouldSetUUID?: boolean
}

export interface RequestConfig extends RequestInit {
    url: string,
    contentType?: string,
    headers?: Record<string, string>,
    query?: import('query-string').StringifiableRecord,
    log?: boolean,
    cancelPrevious?: boolean,
    parser?: 'json' | 'text' | 'blob' | 'arrayBuffer',
    controller?: string,

    /**
     * it's required when cancelPrevious is true
     */
    apiName?: string
}

export async function withError<T>(promise: Promise<T>): Promise<[T, undefined] | [undefined, Error]> {
    try {
        return [await promise, undefined];
    } catch (error) {
        return [undefined, error as Error];
    }
}

export class HttpErrorResponse<T = {code: number, message: string}> extends Error {
    status?: number;
    statusText?: string;

    /** this may be available in case server provides response body in error response */
    body?: T;
    constructor(init: {body?: T, message: string, status?: number, isAborted?: boolean, stack?: string, statusText?: string }) {
        const {
            body,
            message,
            status,
            stack,
            statusText
        } = init;
        super(message);
        this.status = status;
        this.body = body;
        this.name = "HttpErrorResponse";
        this.stack = stack;
        this.statusText = statusText;
    }
}

export class AbortError extends Error  {
    constructor(message?: string) {
        super(`AbortError${message ? ': '+message : ''}`);
        this.name = "AbortError";
    }
}

export interface SuccessResponse<T> {
    config: RequestConfig,
    extraOptions: ExtraFetchOptions
    body: T,
    status: number
}

export type Fetch = <T>(input: RequestConfig, extraOptions?: ExtraFetchOptions) => Promise<SuccessResponse<T>>;