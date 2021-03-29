const request = require('request');
const fs = require('fs');
const got = require('got');

if(!process.argv[2]) return console.log(`------------------------\n
Missing third argument: Please paste the link to the page of the HDRI you want to scrape!\n
<<<EXAMPLE>>> node index.js https://www.hdri-hub.com/hdrishop/hdri/space/item/762-hdr-180-5-space-sky-and-stars\n
------------------------`);

let inputlink = process.argv[2];

let link;

async function webScrape() {
  let panohtml;

  await (async () => {
    try {
      const response = await got(inputlink);
      panohtml = response.body.substring(response.body.indexOf("/krpano/"), response.body.indexOf(".html"));
    } catch (error) {
      console.log(error.response.body);
    }
  })();

  await (async () => {
    try {
      const response = await got(`https://www.hdri-hub.com${panohtml}.html`);
      const xmllink = response.body.substring(response.body.indexOf("panos/"), response.body.indexOf(".xml"));
      link = `https://www.hdri-hub.com/krpano/panos/resources/${xmllink.slice(6)}.tiles/`;
    } catch (error) {
      console.log(error.response.body);
    }
  })();
}

async function run() {

  if (!fs.existsSync("./tiles")){
    console.log("Tiles folder not found, creating folder...");
    fs.mkdirSync("./tiles");
  }

  var linkArr = [];
  const tileFaceArr = ["l", "r", "u", "d", "f", "b"];

  for(x in tileFaceArr){
    linkArr.push(`${link}tablet_${tileFaceArr[x]}.jpg`);
  }

  console.log("Tile face filenames created ✅");

  let tileCount = 0;
  for(const link of linkArr){
    console.log(`Downloading... (${tileCount + 1}/6)`);
    await download(link, `./tiles/tile${tileCount}.jpg`);
    tileCount++;
  }
}

async function download(url, dest) {
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
  })
  .catch((error) => {
    console.log(`Something happened: ${error}`);
  });
}

async function apiConvert(){
  console.log("Sending tiles to pano.sentiovr.com/api/v1/pano/cubeToSphere...");

  const options = {
    method: "POST",
    url: "http://pano.sentiovr.com/api/v1/pano/cubeToSphere",
    headers: {
        "Content-Type": "multipart/form-data; boundary=FORMBOUNDARY"
    },
    formData : {
        "image[0]": fs.createReadStream("./tiles/tile0.jpg"),
        "image[1]": fs.createReadStream("./tiles/tile1.jpg"),
        "image[2]": fs.createReadStream("./tiles/tile2.jpg"),
        "image[3]": fs.createReadStream("./tiles/tile3.jpg"),
        "image[4]": fs.createReadStream("./tiles/tile4.jpg"),
        "image[5]": fs.createReadStream("./tiles/tile5.jpg")
    }
  };

  request(options, function (err, res, body) {
      if(err) console.log(err);
      var result = JSON.parse(body);
      var url = "http://" + result["url"];
      console.log("API conversion successful ✅");

      download(url, './spheremap.jpg');
      console.log('Download successful at ./spheremap.jpg ✅');
  });
}

async function Program(){
  await webScrape();
  console.log("Tile directory link found ✅");
  await run();
  console.log("Tiles downloaded ✅");
  await apiConvert();
}

Program();