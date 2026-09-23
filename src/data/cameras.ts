import { images } from "./images";
import type { Camera, OverlayBox } from "../types/traffic";

export const cameras: Camera[] = [
{ id: "CAM-01", location: "Alambagh Road", zone: "South", type: "ANPR", status: "Online", lat: 26.814, lng: 80.902, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 4218, anprToday: 3876, avgOcr: 95.8, violationsToday: 14, uptime: 99.6, latencyMs: 180, image: images.alambagh, addedOn: "12 Jan 2024" },
{ id: "CAM-02", location: "Hazratganj Crossing", zone: "Central", type: "ANPR", status: "Online", lat: 26.8505, lng: 80.946, resolution: "2560×1440", fps: 25, lastActive: "Just now", vehiclesToday: 5874, anprToday: 5412, avgOcr: 96.4, violationsToday: 21, uptime: 99.9, latencyMs: 152, image: images.hazratganj, addedOn: "12 Jan 2024" },
{ id: "CAM-03", location: "Kanpur Road", zone: "South", type: "ANPR", status: "Online", lat: 26.823, lng: 80.912, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 3962, anprToday: 3605, avgOcr: 94.2, violationsToday: 9, uptime: 99.2, latencyMs: 196, image: images.kanpur, addedOn: "18 Jan 2024" },
{ id: "CAM-04", location: "Gomti Nagar – Patrakarpuram", zone: "East", type: "PTZ", status: "Degraded", lat: 26.856, lng: 80.999, resolution: "1920×1080", fps: 12, lastActive: "2 min ago", vehiclesToday: 2710, anprToday: 2188, avgOcr: 88.1, violationsToday: 6, uptime: 94.3, latencyMs: 620, image: images.gomtinagar, addedOn: "02 Feb 2024" },
{ id: "CAM-05", location: "Charbagh Crossing", zone: "Central", type: "ANPR", status: "Online", lat: 26.8322, lng: 80.9227, resolution: "2560×1440", fps: 25, lastActive: "Just now", vehiclesToday: 6120, anprToday: 5588, avgOcr: 95.1, violationsToday: 27, uptime: 99.7, latencyMs: 168, image: images.charbagh, addedOn: "12 Jan 2024" },
{ id: "CAM-06", location: "Indira Nagar – Munshi Pulia", zone: "North", type: "Fixed Bullet", status: "Online", lat: 26.887, lng: 81.002, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 3344, anprToday: 3012, avgOcr: 93.6, violationsToday: 8, uptime: 98.9, latencyMs: 205, image: images.indiranagar, addedOn: "20 Feb 2024" },
{ id: "CAM-07", location: "Lalbagh Chauraha", zone: "Central", type: "ANPR", status: "Online", lat: 26.846, lng: 80.939, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 2986, anprToday: 2740, avgOcr: 94.7, violationsToday: 11, uptime: 99.1, latencyMs: 174, image: images.redlight, addedOn: "12 Jan 2024" },
{ id: "CAM-08", location: "Hazratganj – Mahatma Gandhi Marg", zone: "Central", type: "ANPR", status: "Online", lat: 26.8535, lng: 80.9505, resolution: "2560×1440", fps: 25, lastActive: "Just now", vehiclesToday: 5120, anprToday: 4790, avgOcr: 96.9, violationsToday: 16, uptime: 99.8, latencyMs: 149, image: images.hazratganj, addedOn: "12 Jan 2024" },
{ id: "CAM-09", location: "Aminabad Market Road", zone: "Central", type: "Dome", status: "Offline", lat: 26.847, lng: 80.929, resolution: "1920×1080", fps: 0, lastActive: "Today, 08:42", vehiclesToday: 1104, anprToday: 0, avgOcr: 0, violationsToday: 2, uptime: 81.4, latencyMs: 0, image: images.charbagh, addedOn: "05 Mar 2024" },
{ id: "CAM-10", location: "Kapoorthala Chauraha", zone: "North", type: "ANPR", status: "Online", lat: 26.887, lng: 80.945, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 3478, anprToday: 3180, avgOcr: 94.9, violationsToday: 10, uptime: 99.4, latencyMs: 188, image: images.indiranagar, addedOn: "12 Jan 2024" },
{ id: "CAM-11", location: "Nishatganj Bridge", zone: "Central", type: "Fixed Bullet", status: "Online", lat: 26.868, lng: 80.958, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 2890, anprToday: 2601, avgOcr: 93.8, violationsToday: 7, uptime: 98.7, latencyMs: 214, image: images.gomtinagar, addedOn: "22 Mar 2024" },
{ id: "CAM-12", location: "Gomti Nagar – Samta Moolak", zone: "East", type: "ANPR", status: "Online", lat: 26.8605, lng: 80.9885, resolution: "2560×1440", fps: 25, lastActive: "Just now", vehiclesToday: 4410, anprToday: 4102, avgOcr: 95.5, violationsToday: 12, uptime: 99.5, latencyMs: 171, image: images.gomtinagar, addedOn: "12 Jan 2024" },
{ id: "CAM-13", location: "Amausi Airport Road", zone: "West", type: "ANPR", status: "Degraded", lat: 26.775, lng: 80.883, resolution: "1920×1080", fps: 15, lastActive: "1 min ago", vehiclesToday: 2244, anprToday: 1802, avgOcr: 86.3, violationsToday: 5, uptime: 92.8, latencyMs: 540, image: images.kanpur, addedOn: "10 Apr 2024" },
{ id: "CAM-14", location: "Vibhuti Khand", zone: "East", type: "ANPR", status: "Online", lat: 26.8645, lng: 81.0035, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 3812, anprToday: 3520, avgOcr: 95.0, violationsToday: 9, uptime: 99.3, latencyMs: 182, image: images.gomtinagar, addedOn: "15 Apr 2024" },
{ id: "CAM-15", location: "Shaheed Path – Ansal API", zone: "South", type: "PTZ", status: "Offline", lat: 26.788, lng: 80.98, resolution: "1920×1080", fps: 0, lastActive: "Yesterday, 23:18", vehiclesToday: 0, anprToday: 0, avgOcr: 0, violationsToday: 0, uptime: 64.2, latencyMs: 0, image: images.kanpur, addedOn: "02 May 2024" },
{ id: "CAM-16", location: "Faizabad Road – Polytechnic", zone: "East", type: "ANPR", status: "Online", lat: 26.8715, lng: 81.0045, resolution: "2560×1440", fps: 25, lastActive: "Just now", vehiclesToday: 5310, anprToday: 4944, avgOcr: 96.1, violationsToday: 18, uptime: 99.6, latencyMs: 163, image: images.indiranagar, addedOn: "12 Jan 2024" },
{ id: "CAM-17", location: "Chinhat Tiraha", zone: "East", type: "Fixed Bullet", status: "Degraded", lat: 26.876, lng: 81.04, resolution: "1920×1080", fps: 10, lastActive: "4 min ago", vehiclesToday: 1680, anprToday: 1290, avgOcr: 84.7, violationsToday: 3, uptime: 90.6, latencyMs: 710, image: images.kanpur, addedOn: "08 Sep 2026", recentlyAdded: true },
{ id: "CAM-18", location: "Indira Nagar – Tedhi Pulia", zone: "North", type: "ANPR", status: "Online", lat: 26.8835, lng: 80.9955, resolution: "1920×1080", fps: 25, lastActive: "Just now", vehiclesToday: 3590, anprToday: 3322, avgOcr: 95.3, violationsToday: 8, uptime: 99.0, latencyMs: 190, image: images.indiranagar, addedOn: "14 Sep 2026", recentlyAdded: true }];


