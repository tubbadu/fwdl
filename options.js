function saveOptions(e){
    e.preventDefault();
    console.log("saved options")
    browser.storage.sync.set({
        executablePath: document.getElementById("executablePath").value,
        arguments: document.getElementById("arguments").value,
        minSize: document.getElementById("minSize").value
      });
}

function restoreOptions(){
    console.log("restoring options")
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    browser.storage.sync.get().then(gotSuccess, gotError);

    function gotError(error){
        console.log(`Error in browser.storage.sync.get(): ${error}`);
    }
    function gotSuccess(item){
        document.getElementById("executablePath").value = item.executablePath
        document.getElementById("arguments").value = item.arguments
        document.getElementById("minSize").value = item.minSize
    }
    /*
    let executablePath = browser.storage.sync.get("executablePath");
    let arguments = browser.storage.sync.get("arguments");
    let minSize = browser.storage.sync.get("minSize");

    executablePath.then(executablePathGot, executablePathError)
    arguments.then(argumentsGot, argumentsError)
    minSize.then(minSizeGot, minSizeError)

    function executablePathGot(item){
        document.getElementById("executablePath").value = item.executablePath
    }
    function executablePathError(error){
        console.log(`Error executablePath: ${error}`);
    }
    function argumentsGot(item){
        document.getElementById("arguments").value = item.arguments
    }
    function argumentsError(error){
        console.log(`Error arguments: ${error}`);
    }
    function minSizeGot(item){
        document.getElementById("minSize").value = item.minSize
    }
    function minSizeError(error){
        console.log(`Error minSize: ${error}`);
    }*/

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);