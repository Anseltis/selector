import { lazy } from '../lazy';
import { withMemoize } from './with-memoize';

export const memoize = (fn, dimension = fn.length) => {
    switch (dimension) {
        case 0:
            return lazy(fn);
        case 1: {
            const state = {};
            return arg => withMemoize(state, fn, arg);
        }
        default: {
            const memoized = memoize(arg1 =>
                memoize((...args) => fn(arg1, ...args), dimension - 1)
            );
            return (arg1, ...args) => memoized(arg1)(...args);
        }
    }
};
