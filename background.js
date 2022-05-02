
async function handleCreated(info) {

    console.log('handleCreated:', info.id, info.url);

    try {
        browser.downloads.cancel(info.id);
    }catch(e) {
        console.log(`Error: ${e}`);
    }

    try {
        const resp =  await browser.runtime.sendNativeMessage("fwdl", info.url);
        console.log("Received " + resp);
    }catch(e) {
        console.log(`Error: ${e}`);
    }

}

browser.downloads.onCreated.addListener(handleCreated);

