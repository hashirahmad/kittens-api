exports.isProduction = () => {
    const value = Number(process.env.ENVIRONMENT)
    return value === 2
}

exports.isStaging = () => {
    const value = Number(process.env.ENVIRONMENT)
    return value === 1
}

exports.isLocal = () => {
    const value = Number(process.env.ENVIRONMENT)
    return Number.isNaN(value)
}

exports.getEnvName = () => {
    if (exports.isLocal()) return 'Local'
    if (exports.isStaging()) return 'Staging'
    if (exports.isProduction()) return 'Production'
    return 'Unknown'
}
