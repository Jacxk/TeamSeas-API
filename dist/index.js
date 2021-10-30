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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSeas = void 0;
// @ts-ignore
const node_fetch_1 = __importDefault(require("node-fetch"));
class TeamSeas {
    constructor(opt = { rateLimit: false, cache: { enable: true, duration: 5 } }) {
        this._cache = opt.cache || { enable: false, duration: 5 };
        this._rateLimit = opt.rateLimit;
        this._retryIn = Date.now() + ((this._cache.duration || 5) * 60 * 1000);
        this._data = this.getBody();
        this._maxPounds = 30000000;
        this._endDate = new Date(2022, 0, 1).getTime();
    }
    getLeft() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const totalPounds = parseInt(yield this.getTotalPounds());
            const fixed = String(this._maxPounds - totalPounds);
            return {
                daysLeft: parseInt(((this._endDate - Date.now()) / (1000 * 60 * 60 * 24)).toFixed()),
                poundsLeft: {
                    amount: {
                        fixed: fixed.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,"),
                        value: this._maxPounds - totalPounds
                    },
                    percent: ((totalPounds / this._maxPounds) * 100).toFixed(2)
                }
            };
        });
    }
    getTotalPounds(formatted) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const body = yield this._data;
            if (body == null)
                throw "There was a error while getting the data";
            const total_pounds = body.count;
            if (formatted)
                return total_pounds.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
            else
                return total_pounds;
        });
    }
    getMostRecent() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const boardData = yield this.getBoardData();
            return boardData.recent;
        });
    }
    getMostTrash() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const boardData = yield this.getBoardData();
            return boardData.most;
        });
    }
    getTeamsAlpha() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const boardData = yield this.getBoardData();
            return boardData.teams_alpha;
        });
    }
    getTeamsMostDonations() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assert();
            const boardData = yield this.getBoardData();
            return boardData.teams_most_donation;
        });
    }
    getBody() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count } = yield node_fetch_1.default('https://tscache.com/donation_total.json').then((res) => res.json());
            const recent_board = yield node_fetch_1.default('https://tscache.com/lb_recent.json').then((res) => res.json());
            // Delete useless objects
            // @ts-ignore
            delete recent_board.teams;
            delete recent_board.config;
            return { count, recent_board };
        });
    }
    loadCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this._data = this.getBody();
            this._retryIn = Date.now() + ((this._cache.duration || 5) * 60 * 1000);
        });
    }
    assert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._cache.enable) {
                if (this._rateLimit && this._retryIn > Date.now())
                    throw "Too many requests!";
                else
                    this._retryIn = Date.now() + (1000 * 30);
            }
            else if (this._cache.enable && Date.now() > this._retryIn)
                this.loadCache();
        });
    }
    getBoardData() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield this._data;
            if (body == null)
                throw "There was a error while getting the data";
            const recent_board = body.recent_board;
            if (recent_board == null)
                throw "There was a error while getting the data";
            return recent_board;
        });
    }
}
exports.TeamSeas = TeamSeas;
