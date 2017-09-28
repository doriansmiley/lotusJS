'use strict';

/* jasmine specs for controllers go here */
describe('ListCollectionView Test', function() {

    it('should test default ListCollectionView values', function(done) {
        var responder = {
            onChange:function(event){
                expect( component.collectionContainer.options[component.collectionContainer.selectedIndex] === component.collectionContainer.options[3] ).toBe( true );
                expect( event.payload.target === component.collectionContainer ).toBe( true );
                done();
            }
        }
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
        expect( component.collectionContainer.options[0].value ).toBe( 'some value 1' );
        expect( component.collectionContainer.options[1].value ).toBe( 'some value 2' );
        expect( component.collectionContainer.options[2].value ).toBe( 'some value 3' );
        expect( component.collectionContainer.options[3].value ).toBe( 'some value 4' );
        expect( component.collectionContainer.options[0].innerHTML ).toBe( 'some label 1' );
        expect( component.collectionContainer.options[1].innerHTML ).toBe( 'some label 2' );
        expect( component.collectionContainer.options[2].innerHTML ).toBe( 'some label 3' );
        expect( component.collectionContainer.options[3].innerHTML ).toBe( 'some label 4' );
        //TODO: add tests to set selected item
        component.addEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
        component.collectionContainer.selectedIndex = 3;
        component.collectionContainer.dispatchEvent(new Event('change'));
    });
});
