export default abstract class BaseEntity <T> {
    protected model: Partial<T>;

    constructor(model: Partial<T>) {
        this.model = model;
    }


    protected breadCrumb: string = '';

    breadCrumbItem(): string {
        try {
            const key = this.breadCrumb;
            const value = (this as never)[key] as T[keyof T];
            return encodeURIComponent(JSON.stringify(value));
        } catch (error) {
            return '';
        }
    }

    /** Map API/DTO to entity */
    static asEntity<M, E extends BaseEntity<M>>(model: M, EntityClass: new (model: M) => E): E {
        return new EntityClass(model);
    }

    /** Map entity back to API/DTO */
    asDto(): Partial<T> {
        return this.model;
    }

    abstract asViewModel(): Partial<T>;

    /** Generic clone */
    clone(): this {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}
