/**
 * Created by dsmiley on 4/20/18.
 */

import {Injectable} from '@angular/core';
import * as Lavender from 'lavenderjs/lib';

@Injectable()
export class ButtonModel extends Lavender.Subject {

  private _label:string = 'hellow world';

  constructor() {
    super();
  }
  
  get label():string {
    return this._label;
  }

  set label(value:string) {
    this._label = value;
    this.notify(value, 'label');
  }

}
