# University Course Registration System

This is a web-based **University Course Registration System** built using **HTML, CSS, JavaScript** (Frontend), **Node.js with Express.js** (Backend), and **MongoDB** (Database). The system allows students to register for courses while ensuring real-time updates, conflict detection, and seamless user interaction.

## Features

### Student Features
- **Login with Roll Number** (No separate registration needed)
- **Interactive Weekly Calendar** with real-time conflict detection
- **Live Seat Availability Updates** (No page refresh required)
- **Course Filtering** by department, level, time, days, and seat availability
- **Persistent Session State** for schedules
- **Clear Prerequisite Display** for courses

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js with Express.js
- **Database:** MongoDB

## Project Structure (MVC Pattern)
```
Web_Assignment_2/
│── models/             # Mongoose Models (Course, Student)
│── routes/             # Express Routes
│── views/              # Frontend Views (EJS Templates)
│── public/             # Static Assets (CSS, JS)
│── server.js           # Main Express Server File
│── package.json        # Project Dependencies
│── .env                # Environment Variables
```

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Seed student data (Optional):
   ```sh
   node seedStudent.js
   ```
5. Start the server:
   ```sh
   npm start
   ```
6. Open the browser and go to:
   ```sh
   http://localhost:3000
   ```

## API Endpoints
| Method | Endpoint        | Description                    |
|--------|----------------|--------------------------------|
| GET    | /              | Homepage                       |
| GET    | /courses       | Fetch all available courses    |
| POST   | /register      | Register student for a course  |
| GET    | /schedule      | View student's schedule        |

## Contribution
1. Fork the repository
2. Create a new branch (`feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

