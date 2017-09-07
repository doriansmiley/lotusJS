"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = require("lavenderjs/lib");
var ComponentEvent_1 = require("../control/events/ComponentEvent");
var InjectorDecorator_1 = require("../reflection/InjectorDecorator");
/**
 * Created by dsmiley on 7/26/17.
 */
var AbstractMediator = (function (_super) {
    __extends(AbstractMediator, _super);
    function AbstractMediator(componentInstance, context) {
        var _this = _super.call(this) || this;
        _this.id = Lavender.UuidUtils.generateUUID();
        _this.componentInstance = componentInstance;
        _this.context = context;
        if (!_this.componentInstance.ready) {
            _this.componentInstance.addEventListener(ComponentEvent_1.ComponentEvent.READY, _this, 'init');
        }
        else {
            _this.init();
        }
        return _this;
        /*
        if(this.resolveInjections){
            //TODO: move this method to a decorator that sets up this.resolveInjections as an accessor and adds this functionality to the contructor
            this.resolveInjections.forEach(function(value:injectionResolver, index:number){
                var instane:any = this.context.injector.inject(value.type);
                if(instane){
                    this[value.property] = instane;
                }
            }.bind(this));
        }
        */
    }
    Object.defineProperty(AbstractMediator.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this.notify(value, 'id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractMediator.prototype, "componentInstance", {
        get: function () {
            return this._componentInstance;
        },
        set: function (value) {
            this._componentInstance = value;
            this.notify(value, 'componentInstance');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractMediator.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
            this.notify(value, 'context');
        },
        enumerable: true,
        configurable: true
    });
    AbstractMediator.prototype.addEventListeners = function () {
    };
    AbstractMediator.prototype.removeEventListeners = function () {
        if (this.componentInstance.canListen(ComponentEvent_1.ComponentEvent.READY, this, 'init')) {
            this.componentInstance.removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'init');
        }
    };
    AbstractMediator.prototype.setUpBindings = function () {
    };
    AbstractMediator.prototype.removeBindings = function () {
        this.binder.unbindAll();
    };
    AbstractMediator.prototype.toString = function () {
        return this.id;
    };
    AbstractMediator.prototype.init = function () {
        this.addEventListeners();
        this.setUpBindings();
    };
    AbstractMediator.prototype.destroy = function () {
        this.removeEventListeners();
        this.removeBindings();
        this.id = null;
        this.componentInstance = null;
    };
    AbstractMediator = __decorate([
        InjectorDecorator_1.injectable,
        __metadata("design:paramtypes", [Object, Object])
    ], AbstractMediator);
    return AbstractMediator;
}(Lavender.Subject));
exports.AbstractMediator = AbstractMediator;
//# sourceMappingURL=AbstractMediator.js.map