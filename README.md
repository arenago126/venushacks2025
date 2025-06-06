Get started
Zero Bound Frontend

Zero Bound is a mobile application that helps students understand their college financial outlook by estimating unmet need, calculating monthly loan payments, and visualizing affordability. This is the **frontend** of the project, built with React Native and Expo Router.


To access our backend repository: https://github.com/meeraphadnis/vh_backend.git 


---

## 📱 Features

- Upload financial documents (e.g., award letters as PDFs)
- Manually enter:
  - Income & expenses
  - Scholarships & grants
- Calculate:
  - Cost of attendance vs gift aid
  - Unmet need (loan principal)
  - 10-year loan monthly repayment schedule
  - Affordability percentage based on income
- View financial summary in a clean dashboard UI

---

## 🧱 Tech Stack

- **React Native** (with Expo)
- **Expo Router** for navigation
- **TypeScript** for static typing
- **SVG charts** for visualizing payments (planned)
- **PDF parsing** (integrated with backend)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zero-bound-frontend.git
cd zero-bound-frontend

2. Install Dependencies
npm install
# or
yarn install

3. Start the App
npx expo start
Scan the QR code with the Expo Go app (Android/iOS) or run on an emulator.

📂 Project Structure

├── app/
│   ├── my_finances.tsx         # Input screen (manual entry + PDF upload)
│   ├── calculator.tsx          # Calculation + navigation logic
│   ├── layout.tsx              # Navigation tab
│   ├── index.tsx               # Dashboard page
│   ├── dashboard.tsx           # Final summary view with payment plan

├── components/
│   ├── ThemedText.tsx          # Custom styled text wrapper
│   ├── (other reusable UI components)
├── assets/                     # Images, icons, etc.
├── styles/                     # Shared styles (if extracted)
├── App.tsx                     # Entry point
├── README.md
🔧 Configuration Notes
Environment variables (e.g., for backend URL) can be managed with .env and expo-constants.

The useLocalSearchParams() hook is used for navigation state passing between pages (e.g., costOfAttendance → calculator → dashboard).

PDF parsing is expected to occur on the backend — results (e.g., gift aid) are sent back to the frontend and passed via props/navigation.


📮 Future Improvements
Add circular progress charts to visualize loan payoff

Add editable calendar/reminder for monthly payment reminders

Persist financial data locally or in the cloud

Connect with backend to not have to hardcode values into project

👥 Credits

Arena Galeana

Ahona Khandaker

Sanaa Bebal

Meera Phadnis


Setting up Expo:

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
 
 
