import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

export const SPACECOLONY_ASSET: ContainerNodeAsset = { type: 'container', file: 'space_colony_modular_kit_bash_4k.glb', directory: 'assets/space-colony/' };
export const spacecolony = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(SPACECOLONY_ASSET);
