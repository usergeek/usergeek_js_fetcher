import type {ActorMethod} from '@dfinity/agent';

export type AccessToken__1 = string;

export type AnalyticsReducerApiError = { 'wrongApiKey': null } |
    { 'notFound': null } |
    { 'temporarilyUnavailable': null };

export interface ChartLastNIntervalData {
    'data': Int32Array | number[],
    'intervalStartTimeSec': number,
}

export type GetProjectDashboardChunk = ActorMethod<
    [AccessToken__1, LifecycleChartRequestChunkParams],
    GetProjectDashboardResult
>;
export type GetProjectDashboardResult = { 'ok': ProjectDashboardResultData } |
    { 'err': AnalyticsReducerApiError };

export interface LifecycleChartRequestChunkParams {
    'partitionsRange': Range,
    'lastNDays': number,
}

export interface ProjectDashboardRequestChunkParams {
    'partitionsRange': Range,
    'lastNDays': number,
}

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

export interface _SERVICE {
    'getProjectDashboardChunk': ActorMethod<
        [AccessToken__1, ProjectDashboardRequestChunkParams],
        GetProjectDashboardResult
    >,
}
