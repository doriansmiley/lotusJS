/**
 * Created by dsmiley on 7/24/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {ComponentMapInterface} from "./ComponentMapInterface";

export interface ContextInterface {
    config: Record<string, any>;
    eventDispatcher: Lavender.IEventDispatcher;
    componentMap: ComponentMapInterface;

    startUp();

    mapComponents();
}
