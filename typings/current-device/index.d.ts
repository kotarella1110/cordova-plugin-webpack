declare global {
  interface Window {
    device: CurrentDevice;
  }
}

interface CurrentDevice {
  // Device
  mobile: () => boolean;
  tablet: () => boolean;
  desktop: () => boolean;
  ios: () => boolean;
  ipad: () => boolean;
  iphone: () => boolean;
  ipod: () => boolean;
  android: () => boolean;
  androidPhone: () => boolean;
  androidTablet: () => boolean;
  blackberry: () => boolean;
  blackberryPhone: () => boolean;
  blackberryTablet: () => boolean;
  windows: () => boolean;
  windowsPhone: () => boolean;
  windowsTablet: () => boolean;
  fxos: () => boolean;
  fxosPhone: () => boolean;
  fxosTablet: () => boolean;
  meego: () => boolean;
  television: () => boolean;

  // Orientation
  landscape: () => boolean;
  portrait: () => boolean;
  onChangeOrientation: (
    callback: (newOrientation: DeviceOrientation) => void,
  ) => void;

  // Utility
  noConflict: () => CurrentDevice;

  // Properties
  type: DeviceType;
  orientation: DeviceOrientation;
  os: DeviceOs;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';
export type DeviceOrientation = 'landscape' | 'portrait' | 'unknown';
export type DeviceOs =
  | 'ios'
  | 'iphone'
  | 'ipad'
  | 'ipod'
  | 'android'
  | 'blackberry'
  | 'windows'
  | 'fxos'
  | 'meego'
  | 'television'
  | 'unknown';

declare const device: CurrentDevice;
export default device;
