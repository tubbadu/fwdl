
browser.browserAction.setBadgeBackgroundColor({color: 'white'});
browser.browserAction.setBadgeText({text: "off" });

let online=false;

async function handleCreated(info) {
    if(online){
        console.log('handleCreated:', info.id, info.url);

        try {
            browser.downloads.cancel(info.id);
        }catch(e) {
            console.log(`Error: ${e}`);
        }

        try {
            //read options
            let executablePath = browser.storage.sync.get("executablePath");
            let arguments = browser.storage.sync.get("arguments");
            let minSize = browser.storage.sync.get("minSize");
            //append options to the info json to be passed to the python script
            info.executablePath = executablePath;
            info.arguments = arguments;
            info.minSize = minSize; // this isn't needed but I'll pass it anyway :)
            //calls the python script passing it info json
            console.log("running py with info:")
            console.log(info)
            const resp =  await browser.runtime.sendNativeMessage("fwdl", info);
            console.log("Received " + resp);
        }catch(e) {
            console.log(`Error: ${e}`);
        }

    }
}

async function handleClick(tab) {

  // toggle state
  online = !online
  browser.browserAction.setBadgeText({tabId: tab.id, text: (online?"on":"off") });
}

browser.downloads.onCreated.addListener(handleCreated);
browser.browserAction.onClicked.addListener(handleClick);


