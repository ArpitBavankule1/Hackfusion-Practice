# SportBand Analytics: Mobile App Prototype

A high-fidelity mobile application prototype designed in Figma for integrating with and displaying real-time and historical fitness data from a sports wearable device.

This repository serves as the central location for the mobile app's design specifications, user flows, and interactive prototype before development begins.

## 🔗 Live Prototype & Design Files

Explore the interactive prototype and view the complete wireframes and design components directly in Figma.

| Resource | Link |
| :--- | :--- |
| **Interactive Prototype** | [https://duty-lab-19244103.figma.site/](https://duty-lab-19244103.figma.site/) |
| **Figma Design File** | (Insert Private Figma File Link Here - for collaborator access) |

## ✨ Key Features & Goals

The application is designed to be a user-friendly hub for all fitness data captured by the connected SportBand wearable.

### 1. Real-Time Tracking (Home/Workout Screen)
* Display of primary metrics (e.g., Heart Rate, Pace) in a large, glanceable format.
* Dynamic, real-time charts for immediate performance feedback.
* Clear controls for starting, pausing, and ending workouts.

### 2. Comprehensive Statistics (Stats Screen)
* Visualization of workout history, including detailed route maps (if GPS enabled).
* In-depth performance analysis (e.g., heart rate zone breakdown, elevation gain).

### 3. User & Device Management (Profile Screen)
* **Personalized Summaries:** Quick view of monthly activity (Workouts, Active Time, Steps).
* **Device Status:** Clear indicator of the connected device's name, connection status, and battery percentage (`SportBand Pro - Connected • 85% battery`).
* Account settings and notification controls.

## 📱 Mobile App Screens Overview

The prototype includes the primary navigation structure and key user flows:

| Screen Name | Purpose | Key Elements |
| :--- | :--- | :--- |
| **Home/Dashboard** | Real-time active workout view. | Primary metric display, 3-4 secondary metric tiles, live graph. |
| **Workout** | Initiating and managing a new session. | Activity selector (Run, Cycle, Gym), start button, countdown. |
| **Stats** | Reviewing historical fitness data. | Calendar view, workout list, detailed session breakdown. |
| **Profile (Shown in Image)** | Account and device settings. | User info card, Monthly Summary, **Connected Devices** status, Settings list. |

## 🛠 Project Setup (For Developers)

If you are a developer looking to implement this design, follow these steps:

1.  **Review the Figma Prototype:** Thoroughly familiarize yourself with the intended look, feel, and interactions using the live prototype link.
2.  **Access Design Specs:** Use the Figma Design File (link above) to extract colors, typography, spacing, and export assets for implementation (e.g., in React Native, Flutter, Swift, or Kotlin).
3.  **Architecture:** The app will require modules for Bluetooth/BLE communication with the wearable, local data storage (SQLite/Realm), and chart rendering libraries (e.g., `react-native-svg`, `MPAndroidChart`).

## 🤝 Contributing

We welcome feedback and contributions to both the design and the eventual code implementation.

1.  **Report Issues:** For design inconsistencies or missing flows, please open an issue in this repository.
2.  **Design Changes:** Contact the design team for access to the core Figma file for modification requests.
3.  **Code Contributions:** Once the repository transitions to a code project, refer to the `CONTRIBUTING.md` file for code style guidelines and pull request instructions.

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
