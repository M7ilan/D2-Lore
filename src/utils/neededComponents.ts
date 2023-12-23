import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

const neededComponents: (keyof AllDestinyManifestComponents)[] = [
"DestinyPresentationNodeDefinition",
"DestinyRecordDefinition",
"DestinyLoreDefinition",
"DestinyInventoryItemDefinition",
"DestinyCollectibleDefinition"
];
export default neededComponents;
