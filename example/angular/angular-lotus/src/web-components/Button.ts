/**
 * Created by dsmiley on 12/4/17.
 */
import { Component } from '@angular/core';
import {Button} from 'lotusjs-components/lib/view/Button';
import {ButtonModel} from '../model/ButtonModel'
import { ViewEncapsulation, AfterViewInit, Renderer, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'x-lotus-button',
  templateUrl: './Button.html',
  styleUrls: ['./Button.css'],
  providers:[ButtonModel]
})
export class AngularButton extends Button implements AfterViewInit{

  @ViewChild('myButton')
  button:ElementRef;

  constructor(private buttonModel:ButtonModel){
    super();
    //set up bindings using Lotus bindings utils instead of Angular.
    this.binder.bind(this.buttonModel, 'label', this, 'onLableChange');
  }

  public onLableChange(value:string):void{
    this.element.innerHTML = value;
  }

  public onClick(event:Event):void{
    super.onClick(event);
    //here we reset the model values which will trigger a change in the view. Pretty cool!!!
    this.buttonModel.label = 'hey, keep your pointer to yourself';
  }

  public ngAfterViewInit():void {
    this.element = this.button.nativeElement;
    this.init();
    this.onLableChange(this.buttonModel.label);//must init the value as bindings don't trigger when created
  }

  public ngOnDestroy():void{
    this.destroy();//will clear all bindings
  }

  //TODO: implement a data binding example. The Angular component acts as a mediator
  //TODO: we want to create a lotus model that implements Lavender's Observable interface.
  //TODO: we then want the component to enable bindings using this.binder. Then when the callback function
  //TODO: in the component is triggered, be sure to trigger $scope.notify to update the view in angular if required.
  //TODO: Be sure to note that Lotus advocates for two way data bindings on objects only, not views
}

