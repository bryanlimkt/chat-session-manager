"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InternalAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
let InternalAuthGuard = InternalAuthGuard_1 = class InternalAuthGuard {
    constructor() {
        this.logger = new common_1.Logger(InternalAuthGuard_1.name);
        dotenv.config();
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const expectedApiKey = process.env.INTERNAL_API_KEY;
        let apiKey;
        try {
            apiKey = request.headers['internal-api-key'];
        }
        catch (err) {
            this.logger.error(err.stack);
            return false;
        }
        return apiKey === expectedApiKey;
    }
};
exports.InternalAuthGuard = InternalAuthGuard;
exports.InternalAuthGuard = InternalAuthGuard = InternalAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InternalAuthGuard);
//# sourceMappingURL=internal-auth-guard.js.map