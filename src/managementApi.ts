import {createActor} from "./declarations/management/index";
import {_SERVICE, AnalyticsReducers} from "./declarations/management/management.did.d";
import {ActorSubclass, HttpAgentOptions} from "@dfinity/agent";

const USERGEEK_MANAGEMENT_CANISTER_ID = "ls73o-nqaaa-aaaah-qbnsq-cai";
const ACTOR_SDK_VERSION = 1

export const getAnalyticsReducerApis = async (apiKey: string, agentOptions: HttpAgentOptions): Promise<AnalyticsReducers | undefined> => {
    if (apiKey.trim().length == 0) {
        throw new Error("API key is empty")
    }
    const managementActor = createManagementActor(agentOptions)
    const managementResponse = await managementActor.getAnalyticsReducerApis(ACTOR_SDK_VERSION, apiKey)
    if ("ok" in managementResponse) {
        return managementResponse.ok
    } else if ("err" in managementResponse) {
        console.error("Cannot get api", managementResponse.err)
        throw new Error()
    }
    throw new Error("unknown")
}

const createManagementActor = (agentOptions: HttpAgentOptions): ActorSubclass<_SERVICE> => {
    return createActor(USERGEEK_MANAGEMENT_CANISTER_ID, {agentOptions})
}
