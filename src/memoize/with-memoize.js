export const withMemoize = (state, fn, arg) => {
    const type = typeof arg;

    if ((type === 'object' || type === 'function') && arg !== null) {
        if (state.weakMap === undefined) {
            state.weakMap = new WeakMap();
        }

        return referenceMemoize(state.weakMap);
    }

    if (state.map === undefined) {
        state.map = new Map();
    }

    if (type === 'number' || type === 'string' || type === 'boolean') {
        return valueMemoize(state.map);
    }

    return specificMemoize(state.map);

    function referenceMemoize(weakMap) {
        if (weakMap.has(arg)) {
            return weakMap.get(arg);
        }

        const value = fn(arg);
        weakMap.set(arg, value);
        return value;
    }

    function valueMemoize(map) {
        let values = map.get(type);

        if (values === undefined) {
            values = new Map();
            map.set(type, values);
        }

        if (values.has(arg)) {
            return values.get(arg);
        }

        const value = fn(arg);
        values.set(arg, value);
        return value;
    }

    function specificMemoize(map) {
        if (map.has(type)) {
            return map.get(type);
        }

        const value = fn(arg);
        map.set(type, value);
        return value;
    }
};
