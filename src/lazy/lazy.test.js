import { expect } from 'chai';

import { lazy } from './lazy';

describe('lazy', () =>
    it('lazy is correct', () => {
        let i = 0;
        const fn = lazy(() => {
            i++;
        });
        expect(i).to.equal(0);
        fn();
        expect(i).to.equal(1);
        fn();
        expect(i).to.equal(1);
    }));
