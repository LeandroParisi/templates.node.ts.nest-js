import { Builder, IBuilder } from "@utils/builder";

export class LoggerMeta {
    public readonly method: string;
    public readonly date: string;
    public readonly ip: string;
    public readonly path: string;
    public readonly status?: number;

    public static builder(): IBuilder<LoggerMeta> {
        return Builder<LoggerMeta>();
    }
}
