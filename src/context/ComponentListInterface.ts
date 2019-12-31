import * as Lavender from 'lavenderjs/lib';

/**
 * Created by dsmiley on 7/25/17.
 */
export interface ComponentListInterface extends Lavender.IList {
    instancesByConstructor: Record<string, any>;
}
