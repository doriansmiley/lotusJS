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
var AbstractMediator_1 = require("./AbstractMediator");
var InjectorDecorator_1 = require("../reflection/InjectorDecorator");
var HttpServiceFactory_1 = require("../factory/HttpServiceFactory");
/**
 * Created by dsmiley on 7/26/17.
 */
var ButtonMediator = (function (_super) {
    __extends(ButtonMediator, _super);
    function ButtonMediator(componentInstance, context) {
        var _this = this;
        console.log('ButtonMediator constructor called');
        _this = _super.call(this, componentInstance, context) || this;
        return _this;
    }
    ButtonMediator.prototype.onClick = function (event) {
        console.log('Im the button mediator, I can handle the component click and dispatch an application event. serviceFactory ' + this.serviceFactory);
    };
    ButtonMediator.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.componentInstance.addEventListener('click', this, 'onClick');
    };
    ButtonMediator.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.componentInstance.removeEventListener('click', this, 'onClick');
    };
    ButtonMediator.prototype.toString = function () {
        return 'Lotus.ButtonMediator';
    };
    __decorate([
        InjectorDecorator_1.inject,
        __metadata("design:type", HttpServiceFactory_1.HttpServiceFactory)
    ], ButtonMediator.prototype, "serviceFactory", void 0);
    return ButtonMediator;
}(AbstractMediator_1.AbstractMediator));
exports.ButtonMediator = ButtonMediator;
//# sourceMappingURL=ButtonMediator.js.map