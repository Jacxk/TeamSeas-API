
export interface TeamSeasOptions {
    rateLimit?: boolean;
    cache?: TeamSeasCache
}

export interface TeamSeasCache {
    enable?: boolean,
    duration?: number
}

export interface TeamSeasData {
    count: string; 
    recent_board: LeaderBoard
}

export interface LeaderBoard {
    recent: Array<Donation>;
    most: Array<Donation>;
    teams_alpha: Array<Team>;
    teams_most_donations: Array<Team>;
}

export interface Donation {
    ff: number;
    name: string;
    team_name: string;
    message_public: string;
    flair: string;
    pounds: string;
    pounds_color: string;
    created_at: number;
}

export interface Team {
    team: string;
    total_donation: string;
    total_members: string;
    sort_donation: string;
}