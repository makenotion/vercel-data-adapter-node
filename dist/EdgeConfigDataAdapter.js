"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeConfigDataAdapter = void 0;
class EdgeConfigDataAdapter {
    constructor(options) {
        this.supportConfigSpecPolling = false;
        this.edgeConfigItemKey = options.edgeConfigItemKey;
        this.edgeConfigClient = options.edgeConfigClient;
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key !== "statsig.cache") {
                return {
                    error: new Error(`Edge Config Adapter Only Supports Config Specs`),
                };
            }
            const data = yield this.edgeConfigClient.get(this.edgeConfigItemKey);
            if (data == null) {
                return { error: new Error(`key (${key}) does not exist`) };
            }
            if (typeof data !== "object") {
                return {
                    error: new Error(`Edge Config value expected to be an object or array`),
                };
            }
            return { result: data };
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    set(key, value, time) {
        return __awaiter(this, void 0, void 0, function* () {
            // no-op. Statsig's Edge Config integration keeps config specs synced through Statsig's service
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.edgeConfigClient.get(this.edgeConfigItemKey);
            if (data) {
                this.supportConfigSpecPolling = true;
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    supportsPollingUpdatesFor(key) {
        if (key === "statsig.cache") {
            return this.supportConfigSpecPolling;
        }
        return false;
    }
}
exports.EdgeConfigDataAdapter = EdgeConfigDataAdapter;
