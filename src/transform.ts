import {ChartLastNIntervalData, ProjectDashboardResultData} from "./declarations/analyticsStore/analyticsStore.did";
import {compactArray, sumArray, sumBy, uniqBy} from "./util";
import {ChunkResult} from "src/storeApi";

export const transformChunks = (chunks: Array<ChunkResult | undefined>): ProjectDashboardResultData => {
    const dataChunks: ChunkResult[] = compactArray(chunks)
    return reduceData(dataChunks);
}

const reduceData = (dataChunks: ChunkResult[]): ProjectDashboardResultData => {
    const intervalStartTimeSec = dataChunks[0].data.dau.intervalStartTimeSec;

    /**
     * WARNING!!!
     * DAU is not split into chunks on the server!!!
     * We must sum only one chunk from each actor!!!
     */
    const uniqueResultsForDAU = uniqBy(dataChunks, v => v.storeCanisterId);

    const resultDau: ChartLastNIntervalData = {
        intervalStartTimeSec: intervalStartTimeSec,
        data: sumArray(uniqueResultsForDAU.map(value => Array.from(value.data.dau.data)))
    }

    const resultWau: ChartLastNIntervalData = {
        intervalStartTimeSec: intervalStartTimeSec,
        data: sumArray(dataChunks.map(value => Array.from(value.data.wau.data)))
    }
    const resultMau: ChartLastNIntervalData = {
        intervalStartTimeSec: intervalStartTimeSec,
        data: sumArray(dataChunks.map(value => Array.from(value.data.mau.data)))
    }
    const resultNewUsers: ChartLastNIntervalData = {
        intervalStartTimeSec: intervalStartTimeSec,
        data: sumArray(dataChunks.map(value => Array.from(value.data.newUsers.data)))
    }
    const resultProjectUsers = sumBy(dataChunks, value => value.data.projectUsers);

    return {
        dau: resultDau,
        wau: resultWau,
        mau: resultMau,
        newUsers: resultNewUsers,
        projectUsers: resultProjectUsers
    }
}