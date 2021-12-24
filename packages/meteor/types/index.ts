export * from './cookie';
declare global {
    interface Window {
		__SSR__: boolean;
	}
    const __SERVER__: boolean
};