# 🌞 Sun Direction and Climate App for Travelers

A beautiful React Native/Expo app that helps travelers track sun position, compass direction, and weather conditions in real-time.

## ✨ Features

- **🌅 Sun Position Tracking**: Shows where the sun is relative to your travel direction
- **🧭 Compass Navigation**: Real-time compass with heading and direction display
- **🌤️ Weather Information**: Current weather conditions and forecasts
- **📍 Location Services**: GPS-based location tracking
- **🎨 Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishnuts90/sun-direction-climate-app.git
   cd sun-direction-climate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**
   - Install Expo Go on your phone
   - Scan the QR code from the terminal
   - Or press 'w' to open in web browser

## 📱 How to Use

1. **Grant Location Permissions**: The app needs location access to show sun position and weather
2. **Point Your Phone**: Hold your phone in the direction you're traveling
3. **View Information**: 
   - Sun position relative to your direction
   - Current compass heading
   - Weather conditions for your location

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **Expo Location** - GPS and location services
- **Lucide React Native** - Beautiful icons
- **Expo Linear Gradient** - Gradient backgrounds

## 📁 Project Structure

```
├── app/                 # Main app screens
│   ├── index.tsx       # Main screen
│   └── _layout.tsx     # App layout
├── components/         # Reusable components
│   ├── SunPositionCard.tsx
│   ├── CompassCard.tsx
│   └── WeatherCard.tsx
├── hooks/             # Custom React hooks
├── constants/         # App constants
└── assets/           # Images and static files
```

## 🌐 Web Deployment

This app can be deployed to GitHub Pages or any web hosting service:

1. **Build for web**
   ```bash
   npx expo export --platform web
   ```

2. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Enable GitHub Pages in repository settings
   - Set source to `/docs` or `/gh-pages` branch

## 📄 License

MIT License - feel free to use this project for your own apps!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ for travelers who want to know where the sun is!

