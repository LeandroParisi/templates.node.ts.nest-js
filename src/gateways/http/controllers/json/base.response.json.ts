export abstract class BaseResponseJson<Origin> {
    abstract mapper(from: Origin | Origin[]): BaseResponseJson<Origin> | BaseResponseJson<Origin>[];
}
