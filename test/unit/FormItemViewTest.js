/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('FormItemView Test', function() {

    it('Test FormItemView Input view', function(done) {
        var handler = {
            onInputReady:function(event){
                component.input.lotusComponentInstance.removeEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                //test intital value
                expect(component.input.lotusComponentInstance.inputSkinPart.value).toBe( 'xxx-test value' );
                expect(component.input.lotusComponentInstance.value).toBe( 'xxx-test value' );
                expect(component.input.lotusComponentInstance.model.value).toBe( 'xxx-test value' );
                expect(component.input.lotusComponentInstance.model.required).toBe( true );
                //test validation
                expect(component.isValid).toBe( true );
                expect(validator.isValid).toBe( true );
                expect(model.isValid).toBe( true );
                expect(component.input.lotusComponentInstance.invalidClass).toBe('myInvalidClass');
                expect(component.input.lotusComponentInstance.validClass).toBe('myValidClass');
                expect(component.input.lotusComponentInstance.isValid).toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.invalidClass)).toBe(false);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.validClass)).toBe(true);
                inputModel.value = '';
                expect(component.isValid).toBe( false );
                expect(validator.isValid).toBe( false );
                expect(model.isValid).toBe( false );
                expect(component.input.lotusComponentInstance.isValid).toBe(false);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.invalidClass)).toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.validClass)).toBe(false);
                //test two way binding
                inputModel.value = 'another value';
                expect(inputModel.value === 'xxx-another value').toBe(true);
                expect(inputModel.value === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'new value';
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                //event callbacks and bindings are executes synchronously
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputModel.value === 'xxx-new value').toBe(true);
                expect(inputModel.value === 'xxx-new value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-new value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'hello world';
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputModel.value === 'xxx-hello world').toBe(true);
                expect(inputModel.value === 'xxx-hello world').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-hello world').toBe(true);
                //end binding tests
                component.destroy();
                document.body.removeChild(element);
                expect(component.input === null).toBe(true);
                done();
            },
            onReady:function(event){
                handler.initComponent(event.payload.target);
            },
            initComponent:function(component){
                inputModel = new Lotus.InputModel('some label', 'test value', null, false, true);
                inputModel.format = function(value){
                    return 'xxx-' + value;
                }
                inputModel.value = 'test value';//triggers formatting
                model = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_INPUT, new Lavender.ArrayList([ inputModel ]));
                validator = new Lotus.TextInputValidator();
                validator.source = model;
                model.validators = new Lavender.ArrayList([validator]);//add the text input validator to the
                //IMPORTANT: the model is always set before  created is called
                component.model = model;
                expect( component.element === element ).toBe( true );
                expect( component.model === model ).toBe( true );
                expect( component.id ).toBe( '1234' );
                expect( component.input !== null && component.input !== undefined).toBe( true );
                expect( component.model.collection.getItemAt(0)).toBe( inputModel );
                if(!component.input.lotusComponentInstance.ready){
                    component.input.lotusComponentInstance.addEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                }else{
                    handler.onInputReady();
                }
            },
            addEventListeners:function (component) {
                //Do not set up data providers until the component is ready!
                //if you use lotusjs-mvw you can take advantage of component mediators that have built in onReady callbacks
                if(!component.ready){
                    component.addEventListener(Lotus.ComponentEvent.READY, handler, 'onReady')
                }else{
                    handler.initComponent(component)
                }
            }
        };
        var model
        var inputModel
        var component;
        var element = document.createElement('x-lotus-form-view');
        var validator = new Lotus.TextInputValidator();
        element.setAttribute('data-attribute-id', '1234');
        element.setAttribute('data-component-root', '[data-skin-part="collectionContainer"]');
        element.innerHTML = '<div data-skin-part="collectionContainer">' +
            '<x-lotus-radio data-skin-part="radioGroup" data-template-url="base/unit/templates/radio.html" data-component-root="[data-skin-part=\'collectionContainer\']"></x-lotus-radio>' +
            '<x-lotus-select data-skin-part="list" data-template-url="base/unit/templates/select.html" data-component-root=\'[data-skin-part="collectionContainer"]\' data-attribute-type="text"></x-lotus-select>' +
            '<x-lotus-input data-attribute-valid-class="myValidClass" data-attribute-invalid-class="myInvalidClass" data-skin-part="input" data-template-url="base/unit/templates/input.html" data-component-root=\'[data-skin-part="input"]\' data-attribute-type="text"></x-lotus-input>' +
            '<x-lotus-upload data-skin-part="file" data-template-url="base/unit/templates/fileUpload.html" data-component-root="[data-attribute-item-view=\'Lotus.FileView\']" data-attribute-type="text"></x-lotus-upload>';
        '</div>';
        //set up context to define tag mappings
        var context = (function (xtag) {
            var context = new Lotus.Context(new Lavender.Config);
            context.componentMap.mapComponent('x-lotus-radio', Lotus.LotusHTMLElement.prototype, Lotus.RadioCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-select', Lotus.LotusHTMLElement.prototype, Lotus.ListCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-input', Lotus.LotusHTMLElement.prototype, Lotus.Input, xtag);
            context.componentMap.mapComponent('x-lotus-upload', Lotus.LotusHTMLElement.prototype, Lotus.FileCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-form-view', Lotus.LotusHTMLElement.prototype, Lotus.FormItemView, xtag);
            return context;
        }(xtag));
            //trigger creation
        document.body.appendChild(element);
        //set up component
        var list = document.getElementsByTagName('x-lotus-form-view');
        for (var i = 0; i < list.length; i++) {
            component = list[i].lotusComponentInstance;
            handler.addEventListeners(list[i].lotusComponentInstance);
        }
    });

});
