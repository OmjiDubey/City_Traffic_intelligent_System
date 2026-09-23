# City Traffic Intelligence System --- MagicPattern Frontend Prompt

## 1. Project Objective

Design and build the frontend UI for a professional **City Traffic
Intelligence System** focused on:

-   ANPR (Automatic Number Plate Recognition)
-   Vehicle detection
-   Multi-camera vehicle tracking
-   Cross-camera trajectory reconstruction
-   Traffic analytics
-   Violation detection
-   Real-time alerts
-   Camera monitoring and health

This is a **government/enterprise-style traffic management platform**,
not a consumer app and not a futuristic AI showcase.

The frontend should look like a system that could realistically be used
by a city traffic control room, transport authority, or government
operations team.

The UI should prioritize:

**clarity → operational usability → information hierarchy → reliability
→ clean visual design**

Do not make the interface look overly futuristic, cyberpunk, neon, or
AI-generated.

------------------------------------------------------------------------

# 2. Overall Design Direction

## Theme

-   Light theme only
-   Professional government/enterprise dashboard
-   Clean and restrained
-   Data-dense but highly readable
-   Desktop-first control-room experience
-   Responsive for tablet and smaller screens
-   Strong visual hierarchy
-   Minimal decorative elements

Use the previously approved light-themed dashboard as the primary visual
reference.

The overall visual language should resemble a modern
government/enterprise operations platform rather than a startup SaaS
dashboard.

Avoid:

-   Dark mode
-   Neon colors
-   Excessive gradients
-   Glowing effects
-   Glassmorphism
-   Excessive rounded cards
-   Oversized illustrations
-   Decorative AI graphics
-   Excessive animations
-   Fake 3D elements
-   Excessive shadows

Use subtle borders, moderate corner radius, restrained shadows, and
clean spacing.

------------------------------------------------------------------------

# 3. Final Color Palette

Use this palette consistently throughout the entire application.

  Purpose           Hex
  ----------------- -----------
  Primary Navy      `#123B6D`
  Primary Blue      `#1976D2`
  Light Blue        `#E8F2FC`
  Background        `#F7F9FC`
  Surface / Cards   `#FFFFFF`
  Border            `#D9E2EC`
  Primary Text      `#172B4D`
  Secondary Text    `#5B6B7F`
  Success           `#16A34A`
  Warning           `#F59E0B`
  Danger            `#DC2626`
  Info              `#0284C7`

### Color usage rules

-   Deep navy: navigation, headings, strong text, branding
-   Primary blue: active navigation, primary buttons, selected states,
    links
-   Light blue: selected backgrounds, subtle information panels
-   White: cards and primary content surfaces
-   Very light gray: overall page background
-   Green: online, healthy, verified, resolved, normal
-   Amber: warning, moderate congestion, degraded status
-   Red: critical alerts, violations, offline/critical states
-   Blue/cyan: informational states

Do not use red, amber, or green as decorative colors. They must have
semantic meaning.

------------------------------------------------------------------------

# 4. Application Structure

Create a consistent application shell across all pages.

## Left Sidebar

Navigation:

1.  Dashboard
2.  Live Monitoring
3.  Traffic Analytics
4.  Vehicle Tracking
5.  Violations
6.  Alerts
7.  Cameras

Below a divider:

-   Settings
-   Logout

The active navigation item should use the primary blue with a subtle
light-blue active background.

Use simple professional icons.

## Top Header

Include:

-   Search
-   System operational status
-   Notifications
-   User/avatar
-   User name
-   Dropdown indicator

The global search can visually support searching cameras, locations, or
plate numbers, but **vehicle-specific route searching belongs inside
Vehicle Tracking**.

------------------------------------------------------------------------

# 5. Dashboard

Use the previously approved dashboard design as the baseline.

Purpose:

> Give the operator a quick overview of what is happening across the
> traffic network.

## Header

-   Page title / welcome
-   Current date/time
-   System status

## KPI Cards

Five cards:

1.  Total Vehicles
2.  Active Cameras
3.  Violations Today
4.  Congestion Points
5.  Active Alerts

Each card should have:

