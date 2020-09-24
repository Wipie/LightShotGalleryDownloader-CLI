/*
Author: Wipie
Version: 1.0.0
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
    console.log("Detected : " + file.result.total + " screenshots.");
    for(let i = 0; i < file.result.total; i++) {
        wait(2000); // Pausing thread to avoid Prntscr's timeout
        let count = i + 1;
        let remainingTime = (file.result.total - i) * 2;
        console.log("Downloading screenshot #"+ count + " Estimated time remaining: " + convertTime(remainingTime));
        await saveImage(file.result.screens[i].url, './images/' + file.result.screens[i].id36 + '.jpg');
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

function convertTime(sec) {
    var sec_num = parseInt(sec, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours,minutes,seconds].map(v => v < 10 ? "0" + v : v).filter((v,i) => v !== "00" || i > 0).join(":")
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