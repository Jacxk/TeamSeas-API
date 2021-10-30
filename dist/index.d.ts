import { Donation, LeaderBoard, Team, TeamSeasOptions } from "./interfaces";
export declare class TeamSeas {
    private readonly _rateLimit;
    private readonly _cache;
    private _retryIn;
    private _data;
    private readonly _maxPounds;
    private readonly _endDate;
    constructor(opt?: TeamSeasOptions);
    getLeft(): Promise<object>;
    getTotalPounds(formatted?: boolean): Promise<string>;
    getMostRecent(): Promise<Array<Donation>>;
    getMostTrash(): Promise<Array<Donation>>;
    getTeamsAlpha(): Promise<Array<Team>>;
    getTeamsMostDonations(): Promise<Array<Team>>;
    private getBody;
    private loadCache;
    private assert;
    getBoardData(): Promise<LeaderBoard>;
}
