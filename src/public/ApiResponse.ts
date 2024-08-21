export default class ApiResponse<T extends Object> {
    private data!: T | {};
    private error: string;
    private count: number;

    constructor(){       
        this.data = {};        
        this.count = 0; 
        this.error = '';       
    }

    public setData(data: T) {
        this.data = data;
        this.count = Array.isArray(data) ? data.length : (Object.keys(data).length === 0 ? 0 : 1);
    }

    public getData(): T | {} {
        return this.data;
    }

    public setError(error: string) {
        this.error = error;
    }

    public getError(): string {
        return this.error;
    }
}