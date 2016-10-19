/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.Button = function(){
    //Define private vars
    var _buttonSkinPart;
    var _type;
    //Define instance properties
    this.clickProxy = this.onClick.bind(this);
    // Define our getters and setters
    this.addProperties({
            type: {
                get: function() {
                    return _type;
                },
                set: function(val) {
                    _type = val;
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
    this.dispatch(new Lavender.AbstractEvent('click', {target:this.buttonSkinPart, originalEvent:event}))
}

Lotus.Button.prototype.destroy = function(){
    Lotus.AbstractComponent.prototype.destroy.call(this);
    this.buttonSkinPart = null;
}