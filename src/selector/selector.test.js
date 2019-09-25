import { expect } from 'chai';

import { selector } from './selector';

describe('selector', () =>
    it('selector is correct', () => {
        let i = 0;
        const fn = selector([x => x.text, y => y.name], (text, name) => {
            i++;
            return `${name}: ${text}`;
        });

        expect(fn({ name: 'f', text: '4' })).to.equal('f: 4');
        expect(i).to.equal(1);
        expect(fn({ name: 'f', text: '4' })).to.equal('f: 4');
        expect(i).to.equal(1);
        expect(fn({ name: 'f', text: 4 })).to.equal('f: 4');
        expect(i).to.equal(2);
        expect(fn({ name: 'f', text: '4' })).to.equal('f: 4');
        expect(i).to.equal(2);
        expect(fn({ name: 'f', text: '5' })).to.equal('f: 5');
        expect(i).to.equal(3);
    }));
