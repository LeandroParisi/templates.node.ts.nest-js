export type IStrictBuilder<T, B = Record<string, unknown>> = {
    [k in keyof T]-?: (arg: T[k]) => IStrictBuilder<T, B & Record<k, T[k]>>;
} & {
    build: B extends T ? () => T : never;
};

export function StrictBuilder<T>(): IStrictBuilder<T> {
    const built: Record<string, unknown> = {};

    const Strictbuilder = new Proxy(
        {},
        {
            get(target, prop) {
                if ("build" === prop) {
                    return () => built;
                }

                return (x: unknown): unknown => {
                    built[prop.toString()] = x;
                    return Strictbuilder as IStrictBuilder<T>;
                };
            },
        }
    );

    return Strictbuilder as IStrictBuilder<T>;
}
