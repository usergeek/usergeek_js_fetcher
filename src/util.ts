export const compactArray = <T>(array: Array<T | undefined>): T[] => array.filter((item): item is T => item !== undefined);

export const sumArray = (array: Array<Array<number>>) => {
    const newArray: Array<number> = [];
    array.forEach(sub => {
        sub.forEach((num, index) => {
            if (newArray[index]) {
                newArray[index] += num;
            } else {
                newArray[index] = num;
            }
        });
    });
    return newArray;
}

export const uniqBy = <T>(array: T[], iteratee: (value: T) => unknown): T[] => {
    const seen = new Map();
    return array.filter((item) => {
        const k = iteratee(item);
        return seen.has(k) ? false : seen.set(k, true);
    });
};

export const sumBy = <T>(array: T[], iteratee: (value: T) => number): number => array.reduce((sum, item) => sum + iteratee(item), 0);