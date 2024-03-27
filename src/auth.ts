import {Secp256k1KeyIdentity} from "@dfinity/identity-secp256k1";
import {Identity} from "@dfinity/agent";

export const provideIdentity = async (): Promise<Identity | undefined> => {
    return Secp256k1KeyIdentity.fromSeedPhrase("abc", "012")
}