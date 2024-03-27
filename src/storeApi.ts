import {createActor} from "./declarations/analyticsStore/index";
import {AccessToken, AnalyticsReducerApi} from "./declarations/management/management.did.d";
import {_SERVICE, GetProjectDashboardChunk, ProjectDashboardResultData} from "./declarations/analyticsStore/analyticsStore.did.d";
import {Principal} from "@dfinity/principal";
import {ActorSubclass, HttpAgentOptions} from "@dfinity/agent";

const USERS_PARTITIONS_COUNT = 1024
const NUMBER_OF_CHUNKS = 16

export type ChunkResult = { storeCanisterId: string, data: ProjectDashboardResultData }
export const getMetricsChunks = (accessToken: AccessToken, api: AnalyticsReducerApi, agentOptions: HttpAgentOptions, lastNDays: number): Promise<ChunkResult | undefined>[] => {
    const storeCanisterId = getStoreActorCanisterId(api);
    if (storeCanisterId == undefined) {
        throw new Error("cannot get canisterId for store actor")
    }
    const storeActor = createStoreActor(storeCanisterId, agentOptions)
    const ranges = splitPartitionsCountIntoRanges(NUMBER_OF_CHUNKS, USERS_PARTITIONS_COUNT)
    return ranges.map(async (range) => {
        const chunkResult = await storeActor.getProjectDashboardChunk(accessToken, {lastNDays: lastNDays, partitionsRange: range});
        if ("ok" in chunkResult) {
            return {
                storeCanisterId: storeCanisterId,
                data: chunkResult.ok
            }
        } else if ("err" in chunkResult) {
            console.error("Cannot get chunk data", chunkResult.err)
            throw new Error()
        }
    })
}

const getStoreActorCanisterId = (api: AnalyticsReducerApi): string | undefined => {
    const sharedFunctionDataPrincipal = getSharedFunctionDataPrincipal(api.getProjectDashboardChunk);
    return sharedFunctionDataPrincipal?.toText()
}

const createStoreActor = (canisterId: string, agentOptions: HttpAgentOptions): ActorSubclass<_SERVICE> => {
    return createActor(canisterId, {agentOptions})
}

const getSharedFunctionDataPrincipal = (actorMethod: GetProjectDashboardChunk): Principal | undefined => {
    try {
        if (Array.isArray(actorMethod)) {
            const data = actorMethod
            if (data.length === 2) {
                const principal = data[0]
                if (typeof principal["toText"] == "function") {
                    return principal
                }
            }
        }
    } catch (e) {
    }
    return undefined
}

const splitPartitionsCountIntoRanges = (numberOfChunks: number, partitionsCount: number): { start: number, length: number }[] => {
    if (numberOfChunks <= 0) {
        throw new Error(`Bad number of partition chunks. Must be even and positive! (passed value is ${numberOfChunks})`)
    }
    const length = Math.ceil(partitionsCount / numberOfChunks)
    const result: { start: number, length: number }[] = []
    for (let i = 0; i < numberOfChunks; i++) {
        const rangeStart = Math.min(Math.max(0, length * i), partitionsCount)
        let rangeLength = Math.min(Math.max(1, length), partitionsCount)

        let shouldBreak = false
        if (rangeStart + rangeLength > partitionsCount) {
            rangeLength = partitionsCount - rangeStart
            shouldBreak = true
        }
        if (rangeLength > 0) {
            result.push({start: rangeStart, length: rangeLength})
        }
        if (shouldBreak) {
            break
        }
    }
    return result
}