-   Small icon
-   Label
-   Main value
-   Small comparison/trend
-   Optional semantic indicator

Keep cards compact and professional.

## Main Dashboard Content

### Live Camera Feeds

Show a 2x3 grid of six camera previews.

Each preview should include:

-   Camera ID
-   Location
-   LIVE status
-   Traffic image/video
-   Small vehicle count
-   Camera health

Use realistic Indian urban traffic footage for the demo.

### Traffic Volume

24-hour traffic-volume chart.

Use blue as the dominant chart color.

### Congestion Trend

24-hour congestion trend.

Use restrained semantic colors:

-   Green = normal
-   Amber = moderate
-   Red = heavy

### Recent Violations

Compact table showing:

-   Time
-   Plate number
-   Violation type
-   Camera
-   Status

### Active Alerts

Compact table showing:

-   Time
-   Alert type
-   Location
-   Severity
-   Status

Do not overload the Dashboard with every possible metric.

------------------------------------------------------------------------

# 6. Live Monitoring

Purpose:

> Show what the traffic cameras are seeing right now.

This is an operational camera/video page.

## Important

Do NOT put vehicle search on this page.

Vehicle search belongs exclusively to **Vehicle Tracking**.

## Top Controls

Include:

-   Camera selector
-   Location / zone filter
-   Camera status
-   Vehicle type
-   Live status indicator

Do not include a plate-number search here.

## Main Camera Workspace

Create a 2x3 camera grid on desktop.

Each camera card should contain:

-   Camera ID
-   Location
-   LIVE / WARNING / OFFLINE status
-   Actual demo video stream or looping demo CCTV footage
-   Vehicle bounding boxes
-   License plate overlays
-   Vehicle tracking IDs
-   Vehicle count
-   FPS
-   Timestamp
-   Connection status

The camera feeds should look like real traffic-camera footage.

Use realistic Indian urban traffic scenes.

## Camera Detail Panel

Clicking a camera should open/expand a detailed view.

Show:

-   Larger live video
-   Current vehicle count
-   FPS
-   Connection quality
-   Recent detections
-   Camera information
-   Detection confidence

## Recent Detections

Compact live-updating table:

-   Time
-   Plate number
-   Vehicle type
-   Confidence
-   Evidence thumbnail

The page should be video-first.

Do not add a large analytics section or large map to this page.

------------------------------------------------------------------------

# 7. Traffic Analytics

Purpose:

> Understand traffic volume, movement conditions, congestion, and
> deviations from normal patterns.

This page should be chart/data focused rather than video focused.

## Summary Cards

Include:

-   Total Traffic Volume
-   Average Speed
-   Average Travel Time
-   Congested Locations
-   Change vs Historical Baseline

## Traffic Volume

Large interactive chart with:

-   Hourly traffic
-   Date selector
-   Camera/location filter
-   Today
-   Yesterday
-   Last 7 days
-   Custom range

## Congestion Analysis

Show a ranked table/list containing:

-   Location
-   Congestion level
-   Duration
-   Current status

## Usual vs Unusual Congestion

Make this a prominent analytical component.

Compare:

-   Expected traffic
-   Current traffic
-   Historical baseline
-   Deviation percentage

Allow comparison by:

-   Location
-   Day
-   Time

Example:

Expected: 820 vehicles/hour Current: 1,240 vehicles/hour Deviation: +51%

Use amber/red only when the deviation is operationally significant.

## Traffic Flow

Include:

-   Vehicle type distribution
-   Hourly traffic
-   Camera-wise traffic
-   Directional flow where applicable

## Historical Trends

Allow:

-   Today vs historical average
-   This week vs previous week

Do not overload the page with ANPR plate-level information.

------------------------------------------------------------------------

# 8. Vehicle Tracking

This is one of the **most important pages in the platform**.

ANPR and vehicle tracking are core capabilities.

Purpose:

> Search for a specific vehicle using its license plate and reconstruct
> its journey across multiple cameras.

## Critical behavior

The system may track many vehicles in the backend, but the route
visualization should only be displayed when the operator **manually
searches for a specific vehicle**.

Do not show every vehicle route continuously.

