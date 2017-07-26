// DefinitelyTyped by Danilo C Castro
// Type definitions for x-tag 1.0
// https://x-tag.readme.io/docs
// Version: xtag.d.js v0.0.2 2015-10-29
// The MIT License (MIT)
// github: https://github.com/danilodeven/x-tag.d.ts
// follow me: https://twitter.com/danilodeven


declare module xtag {
	interface ILifecycle {
		created?: Function;
		inserted?: Function;
		removed?: Function;
		attributeChanged?: (attrName: string, oldValue: any, newValue: any) => Function;
	}
	interface IAccessors {
		attribute?: { name?: string };
		set?: (value: any) => void;
		get?: () => any;
	}
	interface IDefinition {
		content?: string;
		lifecycle?: ILifecycle;
		events?: { [name: string]: (event: Event) => void; };
		accessors?: { [name: string]: IAccessors; };
		methods?: { [name: string]: (...args: any[]) => void; }
	}
	interface IXtag{
		register: (name: string, definition: IDefinition) => void;
		query: (element: Element, selector: string) => any[];
		toArray: (element: Element ) => Element[];
		typeOf: (object: Object) => string;
		wrap: (object1: Function, object2: Function) => Object;
		merge: (object1: Object, object2: Object) => Object;
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
}