/** Demo detection overlays positioned over each feed (percent of frame). */
export const overlays: Record<string, OverlayBox[]> = {
  "CAM-01": [
  { trackId: "T-4102", plate: "UP32 CD 7781", type: "Car", x: 19, y: 73, w: 11, h: 15 },
  { trackId: "T-4107", plate: "UP32 HN 2204", type: "SUV", x: 75, y: 70, w: 12, h: 20 },
  { trackId: "T-4111", plate: "UP32 BZ 0981", type: "Bus", x: 55, y: 41, w: 9, h: 20 }],

  "CAM-02": [
  { trackId: "T-2231", plate: "UP32 FK 6620", type: "Car", x: 30, y: 60, w: 12, h: 18 },
  { trackId: "T-2236", plate: "UP32 LT 1409", type: "SUV", x: 60, y: 55, w: 12, h: 20 }],

  "CAM-03": [
  { trackId: "T-3314", plate: "UP78 GT 4410", type: "Truck", x: 38, y: 45, w: 14, h: 26 },
  { trackId: "T-3319", plate: "UP32 MJ 8812", type: "Car", x: 64, y: 62, w: 11, h: 17 }],

  "CAM-04": [
  { trackId: "T-5520", plate: "UP32 EF 3319", type: "Car", x: 45, y: 58, w: 11, h: 16 }],

  "CAM-05": [
  { trackId: "T-6602", plate: "UP32 AT 5541", type: "Auto", x: 25, y: 60, w: 10, h: 18 },
  { trackId: "T-6608", plate: "DL8C XY 9012", type: "Car", x: 58, y: 64, w: 12, h: 18 },
  { trackId: "T-6611", plate: "UP32 KK 2210", type: "Bike", x: 72, y: 50, w: 6, h: 14 }],

  "CAM-06": [
  { trackId: "T-7710", plate: "UP32 NB 4450", type: "Car", x: 34, y: 51, w: 8, h: 11 },
  { trackId: "T-7714", plate: "UP32 RC 1188", type: "Auto", x: 4, y: 72, w: 10, h: 18 }]

};