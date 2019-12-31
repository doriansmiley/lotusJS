import * as Lavender from 'lavenderjs/lib';
import {InputCollectionModel} from "../InputCollectionModel";
/**
 * Created by dsmiley on 10/10/17.
 */
export interface Validator {
    errors: Lavender.ArrayList;
    warnings: Lavender.ArrayList;
    source: InputCollectionModel;
    isValid: boolean;
    hasWarnings: boolean;
    validate(): boolean;
    init(): void;
    destroy(): void;
    id: string;
}
