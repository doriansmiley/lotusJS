'use strict';

/* jasmine specs for controllers go here */
describe('ListCollectionView Test', function() {

    it('should test default ListCollectionView values', function() {
        var component = new Lotus.ListCollectionView();
        var element = document.createElement('select');
        element.setAttribute('data-attribute-item-view', 'Lotus.ListItemView');
        element.setAttribute('data-skin-part', 'collectionContainer');
        document.body.appendChild(element);
        element.innerHTML = '<option data-skin-part="itemTemplate"></option>';
        var collectionContainer = element;
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'Lotus.ListItemView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.ListItemView ).toBe( true );
        var collection = new Lavender.ArrayList();
        collection.addItem( {label:'some label 1', value:'some value 1'} );
        collection.addItem( {label:'some label 2', value:'some value 2'} );
        collection.addItem( {label:'some label 3', value:'some value 3'} );
        collection.addItem( {label:'some label 4', value:'some value 4'} );
        component.collection = collection;
        expect( component.collection.length ).toBe( 4 );
        expect( component.collectionContainer.childNodes.length ).toBe( 4 );
        //add tests to set selected item
    });
});
