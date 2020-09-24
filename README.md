# LighshotGalleryDownloaded-CLI
A small Node.JS program to download your LightShot(Prntscr.com) Gallery

## Compatibility

Works on Linux/Windows/MacOS

## Depedencies

Node.JS v12.16.2 or newer ( Prior versions haven't been tested. )

## Usage

Prior to use this program you will need to download your gallery information into a target.json

To generate the target.json you can perform a cURL request like the one below
Note: The file will be generated in the folder your terminal is currently in!

Just replace the cookies and data-binary in the request below

### Edit
```bash
-H 'cookie: <YOUR COOKIES>
--data-binary '{"jsonrpc":"2.0","method":"get_user_screens","id":1,"params":{"start_id36":"<YOUR LAST SCREENSHOT ID>","count":10000}}'
```
Note: This request will only retrieve your last 10.000 screenshots.
### Request
```bash
curl 'https://api.prntscr.com/v1/' \
  -H 'authority: api.prntscr.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'origin: https://prntscr.com' \
  -H 'sec-fetch-site: same-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://prntscr.com/gallery.html' \
  -H 'accept-language: fr-CA,fr;q=0.9,fr-FR;q=0.8,en-US;q=0.7,en;q=0.6,it;q=0.5,ru;q=0.4' \
  -H 'cookie: <YOUR COOKIES>' \
  --data-binary '{"jsonrpc":"2.0","method":"get_user_screens","id":1,"params":{"start_id36":"<YOUR LAST SCREENSHOT ID>","count":10000}}' \
  --compressed > target.json
```



Once you have your target.json file, clone or download LighshotGalleryDownloaded-CLI.
```bash
git clone https://github.com/Wipie/LightShotGalleryDownloader-CLI.git
```
Then get into the root repository and open a terminal to install node depedencies.
```bash
npm install
```

After installating depedencies, move the target.json file into the root of the program your folder should look like this

    .
    ├── node_modules                
    ├── images                      # Folder where downloaded image will output.
    ├── package-lock.json    
    ├── package.json        
    ├── index.js                    # LightshotGalleryDownloader-CLI
    ├── target.json                 # Your target.json
    ├── LICENSE
    └── README.md

Finally in a terminal run the program
```bash
node .
```
Let it run depending on how much screenshots there is it might take a LONG time.


## Troubleshooting

If during download you are getting error while downloading, navigate inside index.js and uncomment Line 18, wipe the /images/ folder and try again. It will take longer but you won't be timed out by prntscr.com
