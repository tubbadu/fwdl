
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
            browser.storage.sync.get().then(gotSuccess, gotError);

            function gotError(error){
                console.log(`Error in browser.storage.sync.get(): ${error}`);
            }

            async function gotSuccess(item){
                //append options to the info json to be passed to the python script
                info.executablePath = item.executablePath;
                info.arguments = item.arguments;
                info.minSize = item.minSize; // this isn't needed but I'll pass it anyway :)
                //calls the python script passing it info json
                console.log("running py with info:")
                console.log(info)
                const resp =  await browser.runtime.sendNativeMessage("fwdl", info);
                console.log("Received " + resp);
            }
            
            
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


