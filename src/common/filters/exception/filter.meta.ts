import { Builder, IBuilder } from "builder-pattern";

export class FilterMeta {
    public readonly path: string;
    public readonly method: string;
    public readonly statusCode: number;
    public readonly message: string;
    public readonly codes: string[];
    public readonly stack: string;

    public static builder(): IBuilder<FilterMeta> {
        return Builder<FilterMeta>();
    }
}
