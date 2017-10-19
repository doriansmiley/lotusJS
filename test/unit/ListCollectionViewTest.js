'use strict';

/* jasmine specs for controllers go here */
describe('ListCollectionView Test', function() {

    it('should test default ListCollectionView values', function(done) {
        var responder = {
            onChange:function(event){
                component.removeEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
                expect( component.collectionContainer.options[component.collectionContainer.selectedIndex] === component.collectionContainer.options[2] ).toBe( true );
                expect( component.selectedItem == component.childViews.getItemAt(2) ).toBe( true );
                expect( event.payload.target.selectedItem === component.childViews.getItemAt(2) ).toBe( true );
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
        collection.addItem( {label:'some label 4', value:'some value 4', selected:true} );
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
        expect( component.childViews.getItemAt(3).selected ).toBe( true );
        expect( component.collectionContainer.options[3].selected ).toBe( true );
        expect(component.invalidClass).toBe(null);
        expect(component.validClass).toBe(null);
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.isValid = false;
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.addEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        component.childViews.getItemAt(2).onClick(evt);
    });

    it('should test default ListCollectionView data bindings', function(done) {
        var responder = {
            onChange:function(event){
                component.removeEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
                expect( component.collectionContainer.options[component.collectionContainer.selectedIndex] === component.collectionContainer.options[3] ).toBe( true );
                expect( component.selectedItem == component.childViews.getItemAt(3) ).toBe( true );
                expect( event.payload.target.selectedItem === component.childViews.getItemAt(3) ).toBe( true );
                expect( component.childViews.getItemAt(2).model.selected).toBe(false);
                expect( component.childViews.getItemAt(2).selected).toBe(false);
                done();
            }
        }
        var component = new Lotus.ListCollectionView();
        var element = document.createElement('select');
        element.setAttribute('data-attribute-item-view', 'Lotus.ListItemView');
        element.setAttribute('data-skin-part', 'collectionContainer');
        element.setAttribute('data-attribute-valid-class', 'myValidClass');
        element.setAttribute('data-attribute-invalid-class', 'myInvalidClass');
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
        collection.addItem( new Lotus.InputModel('some label 1', 'some value 1') );
        collection.addItem( new Lotus.InputModel('some label 2', 'some value 2') );
        collection.addItem( new Lotus.InputModel('some label 3', 'some value 3') );
        collection.addItem( new Lotus.InputModel('some label 4', 'some value 4', null, true) );
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
        expect( component.selectedItem == component.childViews.getItemAt(3)).toBe(true);
        expect( component.childViews.getItemAt(3).model.selected).toBe(true);
        expect( component.childViews.getItemAt(3).selected).toBe(true);
        component.childViews.getItemAt(3).model.selected = false;
        component.childViews.getItemAt(2).model.selected = true;
        expect( component.selectedItem == component.childViews.getItemAt(2)).toBe(true);
        expect( component.childViews.getItemAt(2).selected).toBe(true);
        expect( component.childViews.getItemAt(3).model.selected).toBe(false);
        expect( component.childViews.getItemAt(3).selected).toBe(false);
        expect(component.invalidClass).toBe('myInvalidClass');
        expect(component.validClass).toBe('myValidClass');
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.isValid = false;
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(true);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.isValid = true;
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(true);
        component.addEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        component.childViews.getItemAt(3).onClick(evt);
    });
});
