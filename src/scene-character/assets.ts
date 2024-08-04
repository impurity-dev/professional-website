import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

export const CANTINA_ASSET: ContainerNodeAsset = { type: 'container', file: 'cantina_2k.glb', directory: 'assets/cantina/' };
export const cantina = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(CANTINA_ASSET);

export const GEORGE_ASSET: ContainerNodeAsset = { type: 'container', file: 'George.gltf', directory: 'assets/robots/' };
export const george = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(GEORGE_ASSET);

export const LEELA_ASSET: ContainerNodeAsset = { type: 'container', file: 'Leela.gltf', directory: 'assets/robots/' };
export const leela = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(LEELA_ASSET);

export const MIKE_ASSET: ContainerNodeAsset = { type: 'container', file: 'Mike.gltf', directory: 'assets/robots/' };
export const mike = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MIKE_ASSET);

export const STAN_ASSET: ContainerNodeAsset = { type: 'container', file: 'Stan.gltf', directory: 'assets/robots/' };
export const stan = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(STAN_ASSET);

//
export const FEMALE_ADVENTURER: ContainerNodeAsset = { type: 'container', file: 'Adventurer.gltf', directory: 'assets/female-characters/' };
export const femaleAdventurer = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_ADVENTURER);

export const FEMALE_CASUAL: ContainerNodeAsset = { type: 'container', file: 'Casual.gltf', directory: 'assets/female-characters/' };
export const femaleCasual = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_CASUAL);

export const FEMALE_FORMAL: ContainerNodeAsset = { type: 'container', file: 'Formal.gltf', directory: 'assets/female-characters/' };
export const femaleFormal = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_FORMAL);

export const FEMALE_MEDIEVAL: ContainerNodeAsset = { type: 'container', file: 'Medieval.gltf', directory: 'assets/female-characters/' };
export const femaleMedieval = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_MEDIEVAL);

export const FEMALE_PUNK: ContainerNodeAsset = { type: 'container', file: 'Punk.gltf', directory: 'assets/female-characters/' };
export const femalePunk = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_PUNK);

export const FEMALE_SCIFI: ContainerNodeAsset = { type: 'container', file: 'SciFi.gltf', directory: 'assets/female-characters/' };
export const femaleSciFi = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_SCIFI);

export const FEMALE_SOLDIER: ContainerNodeAsset = { type: 'container', file: 'Soldier.gltf', directory: 'assets/female-characters/' };
export const femaleSoldier = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_SOLDIER);

export const FEMALE_SUIT: ContainerNodeAsset = { type: 'container', file: 'Suit.gltf', directory: 'assets/female-characters/' };
export const femaleSuit = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_SUIT);

export const FEMALE_WITCH: ContainerNodeAsset = { type: 'container', file: 'Witch.gltf', directory: 'assets/female-characters/' };
export const femaleWitch = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_WITCH);

export const FEMALE_WORKER: ContainerNodeAsset = { type: 'container', file: 'Worker.gltf', directory: 'assets/female-characters/' };
export const femaleWorker = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FEMALE_WORKER);

export const MALE_ADVENTURER: ContainerNodeAsset = { type: 'container', file: 'Adventurer.gltf', directory: 'assets/male-characters/' };
export const maleAdventurer = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_WORKER);

export const MALE_BEACH: ContainerNodeAsset = { type: 'container', file: 'Beach.gltf', directory: 'assets/male-characters/' };
export const maleBeach = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_BEACH);

export const MALE_CASUAL: ContainerNodeAsset = { type: 'container', file: 'Casual_2.gltf', directory: 'assets/male-characters/' };
export const maleCasual = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_CASUAL);

export const MALE_HOODIE: ContainerNodeAsset = { type: 'container', file: 'Casual_Hoodie.gltf', directory: 'assets/male-characters/' };
export const maleHoodie = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_HOODIE);

export const MALE_FARMER: ContainerNodeAsset = { type: 'container', file: 'Farmer.gltf', directory: 'assets/male-characters/' };
export const maleFarmer = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_FARMER);

export const MALE_KING: ContainerNodeAsset = { type: 'container', file: 'King.gltf', directory: 'assets/male-characters/' };
export const maleKing = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_KING);

export const MALE_PUNK: ContainerNodeAsset = { type: 'container', file: 'Punk.gltf', directory: 'assets/male-characters/' };
export const malePunk = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_PUNK);

export const MALE_SPACESUIT: ContainerNodeAsset = { type: 'container', file: 'Spacesuit.gltf', directory: 'assets/male-characters/' };
export const maleSpacesuit = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_SPACESUIT);

export const MALE_SUIT: ContainerNodeAsset = { type: 'container', file: 'Suit.gltf', directory: 'assets/male-characters/' };
export const maleSuit = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_SUIT);

export const MALE_SWAT: ContainerNodeAsset = { type: 'container', file: 'Swat.gltf', directory: 'assets/male-characters/' };
export const maleSwat = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_SWAT);

export const MALE_WORKER: ContainerNodeAsset = { type: 'container', file: 'Worker.gltf', directory: 'assets/male-characters/' };
export const maleWorker = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(MALE_WORKER);
