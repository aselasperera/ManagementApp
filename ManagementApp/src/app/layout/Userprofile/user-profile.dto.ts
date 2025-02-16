export interface IUserProfile {
    given_name?: string;
    family_name?: string;
    nickname?: string;
    name?: string;
    picture?: string;
    locale?: string;
    updated_at?: string;
    email?: string;
    email_verified?: boolean;
    sub?: string;
    app_metadata?: any;
    user_metadata?: any;
}
