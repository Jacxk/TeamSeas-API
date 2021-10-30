// @ts-ignore
import fetch from "node-fetch";
import { Donation, LeaderBoard, Team, TeamSeasCache, TeamSeasData, TeamSeasOptions } from "./interfaces";

export class TeamSeas {
    private readonly _rateLimit: boolean | undefined;
    private readonly _cache: TeamSeasCache;
    private _retryIn: number;
    private _data: Promise<TeamSeasData>;
    private readonly _maxPounds: number;
    private readonly _endDate: number;

    constructor(opt: TeamSeasOptions = { rateLimit: false, cache: { enable: true, duration: 5 } }) {
        this._cache = opt.cache || { enable: false, duration: 5 };
        this._rateLimit = opt.rateLimit;
        this._retryIn = Date.now() + ((this._cache.duration || 5) * 60 * 1000);
        this._data = this.getBody();
        this._maxPounds = 30000000;
        this._endDate = new Date(2022, 0, 1).getTime();
    }

    public async getLeft(): Promise<object> {
        await this.assert();

        const totalPounds = parseInt(await this.getTotalPounds());
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
    }

    public async getTotalPounds(formatted?: boolean): Promise<string> {
        await this.assert();

        const body = await this._data;
        if (body == null) throw "There was a error while getting the data";

        const total_pounds: string = body.count;

        if (formatted) return total_pounds.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
        else return total_pounds;
    }

    public async getMostRecent(): Promise<Array<Donation>> {
        await this.assert();

        const boardData: LeaderBoard = await this.getBoardData();

        return boardData.recent;
    }

    public async getMostTrash(): Promise<Array<Donation>> {
        await this.assert();

        const boardData: LeaderBoard = await this.getBoardData();

        return boardData.most;
    }

    public async getTeamsAlpha(): Promise<Array<Team>> {
        await this.assert();
        
        const boardData: LeaderBoard = await this.getBoardData();

        return boardData.teams_alpha;
    }

    public async getTeamsMostDonations(): Promise<Array<Team>> {
        await this.assert();
        
        const boardData: LeaderBoard = await this.getBoardData();

        return boardData.teams_most_donation;
    }

    private async getBody(): Promise<TeamSeasData> {
        const { count }: { count: string } = await fetch('https://tscache.com/donation_total.json').then((res: Response) => res.json())
        const recent_board: LeaderBoard = await fetch('https://tscache.com/lb_recent.json').then((res: Response) => res.json());

        // Delete useless objects
        // @ts-ignore
        delete recent_board.teams; delete recent_board.config;

        return { count, recent_board }
    }

    private async loadCache(): Promise<void> {
        this._data = this.getBody();
        this._retryIn = Date.now() + ((this._cache.duration || 5) * 60 * 1000);
    }

    private async assert() {
        if (!this._cache.enable) {
            if (this._rateLimit && this._retryIn > Date.now()) throw "Too many requests!";
            else this._retryIn = Date.now() + (1000 * 30);
        } else if (this._cache.enable && Date.now() > this._retryIn) this.loadCache();
    }

    public async getBoardData(): Promise<LeaderBoard> {
        const body: TeamSeasData = await this._data;
        if (body == null) throw "There was a error while getting the data";

        const recent_board = body.recent_board;
        if (recent_board == null) throw "There was a error while getting the data";

        return recent_board;
    }
}