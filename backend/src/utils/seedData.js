
require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();
    console.log('Database connected for seeding...');

    // Clear existing data
    await Quiz.deleteMany({});
    console.log('Cleared existing quiz data');

    // Sample Quiz Questions
    const quizzes = [
      // JavaScript Questions
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: 2,
        explanation: "JavaScript doesn't have a specific 'Float' data type. Numbers in JavaScript are all floating-point numbers by default.",
        topic: "JavaScript",
        difficulty: "Easy"
      },
      {
        question: "What does 'this' keyword refer to in JavaScript?",
        options: ["The current function", "The global object", "The object that owns the method", "The parent object"],
        correctAnswer: 2,
        explanation: "The 'this' keyword refers to the object that owns the method where 'this' is used.",
        topic: "JavaScript",
        difficulty: "Easy"
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
        topic: "JavaScript",
        difficulty: "Easy"
      },
      {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "'22'", "NaN", "Error"],
        correctAnswer: 1,
        explanation: "JavaScript performs string concatenation when one operand is a string, so '2' + 2 results in '22'.",
        topic: "JavaScript",
        difficulty: "Medium"
      },
      {
        question: "Which of the following is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "final"],
        correctAnswer: 2,
        explanation: "The 'const' keyword is used to declare constants in JavaScript.",
        topic: "JavaScript",
        difficulty: "Easy"
      },

      // React Questions
      {
        question: "What is JSX in React?",
        options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
        correctAnswer: 1,
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
        topic: "React",
        difficulty: "Easy"
      },
      {
        question: "Which hook is used for managing state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is the hook used for managing state in functional components. It returns the state and a setter function.",
        topic: "React",
        difficulty: "Easy"
      },
      {
        question: "What does useEffect hook do?",
        options: ["Manages state", "Handles side effects", "Performs calculations", "Optimizes rendering"],
        correctAnswer: 1,
        explanation: "useEffect hook is used to perform side effects in functional components, like data fetching and subscriptions.",
        topic: "React",
        difficulty: "Medium"
      },
      {
        question: "How do you pass data from parent to child component in React?",
        options: ["Through state", "Through props", "Through context", "Through events"],
        correctAnswer: 1,
        explanation: "Parent components pass data to child components through props.",
        topic: "React",
        difficulty: "Easy"
      },
      {
        question: "What is the purpose of React Context API?",
        options: ["For state management", "To avoid prop drilling", "To manage side effects", "To optimize performance"],
        correctAnswer: 1,
        explanation: "Context API helps avoid prop drilling by allowing you to pass data through the component tree without passing props manually at every level.",
        topic: "React",
        difficulty: "Medium"
      },

      // DBMS Questions
      {
        question: "What is a Primary Key in a database?",
        options: ["A key that opens the database", "A unique identifier for each record", "A backup key", "A temporary key"],
        correctAnswer: 1,
        explanation: "A primary key is a unique identifier for each record in a table. It ensures that each row is uniquely identifiable.",
        topic: "DBMS",
        difficulty: "Easy"
      },
      {
        question: "What is normalization in databases?",
        options: ["Encryption process", "Data organization to reduce redundancy", "Backup process", "Data migration"],
        correctAnswer: 1,
        explanation: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.",
        topic: "DBMS",
        difficulty: "Medium"
      },
      {
        question: "What is a Foreign Key in a database?",
        options: ["A key from another country", "A key that references a primary key in another table", "An extra backup key", "A temporary key"],
        correctAnswer: 1,
        explanation: "A foreign key is a column or set of columns that references the primary key of another table, creating a relationship between tables.",
        topic: "DBMS",
        difficulty: "Medium"
      },
      {
        question: "What does ACID stand for in databases?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completion, Integration, Data", "Access, Control, Input, Display", "Account, Code, ID, Date"],
        correctAnswer: 0,
        explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - fundamental properties of reliable database transactions.",
        topic: "DBMS",
        difficulty: "Hard"
      },
      {
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        options: ["No difference", "INNER returns matching rows from both tables, LEFT includes all rows from left table", "Based on join direction", "Based on table size"],
        correctAnswer: 1,
        explanation: "INNER JOIN returns only rows that have matching values in both tables, while LEFT JOIN returns all rows from the left table plus matching rows from the right table.",
        topic: "DBMS",
        difficulty: "Hard"
      },

      // Node.js Questions
      {
        question: "What is Node.js?",
        options: ["A frontend framework", "A JavaScript runtime built on Chrome's V8 engine", "A database", "A CSS preprocessor"],
        correctAnswer: 1,
        explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript outside the browser.",
        topic: "Node.js",
        difficulty: "Easy"
      },
      {
        question: "What is npm in Node.js?",
        options: ["A programming language", "A package manager for JavaScript", "A database", "A template engine"],
        correctAnswer: 1,
        explanation: "npm (Node Package Manager) is a package manager for JavaScript that helps you install, manage, and share packages.",
        topic: "Node.js",
        difficulty: "Easy"
      },
      {
        question: "What is middleware in Express?",
        options: ["Database layer", "Functions that have access to request and response objects", "Frontend code", "API endpoint"],
        correctAnswer: 1,
        explanation: "Middleware in Express is a function that has access to the request object, response object, and the next middleware function in the request-response cycle.",
        topic: "Node.js",
        difficulty: "Medium"
      },
      {
        question: "What is the purpose of async/await in Node.js?",
        options: ["To run code in parallel", "To handle asynchronous code synchronously", "To delay execution", "To improve memory"],
        correctAnswer: 1,
        explanation: "async/await allows you to write asynchronous code in a synchronous way, making it more readable and easier to debug than callbacks or promises.",
        topic: "Node.js",
        difficulty: "Medium"
      },
      {
        question: "What is a callback function in Node.js?",
        options: ["A function called when button is clicked", "A function passed as an argument to another function", "A function that returns data", "A function that deletes data"],
        correctAnswer: 1,
        explanation: "A callback is a function passed as an argument to another function, which is then invoked inside that function to complete some kind of routine or action.",
        topic: "Node.js",
        difficulty: "Easy"
      },

      // MongoDB Questions
      {
        question: "What is MongoDB?",
        options: ["A relational database", "A NoSQL document database", "A graph database", "A search engine"],
        correctAnswer: 1,
        explanation: "MongoDB is a NoSQL document database that stores data in JSON-like documents with dynamic schema.",
        topic: "MongoDB",
        difficulty: "Easy"
      },
      {
        question: "What is a collection in MongoDB?",
        options: ["A group of indexes", "A group of documents", "A backup file", "A user group"],
        correctAnswer: 1,
        explanation: "A collection in MongoDB is a group of MongoDB documents, similar to a table in relational databases.",
        topic: "MongoDB",
        difficulty: "Easy"
      },
      {
        question: "What is a document in MongoDB?",
        options: ["A PDF file", "A JSON-like data structure", "A database backup", "A user account"],
        correctAnswer: 1,
        explanation: "A document in MongoDB is a JSON-like data structure that contains data in key-value pairs, similar to an object.",
        topic: "MongoDB",
        difficulty: "Easy"
      },
      {
        question: "What does _id field represent in MongoDB?",
        options: ["User identification", "A unique identifier for each document", "A database ID", "A collection name"],
        correctAnswer: 1,
        explanation: "The _id field is a unique identifier automatically created for each document in MongoDB to ensure uniqueness within a collection.",
        topic: "MongoDB",
        difficulty: "Medium"
      },
      {
        question: "What is Mongoose in MongoDB?",
        options: ["A database engine", "An ODM (Object Document Mapper) library for Node.js and MongoDB", "A query language", "A backup tool"],
        correctAnswer: 1,
        explanation: "Mongoose is an ODM (Object Document Mapper) library that provides a straight-forward, schema-based solution to model your MongoDB data in Node.js.",
        topic: "MongoDB",
        difficulty: "Medium"
      }
    ];

    // Insert all quizzes
    const insertedQuizzes = await Quiz.insertMany(quizzes);
    console.log(`✅ Successfully seeded ${insertedQuizzes.length} quiz questions`);

    // Count by topic
    const stats = await Quiz.aggregate([
      { $group: { _id: "$topic", count: { $sum: 1 } } }
    ]);

    console.log('\n📊 Topics distributed:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} questions`);
    });

    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
