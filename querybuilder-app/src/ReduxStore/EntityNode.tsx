
export class EntityNode {
    private showIcon = false;
    private expanded = false;
    private icon: string;
    public fetch_url: string;
    public children_count: number;
    public instance_count: number;
    public mention_count: number;
    public name: string;
    public type: string;
    public url: string;
    public id: number;

    constructor(fetch_url: string, children_count: number, instance_count: number,
                mention_count: number, name: string, type: string, url: string, id: number) {

        this.fetch_url = fetch_url;
        this.children_count = children_count;
        this.instance_count = instance_count;
        this.mention_count = mention_count;
        this.name = name;
        this.type = type;
        this.url = url;
        this.id = id;

        if (children_count > 0) {
            this.showIcon = true;
            this.icon = this.getIcon();
        }

    }

    public expand(): void {
      this.expanded = !this.expanded;
      this.icon = this.getIcon();
    }

    private getIcon(): string {
        if (this.showIcon === true) {
            if (this.expanded) {
                return '- ';
            } else {
                return '+ ';
            }
        } else {
            return '';
        }
    }
}
