'use strict';

/* jasmine specs for controllers go here */
describe('AbstractCollectionViewTest', function() {

  describe('Lotus.AbstractCollectionView', function(){

    it('should test default AbstractCollectionView values', function() {
        var component = new Lotus.AbstractCollectionView();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.AbstractItemView');
        element.setAttribute('data-attribute-id', '1234');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="collectionContainer">' +
            '<div data-skin-part="itemTemplate">' +
                '<button data-skin-part="button">' +
                    '<label data-skin-part="label">TestButton</label>' +
                '</button>' +
            '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.created(element);
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.itemView === 'Lotus.AbstractItemView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.AbstractItemView ).toBe( true );
        component.collection.addItem( {} );
        component.collection.addItem( {} );
        component.collection.addItem( {} );
        component.collection.addItem( {} );
        expect( component.collection.length ).toBe( 4 );
        expect( component.collectionContainer.childNodes.length ).toBe( 4 );
        component.collection.removeItemAt(2);
        expect( component.collection.length ).toBe( 3 );
        expect( component.collectionContainer.childNodes.length ).toBe( 3 );
        expect( component.childViews.length ).toBe( 3 );
        component.collection.clear();
        expect( component.collection.length ).toBe( 0 );
        expect( component.collectionContainer.childNodes.length ).toBe( 0 );
        expect( component.childViews.length ).toBe( 0 );
        component.collection.addAll([{}, {}, {}]);
        expect( component.collection.length ).toBe( 3 );
        expect( component.collectionContainer.childNodes.length ).toBe( 3 );
        expect( component.childViews.length ).toBe( 3 );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.id ).toBe( null );
        expect( component.collection ).toBe( null );
        expect( component.collectionContainer ).toBe( null );
        expect( component.childViews ).toBe( null );
    });

  });
});
