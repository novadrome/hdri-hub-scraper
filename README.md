# hdri-hub-scraper
<p>Get the full resolution paid HDRI from https://hdri-hub.com for free. 
<br>
<br>Reverse engineers the Pano Viewer iframe to get and download the tile faces, then utilizes a SentioVR API to patch them into a equirectangular HDRI map, which is then downloaded.</P>

# Setup
<h><b>Clone Repository</b></h>
<ul><li>Self-explanatory.</li></ul>
<br>

<h><b>Edit index.js</b></h>
<ul><li>Replace the following variable with your page link (line 7):<br>- `var inputlink = "insert-your-link-here";`</li></ul>
<br>

<h><b>Install dependencies</b></h>
<ul>
  <li>Install Node if you haven't already</li>
  <li>Run the following commands:<br>- `npm i fs`<br>- `npm i request`<br>- `npm i got`</li>
</ul>

# Run
<p><b>For Windows:</b></p>
  <ul>
    <li>Open a terminal</li>
    <li>Navigate to the directory: `cd C:/path/to/folder/</li>
    <li>Once in the repository folder, run the following command: `node index.js`</li>
  </ul>
<br>
<p><b>For other operating systems:</b></p>
<ul>
    <li>You're on your own lol it shouldn't be too hard</li>
</ul>
