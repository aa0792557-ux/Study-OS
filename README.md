
# StudyOS – Student Study Planner Application

## 1. Project Overview

StudyOS is a mobile-based Student Study Planner application developed using React Native and Expo. It is designed to help students organize their academic activities, manage study tasks, arrange subjects, and plan their daily study schedules efficiently.

The application provides a simple and user-friendly interface that allows students to manage their academic responsibilities in one place. It helps students maintain a proper study routine, track pending tasks, remember deadlines, and improve their time management and productivity.

StudyOS uses Firebase for user authentication and cloud data storage. It also integrates an external REST API to display motivational quotes that encourage students to maintain consistent study habits.

## 2. Objectives of the Project

- To develop a user-friendly mobile application for students.
- To help students organize their subjects and study activities.
- To provide an easy way to create and manage study tasks.
- To help students plan their daily study schedules.
- To provide secure user registration and login.
- To store and retrieve study task information using Firebase.
- To improve students' time management and productivity.

## 3. Features and Modules

### 3.1 User Authentication
Provides login and registration functionality using Firebase Authentication. Students can create accounts and securely access their personal study planner.

### 3.2 Dashboard
Displays the main sections of the application and provides easy navigation to different modules.

### 3.3 Subject Management
Allows students to view and organize their academic subjects.

### 3.4 Task Management
Allows students to add, view, update, and delete study tasks. Students can manage their assignments and other academic activities.

### 3.5 Calendar and Study Schedule
Displays planned study activities and task due dates, helping students organize their time.

### 3.6 Motivational Quotes
Uses an external REST API to retrieve and display motivational quotes to encourage students.

### 3.7 Profile Management
Provides a section where users can view their account information.

### 3.8 Settings and Sign Out
Provides application settings and a secure sign-out option.

## 4. Technologies Used

- **React Native:** For developing the mobile application.
- **Expo:** For application development and testing.
- **TypeScript:** For writing structured and type-safe code.
- **Expo Router:** For screen navigation.
- **Firebase Authentication:** For user registration and login.
- **Firebase Firestore:** For storing and retrieving study tasks.
- **React Native Paper:** For designing the user interface.
- **REST API:** For fetching motivational quotes.
- **AsyncStorage:** For maintaining authentication persistence.
- **Jest:** For testing application components.
- **Visual Studio Code:** For writing and managing project code.

## 5. Firebase Integration

StudyOS is connected to Firebase using the Firebase JavaScript SDK.

Firebase Authentication manages user registration and login, while Cloud Firestore stores and retrieves study task information.

When a student adds a new task, the application sends the entered information to Firestore. The stored information can then be retrieved and displayed in the application.

## 6. Application Navigation

The application uses Expo Router to navigate between different screens. It provides authentication screens and a drawer-based navigation structure with tab navigation for accessing the main sections.

## 7. Installation and Setup

1. Install Node.js and Visual Studio Code.
2. Download or clone the project.
3. Open the project folder in Visual Studio Code.
4. Run the following command:

   ```bash
   npm install
   ```

5. Install compatible Expo dependencies:

   ```bash
   npx expo install --fix
   ```

6. Configure Firebase credentials in the `.env` file.
7. Start the application:

   ```bash
   npx expo start
   ```

8. Scan the QR code using Expo Go to run the application on an Android device.

## 8. Future Enhancements

- Add push notifications for study reminders.
- Introduce graphical calendar views.
- Add progress tracking and study statistics.
- Implement automatic timetable generation.
- Add cloud synchronization for more academic information.
- Introduce dark mode and additional customization options.

## 9. Conclusion

StudyOS provides a simple and effective solution for managing students' academic activities. By combining React Native, Expo, Firebase, and REST API integration, the application offers useful features such as authentication, subject organization, task management, and study scheduling. It aims to help students develop better study habits, manage their time effectively, and improve their academic productivity.
