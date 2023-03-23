class logicLocate {
    constructor({ directions = [] }) {
        const directionsObj = {
            forward: 'forward',
            left: 'left',
            right: 'right',
        }
        const faceDirectionsObj = {
            north: 'north',
            west: 'west',
            east: 'east',
            south: 'south',
        }
        /** ENUMs for the directions so its easier to compare against */
        this.directionsObj = directionsObj
        /** ENUMs for the face direction so its easier to compare against */
        this.faceDirectionsObj = faceDirectionsObj
        this.directions = directions
    }

    /**
     * This is when current direction requires that we rotate
     * our face subject to the current face direction. For example
     * if I am currently facing `north` and I get the current direction
     * as `right` then I will have to rotate my face towards `east`.
     */
    rotateFace({ currentDirection, currentFaceDirection }) {
        const { left, right } = this.directionsObj
        const { north, west, east, south } = this.faceDirectionsObj
        const rotations = {
            [left]: {
                [north]: west,
                [west]: south,
                [east]: west,
            },
            [right]: {
                [west]: north,
                [south]: north,
                [north]: east,
            },
        }
        const newFaceDirection =
            rotations[currentDirection][currentFaceDirection]
        return newFaceDirection
    }

    /**
     * This will loop through the directions, determining when
     * to actually move forward and when to simply rotate the face
     * according to the current direction. From the directions, it
     * will locate the relevant `x` and `y` and return the coordinates.
     */
    locate() {
        let x = 0
        let y = 0
        let faceDirection = 'north'
        const { forward } = this.directionsObj
        const { north, west, east } = this.faceDirectionsObj
        for (let i = 0; i < this.directions.length; i += 1) {
            const direction = this.directions[i]

            if (direction === forward && faceDirection === north) {
                y += 1
            } else if (direction === forward && faceDirection === west) {
                x -= 1
            } else if (direction === forward && faceDirection === east) {
                x += 1
            } else {
                const newFaceDirection = this.rotateFace({
                    currentDirection: direction,
                    currentFaceDirection: faceDirection,
                })
                if (newFaceDirection) {
                    faceDirection = newFaceDirection
                }
            }
        }
        return { x, y }
    }
}

module.exports = logicLocate
