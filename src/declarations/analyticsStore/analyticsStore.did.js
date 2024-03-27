export const idlFactory = ({IDL}) => {
    const Range = IDL.Record({'start': IDL.Nat32, 'length': IDL.Nat32});
    const AccessToken__1 = IDL.Text;
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
    const ProjectDashboardRequestChunkParams = IDL.Record({
        'partitionsRange': Range,
        'lastNDays': IDL.Nat32,
    });
    return IDL.Service({
        'getProjectDashboardChunk': IDL.Func(
            [AccessToken__1, ProjectDashboardRequestChunkParams],
            [GetProjectDashboardResult],
            ['query'],
        ),
    });
};