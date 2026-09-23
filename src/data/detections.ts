import type { LiveDetection } from "../types/traffic";

/** Seed rows shown in the live detections table; new rows are drawn from `detectionPool`. */
export const initialDetections: LiveDetection[] = [
{ id: "D-1", time: "09:24:08", plate: "UP32 CD 7781", vehicleType: "Car", confidence: 97, cameraId: "CAM-01" },
{ id: "D-2", time: "09:24:03", plate: "DL8C XY 9012", vehicleType: "Car", confidence: 95, cameraId: "CAM-05" },
{ id: "D-3", time: "09:23:57", plate: "UP32 AT 5541", vehicleType: "Auto", confidence: 88, cameraId: "CAM-05" },
{ id: "D-4", time: "09:23:51", plate: "UP78 GT 4410", vehicleType: "Truck", confidence: 93, cameraId: "CAM-03" },
{ id: "D-5", time: "09:23:44", plate: "UP32 LT 1409", vehicleType: "SUV", confidence: 96, cameraId: "CAM-02" },
{ id: "D-6", time: "09:23:38", plate: "UP32 NB 4450", vehicleType: "Car", confidence: 91, cameraId: "CAM-06" }];


export const detectionPool: Omit<LiveDetection, "id" | "time">[] = [
{ plate: "UP32 HN 2204", vehicleType: "SUV", confidence: 96, cameraId: "CAM-01" },
{ plate: "UP32 FK 6620", vehicleType: "Car", confidence: 94, cameraId: "CAM-02" },
{ plate: "UP32 MJ 8812", vehicleType: "Car", confidence: 92, cameraId: "CAM-03" },
{ plate: "UP32 KK 2210", vehicleType: "Bike", confidence: 86, cameraId: "CAM-05" },
{ plate: "HR26 DA 1187", vehicleType: "SUV", confidence: 95, cameraId: "CAM-03" },
{ plate: "UP32 BZ 0981", vehicleType: "Bus", confidence: 90, cameraId: "CAM-01" },
{ plate: "UP32 RC 1188", vehicleType: "Auto", confidence: 87, cameraId: "CAM-06" },
{ plate: "UP16 EE 3201", vehicleType: "Car", confidence: 93, cameraId: "CAM-02" },
{ plate: "UP32 EF 3319", vehicleType: "Car", confidence: 84, cameraId: "CAM-04" }];