## Vehicle Search

Create a prominent dedicated search section.

Fields:

-   License Plate Number
-   Date Range
-   Time Range
-   Search
-   Reset

Example:

UP32 AB 4521

Do not hide this workflow.

## Vehicle Summary

After a successful search, show:

-   License plate
-   Vehicle type
-   First seen
-   Last seen
-   Total detections
-   Cameras visited
-   Journey duration
-   Estimated total distance
-   Tracking status

## Route Map

The route map is a **primary component**, not an optional detail.

Use a real interactive map for the demo.

Recommended map behavior:

-   Real road network
-   Camera locations
-   Detection points
-   Start point
-   End point
-   Ordered camera markers
-   Route line
-   Direction of travel
-   Timestamp at relevant detection points
-   Zoom controls
-   Pan controls
-   Legend

Use a real map library such as **Leaflet or MapLibre** and an
appropriate public map tile/source for demo purposes.

Do not draw a fake abstract map when an actual map can be used.

The route should visually stand out from the normal road network.

### Observed vs Inferred Route

If the implementation supports the distinction:

-   Solid line = observed/reconstructed route
-   Dashed line = inferred segment between camera observations

Label this clearly.

Do not imply that every road segment was directly observed by a camera.

## Detection Timeline

Show chronological camera sightings:

-   Timestamp
-   Camera ID
-   Location
-   Vehicle type
-   Plate confidence
-   Evidence thumbnail

Clicking a detection should highlight the corresponding point on the
map.

## Detection Evidence

For the selected detection, show:

-   Original camera frame
-   Vehicle crop
-   License plate crop
-   OCR result
-   OCR confidence
-   Vehicle confidence
-   Camera ID
-   Location
-   Timestamp

This page should visually emphasize:

**Search → Vehicle Details → Actual Route → Detection Timeline →
Evidence**

------------------------------------------------------------------------

# 9. Violations

Purpose:

> Review detected traffic violations and the evidence supporting them.

This should be a verification/review interface.

## Summary Cards

-   Total Violations
-   Pending Review
-   Verified
-   Today
-   Most Common Violation

## Filters

Include:

-   Date/time
-   Violation type
-   Camera/location
-   Status
-   License plate
-   Confidence

## Main Table

Columns:

-   Time
-   Plate
-   Violation
-   Location
-   Camera
-   Confidence
-   Status
-   Action

Example violation types:

-   Red-light violation
-   Wrong-way movement
-   Illegal stopping/parking
-   Lane violation
-   Speed-related violation where technically supported

## Violation Details

Clicking a violation opens a detail panel.

Show:

### Evidence

-   Original camera frame
-   Vehicle bounding box
-   License plate
-   Relevant violation area

### Details

-   Plate number
-   Violation type
-   Camera
-   Location
-   Timestamp
-   Detection confidence
-   Violation confidence

### Review

Provide:

-   Pending
-   Verified
-   Rejected

Use clear but restrained status badges.

------------------------------------------------------------------------

# 10. Alerts

Purpose:

> Show what requires attention now and what operational events occurred
> recently.

Alerts are broader than violations.

## Summary Cards

-   Active Alerts
-   Critical
-   High Priority
-   Resolved Today
-   Unusual Events

## Active Alerts

Main table:

-   Time
-   Alert
-   Location
-   Severity
-   Status
-   Action

Potential alert types:

-   Unusual congestion
-   Sudden traffic increase/decrease
-   Camera offline/degraded
-   Wrong-way movement
-   Stalled vehicle
-   Repeated violations
-   Unusual traffic pattern
-   System-generated events

## Alert Details

Show:

-   Alert type
-   Severity
-   Timestamp
-   Location
-   Camera/source
-   Description
-   Trigger condition

Related evidence:

-   Camera frame/video
-   Vehicle/plate when applicable
-   Traffic metrics for congestion alerts

Actions:

-   Acknowledge
-   Mark resolved
-   View source
-   View related vehicle/violation

## Alert History

Include resolved alerts below the active section.

Use:

-   Red = critical
-   Amber = warning/high
-   Blue = informational
-   Green = resolved

