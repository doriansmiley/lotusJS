/**
 * Created by dsmiley on 8/1/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {SkinPart} from "./SkinPart";

export class SkinPartList extends Lavender.ArrayList{
    public skinPartsByLabel: Record<string, any> = {};
    
    constructor(source?: Array<any>, allowDuplicates = true){
        super(source,allowDuplicates);
    }
    
    public addItem(object: SkinPart, hash?: Record<string, any>, key?: string): number{
        //ensure the object is valid before proceeding
        const index = super.addItem(object, hash, key);
        //populate hash
        this.skinPartsByLabel[ object.label ] = object;
        return index;
    }

    public clear(): void{
        super.clearHash(this.skinPartsByLabel);
        super.clear();
    }
    
    public removeItemAt(index: number): void{
        const skinPart: SkinPart = this.getItemAt( index );
        super.removeItemFromHash(this.skinPartsByLabel, skinPart.label);
        super.removeItemAt(index);
    }

    public insert(object: SkinPart, index: number, suppressChangeEvent=false, hash?: Record<string, any>, key?: string, replaceIndex=false ): number{
        //ensure the object is valid before proceeding
        const returnValue = super.insert(object, index,suppressChangeEvent,hash,key,replaceIndex);
        //populate hash
        this.skinPartsByLabel[ object.label ] = object;
        return returnValue;
    }
}