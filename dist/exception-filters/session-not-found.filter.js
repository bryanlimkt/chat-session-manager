"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNotFoundFilter = void 0;
const common_1 = require("@nestjs/common");
const session_not_found_error_1 = require("../errors/session-not-found.error");
const base_presenter_1 = require("../base-presenter");
let SessionNotFoundFilter = class SessionNotFoundFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        response
            .status(common_1.HttpStatus.NOT_FOUND)
            .json(new base_presenter_1.BasePresenter(common_1.HttpStatus.NOT_FOUND, exception.message));
    }
};
exports.SessionNotFoundFilter = SessionNotFoundFilter;
exports.SessionNotFoundFilter = SessionNotFoundFilter = __decorate([
    (0, common_1.Catch)(session_not_found_error_1.SessionNotFoundError)
], SessionNotFoundFilter);
//# sourceMappingURL=session-not-found.filter.js.map