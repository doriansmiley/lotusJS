import {AbstractComponent} from './AbstractComponent';

/**
 * Created by dsmiley on 8/4/17.
 */
export abstract class AbstractItemView extends AbstractComponent {

    private _model: Record<string, any>;

    constructor () {
        super();
    }

    get model (): Record<string, any> {
        return this._model;
    }

    set model (val: Record<string, any>) {
        this._model = val;
        this.onModelChange(val);
        this.notify(val, 'model');
    }

    public setElementDisplay (element: HTMLElement, display: string): void {
        // at some points in the items lifecycle element could be null, se we require this check
        if (element !== null && element !== undefined) {
            element.style.display = display;
        }
    }

    public onModelChange (value: Record<string, any>): void {
        // stub for override
    }

    public resetState (): void {
        // stub for override
    }

    public destroy (): void {
        super.destroy();
        if (this.model && this.model['destroy']) {
            this.model['destroy']();
        }
        this.model = null;
    }
}
