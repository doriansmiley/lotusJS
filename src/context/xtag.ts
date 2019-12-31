export declare interface LifecycleHooks {
	created?: Function;
	inserted?: Function;
	removed?: Function;
	attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
}
export declare interface Accessors {
	attribute?: { name?: string };
	set?: (value: any) => void;
	get?: () => any;
}
export declare interface TagDefinition {
	content?: string;
	lifecycle?: LifecycleHooks;
	prototype?: any;
	events?: { [name: string]: (event: Event) => void };
	accessors?: { [name: string]: Accessors };
	methods?: { [name: string]: (...args: any[]) => void };
}
export declare interface XtagInterface{
	register: (name: string, definition: TagDefinition) => void;
	query: (element: Element, selector: string) => any[];
	toArray: (element: Element) => Element[];
	typeOf: (object: Record<string, any>) => string;
	wrap: (object1: Function, object2: Function) => Record<string, any>;
	merge: (object1: Record<string, any>, object2: Record<string, any>) => Record<string, any>;
	uid: () => string;
	matchSelector: (element: Element, selector: string) => boolean;
	queryChildren: (element: Element, selector: string) => Element[];
	createFragment: (content: string | Function | Element[] | Element[]) => DocumentFragment;
	requestFrame: (callback: () =>  void) => any;
	cancelFrame: (any: any) => void;
	skipFrame: (callback: () => void) => void;
	skipTransition: (element: Element, callback: () => void) => void;
	addEvent: (element: Element, type: string, callback: (event: Event) => void) => void;
	addEvents: (element: Element, options: { [name: string]: (event: Event) => void}) => void;
}
