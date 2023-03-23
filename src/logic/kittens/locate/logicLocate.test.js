/* eslint-disable node/no-unpublished-require */

const { assert } = require('chai')
const { describe, it } = require('mocha')
const logicLocate = require('./logicLocate')

describe('Logic Locate', () => {
    it('rotateFace() defined', () => {
        assert.isFunction(logicLocate.prototype.rotateFace)
    })
    it('locate() defined', () => {
        assert.isFunction(logicLocate.prototype.locate)
    })

    const triedExamples = [
        {
            directions: [
                'forward',
                'left',
                'forward',
                'right',
                'forward',
                'right',
                'forward',
                'forward',
                'forward',
            ],
            x: 2,
            y: 2,
        },
        {
            directions: [
                'forward',
                'right',
                'forward',
                'forward',
                'forward',
                'left',
                'forward',
                'forward',
                'left',
                'right',
                'forward',
                'right',
                'forward',
                'forward',
                'right',
                'forward',
                'forward',
                'left',
            ],
            x: 5,
            y: 2,
        },
    ]

    triedExamples.forEach((o) => {
        it(`'${o.directions.join(',')}' should lead to x=${o.x} and y=${
            o.y
        }`, () => {
            const logic = new logicLocate({ directions: o.directions })
            const location = logic.locate()
            assert.strictEqual(location.x, o.x)
            assert.strictEqual(location.y, o.y)
        })
    })
})
