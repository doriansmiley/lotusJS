lotusJS Samples
=============
To get started with these samples run  `npm install` then `node server`. 
Node will start a server at port 3000. You can optionally pass a port, for example `node server 3500`
Once the server starts you can load the samples below

**IMPORTANT**: I recommend creating projects in TypeScript and using WebPack to produce 
your bundles. The UMD used in the example is strictly for demo purposes.

# Button

Available at `localhost:${port}/button`.
This is an example of how to use the `Lotus.useButton` function. 
Source code is in the `./button` directory

# Image Gallery
Available at `localhost:${port}/image-gallery`.
This is an example of how to use the `Lotus.useImageGallery` function. 
Source code is in the `./image-gallery` directory. It's really just
and image list, but it could easily be extended to include infinite scroll, 
enlargements, etc. It's a work in progress.

# Server Side Rendering
Available at `localhost:${port}/ssr?url={url}`.
There is an included example of how to do SSR under the [ssr](./ssr) directory. 
It will render any of the provided examples server side. You can also create new components
and render them. It's important to note the provided SSR application waits for
the presence of a `shadowRoot` in the element referenced using the provided `selector`
param passed in the querystring before returning. The example URL defines the `lotus-image-gallery`
selector which corresponds to the custom element of the image gallery component.

The example implements server side data loading. LotusJS components
implement an optional `loadData` function. The registry will call this method
when rendering server side. The sample SSR application supports passing a `data` and
`publish` function. The data loader sample simply calls an API endpoint,
but you could easily code a function to query a database etc. The `publish`
function saves the output as a local file, but you could easily publish to S3.

**IMPORTANT:** The SSR function is just a sample not a framework!
If you want a framework for SSR I recommend Next.js. Lotus is a designed to be
a lightweight alternative to full featured frameworks. 
We expect developers to create a lot of their own code. Please keep this in mind.
