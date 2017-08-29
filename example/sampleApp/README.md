lotusJS Sample Application
=============

This is a pure Javascript example for people not using typescript. This simple application demonstrates how to use the built in `Lotus.ImageGalleryCollectionView` complete with pagination. Records are loaded using the provided nodeJS service. To use the application run `npm install` from the `sampleApp` directory. Then launch the included node app under the `api` directory. If you plan to launch the service somewhere other than localhost:3000, be sure to update `Config.js` with the new location.

The sample application demonstrates the use of nested web components both as skin parts and stand alone component instances. Please see `templates\imageGallery.html` and look for `x-lotus` component instances.

The sample application also includes an implementation of the following framework features:

- Service Locator
- Command
- Factory
- Data Abstraction (serialization)
- Model Locator
- Event Mediation
- Dependency Injection

All application resources including the injector, commands, mediators and custom tags are defined is under `app\Context.js`. Application start up is triggered in `index.html` in the call to `SampleApp.init();`. The `init` function constructs the context which triggers all the mappings which precede elements being added to the DOM. All application should follow this pattern.

The application will load data from the provided sample API by triggering the dispatch of the `Lavender.RecordSetEvent.LOAD_PAGE_DATA` event in the `SampleApp.ImageGalleryMediator` on line 37. This triggers the execution of the `LoadImageAssetsCommand` which was mapped in the application context. Once the data is loaded images will display in the gallery which you can page through.

By default `Config.js` sets `model.config.galleryItemsPerPage = 1`. You can adjust this to display multiple images per page of data. Keep in mind there are only four images in the mock API results.

