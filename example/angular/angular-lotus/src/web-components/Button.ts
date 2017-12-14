/**
 * Created by dsmiley on 12/4/17.
 */
import { Component } from '@angular/core';
import {Button} from 'lotusjs-components/lib/view/Button';
import { ViewEncapsulation, AfterViewInit, Renderer, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'x-lotus-button',
  templateUrl: './Button.html',
  styleUrls: ['./Button.css']
})
export class AngularButton extends Button implements AfterViewInit{

  @ViewChild('myButton')
  button:ElementRef;

  constructor(){
    super();
  }

  public ngAfterViewInit():void {
    this.element = this.button.nativeElement;
    this.init();
  }

  public ngOnDestroy():void{
    this.destroy();
  }

  //TODO: implement a data binding example. The Angular component acts as a mediator
  //TODO: we want to create a lotus model that implements Lavender's Observable interface.
  //TODO: we then want the component to enable bindings using this.binder. Then when the callback function
  //TODO: in the component is triggered, be sure to trigger $scope.notify to update the view in angular if required.
  //TODO: Be sure to note that Lotus advocates for two way data bindings on objects only, not views
}

