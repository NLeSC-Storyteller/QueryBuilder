export class EntityInstance {

    private mention_count: number;
    private name: string;
    private url: string;

    constructor (mention_count: number, name: string, url: string) {
        this.mention_count = mention_count;
        this.name = name;
        this.url = url;
    }
}
