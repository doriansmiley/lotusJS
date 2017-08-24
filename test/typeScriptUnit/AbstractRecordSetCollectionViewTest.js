'use strict';

/* jasmine specs for controllers go here */
describe('AbstractRecordSetCollectionViewTest', function() {

  describe('Lotus.AbstractRecodSetCollectionView', function(){

    it('should test default AbstractRecodSetCollectionView values', function() {
        var component = new Lotus.AbstractRecordSetCollectionView();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.AbstractItemView');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="collectionContainer" data-enabled-class="someEnabledClass" data-disabled-class="someDisabledClass">' +
            '<div data-skin-part="itemTemplate">' +
                '<button data-skin-part="button">' +
                    '<label data-skin-part="label">TestButton</label>' +
                '</button>' +
            '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        component.init();
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'Lotus.AbstractItemView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.AbstractItemView ).toBe( true );
        var resultSet = new Lotus.ArrayList();
        resultSet.addItem( new Lotus.Config());
        resultSet.addItem( new Lotus.Config());
        resultSet.addItem( new Lotus.Config());
        resultSet.addItem( new Lotus.Config());
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
        component.recordSet.results.removeItemAt(2);
        expect( component.recordSet.results.length ).toBe( 3 );
        expect( component.recordSet.pageList.length ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        expect( component.childViews.length ).toBe( 2 );
        component.recordSet.clear();
        expect( component.recordSet.results.length ).toBe( 0 );
        expect( component.recordSet.pageList ).toBe( undefined );
        expect( component.collectionContainer.childNodes.length ).toBe( 0 );
        expect( component.childViews.length ).toBe( 0 );
        component.recordSet.totalRecords = 3;
        component.recordSet.selectedPage = 1;
        component.recordSet.results.addAll([new Lotus.Config(),new Lotus.Config(),new Lotus.Config()]);
        expect( component.recordSet.results.length ).toBe( 3 );
        expect( component.recordSet.pageList.length ).toBe( 2 );
        expect( component.collectionContainer.childNodes.length ).toBe( 2 );
        expect( component.childViews.length ).toBe( 2 );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.id ).toBe( null );
        expect( component.recordSet ).toBe( null );
        expect( component.collectionContainer ).toBe( null );
        expect( component.childViews ).toBe( null );
    });

  });
});
