lotusJS Sample Radio Group Component
=============

This is an example ofhow to use the `Lotus.RadioCollectionView` which allows user to groups of radio buttons used in form interfaces.

To run this example deploy the files to your webserver and launch `index.html`. Note this example depends on the node_modules and libs directory found in the root of the git repo. If you want to run this example stand alone run `npm install` then adjust the following lines of code to point to the local node_modules directory:

original code
````
<script type="text/javascript" src="../../node_modules/x-tag/lib/webcomponents.js"></script>
<script type="text/javascript" src="../../node_modules/x-tag/dist/x-tag-core-with-shadowdom.min.js"></script>
<script type="text/javascript" src="../../node_modules/lavenderjs/lib/lavenderJS-UMD.min.js"></script>
<script type="text/javascript" src="../../lib/lotusJS-UMD.min.js"></script>
````
after `npm install` adjust to
````
<script type="text/javascript" src="node_modules/x-tag/lib/webcomponents.js"></script>
<script type="text/javascript" src="node_modules/x-tag/dist/x-tag-core-with-shadowdom.min.js"></script>
<script type="text/javascript" src="node_modules/lavenderjs/lib/lavenderJS-UMD.min.js"></script>
<script type="text/javascript" src="node_modules/lotusjs-components/lib/lotusJS-UMD.min.js"></script>
````
Also, make sure you deploy the css and fonts folders found in the root of the example directory and adjust paths as needed. Those files are referenced in `index.html` as follows:
````
<link rel="stylesheet" href="../css/highlight/styles/default.css">
<script src="../css/highlight/highlight.pack.js"></script>
<link rel="stylesheet" type="text/css" href="../css/main.css"/>
````