const forensicsApi = require('../../../../helpers/forensicsApi')

class requestRescueForKittens {
    constructor({ email }) {
        this.email = email
    }

    /**
     * Requests for the directions to find the missing
     * kittens for the specified owners' email
     */
    async request() {
        const response = await forensicsApi.directions({ email: this.email })
        return response
    }
}

module.exports = requestRescueForKittens
