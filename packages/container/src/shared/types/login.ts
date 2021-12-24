export type UserInfo = {
    name: string;
    fn: string;
}
export type LoginResponse = {
    info: UserInfo
    uid: string,
    access_token: string
}