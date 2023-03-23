const axios = require('axios').default
const APIError = require('./APIError')
const log = require('./log')

class cmapi {
    constructor() {
        this.apiUrl = 'https://which-technical-exercise.herokuapp.com'
    }

    /**
     * Call `axios` HTTP request wrapped up in a `try/catch` block
     * so that application can handle it gracefully and we can centrally
     * inform the admins about which API glitched and with which params.
     */
    async call({ type, api, body, earlyExit }) {
        let response
        try {
            /** POST calls */
            if (type === 'POST') {
                response = await axios.post(this.apiUrl + api, body)
            } else if (type === 'GET') {
                /** GET calls */
                response = await axios.get(this.apiUrl + api, {
                    params: body,
                })
            }
            return { ok: response.data }
        } catch (err) {
            log.pretty({
                keybase: true,
                data: { err, type, body, api },
                msg: `Forensics \`${api}\` is erroring, have a look into it`,
            })
            if (earlyExit) {
                throw new APIError({
                    userMessage:
                        'Forensics API is experiencing a glitch. Please try again later.',
                })
            }
            return { down: true }
        }
    }

    /**
     * This will call `/api/{email}/directions` API
     * to get the directions for the missing kittens.
     */
    async directions({ email = '' }) {
        const response = await this.call({
            type: 'GET',
            api: `/api/${email}/directions`,
            earlyExit: true,
        })
        return Array.from(response.ok.directions)
    }

    /**
     * This will call `/api/{email}/location/{x}/{y}` API
     * to send the search party to rescue the kittens.
     */
    async locate({ email = '', x, y }) {
        const response = await this.call({
            type: 'GET',
            api: `/api/${email}/location/${x}/${y}`,
            earlyExit: true,
        })
        return String(response.ok.message)
    }
}

module.exports = new cmapi()
