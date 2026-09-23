export type CameraStatus = "Online" | "Degraded" | "Offline";
export type VehicleType = "Car" | "SUV" | "Bike" | "Auto" | "Bus" | "Truck";
export type Zone = "Central" | "North" | "South" | "East" | "West";

export interface Camera {
  id: string;
  location: string;
  zone: Zone;
  type: "ANPR" | "PTZ" | "Fixed Bullet" | "Dome";
  status: CameraStatus;
  lat: number;
  lng: number;
  resolution: string;
  fps: number;
  lastActive: string;
  vehiclesToday: number;
  anprToday: number;
  avgOcr: number;
  violationsToday: number;
  uptime: number;
  latencyMs: number;
  image: string;
  addedOn: string;
  recentlyAdded?: boolean;
  videoSrc?: string;
}

export interface OverlayBox {
  trackId: string;
  plate: string;
  type: VehicleType;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ViolationStatus = "Pending" | "Verified" | "Rejected";
export type ViolationType =
"Red-light violation" |
"Wrong-way movement" |
"Illegal parking" |
"Lane violation" |
"Over-speeding";

export interface Violation {
  id: string;
  date: string;
  time: string;
  plate: string;
  type: ViolationType;
  location: string;
  cameraId: string;
  vehicleType: VehicleType;
  detectionConfidence: number;
  confidence: number;
  status: ViolationStatus;
  image: string;
  box: {x: number;y: number;w: number;h: number;};
  zoneArea: {x: number;y: number;w: number;h: number;};
}

export type AlertSeverity = "Critical" | "High" | "Medium" | "Info";
export type AlertStatus = "Open" | "Acknowledged" | "Resolved";

export interface TrafficAlert {
  id: string;
  time: string;
  type: string;
  location: string;
  source: string;
  severity: AlertSeverity;
  status: AlertStatus;
  description: string;
  trigger: string;
  unusual?: boolean;
  plate?: string;
  violationId?: string;
  metrics?: {label: string;value: string;}[];
  resolvedAt?: string;
}

export interface Sighting {
  time: string;
  cameraId: string;
  location: string;
  lat: number;
  lng: number;
  vehicleType: string;
  plateConfidence: number;
  vehicleConfidence: number;
}

export interface TrackedVehicle {
  plate: string;
  make: string;
  description: string;
  vehicleType: VehicleType;
  date: string;
  firstSeen: string;
  lastSeen: string;
  duration: string;
  distanceKm: number;
  status: "Tracked" | "Lost";
  frameImage: string;
  /** Vehicle bounding box within the evidence frame (percent). */
  evidenceBox: {x: number;y: number;w: number;h: number;};
  sightings: Sighting[];
  /** Path points between sighting i and i+1 (exclusive of endpoints). */
  segments: {via: [number, number][];inferred: boolean;}[];
}

export interface LiveDetection {
  id: string;
  time: string;
  plate: string;
  vehicleType: VehicleType;
  confidence: number;
  cameraId: string;
}