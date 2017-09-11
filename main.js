const SbotWindowHelper = require('./SbotWindowHelper')

const sbotWindow = new SbotWindowHelper('Dragneel');

sbotWindow.then((sbot) => {
    // Stub of function that will eventually control what this program
    // does with the sbot API I'm building
    console.log(sbot.getUniqueKills())
})
.catch((msg) => {
    console.log(msg)
})

// Make it easier to exit the process since windows handles SIGINT oddly
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
}

process.on("SIGINT", function () {
    process.exit();
});
