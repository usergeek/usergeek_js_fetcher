import {ChartLastNIntervalData} from "./declarations/analyticsStore/analyticsStore.did";

export type ChartsPoints = { x: number, y: number }[]
export const prepareChartsData = (data: ChartLastNIntervalData): ChartsPoints => {
    let x = data.intervalStartTimeSec * 1000
    return Array.from(data.data).map(y => {
        x += 24 * 60 * 60 * 1000
        return {x, y: Number(y)}
    })
}