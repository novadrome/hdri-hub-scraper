# hdri-hub-scraper
<p>Get the full resolution paid HDRI from https://hdri-hub.com for free. 
<br>
<br>Reverse engineers the Pano Viewer iframe to get and download the tile faces, then utilizes a SentioVR API to patch them into a equirectangular HDRI map, which is then downloaded.</P>

# Setup
<h><b>Clone Repository</b></h>
<ul><li>Self-explanatory.</li></ul>
<br>

<h><b>Edit index.js</b></h>
<ul><li>Replace the following variable with your page link (line 7):<br>- <code>var inputlink = "insert-your-link-here";</code></li></ul>
<br>

<h><b>Install dependencies</b></h>
<ul>
  <li>Install Node if you haven't already</li>
  <li>Run the following commands:<br>- <code>npm i fs</code><br>- <code>npm i request</code><br>- <code>npm i got</code></li>
</ul>

# Run
<p><b>For Windows:</b></p>
  <ul>
    <li>Open a terminal</li>
    <li>Navigate to the directory: <code>cd c:/path/to/folder/</code></li>
    <li>Once in the repository folder, run the following command: <code>node index.js</code></li>
  </ul>
<br>
<p><b>For other operating systems:</b></p>
<ul>
    <li>You're on your own lol it shouldn't be too hard</li>
</ul>
