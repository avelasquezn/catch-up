export class Source {
    constructor({
        id = '',
        name = '',
        description = '',
        url = '',
        category = '',
        language = '',
        country = ''}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.category = category;
        this.language = language;
        this.country = country;
        this.urlToLogo = null;
    }
}