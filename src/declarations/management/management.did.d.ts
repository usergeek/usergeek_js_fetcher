import type {ActorMethod} from '@dfinity/agent';

export type AccessToken = string;

export interface AnalyticsReducerApi {
    'getProjectDashboardChunk': GetProjectDashboardChunk,
}

export type AnalyticsReducerApiError = { 'wrongApiKey': null } |
    { 'notFound': null } |
    { 'temporarilyUnavailable': null };

export interface AnalyticsReducers {
    'apis': Array<AnalyticsReducerApi>,
    'accessToken': AccessToken,
}

export interface ChartLastNIntervalData {
    'data': Int32Array | number[],
    'intervalStartTimeSec': number,
}

export type GetAnalyticsReducerApiResultError = { 'notAccess': null } |
    { 'notFound': null } |
    { 'temporarilyUnavailable': null };
export type GetAnalyticsReducerApisResult = { 'ok': AnalyticsReducers } |
    { 'err': GetAnalyticsReducerApiResultError };


export type GetProjectDashboardChunk = ActorMethod<
    [AccessToken, LifecycleChartRequestChunkParams],
    GetProjectDashboardResult
>;
export type GetProjectDashboardResult = { 'ok': ProjectDashboardResultData } |
    { 'err': AnalyticsReducerApiError };

export interface LifecycleChartRequestChunkParams {
    'partitionsRange': Range,
    'lastNDays': number,
}

export type ProjectApiKey = string;

export interface ProjectDashboardResultData {
    'dau': ChartLastNIntervalData,
    'mau': ChartLastNIntervalData,
    'wau': ChartLastNIntervalData,
    'projectUsers': number,
    'newUsers': ChartLastNIntervalData,
}

export interface Range {
    'start': number,
    'length': number
}

export type SdkVersion = number;

export interface _SERVICE {
    'getAnalyticsReducerApis': ActorMethod<
        [SdkVersion, ProjectApiKey],
        GetAnalyticsReducerApisResult
    >,
}