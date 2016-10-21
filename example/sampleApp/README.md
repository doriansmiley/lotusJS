lotusJS Sample Application
=============

This simple application demonstrates how to use the built in `Lotus.ImageGalleryCollectionView` complete with pagination. Records are loaded using the provided nodeJS service. Be sure the service is up and running before launching the application. If you plan to launch the service somewhere other than localhost:3000, be sure to update Config.js.

The sample application also includes an implementation of the following patterns:

- Service Locator
- Command
- Data Abstraction (serialization)
- Model Locator

These implementations add to the features of the built in IOC container in Lotus.

The application will load data from the provided sample API by triggering the dispatch of the `Lavender.RecordSetEvent.LOAD_PAGE_DATA` event in the `SampleApp.ImageGalleryMediator` on line 36. Once the data is loaded images will display in the gallery which you can page through.

By default `SampleApp.Model` sets `model.config.galleryItemsPerPage = 1`. You can adjust this to display multiple images per page of data. Keep in mind there are only four images in the mock API results.

The view is made up of two components: `Lotus.ImageGalleryCollectionView` and `Lotus.ImageGalleryItemDetail`. The `Lotus.ImageGalleryItemDetail` instance is bound to the record set model by `SampleApp.ImageGalleryItemDetailMediator` to demonstrate data binding. Whenever the selected page of data changes through use of the image galleries pagination UI the first record in the page is displayed in the item detail.