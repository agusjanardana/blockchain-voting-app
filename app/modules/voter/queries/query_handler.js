const getVoter = require('./domain')

// fungsi-fungsi disini akan inisialisasi object module

const getLogin = () => {
    const getLoginVoter = new getVoter()
    return getLoginVoter.getLogin()
}

const notLogin = () => {
    const notLoginVoter = new getVoter()
    return notLoginVoter.notLogin()
}

const notVerif = () => {
    const notVerifVoter = new getVoter()
    return notVerifVoter.notVerif()
}

const failLogin = () => {
    const failLoginVoter = new getVoter()
    return failLoginVoter.failLogin()
}

module.exports = {
    getLogin,
    notLogin,
    notVerif,
    failLogin
}