/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.Button = function(){
    //Define private vars
    var _buttonSkinPart;
    //Define instance properties
    this.clickProxy = this.onClick.bind(this);
    // Define our getters and setters
    this.addProperties({
            //this is a special accessor method as it is used to route attributes on the element
            type: {
                get: function() {
                    return this.element.getAttribute('type');
                },
                set: function(val) {
                    this.element.setAttribute('type', val);
                    console.log('Lotus.Button.prototype.constructor set type: ' + this.element.getAttribute('type'));
                    this.Notify( val, 'type' );
                }
            },
            buttonSkinPart: {
                get: function() {
                    return _buttonSkinPart;
                },
                set: function(val) {
                    _buttonSkinPart = val;
                    this.Notify( val, 'buttonSkinPart' );
                }
            }
        }
    );
    Lotus.AbstractComponent.prototype.constructor.call(this);
}
/************* Inherit from Lotus.AbstractComponent for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractComponent, Lotus.Button);

Lotus.Button.prototype.defineSkinParts = function(){
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('button', this, 'buttonSkinPart'));
}

Lotus.Button.prototype.created = function(element){
    console.log('Lotus.Button.prototype.created');
    Lotus.AbstractComponent.prototype.created.call(this,element);
    console.log('Lotus.Button.prototype.created: element.type: ' + this.type);
    this.type = 'testButton';
}

//stub for override
Lotus.Button.prototype.onSkinPartAdded = function(part, skinPart){
    switch( part ){
        case 'button':
            //add button event listener or whatever else yo want to do when this skin part is added
            //you could hold until all skin parts are added and then call addEventListeners
            console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
            console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + skinPart);
            this.addEventListeners();
            break;
    }
}

//stub for override
Lotus.Button.prototype.addEventListeners = function(){
    Lotus.AbstractComponent.prototype.addEventListeners.call(this);
    this.buttonSkinPart.addEventListener('click', this.clickProxy);
}

//stub for override
Lotus.Button.prototype.removeEventListeners = function(){
    Lotus.AbstractComponent.prototype.removeEventListeners.call(this);
    this.buttonSkinPart.removeEventListener('click', this.clickProxy);
}

Lotus.Button.prototype.onClick = function( event ){
    console.log('Lotus.Button.prototype.onClick: event is ' + event);
    console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
}