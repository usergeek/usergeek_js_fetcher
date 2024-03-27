import {getAnalyticsReducerApis} from "./managementApi";
import {ChunkResult, getMetricsChunks} from "./storeApi";
import {HttpAgentOptions, Identity} from "@dfinity/agent";

export const getDataChunks = async (apiKey: string, identity: Identity, lastNDays: number): Promise<Array<ChunkResult | undefined>> => {
    const agentOptions: HttpAgentOptions = {
        host: "https://icp0.io",
        identity: identity,
    }
    const reducerApis = await getAnalyticsReducerApis(apiKey, agentOptions)
    if (reducerApis !== undefined) {
        const {accessToken, apis} = reducerApis;
        return Promise.all(apis.map((api) => getMetricsChunks(accessToken, api, agentOptions, lastNDays)).flat());
    }
    throw new Error("Failed to get reducer APIs");
}

