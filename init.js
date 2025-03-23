const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); 
const Student = require("./models/Student");
const Course = require("./models/Course");
const connectDB = require("./config/db");

connectDB();

async function initializeDatabase() {
    try {

        await User.deleteMany();
        await Student.deleteMany();
        await Course.deleteMany();

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new User({
            username: "admin",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();

        const students = [
            { rollNumber: "22F-1001", name: "John Doe" },
            { rollNumber: "22F-1002", name: "Jane Smith" },
            { rollNumber: "22F-1003", name: "Alice Johnson" }
        ];

        for (let student of students) {
            const user = new User({
                rollNumber: student.rollNumber,
                role: "student"
            });

            await user.save();

            const studentEntry = new Student({
                rollNumber: student.rollNumber,
                name: student.name,
                registeredCourses: []
            });

            await studentEntry.save();
        }

        const courses = [
            {
                code: "CS101",
                title: "Introduction to Programming",
                instructor: "Dr. John Smith",
                department: "Computer Science",
                level: 100,
                availableSeats: 30,
                prerequisites: [],
                schedule: {
                    days: ["Monday", "Wednesday"],
                    startTime: "09:00",
                    endTime: "10:30"
                },
                timeOfDay: "Morning"
            },
            {
                code: "CS201",
                title: "Data Structures",
                instructor: "Dr. Jane Doe",
                department: "Computer Science",
                level: 200,
                availableSeats: 25,
                prerequisites: [], // Will be updated after CS101 is created
                schedule: {
                    days: ["Tuesday", "Thursday"],
                    startTime: "11:00",
                    endTime: "12:30"
                },
                timeOfDay: "Morning"
            },
            {
                code: "MATH101",
                title: "Calculus I",
                instructor: "Dr. Robert Johnson",
                department: "Mathematics",
                level: 100,
                availableSeats: 35,
                prerequisites: [],
                schedule: {
                    days: ["Monday", "Wednesday", "Friday"],
                    startTime: "14:00",
                    endTime: "15:00"
                },
                timeOfDay: "Afternoon"
            },
            {
                code: "PHY101",
                title: "Physics I",
                instructor: "Dr. Maria Garcia",
                department: "Physics",
                level: 100,
                availableSeats: 30,
                prerequisites: [],
                schedule: {
                    days: ["Tuesday", "Thursday"],
                    startTime: "15:30",
                    endTime: "17:00"
                },
                timeOfDay: "Afternoon"
            },
            {
                code: "CS301",
                title: "Database Systems",
                instructor: "Dr. Sarah Wilson",
                department: "Computer Science",
                level: 300,
                availableSeats: 25,
                prerequisites: [], // Will be updated to require CS201
                schedule: {
                    days: ["Monday", "Wednesday"],
                    startTime: "13:00",
                    endTime: "14:30"
                },
                timeOfDay: "Afternoon"
            },
            {
                code: "CS102",
                title: "Web Development",
                instructor: "Prof. Michael Brown",
                department: "Computer Science",
                level: 100,
                availableSeats: 40,
                prerequisites: [],
                schedule: {
                    days: ["Tuesday", "Thursday"],
                    startTime: "09:00",
                    endTime: "10:30"
                },
                timeOfDay: "Morning"
            },
            {
                code: "MATH201",
                title: "Calculus II",
                instructor: "Dr. Emily Chen",
                department: "Mathematics",
                level: 200,
                availableSeats: 30,
                prerequisites: [], // Will be updated to require MATH101
                schedule: {
                    days: ["Monday", "Wednesday", "Friday"],
                    startTime: "11:00",
                    endTime: "12:00"
                },
                timeOfDay: "Morning"
            },
            {
                code: "PHY201",
                title: "Physics II",
                instructor: "Dr. James Wilson",
                department: "Physics",
                level: 200,
                availableSeats: 25,
                prerequisites: [], // Will be updated to require PHY101
                schedule: {
                    days: ["Monday", "Wednesday"],
                    startTime: "15:00",
                    endTime: "16:30"
                },
                timeOfDay: "Afternoon"
            },
            {
                code: "CS401",
                title: "Artificial Intelligence",
                instructor: "Dr. Lisa Anderson",
                department: "Computer Science", 
                level: 400,
                availableSeats: 20,
                prerequisites: [], // Will be updated to require CS201
                schedule: {
                    days: ["Tuesday", "Thursday"],
                    startTime: "14:00",
                    endTime: "15:30"
                },
                timeOfDay: "Afternoon"
            }
        ];

        // Save courses and store their IDs
        const savedCourses = {};
        for (let course of courses) {
            const newCourse = new Course(course);
            await newCourse.save();
            savedCourses[course.code] = newCourse._id;
        }

        // Update prerequisites after courses are created
        await Course.findOneAndUpdate(
            { code: "CS201" },
            { prerequisites: [savedCourses["CS101"]] }
        );

        await Course.findOneAndUpdate(
            { code: "CS301" },
            { prerequisites: [savedCourses["CS201"]] }
        );

        await Course.findOneAndUpdate(
            { code: "MATH201" },
            { prerequisites: [savedCourses["MATH101"]] }
        );

        await Course.findOneAndUpdate(
            { code: "PHY201" },
            { prerequisites: [savedCourses["PHY101"]] }
        );

        await Course.findOneAndUpdate(
            { code: "CS401" },
            { prerequisites: [savedCourses["CS201"]] }
        );

        console.log("✅ Database initialized successfully with courses");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error initializing database:", err);
        mongoose.connection.close();
    }
}

initializeDatabase();
