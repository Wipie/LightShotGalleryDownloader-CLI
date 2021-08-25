# LighshotGalleryDownloaded-CLI
A small Node.JS program to download your LightShot(Prntscr.com) Gallery

## Compatibility

Works on Linux/Windows/MacOS

## Depedencies

Node.JS v12.16.2 or newer ( Prior versions haven't been tested. )

## Usage


### Step 1: Generating your JSON file.
Prior to use this program you will need to download your gallery information into a target.json

To generate the target.json you can perform a cURL request like the one below
Note: The file will be generated in the folder your terminal is currently in!

##### To find your cookie, go to https://prntscr.com/gallery.html and follow instruction 1.1
### /!\ You must be logged into your account before going to step 1.1 !

#### Step 1.1: Getting your __auth cookie
| Browser |Action|
|---------|---|
|Firefox|Step 1: <kbd>Shift</kbd>+<kbd>F9</kbd> <br> Step 2: Click on `Cookies` option on left"<br>Step 3: Select the cookie provider: `https://prntscr.com/`<br>Step 4: Copy the value associated to `__auth`|
|Chrome|Step 1: <kbd>F12</kbd><br>Step 2: Click on `Application` at the top<br>Step 3: Click on `Cookies` option on left<br>Step 4: Select the cookie provider: `https://prntscr.com/`<br>Step 5: Copy the value associated to `__auth`|

#### Step 1.2: Preparing the request
##### Edit the request with your own __auth cookie
```bash
-H 'cookie: __auth=<YOUR COOKIES>'
```

##### Request
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
  -H 'cookie: __auth=<YOUR COOKIES>' \
  --data-binary '{"jsonrpc":"2.0","method":"get_user_screens","id":1,"params":{"count":10000}}' \
  --compressed > target.json
```
Note: This request will only retrieve your last 10.000 screenshots.

#### Step 1.3: Performing the request
To perform the above requeste you must have a terminal capable of using cURL. Powershell can work but unless there is lot of demand I won't explain how to proceed
<table>
  <tr>
    <td>OS</td>
    <td>Terminal</td>
    <td>Support</td>
    <td>Working</td>
    <td>Using cURL</td>
  </tr>
  <tr>
    <td rowspan=2>Windows</td>
    <td>PowerShell</td>
    <td>:x:</td>
    <td>Likely Yes (Untested)</td>
    <td>:x:</td>
  </tr>
  <tr>
    <td>Git Bash</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
  </tr>
  <tr>
    <td>Linux</td>
    <td>Bash Terminal</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
  </tr>
  <tr>
    <td>MacOS</td>
    <td>Terminal</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
    <td>:heavy_check_mark:</td>
  </tr>
</table>
    

### Step 2: Cloning the repository
Once you have your target.json file, clone or download LighshotGalleryDownloaded-CLI.
```bash
git clone https://github.com/Wipie/LightShotGalleryDownloader-CLI.git
```

### Step 3: Installing depedencies
After cloning get into the root repository and open a terminal to install node depedencies
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

### Step 4: Run the program
Finally in a terminal run the program
```bash
node .
```

If you want to start at a specific index or resume where you were you can use the following
```bash
node . <number> e.g node . 100 Will start at 100 
```

Let it run depending on how much screenshots there is it might take a LONG time.


## Troubleshooting

If during download you are getting error while downloading, navigate inside index.js and uncomment Line 18, wipe the /images/ folder and try again. It will take longer but you won't be timed out by prntscr.com
