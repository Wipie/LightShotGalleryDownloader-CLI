# LighshotGalleryDownloaded-CLI
A small Node.JS program to download your LightShot(Prntscr.com) Gallery

## Compatibility

Works on Linux/Windows/MacOS

## Depedencies

Node.JS v12.16.2 or newer ( Prior versions haven't been tested. )

## Usage

Prior to use this program you will need to download your gallery information into a target.json
To do so you can perform a postman request on LightShot's API

Result should be similar to this:
```
{jsonrpc: "2.0", id: 1, result: {success: true,…}}
id: 1
jsonrpc: "2.0"
result: {success: true,…}
```

Once you have your target.json file clone or download LighshotGalleryDownloaded-CLI.
```bash
git clone https://github.com/Wipie/LightShotGalleryDownloader-CLI.git
```
Then get into the root repository and open a terminal to install node depedencies.
```bash
npm install
```

After installating dependcies, move the target.json file into the root of the program your folder should look like this

    .
    ├── node_modules                
    ├── images                      # Folder where downloaded image will output.
    ├── package-lock.json    
    ├── package.json        
    ├── index.js                    # LightshotGalleryDownloader-CLI
    ├── target.json                 # Your target.json
    └── README.md

Finally in a terminal run the program
```bash
node .
```
Let it run depending on how much screenshots there is it might take a LONG time. I had to pause thread every download to avoid LightShot's auto timeout.
