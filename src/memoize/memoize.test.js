import { expect } from 'chai';

import { memoize } from './memoize';

describe('memoize', () => {
    it('memoize with one param', () => {
        let i = 0;
        const fn = memoize(j => {
            i++;
            return j;
        });

        expect(i).to.equal(0);
        fn(1);
        expect(i).to.equal(1);
        fn(1);
        expect(i).to.equal(1);
        fn(2);
        expect(i).to.equal(2);
        fn(fn);
        expect(i).to.equal(3);
        fn(fn);
        expect(i).to.equal(3);
        fn(undefined);
        expect(i).to.equal(4);
        fn(undefined);
        expect(i).to.equal(4);
    });

    it('memoize with one special param', () => {
        let i = 0;
        const fn = memoize(j => {
            i++;
            if (!j) {
                return 5;
            }
            return j;
        });

        expect(i).to.equal(0);
        expect(fn(undefined)).to.equal(5);
        expect(i).to.equal(1);
        expect(fn(undefined)).to.equal(5);
        expect(i).to.equal(1);
    });

    it('memoize with two params', () => {
        let i = 0;

        const fn = memoize((x, y) => {
            i++;
            return x + y;
        });

        expect(i).to.equal(0);
        fn(2, 3);
        expect(i).to.equal(1);
        fn(2, 3);
        expect(i).to.equal(1);
        fn(2, 4);
        expect(i).to.equal(2);
        fn(undefined, 0);
        expect(i).to.equal(3);
        fn(undefined, 0);
        expect(i).to.equal(3);
    });

    it('memoize with three params', () => {
        let i = 0;
        const fn = memoize((x, y, z) => {
            i++;
            return x + y + z;
        });

        expect(i).to.equal(0);
        fn(2, 3, 4);
        expect(i).to.equal(1);
        fn(2, 3, 4);
        expect(i).to.equal(1);
        fn(2, 4, 4);
        expect(i).to.equal(2);
        fn(3, 3, 4);
        expect(i).to.equal(3);
        fn(2, 6, 4);
        expect(i).to.equal(4);
    });
});
