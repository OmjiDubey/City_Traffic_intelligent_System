const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

const todayVolume = [310, 240, 190, 170, 230, 520, 980, 1480, 1720, 1650, 1380, 1290, 1340, 1310, 1360, 1490, 1690, 1810, 1740, 1420, 1090, 820, 590, 420];
const yesterdayVolume = [290, 230, 180, 160, 220, 500, 940, 1420, 1650, 1590, 1340, 1270, 1300, 1280, 1330, 1450, 1640, 1760, 1700, 1390, 1060, 800, 570, 400];
const baselineVolume = [300, 235, 185, 165, 225, 510, 950, 1400, 1560, 1480, 1300, 1250, 1290, 1270, 1320, 1430, 1600, 1720, 1660, 1370, 1050, 790, 560, 405];

export const hourlyVolume = hours.map((hour, i) => ({
  hour,
  today: todayVolume[i],
  yesterday: yesterdayVolume[i],
  baseline: baselineVolume[i]
}));

/** Congestion index (0–100) over the last 24 hours. */
const congestionIndex = [18, 14, 12, 11, 15, 26, 44, 62, 78, 74, 58, 52, 54, 55, 57, 64, 76, 84, 81, 66, 48, 34, 24, 20];
export const congestionTrend = hours.map((hour, i) => ({ hour, value: congestionIndex[i] }));

export const dailyVolume = [
{ day: "Wed 17", total: 44120, baseline: 43800 },
{ day: "Thu 18", total: 45210, baseline: 44100 },
{ day: "Fri 19", total: 47890, baseline: 46200 },
{ day: "Sat 20", total: 41230, baseline: 40900 },
{ day: "Sun 21", total: 35680, baseline: 36100 },
{ day: "Mon 22", total: 46910, baseline: 45300 },
{ day: "Tue 23", total: 48320, baseline: 44700 }];


export const weekComparison = [
{ day: "Mon", thisWeek: 46910, lastWeek: 45120 },
{ day: "Tue", thisWeek: 48320, lastWeek: 44980 },
{ day: "Wed", thisWeek: 0, lastWeek: 44120 },
{ day: "Thu", thisWeek: 0, lastWeek: 45210 },
{ day: "Fri", thisWeek: 0, lastWeek: 47890 },
{ day: "Sat", thisWeek: 0, lastWeek: 41230 },
{ day: "Sun", thisWeek: 0, lastWeek: 35680 }];


export const congestionRanking = [
{ location: "Hazratganj Crossing", level: 86, duration: "48 min", status: "Heavy" },
{ location: "Charbagh Crossing", level: 78, duration: "35 min", status: "Heavy" },
{ location: "Kanpur Road", level: 64, duration: "22 min", status: "Moderate" },
{ location: "Lalbagh Chauraha", level: 58, duration: "18 min", status: "Moderate" },
{ location: "Faizabad Road – Polytechnic", level: 52, duration: "12 min", status: "Moderate" },
{ location: "Alambagh Road", level: 34, duration: "—", status: "Normal" },
{ location: "Kapoorthala Chauraha", level: 29, duration: "—", status: "Normal" }] as
const;

/** Expected vs current per location for the "usual vs unusual" comparison (vehicles/hour at 09:00). */
export const deviationByLocation = [
{ location: "Hazratganj Crossing", expected: 820, current: 1240, baseline: 845 },
{ location: "Charbagh Crossing", expected: 1170, current: 1580, baseline: 1150 },
{ location: "Kanpur Road", expected: 960, current: 1080, baseline: 940 },
{ location: "Lalbagh Chauraha", expected: 640, current: 690, baseline: 655 },
{ location: "Alambagh Road", expected: 880, current: 910, baseline: 870 },
{ location: "Faizabad Road – Polytechnic", expected: 1020, current: 980, baseline: 1005 },
{ location: "Kapoorthala Chauraha", expected: 710, current: 540, baseline: 700 }];


/** Hour-of-day expected profile multipliers used to derive the deviation chart. */
export const deviationProfile = [0.2, 0.15, 0.12, 0.11, 0.15, 0.34, 0.62, 0.9, 1, 0.95, 0.83, 0.8, 0.82, 0.81, 0.84, 0.92, 1.03, 1.1, 1.06, 0.88, 0.67, 0.5, 0.36, 0.26];
/** Observed/expected ratio for today by hour at the anomaly location. */
export const deviationRatioToday = [1.02, 0.98, 1.01, 0.99, 1.03, 1.05, 1.08, 1.22, 1.51, 1.44, 1.2, 1.08, 1.04, 1.02, 1.0, 1.03, 1.05, 1.02, 1.01, 0.99, 1.0, 0.98, 1.0, 1.01];

export const dayOptions = ["Today (Tue)", "Mon", "Sun", "Sat", "Fri"];
export const dayRatioScale: Record<string, number> = { "Today (Tue)": 1, Mon: 0.55, Sun: 0.2, Sat: 0.3, Fri: 0.7 };

export const vehicleMix = [
{ type: "Bike", share: 38, count: 18360 },
{ type: "Car", share: 27, count: 13050 },
{ type: "Auto", share: 14, count: 6760 },
{ type: "SUV", share: 11, count: 5320 },
{ type: "Bus", share: 5, count: 2420 },
{ type: "Truck", share: 5, count: 2410 }];


export const directionalFlow = [
{ corridor: "Hazratganj – MG Marg", nb: 1240, sb: 890, peakDir: "Eastbound" },
{ corridor: "Charbagh – Station Rd", nb: 1580, sb: 1320, peakDir: "Northbound" },
{ corridor: "Kanpur Road", nb: 980, sb: 1080, peakDir: "Southbound" },
{ corridor: "Faizabad Road", nb: 1020, sb: 760, peakDir: "Westbound" }];


export const locationShare: Record<string, number> = {
  "All locations": 1,
  "Hazratganj Crossing": 0.12,
  "Charbagh Crossing": 0.13,
  "Kanpur Road": 0.08,
  "Alambagh Road": 0.09,
  "Faizabad Road – Polytechnic": 0.11,
  "Gomti Nagar – Samta Moolak": 0.09
};