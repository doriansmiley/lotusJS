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
}

