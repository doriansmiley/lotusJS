'use strict';

/* jasmine specs for controllers go here */
describe('AbstractRecordSetCollectionViewTest', function() {

  describe('Lotus.AbstractRecodSetCollectionView', function(){

    it('should test default AbstractRecodSetCollectionView values', function() {
        var component = new Lotus.AbstractRecordSetCollectionView();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.AbstractItemView');
        document.body.appendChild(element);
        element.innerHTML = '<div skin-part="collectionContainer">' +
            '<div skin-part="itemTemplate">' +
                '<button skin-part="button">' +
                    '<label skin-part="label">TestButton</label>' +
                '</button>' +
            '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        component.init();
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'Lotus.AbstractItemView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.AbstractItemView ).toBe( true );
        var resultSet = new Lavender.ArrayList();
        resultSet.addItem( new Lavender.Config());
        resultSet.addItem( new Lavender.Config());
        resultSet.addItem( new Lavender.Config());
        resultSet.addItem( new Lavender.Config());
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
        component.collection.results.removeItemAt(2);
        expect( component.collection.results.length() ).toBe( 3 );
        expect( component.collection.pageList.length() ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        expect( component.childViews.length() ).toBe( 2 );
        component.collection.clear();
        expect( component.collection.results.length() ).toBe( 0 );
        expect( component.collection.pageList ).toBe( undefined );
        expect( component.collectionContainer.childNodes.length ).toBe( 0 );
        expect( component.childViews.length() ).toBe( 0 );
        component.collection.totalRecords = 3;
        component.collection.results.addAll([new Lavender.Config(),new Lavender.Config(),new Lavender.Config()]);
        component.collection.selectedPage = 1;
        expect( component.collection.results.length() ).toBe( 3 );
        expect( component.collection.pageList.length() ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        expect( component.childViews.length() ).toBe( 2 );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.id ).toBe( null );
        expect( component.collection ).toBe( null );
        expect( component.collectionContainer ).toBe( null );
        expect( component.childViews ).toBe( null );
    });

  });
});