Do not turn the entire page red because alerts exist.

------------------------------------------------------------------------

# 11. Cameras

Purpose:

> Manage the camera inventory and monitor camera health.

This page must be distinct from Live Monitoring.

### Live Monitoring

"What are cameras seeing?"

### Cameras

"What cameras exist and are they functioning correctly?"

## Summary

-   Total Cameras
-   Online
-   Offline
-   Degraded
-   Recently Added

## Search & Filters

-   Search camera/location
-   Status
-   Zone
-   Camera type

## Camera Inventory

Table columns:

-   Camera ID
-   Location
-   Zone
-   Status
-   Last Active
-   Vehicles Today
-   Action

## Camera Details

Selecting a camera should show:

### Camera information

-   Camera ID
-   Location
-   Zone
-   Camera type
-   Resolution
-   FPS
-   Last connection

### Performance

-   Vehicles detected today
-   ANPR detections
-   Average OCR confidence
-   Violations detected
-   Uptime
-   Processing latency

### Preview

Small live/current feed.

The "View" action can take the operator to the selected camera in Live
Monitoring.

Do not duplicate the six-camera grid here.

------------------------------------------------------------------------

# 12. Demo Data & Visual Assets

This frontend is a UI prototype/demo, so use realistic demonstration
data.

## Traffic Data

Use realistic Indian examples:

-   Indian license plates such as:
    -   UP32 AB 4521
    -   DL8C XY 9012
    -   UP32 CD 7781
    -   HR26 DA 1187
    -   UP16 EE 3201
-   Indian vehicle types:
    -   Car
    -   SUV
    -   Bike
    -   Auto
    -   Bus
    -   Truck
-   Indian urban locations and roads.
-   Use realistic traffic volumes, timestamps, confidence scores, camera
    IDs, and violation records.

Do not use obviously fake values such as "ABC-123" when realistic Indian
plate examples can be used.

## Video Streams

The demo should include **actual video elements or realistic looping
demo CCTV footage**, not static boxes pretending to be video.

Requirements:

-   Multiple camera feeds
-   Traffic footage
-   Indian urban traffic where possible
-   Looping playback for demo purposes
-   LIVE indicators
-   Timestamp overlays
-   Detection overlays layered over the video

If external demo streams are used, implement graceful fallback if the
source is unavailable.

If the project contains local demo video assets, prefer those over
unreliable external streams.

Do not make the frontend dependent on one external stream being
permanently available.

## Maps

The Vehicle Tracking page must contain a functional map.

Use:

-   Leaflet or MapLibre
-   Real map tiles suitable for a demo
-   Realistic Indian city/road context
-   Camera markers
-   Route polyline
-   Start/end markers
-   Detection points
-   Zoom and pan

Do not use a manually drawn fake map.

------------------------------------------------------------------------

# 13. Interactions

The prototype should feel like a functioning application even if backend
APIs are not connected.

Implement local/demo state for:

-   Sidebar navigation
-   Filters
-   Search
-   Camera selection
-   Camera detail expansion
-   Vehicle search
-   Route display after vehicle search
-   Detection selection
-   Violation detail
-   Alert detail
-   Alert status changes
-   Table sorting/filtering where appropriate
-   Date/time controls
-   Tabs where used
-   Map interaction
-   Live/paused camera behavior where practical

Avoid implementing fake functionality that cannot actually work.

If a feature cannot be implemented fully in the prototype, provide a
clear UI state rather than pretending it is functional.

------------------------------------------------------------------------

# 14. Responsive Behavior

Desktop is the primary target because this is an operations/control-room
application.

Still support:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

On smaller screens:

-   Collapse sidebar into a menu
-   Stack cards
-   Convert large tables into responsive layouts
-   Stack camera feeds
-   Keep critical controls accessible
-   Allow local horizontal scrolling for wide data tables where
    necessary
-   Keep maps usable
-   Do not allow page-level horizontal overflow

The desktop layout should remain the reference design.

------------------------------------------------------------------------

# 15. Typography & Components

Use a modern, highly readable sans-serif font.

Recommended characteristics:

