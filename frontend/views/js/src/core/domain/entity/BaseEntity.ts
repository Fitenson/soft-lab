export default abstract class BaseEntity <T> {
    protected breadCrumb: string = '';


    constructor() {
        // Object.assign(this, data);
    }


    breadCrumbItem(): string {
        try {
            const key = this.breadCrumb;
            const value = (this as never)[key] as T[keyof T];
            return encodeURIComponent(JSON.stringify(value));
        } catch (error) {
            return '';
        }
    }
}
