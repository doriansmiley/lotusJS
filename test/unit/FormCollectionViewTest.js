'use strict';

/* jasmine specs for controllers go here */
describe('FormCollectionView Test', function () {
    //TODO: code out test, remove call return dpne below
    return;
    it('should test default FormCollectionView values', function (done) {

        var responder = {
            onChange: function (event) {
                expect(component.childViews.getItemAt(0).radio.checked).toBe(true);
                expect(component.selectedItem == component.childViews.getItemAt(0)).toBe(true);
                expect(event.payload.target === component.selectedItem).toBe(true);
                done();
            }
        }
        var component = new Lotus.FormCollectionView();
        var element = document.createElement('fieldset');
        element.setAttribute('data-attribute-item-view', 'Lotus.FormItemView');
        element.setAttribute('data-attribute-valid-class', 'myValidClass');
        element.setAttribute('data-attribute-invalid-class', 'myInvalidClass');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="validationWarning" type="radio">' +
                '<div data-skin-part="error"></div>' +
                '</div>' +
                '<div data-skin-part="inputState">' +
                    '<div data-skin-part="collectionContainer">' +
                        '<div data-skin-part="itemTemplate">' +
                            '<x-lotus-radio data-skin-part="radio" data-template-url="templates/radio.html" data-component-root="[data-skin-part=\'collectionContainer\']"></x-lotus-radio>' +
                            '<x-lotus-select data-skin-part="list" data-template-url="templates/select.html" data-component-root=\'[data-skin-part="collectionContainer"]\' data-attribute-type="text"></x-lotus-select>' +
                            '<x-lotus-input data-skin-part="input" data-template-url="templates/input.html" data-component-root=\'[data-skin-part="input"]\' data-attribute-type="text"></x-lotus-input>' +
                            '<x-lotus-upload data-skin-part="file" data-template-url="templates/fileUpload.html" data-component-root="[data-attribute-item-view=\'Lotus.FileView\']" data-attribute-type="text"></x-lotus-upload>' +
                    '</div>'+
                    '<button data-skin-part="submit"/>' +
                    '<button data-skin-part="clear"/>' +
                '</div>'+
                '<div data-skin-part="submitState">' +
                    '<p>Thank you for your submission, someone will contact you shortly</p>' +
                '</div>' +
                '<div data-skin-part="error">' +
                    '<p>An internal server error occurred. Please click the back button and try again</p>' +
                    '<button data-skin-part="back"/>' +
                '</div>' +
            '</div>';
        var collectionContainer = element;
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        expect(component.element === element).toBe(true);
        expect(component.id).toBe('1234');
        expect(component.collectionContainer === collectionContainer).toBe(true);
        expect(component.itemTemplate === itemTemplate).toBe(true);
        expect(component.itemView === 'Lotus.RadioItemView').toBe(true);
        expect(component.createChildView() instanceof Lotus.RadioItemView).toBe(true);
        var collection = new Lavender.ArrayList();
        //{label:string, value:any, selected:boolean}
        collection.addItem({label: 'some label 1', value: 'some value 1',  name:'testGroup'});
        collection.addItem({label: 'some label 2', value: 'some value 2',  name:'testGroup'});
        collection.addItem({label: 'some label 3', value: 'some value 3',  name:'testGroup'});
        collection.addItem({label: 'some label 4', value: 'some value 4',  name:'testGroup', selected:true});
        component.collection = collection;
        expect(component.collection.length).toBe(4);
        expect(component.collectionContainer.childNodes.length).toBe(4);
        expect(component.childViews.getItemAt(0).radio.value).toBe('some value 1');
        expect(component.childViews.getItemAt(1).radio.value).toBe('some value 2');
        expect(component.childViews.getItemAt(2).radio.value).toBe('some value 3');
        expect(component.childViews.getItemAt(3).radio.value).toBe('some value 4');
        expect(component.childViews.getItemAt(0).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(1).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(2).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(3).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(3).radio.checked).toBe(true);
        expect(component.childViews.getItemAt(0).label.innerHTML).toBe('some label 1');
        expect(component.childViews.getItemAt(1).label.innerHTML).toBe('some label 2');
        expect(component.childViews.getItemAt(2).label.innerHTML).toBe('some label 3');
        expect(component.childViews.getItemAt(3).label.innerHTML).toBe('some label 4');
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
        //TODO: add tests to set selected item
        component.addEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
        component.childViews.getItemAt(0).radio.checked = true;
        component.childViews.getItemAt(0).radio.dispatchEvent(new Event('click'));
    });

    it('should test default FormCollectionView data binding', function (done) {
        var responder = {
            onChange: function (event) {
                expect(component.childViews.getItemAt(3).radio.checked).toBe(true);
                expect(component.selectedItem == component.childViews.getItemAt(3)).toBe(true);
                expect(event.payload.target === component.selectedItem).toBe(true);
                done();
            }
        }
        var component = new Lotus.FormCollectionView();
        var element = document.createElement('fieldset');
        element.setAttribute('data-attribute-item-view', 'Lotus.RadioItemView');
        element.setAttribute('data-skin-part', 'collectionContainer');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="itemTemplate">' +
            '<input data-skin-part="radio" type="radio"/>' +
            '<label data-skin-part="label" />' +
            '</div>';
        var collectionContainer = element;
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        component.id = '1234';
        component.created(element);
        expect(component.element === element).toBe(true);
        expect(component.id).toBe('1234');
        expect(component.collectionContainer === collectionContainer).toBe(true);
        expect(component.itemTemplate === itemTemplate).toBe(true);
        expect(component.itemView === 'Lotus.RadioItemView').toBe(true);
        expect(component.createChildView() instanceof Lotus.RadioItemView).toBe(true);
        var collection = new Lavender.ArrayList();
        //{label:string, value:any, selected:boolean}
        collection.addItem(new Lotus.InputModel('some label 1', 'some value 1', 'testGroup'));
        collection.addItem(new Lotus.InputModel('some label 2', 'some value 2', 'testGroup'));
        collection.addItem(new Lotus.InputModel('some label 3', 'some value 3', 'testGroup'));
        collection.addItem(new Lotus.InputModel('some label 4', 'some value 4', 'testGroup', true));
        component.collection = collection;
        expect(component.collection.length).toBe(4);
        expect(component.collectionContainer.childNodes.length).toBe(4);
        expect(component.childViews.getItemAt(0).radio.value).toBe('some value 1');
        expect(component.childViews.getItemAt(1).radio.value).toBe('some value 2');
        expect(component.childViews.getItemAt(2).radio.value).toBe('some value 3');
        expect(component.childViews.getItemAt(3).radio.value).toBe('some value 4');
        expect(component.childViews.getItemAt(0).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(1).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(2).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(3).radio.name).toBe('testGroup');
        expect(component.childViews.getItemAt(3).radio.checked).toBe(true);
        expect(component.childViews.getItemAt(0).label.innerHTML).toBe('some label 1');
        expect(component.childViews.getItemAt(1).label.innerHTML).toBe('some label 2');
        expect(component.childViews.getItemAt(2).label.innerHTML).toBe('some label 3');
        expect(component.childViews.getItemAt(3).label.innerHTML).toBe('some label 4');
        collection.getItemAt(3).selected = false;
        collection.getItemAt(0).selected = true;
        expect( component.selectedItem == component.childViews.getItemAt(0)).toBe(true);
        expect( component.childViews.getItemAt(0).selected).toBe(true);
        expect( component.childViews.getItemAt(3).model.selected).toBe(false);
        expect( component.childViews.getItemAt(3).selected).toBe(false);
        expect(component.invalidClass).toBe(null);
        expect(component.validClass).toBe(null);
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.isValid = false;
        expect(component.collectionContainer.classList.contains(component.invalidClass)).toBe(false);
        expect(component.collectionContainer.classList.contains(component.validClass)).toBe(false);
        component.addEventListener(Lotus.InputEvent.CHANGE, responder, 'onChange');
        component.childViews.getItemAt(3).radio.click();
    });
});
