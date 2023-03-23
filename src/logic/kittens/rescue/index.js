const forensicsApi = require('../../../helpers/forensicsApi')
const logicLocate = require('../locate/logicLocate')
const requestRescueForKittens = require('./request')

class rescueKittens {
    constructor({ email }) {
        this.email = email
        this.requestRescueForKittens = new requestRescueForKittens({ email })
    }

    /**
     * It will first requests for the directions for missing kittens
     * for the specified owner's email address. Then it will attempt
     * to locate the coordinates for the requested directions. Finally
     * it will then issue a rescue operation for the kittens.
     */
    async rescue() {
        const directions = await this.requestRescueForKittens.request()
        const locate = new logicLocate({ directions })
        const coordinates = locate.locate()
        const response = await forensicsApi.locate({
            email: this.email,
            x: coordinates.x,
            y: coordinates.y,
        })
        return response
    }
}

module.exports = rescueKittens
