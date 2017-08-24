/**
 * Created by dsmiley on 7/25/17.
 */
import {ArrayList} from 'lavenderjs/lib';
import {IComponentList} from './IComponentList';

export class ComponentList extends ArrayList implements IComponentList{
    public instancesByConstructor:Object = {};
    
    constructor(){
        super();
    }
    
    protected addToHash(object:any):void{
        if( this.instancesByConstructor[ object.constructor ] === null || this.instancesByConstructor[ object.constructor ] === undefined ){
            this.instancesByConstructor[ object.constructor ] = [];
        }
        this.instancesByConstructor[ object.constructor ].push( object );
    }
    
    protected removeItemFromHash(hash:Object, object:any):void{
        let objects = hash[ object.constructor ];
        if( objects === null || objects === undefined ||  objects.length < 1 ){
            return;
        }
        for(let i = 0; i < objects.length; i++ ){
            if( objects[i] == object ){
                //remove the item from the array
                switch (i) {
                    case 0:
                        objects.shift();
                        break;
                    case objects.length - 1:
                        objects.pop();
                        break;
                    default:
                        let head = objects.slice(0, i);
                        let tail = objects.slice(i + 1);
                        objects = head.concat(tail);
                        break;
                }
                break;
            }
        }
    }

    public addItem(object:Object, hash?:Object, key?:string):number{
        let index:number = super.addItem(object,hash,key);
        //populate hash
        this.addToHash(object);
        return index;
    }

    public clear():void{
        super.clearHash(this.instancesByConstructor);
        super.clear();
    }

    public removeItemAt(index:number):void{
        let object:Object = this.getItemAt( index );
        this.removeItemFromHash(this.instancesByConstructor, object);
        super.removeItemAt(index);
    }

    public insert(object:any, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false ):number{
        let returnValue:number = super.insert(object,index,suppressChangeEvent,hash,key,replaceIndex);
        this.addToHash(object);
        return returnValue;
    }
}