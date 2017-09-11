// Extension of node autoit to add a few convenience features
const au = require('autoit')

au.namedCtrls = {}

au.getCtrlHandleById = (windowHwnd, id) => {
    return au.ControlGetHandle(windowHwnd, `[ID:${id}]`)
}

// Save handle of a control using a name for easier reference later
au.setCtrlName = (name, windowHwnd, controlId) => {
    au.namedCtrls[name] = [windowHwnd, getCtrlHandleById(controlId)]
}

au.getCtrlByName = (name) => {
    return this.namedCtrls[name];
}

module.exports = au