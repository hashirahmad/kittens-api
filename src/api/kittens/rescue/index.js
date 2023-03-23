/**
 * @api {get} /v1/kittens/rescue Rescue Kittens
 * @apiName /v1/kittens/rescue
 * @apiGroup Kittens
 * @apiPermission none
 *
 * @apiDescription This will take original kittens owner's email address to
 * rescue his/her kittens.
 * 
 * @apiParam {String}	email	   An email of the kittens owner.
 *
 * @apiSuccess {string}   status        ok

@apiSuccessExample {json} Success As an overall count
{
}
@apiSuccessExample {json} Success As a list
{
}
@apiErrorExample {json} EXAMPLE_ERR
{
    error: 'EXAMPLE_ERR',
    details: { hello: "world" },
    userMessage: `Hello there! Erm . . . something went wrong!!!`,
}
*/
const app = require('../../../app')
const restify = require('../../../helpers/restifyHelpers')
const rescueKittens = require('../../../logic/kittens/rescue')

module.exports = (url) => {
    app.get(url, async (req, res, next) => {
        /** Get all params */
        const email = restify.getAsEmail(req, 'email', '', true)

        const logic = new rescueKittens({ email })
        const response = await logic.rescue()
        restify.ok({ req, res, next, response })
    })
}
