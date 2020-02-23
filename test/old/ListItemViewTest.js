/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ListItemView Test', function() {

    it('should test default ListItemView functions', function(done) {
        var handler = {
            onChange:function(event){
                component.removeEventListener(Lotus.ItemViewEvent.ITEM_SELECTED, handler, 'onChange');
                expect(event.type === Lotus.ItemViewEvent.ITEM_SELECTED).toBe(true);
                expect(component.option.selected).toBe(true);
                expect(component.selected).toBe(true);
                component.destroy();
                expect( component.element === null ).toBe( true );
                expect( component.model === null ).toBe( true );
                expect( component.option === null ).toBe( true );
                expect( component.id ).toBe( null );
                done();
            }
        };
        var component = new Lotus.ListItemView();
        var element = document.createElement('option');
        element.setAttribute('data-skin-part', 'itemTemplate');
        document.body.appendChild(element);
        component.element = element;
        component.id = '1234';
        var listItemModel = {label:'Test Label', value:{field1:1234,field2:'test'}};
        //IMPORTANT: the model is always set before  created is called
        component.model = listItemModel;
        component.created(element);

        expect( component.element === element ).toBe( true );
        expect( component.model === listItemModel ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.option === element).toBe( true );
        expect( JSON.parse(component.option.getAttribute('value')).field1 === 1234).toBe( true );
        expect( JSON.parse(component.option.getAttribute('value')).field2 === 'test').toBe( true );
        expect( component.option.innerHTML === listItemModel.label).toBe( true );
        //test callbackss
        component.addEventListener(Lotus.ItemViewEvent.ITEM_SELECTED , handler, 'onChange');
        component.option.selected = true;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        component.onClick(evt);
    });

});
