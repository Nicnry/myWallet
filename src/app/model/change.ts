export class Change {
    public id: number;
    public name: string;
    public slug: string;
    public value: number;

    constructor(id, name, slug, value) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.value = value;
    }
}
