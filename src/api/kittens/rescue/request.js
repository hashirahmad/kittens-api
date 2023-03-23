/**
 * @api {get} /v1/kittens/rescue/request Request Rescue For Kittens
 * @apiName /v1/kittens/rescue/request
 * @apiGroup Kittens
 * @apiPermission none
 *
 * @apiDescription This will allow the owner of the kittens to request for the
 * rescue of the kittens
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

module.exports = (url) => {
    app.get(url, async (req, res, next) => {
        /** Get all params */
        const email = restify.getAsEmail(req, 'email', '', true)

        const response = { world: true, email }
        restify.ok({ req, res, next, response })
    })
}
