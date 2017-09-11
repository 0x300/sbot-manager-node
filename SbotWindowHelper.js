const au = require('./autoitHelper')

function SbotWindowHelper(characterName) {
    this._botHwnd = 0
    this._characterName = characterName

    au.Init()
    au.Opt("WinTitleMatchMode", 2); // enable partial string matching

    return new Promise((resolve, reject) => {
        const self = this
        au.WinWait(this._characterName)

        this._botHwnd = au.WinGetHandle(this._characterName)

        if(self._botHwnd) {
            this.getCtrlHandles()
            resolve(this)
        }
        else {
            reject('Failed to get bot handle.')
        }
    })
}

SbotWindowHelper.prototype.getLogText = function() {
    return au.ControlGetText(this._botHwnd, this._logHwnd, 200000000)
}

SbotWindowHelper.prototype.getGlobalChatText = function() {
    return au.ControlGetText(this._botHwnd, this._globalChatHwnd, 200000000)
}

SbotWindowHelper.prototype.getUniqueHistory = function() {
    const uniqueHistoryText = au.ControlGetText(this._botHwnd, this._uniqueLogHwnd, 200000000)
    return uniqueHistoryText.split('\r\n').slice(0,-1)
}

SbotWindowHelper.prototype.getUniqueKills = function() {
    return this.getUniqueHistory().filter((record) => {
        return record.includes('killed');
    })
}

SbotWindowHelper.prototype.getUniqueSpawns = function() {
    return this.getUniqueHistory().filter((record) => {
        return record.includes('spawned');
    })
}

SbotWindowHelper.prototype.startTraining = function() {
    // Click start training
}

SbotWindowHelper.prototype.stopTraining = function() {
    // Click stop training
}

SbotWindowHelper.prototype.resetStats = function() {
    // Click reset stats
}

SbotWindowHelper.prototype.getCtrlHandles = function() {
    this._logHwnd = this.getBotCtrlHandleById(1187)
    this._startTrainingHwnd = this.getBotCtrlHandleById(1184)
    this._stopTrainingHwnd = this.getBotCtrlHandleById(1185)
    this._resetStatsHwnd = this.getBotCtrlHandleById(1180)
    this._saveSettingsHwnd = this.getBotCtrlHandleById(1182)
    this._connectionStatusHwnd = this.getBotCtrlHandleById(235)
    this._globalChatHwnd = this.getBotCtrlHandleById(788)
    this._uniqueLogHwnd = this.getBotCtrlHandleById(790)
}

SbotWindowHelper.prototype.getBotCtrlHandleById = function(ctrlId) {
    return au.getCtrlHandleById(this._botHwnd, ctrlId)
}

module.exports = SbotWindowHelper