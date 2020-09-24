/*
Author: Wipie
Version: 1.0.1
Project: LightShotGalleryDownloader-CLI
*/
const request = require('request');
const fs = require('fs');

try {
    let jsonFile = require("./target.json");
    extractScreenshots(jsonFile);
} catch (error) {
    console.log("An error occured while trying to open JSON file. More: " + error);
}

async function extractScreenshots(file) {
    for(let i = 0; i < file.result.total; i++) {
        //wait(1000); // Pausing thread to avoid Prntscr's timeout
        let count = i + 1;
        let percent = (i / file.result.total) * 100;
        console.clear();
        console.log("===================================================");
        console.log("=========LightShot Gallery Downloader CLI==========");
        console.log("==============By Wipie=============================");
        console.log("===================================================");
        console.log("Downloading screenshot ID: " + file.result.screens[i].id36 + " (#" + count + ").");
        console.log("===================================================");
        console.log("Total: " + count + "/" + file.result.total + " Progression: " + (Math.round(percent * 100) / 100).toFixed(2) + "% done.")
        let fileDate = file.result.screens[i].date.replace(' ', '_').replace(':', 'h').replace(':', 'm');
        await saveImage(file.result.screens[i].url, './images/' + fileDate + "s.jpg");
    }
    console.log("Download complete. All screenhots are now in ./images/");
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

async function saveImage(url, dest) {
    const file = fs.createWriteStream(dest);
    await new Promise((resolve, reject) => {
      request({
        uri: url,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    }).catch((error) => {
          console.log(`An error occured : ${error}`);
        });
}