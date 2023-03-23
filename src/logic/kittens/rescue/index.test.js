/* eslint-disable node/no-unpublished-require */

const { assert } = require('chai')
const { describe, it } = require('mocha')
const sinon = require('sinon')
const forensicsApi = require('../../../helpers/forensicsApi')
const requestRescueForKittens = require('./request')
const rescueKittens = require('./index')
const setUp = require('../../tests/setUp')

describe('Logic Rescue', () => {
    it('rescue() defined', () => {
        assert.isFunction(rescueKittens.prototype.rescue)
    })

    const triedExamples = [
        {
            email: 'hello@world.com',
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
            email: 'bye@world.com',
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
        it(`Should be able to rescue '${o.email}' kittens`, async () => {
            sinon
                .stub(requestRescueForKittens.prototype, 'request')
                .resolves(o.directions)
            sinon.stub(forensicsApi, 'locate').callsFake((obj) => {
                assert.deepEqual(obj.email, o.email)
                assert.deepEqual(obj.x, o.x)
                assert.deepEqual(obj.y, o.y)
                return String('')
            })
            const logic = new rescueKittens({ email: o.email })
            const response = await logic.rescue()
            assert.isString(response)
            sinon.verifyAndRestore()
        })
    })

    it(`Should gracefully fail if the Forensics API throws error`, async () => {
        sinon.stub(forensicsApi, 'call').callsFake(() => {
            setUp.throwDeliberateErr()
        })
        const logic = new rescueKittens({ email: 'does not matter' })
        try {
            await logic.rescue()
        } catch (err) {
            setUp.ensureItIsOurDeliberateErr(err)
        }
        sinon.verifyAndRestore()
    })
})