-   Clear numerals
-   Strong table readability
-   Professional government/enterprise appearance
-   No decorative fonts

Use consistent:

-   Button styles
-   Input styles
-   Table styles
-   Status badges
-   Card spacing
-   Border radius
-   Icon sizes
-   Typography hierarchy

Avoid excessive pill-shaped UI.

Use rounded shapes primarily for:

-   Status badges
-   Small controls
-   Buttons where appropriate

Cards should use moderate corner radius rather than highly rounded
containers.

------------------------------------------------------------------------

# 16. Data Visualization

Charts should be:

-   Clean
-   Readable
-   Mostly blue
-   Minimal gridlines
-   Clearly labeled
-   Interactive where useful
-   Free of unnecessary 3D effects

Use semantic colors only where they communicate status:

-   Green = normal
-   Amber = warning/moderate
-   Red = critical/heavy
-   Blue = primary/information

Do not use rainbow palettes.

------------------------------------------------------------------------

# 17. Loading, Empty & Error States

Every major page should have sensible states.

Examples:

### Loading

Use subtle skeletons/spinners without changing the page layout.

### No vehicle found

Display:

"No matching vehicle found for the selected plate number and time
range."

Provide an option to modify the search.

### Camera unavailable

Display:

"Camera offline"

with last-seen timestamp.

### No alerts

Display:

"No active alerts."

### No violations

Display:

"No violations found for the selected filters."

These should look like professional system states, not generic template
placeholders.

------------------------------------------------------------------------

# 18. Accessibility & Usability

Prioritize:

-   Good color contrast
-   Readable font sizes
-   Visible focus states
-   Keyboard navigation
-   Clear labels
-   Tooltips where icons alone are ambiguous
-   Avoid relying only on color to communicate status

Every important action should be understandable without relying on
animation.

------------------------------------------------------------------------

# 19. Overall UX Rules

The application should feel like a real operational platform.

Prioritize:

1.  Information hierarchy
2.  Fast scanning
3.  Clear status
4.  Minimal clicks for important workflows
5.  Consistency
6.  Professional visual language
7.  Reliable-looking data presentation

The most important workflows are:

### Live traffic monitoring

Dashboard → Live Monitoring → Camera → Detection

### Vehicle investigation

Vehicle Tracking → Plate Search → Vehicle Details → Route Map → Camera
Sightings → Evidence

### Violation review

Violations → Filter/Search → Violation → Evidence → Review

### Traffic intelligence

Traffic Analytics → Traffic Volume → Congestion → Historical Baseline →
Unusual Condition

### Alert handling

Alerts → Active Alert → Evidence/Source → Acknowledge → Resolve

------------------------------------------------------------------------

# 20. What NOT to Build

Do not add unnecessary pages or features.

Do not create:

-   OD Analytics page
-   Separate Traffic Map page
-   Complex administration system
-   User-management dashboard
-   Messaging system
-   Chatbot
-   AI assistant
-   Dark mode
-   Cryptocurrency/blockchain elements
-   Excessive AI visualizations
-   Futuristic holographic UI
-   Microservice-related UI concepts
-   Complex settings unless required for the demo

The current core navigation is exactly:

**Dashboard\
Live Monitoring\
Traffic Analytics\
Vehicle Tracking\
Violations\
Alerts\
Cameras\
Settings\
Logout**

------------------------------------------------------------------------

# 21. Final Visual Reference

The approved visual reference is the previously generated light-themed
traffic management dashboard.

Match its overall characteristics:

-   White/light-gray application background
-   Deep navy sidebar and headings
-   Primary blue active navigation
-   White cards
-   Thin light borders
-   Subtle shadows
-   Blue charts
-   Restrained semantic status colors
-   Professional Indian government/enterprise aesthetic
-   Clean CCTV/video presentation
-   Practical tables
-   Strong typography
-   No visual clutter

The final result should look like a **real City Traffic Operations /
Intelligent Traffic Management System**, not an AI-generated concept
dashboard.

Build the frontend as a coherent single product. Do not make each page
look like a separate template.

Maintain the same design system, spacing, typography, colors, component
patterns, navigation, and interaction language across every page.
