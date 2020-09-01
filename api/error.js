module.exports = app => {
    function notInformation(val, msg) {
        if(!val) throw msg
        if(Array.isArray(val) && val.length === 0) throw msg
        if(typeof val === 'string' && !val.trim()) throw msg
    }

    function userExist(value, msg) {
        try {
            notInformation(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    return { notInformation, userExist }
}
