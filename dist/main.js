"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const chat_not_found_filter_1 = require("./exception-filters/chat-not-found.filter");
const session_already_exists_filter_1 = require("./exception-filters/session-already-exists.filter");
const session_not_found_filter_1 = require("./exception-filters/session-not-found.filter");
const internal_auth_guard_1 = require("./guards/internal-auth-guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new session_not_found_filter_1.SessionNotFoundFilter(), new session_already_exists_filter_1.SessionAlreadyExistsFilter(), new chat_not_found_filter_1.ChatNotFoundFilter());
    app.useGlobalGuards(new internal_auth_guard_1.InternalAuthGuard());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map