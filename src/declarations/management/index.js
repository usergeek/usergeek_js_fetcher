import {Actor, ActorConfig, ActorSubclass, Agent, HttpAgent, HttpAgentOptions} from "@dfinity/agent";
import {Principal} from '@dfinity/principal';

import {_SERVICE, idlFactory} from './management.did.js';

/**
 * @param {string | Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: HttpAgentOptions; actorOptions?: ActorConfig} | { agent?: Agent; actorOptions?: ActorConfig }} [options]
 * @return {ActorSubclass<_SERVICE>}
 */
export const createActor = (canisterId, options = {}) => {
    const agent = options.agent || new HttpAgent({...options.agentOptions});
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
        ...(options ? options.actorOptions : {}),
    });
};
