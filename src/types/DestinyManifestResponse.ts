import { DestinyManifest } from "bungie-api-ts/destiny2";

export type DestinyManifestResponse = {
	Response: DestinyManifest;
	ErrorCode: number;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {};
};
