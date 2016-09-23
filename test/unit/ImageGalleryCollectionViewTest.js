'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryItemCollectionViewTest', function() {

  describe('Lotus.ImageGalleryCollectionView', function(){

    it('should test default ImageGalleryCollectionView values', function() {
        var component = new SampleApp.ImageGalleryCollectionView();
        var element = document.createElement('div');
        element.setAttribute('attribute-item-view', 'SampleApp.ImageGalleryView');
        document.body.appendChild(element);
        element.innerHTML = '<div skin-part="collectionContainer">' +
            '<div skin-part="itemTemplate">' +
                '<div skin-part="thumbnailContainer" selected-class="someClass">' +
                    '<img skin-part="thumbnail"></image>' +
                '</div>';
            '</button>' +
            '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[skin-part=itemTemplate]');
        component.id = '1234';
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        component.created(element, context);
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'SampleApp.ImageGalleryView' ).toBe( true );
        expect( component.createChildView() instanceof SampleApp.ImageGalleryView ).toBe( true );
        var resultSet = new Lavender.ArrayList();
        resultSet.addItem( {thumbUrl:'http://wallfinest.com/wp-content/uploads/2014/06/vintage-sunset-wallpaper.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        component.collection.id = '1234';
        component.collection.selectedPage = 1;
        component.collection.createdOn = new Date(2014,1,1);//Date;
        component.collection.timeToLive = 500000;
        component.collection.source = 'test source';
        component.collection.totalRecords = 300;
        component.collection.recordsPerPage = 2;
        component.collection.results = resultSet;
        expect( component.collection.results.length() ).toBe( 4 );
        expect( component.collection.pageList.length() ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        component.childViews.getItemAt(0).resetState();
        expect( component.selectedItem ).toBe( component.childViews.getItemAt(0) );
        component.childViews.getItemAt(0).resetState();
        expect( component.selectedItem ).toBe( null );
    });

  });
});
