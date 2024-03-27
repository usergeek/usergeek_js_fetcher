export const idlFactory = ({IDL}) => {
    const ProjectApiKey = IDL.Text;
    const AccessToken = IDL.Text;
    const Range = IDL.Record({'start': IDL.Nat32, 'length': IDL.Nat32});
    const LifecycleChartRequestChunkParams = IDL.Record({
        'partitionsRange': Range,
        'lastNDays': IDL.Nat32,
    });
    const ChartLastNIntervalData = IDL.Record({
        'data': IDL.Vec(IDL.Int32),
        'intervalStartTimeSec': IDL.Nat32,
    });
    const ProjectDashboardResultData = IDL.Record({
        'dau': ChartLastNIntervalData,
        'mau': ChartLastNIntervalData,
        'wau': ChartLastNIntervalData,
        'projectUsers': IDL.Int32,
        'newUsers': ChartLastNIntervalData,
    });
    const AnalyticsReducerApiError = IDL.Variant({
        'wrongApiKey': IDL.Null,
        'notFound': IDL.Null,
        'temporarilyUnavailable': IDL.Null,
    });
    const GetProjectDashboardResult = IDL.Variant({
        'ok': ProjectDashboardResultData,
        'err': AnalyticsReducerApiError,
    });
    const GetProjectDashboardChunk = IDL.Func(
        [AccessToken, LifecycleChartRequestChunkParams],
        [GetProjectDashboardResult],
        ['query'],
    );
    const AnalyticsReducerApi = IDL.Record({
        'getProjectDashboardChunk': GetProjectDashboardChunk,
    });
    const SdkVersion = IDL.Nat32;
    const GetAnalyticsReducerApiResultError = IDL.Variant({
        'notAccess': IDL.Null,
        'notFound': IDL.Null,
        'temporarilyUnavailable': IDL.Null,
    });
    const AnalyticsReducers = IDL.Record({
        'apis': IDL.Vec(AnalyticsReducerApi),
        'accessToken': AccessToken,
    });
    const GetAnalyticsReducerApisResult = IDL.Variant({
        'ok': AnalyticsReducers,
        'err': GetAnalyticsReducerApiResultError,
    });
    return IDL.Service({
        'getAnalyticsReducerApis': IDL.Func(
            [SdkVersion, ProjectApiKey],
            [GetAnalyticsReducerApisResult],
            ['query'],
        )
    });
};