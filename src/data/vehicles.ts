import { images } from "./images";
import type { TrackedVehicle } from "../types/traffic";

export const trackedVehicles: TrackedVehicle[] = [
{
  plate: "UP32 AB 4521",
  make: "Toyota Innova Crysta",
  description: "SUV • White • Diesel",
  vehicleType: "SUV",
  date: "23 Sep 2026",
  firstSeen: "09:12:34",
  lastSeen: "10:04:18",
  duration: "51 min 44 s",
  distanceKm: 24.3,
  status: "Tracked",
  frameImage: images.innova,
  evidenceBox: { x: 33, y: 30, w: 34, h: 54 },
  sightings: [
  { time: "09:12:34", cameraId: "CAM-01", location: "Alambagh Road", lat: 26.814, lng: 80.902, vehicleType: "Car (SUV)", plateConfidence: 97, vehicleConfidence: 94 },
  { time: "09:18:21", cameraId: "CAM-03", location: "Kanpur Road", lat: 26.823, lng: 80.912, vehicleType: "Car (SUV)", plateConfidence: 94, vehicleConfidence: 95 },
  { time: "09:24:10", cameraId: "CAM-05", location: "Charbagh Crossing", lat: 26.8322, lng: 80.9227, vehicleType: "Car (SUV)", plateConfidence: 96, vehicleConfidence: 93 },
  { time: "09:37:45", cameraId: "CAM-08", location: "Hazratganj – MG Marg", lat: 26.8535, lng: 80.9505, vehicleType: "Car (SUV)", plateConfidence: 93, vehicleConfidence: 92 },
  { time: "09:52:18", cameraId: "CAM-12", location: "Gomti Nagar – Samta Moolak", lat: 26.8605, lng: 80.9885, vehicleType: "Car (SUV)", plateConfidence: 95, vehicleConfidence: 96 },
  { time: "09:58:02", cameraId: "CAM-14", location: "Vibhuti Khand", lat: 26.8645, lng: 81.0035, vehicleType: "Car (SUV)", plateConfidence: 92, vehicleConfidence: 93 },
  { time: "10:01:16", cameraId: "CAM-16", location: "Faizabad Road – Polytechnic", lat: 26.8715, lng: 81.0045, vehicleType: "Car (SUV)", plateConfidence: 94, vehicleConfidence: 95 },
  { time: "10:04:18", cameraId: "CAM-18", location: "Indira Nagar – Tedhi Pulia", lat: 26.8835, lng: 80.9955, vehicleType: "Car (SUV)", plateConfidence: 96, vehicleConfidence: 94 }],

  segments: [
  { via: [[26.8185, 80.9068]], inferred: false },
  { via: [[26.8272, 80.9171]], inferred: false },
  { via: [[26.8385, 80.9295], [26.8452, 80.9372], [26.8505, 80.9452]], inferred: true },
  { via: [[26.8568, 80.9598], [26.8585, 80.9712], [26.8598, 80.9808]], inferred: false },
  { via: [[26.8628, 80.9962]], inferred: false },
  { via: [[26.868, 81.0042]], inferred: false },
  { via: [[26.8772, 81.0012]], inferred: false }]

},
{
  plate: "DL8C XY 9012",
  make: "Maruti Suzuki Dzire",
  description: "Car • Silver • Petrol",
  vehicleType: "Car",
  date: "23 Sep 2026",
  firstSeen: "08:41:05",
  lastSeen: "09:22:14",
  duration: "41 min 09 s",
  distanceKm: 13.8,
  status: "Tracked",
  frameImage: images.charbagh,
  evidenceBox: { x: 58, y: 64, w: 12, h: 18 },
  sightings: [
  { time: "08:41:05", cameraId: "CAM-13", location: "Amausi Airport Road", lat: 26.775, lng: 80.883, vehicleType: "Car", plateConfidence: 91, vehicleConfidence: 93 },
  { time: "08:58:47", cameraId: "CAM-01", location: "Alambagh Road", lat: 26.814, lng: 80.902, vehicleType: "Car", plateConfidence: 95, vehicleConfidence: 94 },
  { time: "09:11:30", cameraId: "CAM-05", location: "Charbagh Crossing", lat: 26.8322, lng: 80.9227, vehicleType: "Car", plateConfidence: 96, vehicleConfidence: 95 },
  { time: "09:22:14", cameraId: "CAM-07", location: "Lalbagh Chauraha", lat: 26.846, lng: 80.939, vehicleType: "Car", plateConfidence: 97, vehicleConfidence: 96 }],

  segments: [
  { via: [[26.7885, 80.8898], [26.8025, 80.8962]], inferred: true },
  { via: [[26.8185, 80.9068], [26.8272, 80.9171]], inferred: false },
  { via: [[26.8385, 80.9295]], inferred: false }]

}];


export const recentSearches = ["UP32 AB 4521", "DL8C XY 9012", "HR26 DA 1187"];