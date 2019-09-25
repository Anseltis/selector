import { memoize } from '../memoize';

export const selector = (funcs, func) => {
    const memoized = memoize(func, funcs.length);
    return state => {
        const args = funcs.map(fn => fn(state));
        return memoized(...args);
    };
};
