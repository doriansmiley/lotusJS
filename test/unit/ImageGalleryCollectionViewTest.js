'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryItemCollectionViewTest', function() {

  describe('Lotus.ImageGalleryCollectionView', function(){

    it('should test default ImageGalleryCollectionView values', function() {
        var component = new Lotus.ImageGalleryCollectionView();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.ImageGalleryView');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="collectionContainer">' +
            '<div data-skin-part="itemTemplate">' +
                '<div data-skin-part="thumbnailContainer" selected-class="someClass">' +
                    '<img data-skin-part="thumbnail"></image>' +
                '</div>';
            '</button>' +
            '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'Lotus.ImageGalleryView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.ImageGalleryView ).toBe( true );
        var resultSet = new Lavender.ArrayList();
        resultSet.addItem( {thumbUrl:'http://wallfinest.com/wp-content/uploads/2014/06/vintage-sunset-wallpaper.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        resultSet.addItem( {thumbUrl:'http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'} );
        component.recordSet.id = '1234';
        component.recordSet.selectedPage = 1;
        component.recordSet.createdOn = new Date(2014,1,1);//Date;
        component.recordSet.timeToLive = 500000;
        component.recordSet.source = 'test source';
        component.recordSet.totalRecords = 300;
        component.recordSet.recordsPerPage = 2;
        component.recordSet.results = resultSet;
        expect( component.recordSet.results.length ).toBe( 4 );
        expect( component.recordSet.pageList.length ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        component.childViews.getItemAt(0).resetState();
        expect( component.selectedItem ).toBe( component.childViews.getItemAt(0) );
        component.childViews.getItemAt(0).resetState();
        expect( component.selectedItem ).toBe( null );
    });

  });
});
