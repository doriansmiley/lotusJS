/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "./InputModel";

export class InputCollectionModel extends Lavender.Subject{
    public static TYPE_INPUT:number = 0;
    public static TYPE_LIST:number = 1;
    public static TYPE_RADIO_GROUP:number = 2;
    public static TYPE_FILE:number =3;


    private _type:number;
    private _collection:Lavender.ArrayList;

    get type():number {
        return this._type;
    }

    set type(value:number) {
        this._type = value;
        this.notify(value, 'type');
    }

    get collection():Lavender.ArrayList {
        return this._collection;
    }

    set collection(value:Lavender.ArrayList) {
        this._collection = value;
        this.notify(value, 'collection');
    }

    public validate():Array<InputModel>{
        let results:Array<InputModel> = [];
        for(var i=0; i<this.collection.length; i++){
            let item:InputModel = (this.collection.getItemAt(i) as InputModel);
            if(item.validate && !item.validate()){
                //model is invalid, add to invalid results
                results.push(item);
            }
        }
        //return the failed results
        return results;
    }

    public clear():void{
        //reset all form fields by clearing InputModel values
        for(var i=0; i<this.collection.length; i++){
            let item:InputModel = this.collection.getItemAt(i) as InputModel;
            switch(this.type){
                case InputCollectionModel.TYPE_INPUT:
                    item.value = '';
                    break;
                case InputCollectionModel.TYPE_FILE:
                    //TODO: fogure out how to reset file collection view using model. Probably need a ne wmodel attribute
                    break;
                case InputCollectionModel.TYPE_RADIO_GROUP:
                case InputCollectionModel.TYPE_LIST:
                    item.selected = false
                    break;
            }
        }
    }
}