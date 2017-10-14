/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('FormCollectionView Test', function() {

    it('Test FormCollectionView functions', function(done) {
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
                expect(inputValidator.isValid).toBe( true );
                expect(model.isValid).toBe( true );
                expect(component.input.lotusComponentInstance.invalidClass).toBe('myInvalidClass');
                expect(component.input.lotusComponentInstance.validClass).toBe('myValidClass');
                expect(component.input.lotusComponentInstance.isValid).toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.invalidClass)).toBe(false);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.validClass)).toBe(true);
                inputInput.value = '';
                expect(component.isValid).toBe( false );
                expect(inputValidator.isValid).toBe( false );
                expect(model.isValid).toBe( false );
                expect(component.input.lotusComponentInstance.isValid).toBe(false);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.invalidClass)).toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.classList.contains(component.input.lotusComponentInstance.validClass)).toBe(false);
                //test two way binding
                inputInput.value = 'another value';
                expect(inputInput.value === 'xxx-another value').toBe(true);
                expect(inputInput.value === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'new value';
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                //event callbacks and bindings are executes synchronously
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputInput.value === 'xxx-new value').toBe(true);
                expect(inputInput.value === 'xxx-new value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-new value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'hello world';
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputInput.value === 'xxx-hello world').toBe(true);
                expect(inputInput.value === 'xxx-hello world').toBe(true);
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
                //set up input models cor each component type
                //set up input model
                inputInput = new Lotus.InputModel('some label', 'test value', null, false, true);
                inputInput.format = function(value){
                    return 'xxx-' + value;
                }
                inputInput.value = 'test value';//triggers formatting
                inputModel = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_INPUT, new Lavender.ArrayList([ inputInput ]));
                inputValidator = new Lotus.TextInputValidator();
                inputValidator.source = inputModel;
                //set up list model
                listInputs.addAll([
                    new Lotus.InputModel('some label1', 'test value1'),
                    new Lotus.InputModel('some label2', 'test value2'),
                    new Lotus.InputModel('some label3', 'test value3'),
                    new Lotus.InputModel('some label4', 'test value4')
                ]);
                //last param ensures a selection is required, be sure to test that there is no selection on load and that the model is invalid
                listModel = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_LIST, listInputs, true);
                listValidator = new Lotus.SelectableInputValidator();
                listValidator.source = listModel;
                //set up radio model
                radioGroupInputs.addAll([
                    new Lotus.InputModel('some label1', 'test value1', 'some group'),
                    new Lotus.InputModel('some label2', 'test value2', 'some group'),
                    new Lotus.InputModel('some label3', 'test value3', 'some group'),
                    new Lotus.InputModel('some label4', 'test value4', 'some group', true)//be sure to test that the model is valid on load and this item is selected
                ]);
                //last param ensures a selection is required
                radioGroupModel = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_RADIO_GROUP, radioGroupInputs, true);
                radioGroupValidator = new Lotus.SelectableInputValidator();
                radioGroupValidator.source = radioGroupModel;
                //set up file model, file does not require input model instances or a validator at this point in time
                fileModel = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_FILE, new Lavender.ArrayList(), true);
                //set up component model
                model = new Lavender.ArrayList([inputModel, listModel, radioGroupModel, fileModel]);
                component.collection = model;
                var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');

                var inputState = element.querySelector('[data-skin-part=inputState]');
                var validationWarning = element.querySelector('[data-skin-part=validationWarning]');
                var submit = element.querySelector('[data-skin-part=submit]');
                var clear = element.querySelector('[data-skin-part=clear]');
                var back = element.querySelector('[data-skin-part=back]');
                var submitState = element.querySelector('[data-skin-part=submitState]');
                var errorState = element.querySelector('[data-skin-part=errorState]');
                expect( component.element === element ).toBe( true );
                expect( component.collection === model ).toBe( true );
                expect( component.id ).toBe( '1234' );
                expect( component.collectionContainer === collectionContainer ).toBe( true );
                expect( component.itemTemplate === itemTemplate ).toBe( true );
                expect( component.inputState === inputState ).toBe( true );
                expect( component.validationWarning === validationWarning ).toBe( true );
                expect( component.submit === submit ).toBe( true );
                expect( component.clear === clear ).toBe( true );
                expect( component.back === back ).toBe( true );
                expect( component.submitState === submitState ).toBe( true );
                expect( component.errorState === errorState ).toBe( true );
                expect( component.itemView === 'Lotus.FormItemView' ).toBe( true );
                expect( component.createChildView() instanceof Lotus.FormItemView ).toBe( true );
                done();
                //TODO: iterate all vies and assign event listerner for ready event. when all are ready move to testing individual form parts
                //ensure that the view is set up correct after all the components are set up. Currently none of the unesed skin parts are removed, but I think this is due to the test not getting to a point where all component instances are ready
                /*
                if(!component.input.lotusComponentInstance.ready){
                    component.input.lotusComponentInstance.addEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                }else{
                    handler.onInputReady();
                }
                */
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
        var inputInput;
        var listModel;
        var listInputs = new Lavender.ArrayList();
        var radioGroupInputs = new Lavender.ArrayList();
        var radioGroupModel;
        var fileModel;
        var component;
        var element = document.createElement('x-lotus-form-collection-view');
        var inputValidator;
        var listValidator;
        var radioGroupValidator;
        element.setAttribute('data-attribute-id', '1234');
        element.setAttribute('data-attribute-item-view', 'Lotus.FormItemView');
        element.setAttribute('data-component-root', '[data-root="this"]');
        element.innerHTML =
            '<div data-root="this">' +
                '<div data-skin-part="inputState">' +
                    '<div data-skin-part="validationWarning">' +
                        '<div data-skin-part="error"></div>' +
                    '</div>' +
                    '<div data-skin-part="collectionContainer">' +
                        '<div data-skin-part="itemTemplate">' +
                            '<x-lotus-radio2 data-skin-part="radioGroup" data-template-url="base/unit/templates/radio.html" data-component-root="[data-skin-part=\'collectionContainer\']"></x-lotus-radio2>' +
                            '<x-lotus-select2 data-skin-part="list" data-template-url="base/unit/templates/select.html" data-component-root=\'[data-skin-part="collectionContainer"]\' data-attribute-type="text"></x-lotus-select2>' +
                            '<x-lotus-input2 data-attribute-valid-class="myValidClass" data-attribute-invalid-class="myInvalidClass" data-skin-part="input" data-template-url="base/unit/templates/input.html" data-component-root=\'[data-skin-part="input"]\' data-attribute-type="text"></x-lotus-input2>' +
                            '<x-lotus-upload2 data-skin-part="file" data-template-url="base/unit/templates/fileUpload.html" data-component-root="[data-attribute-item-view=\'Lotus.FileView\']" data-attribute-type="text"></x-lotus-upload2>' +
                        '</div>' +
                    '</div>' +
                    '<button data-skin-part="submit"><label>Submit</label></button>' +
                    '<button data-skin-part="clear"><label>Clear</label></button>' +
                    '<button data-skin-part="back"><label>Back</label></button>' +
                '</div>' +
                '<div data-skin-part="submitState">' +
                    '<label>We are processing your request</label>' +
                '</div>' +
                '<div data-skin-part="errorState">' +
                    '<label>An internal server error occured and we could not process your request.</label>' +
                '</div>'
            '</div>';
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        //set up context to define tag mappings
        var context = (function (xtag) {
            var context = new Lotus.Context(new Lavender.Config);
            context.componentMap.mapComponent('x-lotus-radio2', Lotus.LotusHTMLElement.prototype, Lotus.RadioCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-select2', Lotus.LotusHTMLElement.prototype, Lotus.ListCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-input2', Lotus.LotusHTMLElement.prototype, Lotus.Input, xtag);
            context.componentMap.mapComponent('x-lotus-upload2', Lotus.LotusHTMLElement.prototype, Lotus.FileCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-form-collection-view', Lotus.LotusHTMLElement.prototype, Lotus.FormCollectionView, xtag);
            return context;
        }(xtag));
            //trigger creation
        document.body.appendChild(element);
        //set up component
        var list = document.getElementsByTagName('x-lotus-form-collection-view');
        for (var i = 0; i < list.length; i++) {
            component = list[i].lotusComponentInstance;
            handler.addEventListeners(list[i].lotusComponentInstance);
        }
    });

});
