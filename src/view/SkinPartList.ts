/**
 * Created by dsmiley on 8/1/17.
 */
import {ArrayList} from 'lavenderjs/lib';
import {SkinPart} from "./SkinPart";

export class SkinPartList extends ArrayList{
    public skinPartsByLabel:Object = {};
    
    constructor(source?:Array<any>, allowDuplicates:boolean = true){
        super(source,allowDuplicates);
    }
    
    public addItem(object:SkinPart, hash?:Object, key?:string):number{
        //ensure the object is valid before proceeding
        let index = super.addItem(object, hash, key);
        //populate hash
        this.skinPartsByLabel[ object.label ] = object;
        return index;
    }

    public clear():void{
        super.clearHash(this.skinPartsByLabel);
        super.clear();
    }
    
    public removeItemAt(index:number):void{
        let skinPart:SkinPart = this.getItemAt( index );
        super.removeItemFromHash(this.skinPartsByLabel, skinPart.label);
        super.removeItemAt(index);
    }

    public insert(object:SkinPart, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false ):number{
        //ensure the object is valid before proceeding
        let returnValue = super.insert(object, index,suppressChangeEvent,hash,key,replaceIndex);
        //populate hash
        this.skinPartsByLabel[ object.label ] = object;
        return returnValue;
    }
}