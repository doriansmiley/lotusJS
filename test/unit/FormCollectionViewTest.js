/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('FormCollectionView Test', function() {

    it('Test FormCollectionView functions', function(done) {
        var handler = {
            onInputReady:function(event){
                input.removeEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                //test intital value
                expect(input.inputSkinPart.value).toBe( 'xxx-test value' );
                expect(input.value).toBe( 'xxx-test value' );
                expect(input.model.value).toBe( 'xxx-test value' );
                expect(input.model.required).toBe( true );
                //test validation
                expect(input.isValid).toBe( true );
                expect(inputValidator.isValid).toBe( true );
                expect(inputModel.isValid).toBe( true );
                expect(input.invalidClass).toBe('myInvalidClass');
                expect(input.validClass).toBe('myValidClass');
                expect(input.isValid).toBe(true);
                expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(false);
                expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(true);
                inputInput.value = '';
                expect(input.isValid).toBe( false );
                expect(inputValidator.isValid).toBe( false );
                expect(inputModel.isValid).toBe( false );
                expect(input.isValid).toBe(false);
                expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(true);
                expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(false);
                //test two way binding
                inputInput.value = 'another value';
                expect(inputInput.value === 'xxx-another value').toBe(true);
                expect(inputInput.value === 'xxx-another value').toBe(true);
                expect(input.inputSkinPart.value  === 'xxx-another value').toBe(true);
                expect(input.inputSkinPart.value  === 'xxx-another value').toBe(true);
                input.inputSkinPart.value = 'new value';
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                //event callbacks and bindings are executes synchronously
                input.inputSkinPart.dispatchEvent(evt);
                expect(inputInput.value === 'xxx-new value').toBe(true);
                expect(inputInput.value === 'xxx-new value').toBe(true);
                expect(input.inputSkinPart.value  === 'xxx-new value').toBe(true);
                input.inputSkinPart.value = 'hello world';
                input.inputSkinPart.dispatchEvent(evt);
                expect(inputInput.value === 'xxx-hello world').toBe(true);
                expect(inputInput.value === 'xxx-hello world').toBe(true);
                expect(input.inputSkinPart.value  === 'xxx-hello world').toBe(true);
                //strat the list
                if(!list.ready){
                    list.addEventListener(Lotus.ComponentEvent.READY, handler, 'onListReady');
                }else{
                    list.onListReady();
                }
            },
            onListReady:function(event){
                list.removeEventListener(Lotus.ComponentEvent.READY, handler, 'onListReady');
                //test initial value
                expect( list.itemView === 'Lotus.ListItemView' ).toBe( true );
                expect( list.createChildView() instanceof Lotus.ListItemView ).toBe( true );
                expect( list.collection.length ).toBe( 4 );
                expect( list.prompt.innerHTML ).toBe( 'Please select one...' );
                expect( list.collectionContainer.options.length ).toBe( 5 );
                expect( list.collectionContainer.options[0].value ).toBe( 'default' );
                expect( list.collectionContainer.options[1].value ).toBe( 'test value1' );
                expect( list.collectionContainer.options[2].value ).toBe( 'test value2' );
                expect( list.collectionContainer.options[3].value ).toBe( 'test value3' );
                expect( list.collectionContainer.options[4].value ).toBe( 'test value4' );
                expect( list.collectionContainer.options[0].innerHTML ).toBe( 'Please select one...' );
                expect( list.collectionContainer.options[1].innerHTML ).toBe( 'some label1' );
                expect( list.collectionContainer.options[2].innerHTML ).toBe( 'some label2' );
                expect( list.collectionContainer.options[3].innerHTML ).toBe( 'some label3' );
                expect( list.collectionContainer.options[4].innerHTML ).toBe( 'some label4' );
                //test validation
                expect(list.invalidClass).toBe('myInvalidClass');
                expect(list.validClass).toBe('myValidClass');
                expect(list.collectionContainer.classList.contains(list.invalidClass)).toBe(true);
                expect(list.collectionContainer.classList.contains(list.validClass)).toBe(false);
                expect(list.model.isValid).toBe(false);
                expect(list.isValid).toBe(false);
                expect(listValidator.isValid).toBe(false);
                //set the selected item to trigger validation
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, true);
                list.childViews.getItemAt(2).onClick(evt);
                expect( list.selectedItem == list.childViews.getItemAt(2)).toBe(true);
                expect( list.childViews.getItemAt(2).model.selected).toBe(true);
                expect( list.childViews.getItemAt(2).selected).toBe(true);
                expect(list.collectionContainer.classList.contains(list.invalidClass)).toBe(false);
                expect(list.collectionContainer.classList.contains(list.validClass)).toBe(true);
                expect(list.model.isValid).toBe(true);
                expect(list.isValid).toBe(true);
                expect(listValidator.isValid).toBe(true);
                //test bindings
                list.childViews.getItemAt(3).model.selected = false;
                list.childViews.getItemAt(2).model.selected = true;
                expect( list.selectedItem == list.childViews.getItemAt(2)).toBe(true);
                expect( list.childViews.getItemAt(2).selected).toBe(true);
                expect( list.childViews.getItemAt(3).model.selected).toBe(false);
                expect( list.childViews.getItemAt(3).selected).toBe(false);
                //strat the radio tests
                if(!radioGroup.ready){
                    radioGroup.addEventListener(Lotus.ComponentEvent.READY, handler, 'onRadioReady');
                }else{
                    radioGroup.onRadioReady();
                }
            },
            onRadioReady:function(event){
                radioGroup.removeEventListener(Lotus.ComponentEvent.READY, handler, 'onListReady');
                //test initial value
                expect(radioGroup.itemView === 'Lotus.RadioItemView').toBe(true);
                expect(radioGroup.createChildView() instanceof Lotus.RadioItemView).toBe(true);
                expect(radioGroup.collection.length).toBe(4);
                expect(radioGroup.childViews.getItemAt(0).radio.value).toBe('test value1');
                expect(radioGroup.childViews.getItemAt(1).radio.value).toBe('test value2');
                expect(radioGroup.childViews.getItemAt(2).radio.value).toBe('test value3');
                expect(radioGroup.childViews.getItemAt(3).radio.value).toBe('test value4');
                expect(radioGroup.childViews.getItemAt(0).radio.name).toBe('some group');
                expect(radioGroup.childViews.getItemAt(1).radio.name).toBe('some group');
                expect(radioGroup.childViews.getItemAt(2).radio.name).toBe('some group');
                expect(radioGroup.childViews.getItemAt(3).radio.name).toBe('some group');
                expect(radioGroup.childViews.getItemAt(3).radio.checked).toBe(true);
                expect(radioGroup.childViews.getItemAt(0).label.innerHTML).toBe('some label1');
                expect(radioGroup.childViews.getItemAt(1).label.innerHTML).toBe('some label2');
                expect(radioGroup.childViews.getItemAt(2).label.innerHTML).toBe('some label3');
                expect(radioGroup.childViews.getItemAt(3).label.innerHTML).toBe('some label4');
                //test validation
                expect(radioGroup.invalidClass).toBe('myInvalidClass');
                expect(radioGroup.validClass).toBe('myValidClass');
                expect(radioGroup.collectionContainer.classList.contains(radioGroup.invalidClass)).toBe(false);
                expect(radioGroup.collectionContainer.classList.contains(radioGroup.validClass)).toBe(true);
                expect(radioGroup.model.isValid).toBe(true);
                expect(radioGroup.isValid).toBe(true);
                expect(radioGroupValidator.isValid).toBe(true);
                //test bindings
                radioGroup.childViews.getItemAt(2).radio.click();
                expect( radioGroup.selectedItem == radioGroup.childViews.getItemAt(2)).toBe(true);
                expect(radioGroup.childViews.getItemAt(2).radio.checked).toBe(true);
                expect(radioGroup.collectionContainer.classList.contains(radioGroup.invalidClass)).toBe(false);
                expect(radioGroup.collectionContainer.classList.contains(radioGroup.validClass)).toBe(true);
                expect(radioGroup.model.isValid).toBe(true);
                expect(radioGroup.isValid).toBe(true);
                expect(radioGroupValidator.isValid).toBe(true);
                handler.onDone();
            },
            onDone:function(){
                component.destroy();
                expect(input.inputSkinPart === null).toBe(true);
                expect(input.model === null).toBe(true);
                expect(list.prompt === null).toBe(true);
                expect(list.model === null).toBe(true);
                document.body.removeChild(element);
                done();
            },
            onReady:function(event){
                handler.initComponent(event.payload.target);
            },
            onChildViewReady:function(event){
                var component = event.payload.target
                if(component.activeSkinPart instanceof Lotus.Input){
                    input = component.activeSkinPart;
                }else if(component.activeSkinPart instanceof Lotus.ListCollectionView){
                    list = component.activeSkinPart;
                }else if(component.activeSkinPart instanceof Lotus.RadioCollectionView){
                    radioGroup = component.activeSkinPart;
                }else if(component.activeSkinPart instanceof Lotus.FileCollectionView){
                    file  = component.activeSkinPart;
                }
                if(input && list && radioGroup && file){
                    expect( input instanceof Lotus.Input ).toBe( true );
                    expect( list instanceof Lotus.ListCollectionView ).toBe( true );
                    expect( radioGroup instanceof Lotus.RadioCollectionView ).toBe( true );
                    //start skin part tests
                    if(!input.ready){
                        input.addEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                    }else{
                        handler.onInputReady();
                    }
                }
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
                listModel.label = "Please select one..."
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
                radioGroupModel.label = 'Chose one of the following';
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
                for(var i=0; i < component.childViews.length; i++){
                    if(!component.childViews.getItemAt(i).ready){
                        component.childViews.getItemAt(i).addEventListener(Lotus.ComponentEvent.READY, handler, 'onChildViewReady');
                    }else{
                        handler.onChildViewReady({payload:{target:component.childViews.getItemAt(i)}});
                    }
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
        //instances of form elements
        var input;
        var radioGroup;
        var list;
        var file;
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
                            '<x-lotus-radio2 data-attribute-valid-class="myValidClass" data-attribute-invalid-class="myInvalidClass" data-skin-part="radioGroup" data-template-url="base/unit/templates/radio.html" data-component-root="[data-skin-part=\'collectionContainer\']"></x-lotus-radio2>' +
                            '<x-lotus-select2 data-attribute-valid-class="myValidClass" data-attribute-invalid-class="myInvalidClass" data-skin-part="list" data-template-url="base/unit/templates/select.html" data-component-root=\'[data-skin-part="collectionContainer"]\' data-attribute-type="text"></x-lotus-select2>' +
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
