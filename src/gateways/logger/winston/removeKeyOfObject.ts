export function removeKeyOfObject<T, K extends keyof T>(objToKeyRemove: T, keysToRemove: K[]) {
    const objectWithKeyRemoved = {} as T;

    const objectKeys = Object.keys(objToKeyRemove);

    objectKeys.forEach((key) => {
        if (!keysToRemove.includes(key as K)) {
            objectWithKeyRemoved[key] = objToKeyRemove[key];
        }
    });

    return objectWithKeyRemoved;
}
