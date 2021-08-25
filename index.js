/*
Author: Wipie
Version: 1.0.2
Project: LightShotGalleryDownloader-CLI
*/
const request = require('request');
const fs = require('fs');
const cliProgress = require('cli-progress');
const _colors = require('colors');

const pBar = new cliProgress.SingleBar({
  format: 'Downloading ID:{id} - Total: {value}/{total}({percentage}%) |' + _colors.green('{bar}') + '| Elapsed: {duration_formatted} - Duration: {eta_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: false,
  forceRedraw: false,
  synchronousUpdate: true,
  etaAsynchronousUpdate: false,
  etaBuffer: 1000,
  linewrap: true,
  fps: 100,
}, cliProgress.Presets.shades_classic);

try {
    let jsonFile = require("./target.json");
    var args = process.argv.slice(2)
    extractScreenshots(jsonFile, args[0]);
} catch (error) {
    console.log("An error occured while trying to open JSON file. More: " + error);
}

async function extractScreenshots(file, start = 0) {
  console.log("===================================================");
  console.log("=========LightShot Gallery Downloader CLI==========");
  console.log("==============By Wipie=============================");
  console.log("===================================================");
  pBar.start(file.result.total, 0);
  for(let i = start; i < file.result.total; i++) {
      //wait(1000); // Pausing thread to avoid Prntscr's timeout
      pBar.increment();
      pBar.updateETA()
      pBar.update(i, {
        id: file.result.screens[i].id36
      });
      let fileDate = file.result.screens[i].date.replace(' ', '_').replace(':', 'h').replace(':', 'm');
      await saveImage(file.result.screens[i].url, './images/' + fileDate + "s.jpg");
    }
    pBar.stop();
    console.log("Download completed. All screenshots are now in ./images/");
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
