export type Vector3 = [x: number, y: number, z: number];
export type Quaternion = [x: number, y: number, z: number, w: number];
export type Matrix4 = number[];
export type Transform = { position: Vector3; orientation: Quaternion; scale: Vector3; eulerOrientation: Vector3 };
export type AABB = { center: Vector3; min: Vector3; max: Vector3; longestAxisSize: number };

export type LocalTransform = {
    position: Vector3;
    orientation: Quaternion;
    eulerOrientation: Vector3;
    scale: Vector3;
};

export type PointLight = {
    intensity: number;
    isDirectional: boolean;
    isSun: boolean;
    color: number[];
};

export type Label = {
    camera: number[];
};

export type DebugName = {
    value: string;
};

export type ShadowCaster = {
    accumulateShadowCascades: boolean;
    bias: number;
    farDist: number;
    nearDist: number;
    quality: number;
    cascadeMaxZ: number;
    cascadeSplitLambda: number;
};

export type MeshRef = {
    value: string;
};

export type SceneRef = {
    value: string;
};

export type MaterialRef = {
    value: string;
};

export type Environment = {
    skyboxUUID: string;
    radianceUUID: string;
    irradianceUUID: string;
};

export type Camera = {
    dataJSON: {
        showAtmosphere: boolean;
        ambientIntensity: number;
        ssaoEnabled: boolean;
        ssaoBias: number;
        ssaoSampleRadius: number;
        enableBloom: boolean;
        bloomStrength: number;
        bloomThreshold: number;
        enableSharpen: boolean;
        sharpenStrength: number;
        skybox: boolean;
        skyboxCubemapChoice: 0 | 1 | 2;
        transparentGroundPlane: boolean;
        filterSpecular: boolean;
        enableHBAO: boolean;
        selectionOutlines: boolean;
        pointerHighlight: boolean;
        enableGeometryCulling: boolean;
    };
};

export type ComponentMap = {
    local_transform: LocalTransform;
    point_light: PointLight;
    label: Label;
    debug_name: DebugName;
    shadow_caster: ShadowCaster;
    scene_ref: SceneRef;
    mesh_ref: MeshRef;
    material_ref: MaterialRef;
    environment: Environment;
    camera: Camera;
};

export type Entity = {
    getComponent<T extends keyof ComponentMap>(componentName: T): ComponentMap[T] | null;
    setComponent(componentName: keyof ComponentMap, component: object): void;
    getGlobalAABB: () => AABB;
    getGlobalMatrix: () => Matrix4;
    getEUID: () => string;
    focusOn: (viewport: Viewport) => Promise<void>;
    isVisible: () => boolean;
    labelElement: unknown;
    labelIndex: number;
    isAttached: (componentName: keyof ComponentMap) => boolean;
    attachComponent<T extends keyof ComponentMap>(componentName: T, value?: Partial<ComponentMap[T]>): void;
    detachComponent: (componentName: keyof ComponentMap) => void;
    getID: () => string;
    getParent: () => Entity;
    hasChildren: () => boolean;
    getGlobalTransform: () => LocalTransform;
    isExternal: () => boolean;
    components : ComponentMap;
};

export type Viewport = {
    getWorldMatrix: () => Matrix4;
    getProjectionMatrix: () => Matrix4;
    getCamera: () => Entity;
    project: (position: Vector3) => Vector3;
    getProjection: () => { aspectRatio: number; fovy: number; nearPlane: number; farPlane: number };
    getTransform: () => Transform;
    setTransform: (transform: Partial<Transform>, propagateChanges?: boolean) => void;
    smoothLookAt: (
        newTarget: Vector3,
        currentTarget: Vector3,
    ) => Promise<{ newPosition: Vector3; newOrientation: Quaternion }>;
};