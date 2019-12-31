export declare interface ILifecycle {
	created?: Function;
	inserted?: Function;
	removed?: Function;
	attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
}
export declare interface IAccessors {
	attribute?: { name?: string };
	set?: (value: any) => void;
	get?: () => any;
}
export declare interface IDefinition {
	content?: string;
	lifecycle?: ILifecycle;
	prototype?: any;
	events?: { [name: string]: (event: Event) => void };
	accessors?: { [name: string]: IAccessors };
	methods?: { [name: string]: (...args: any[]) => void };
}
export declare interface IXtag{
	register: (name: string, definition: IDefinition) => void;
	query: (element: Element, selector: string) => any[];
	toArray: (element: Element ) => Element[];
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