export class LogoApiService {
    getUrlToLogo(source) {
        return `https://logo.clearbit.com/${ new URL(source.url).hostname}`;
    }
}