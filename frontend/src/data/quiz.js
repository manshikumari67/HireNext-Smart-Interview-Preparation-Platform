export const quiz = {
  "JavaScript": [
    {
      "id": 1,
      "question": "Which of the following is NOT a JavaScript data type?",
      "options": ["String", "Boolean", "Float", "Undefined"],
      "correctAnswer": 2,
      "explanation": "JavaScript doesn't have a specific 'Float' data type. Numbers in JavaScript are all floating-point numbers by default."
    },
    {
      "id": 2,
      "question": "What does 'this' keyword refer to in JavaScript?",
      "options": ["The current function", "The global object", "The object that owns the method", "The parent object"],
      "correctAnswer": 2,
      "explanation": "The 'this' keyword refers to the object that owns the method where 'this' is used."
    },
    {
      "id": 3,
      "question": "Which method is used to add an element to the end of an array?",
      "options": ["push()", "pop()", "shift()", "unshift()"],
      "correctAnswer": 0,
      "explanation": "The push() method adds one or more elements to the end of an array and returns the new length of the array."
    },
    {
      "id": 4,
      "question": "What is the result of '2' + 2 in JavaScript?",
      "options": ["4", "'22'", "NaN", "Error"],
      "correctAnswer": 1,
      "explanation": "JavaScript performs string concatenation when one operand is a string, so '2' + 2 results in '22'."
    },
    {
      "id": 5,
      "question": "Which of the following is used to declare a constant in JavaScript?",
      "options": ["var", "let", "const", "final"],
      "correctAnswer": 2,
      "explanation": "The 'const' keyword is used to declare constants in JavaScript."
    }
  ],

  "React": [
    {
      "id": 6,
      "question": "What is JSX in React?",
      "options": ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
      "correctAnswer": 1,
      "explanation": "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
    },
    {
      "id": 7,
      "question": "Which hook is used for managing state in functional components?",
      "options": ["useEffect", "useState", "useContext", "useReducer"],
      "correctAnswer": 1,
      "explanation": "useState is the primary hook for managing state in functional components."
    },
    {
      "id": 8,
      "question": "What is the virtual DOM in React?",
      "options": ["A real DOM element", "A JavaScript representation of the DOM", "A CSS framework", "A database"],
      "correctAnswer": 1,
      "explanation": "The virtual DOM is a JavaScript representation of the actual DOM kept in memory and synced with the real DOM."
    },
    {
      "id": 9,
      "question": "Which method is called after a component is rendered?",
      "options": ["componentWillMount", "componentDidMount", "componentWillUpdate", "render"],
      "correctAnswer": 1,
      "explanation": "componentDidMount is called after the component is mounted and rendered to the DOM."
    },
    {
      "id": 10,
      "question": "What is the purpose of keys in React lists?",
      "options": ["Styling", "Performance optimization", "Event handling", "State management"],
      "correctAnswer": 1,
      "explanation": "Keys help React identify which items have changed, are added, or are removed, optimizing re-rendering performance."
    }
  ],

  "DBMS": [
    {
      "id": 11,
      "question": "What does SQL stand for?",
      "options": ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
      "correctAnswer": 0,
      "explanation": "SQL stands for Structured Query Language, used for managing relational databases."
    },
    {
      "id": 12,
      "question": "Which of the following is NOT a type of database relationship?",
      "options": ["One-to-One", "One-to-Many", "Many-to-Many", "All-to-All"],
      "correctAnswer": 3,
      "explanation": "All-to-All is not a standard database relationship type. The main types are One-to-One, One-to-Many, and Many-to-Many."
    },
    {
      "id": 13,
      "question": "What is a primary key in a database?",
      "options": ["A key that opens the database", "A unique identifier for each record", "The first column in a table", "A password"],
      "correctAnswer": 1,
      "explanation": "A primary key is a unique identifier for each record in a database table."
    },
    {
      "id": 14,
      "question": "Which SQL command is used to retrieve data from a database?",
      "options": ["GET", "FETCH", "SELECT", "RETRIEVE"],
      "correctAnswer": 2,
      "explanation": "The SELECT command is used to retrieve data from a database."
    },
    {
      "id": 15,
      "question": "What does ACID stand for in database transactions?",
      "options": ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Dependability", "Access, Control, Identity, Data", "None of the above"],
      "correctAnswer": 0,
      "explanation": "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions."
    }
  ],

  "System Design": [
    {
      "id": 16,
      "question": "What is the main purpose of load balancing?",
      "options": ["To increase storage", "To distribute incoming requests", "To encrypt data", "To backup data"],
      "correctAnswer": 1,
      "explanation": "Load balancing distributes incoming network traffic across multiple servers to ensure no single server bears too much demand."
    },
    {
      "id": 17,
      "question": "What is horizontal scaling?",
      "options": ["Adding more power to existing machines", "Adding more machines to the pool", "Rotating servers", "Compressing data"],
      "correctAnswer": 1,
      "explanation": "Horizontal scaling means adding more machines to the resource pool to handle increased load."
    },
    {
      "id": 18,
      "question": "What is caching in system design?",
      "options": ["Storing data permanently", "Temporarily storing frequently accessed data", "Deleting old data", "Encrypting data"],
      "correctAnswer": 1,
      "explanation": "Caching involves temporarily storing frequently accessed data in a fast storage layer to improve performance."
    },
    {
      "id": 19,
      "question": "What does CDN stand for?",
      "options": ["Content Delivery Network", "Central Data Network", "Cached Data Network", "Content Distribution Node"],
      "correctAnswer": 0,
      "explanation": "CDN stands for Content Delivery Network, which delivers content to users from geographically distributed servers."
    },
    {
      "id": 20,
      "question": "What is database sharding?",
      "options": ["Backing up data", "Horizontally partitioning data", "Encrypting data", "Compressing data"],
      "correctAnswer": 1,
      "explanation": "Database sharding is a method of horizontally partitioning data across multiple database instances."
    }
  ],

  "HTML": [
    {
      "id": 21,
      "question": "What does HTML stand for?",
      "options": ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "High Text Marking Language"],
      "correctAnswer": 1,
      "explanation": "HTML stands for Hyper Text Markup Language, used for creating web pages."
    },
    {
      "id": 22,
      "question": "Which HTML tag is used to create a hyperlink?",
      "options": ["<link>", "<a>", "<href>", "<url>"],
      "correctAnswer": 1,
      "explanation": "The <a> tag is used to create hyperlinks in HTML."
    },
    {
      "id": 23,
      "question": "Which attribute is used to provide alternative text for an image?",
      "options": ["title", "alt", "src", "longdesc"],
      "correctAnswer": 1,
      "explanation": "The alt attribute provides alternative text for an image if it cannot be displayed."
    },
    {
      "id": 24,
      "question": "Which tag is used to define the largest heading in HTML?",
      "options": ["<h6>", "<heading>", "<h1>", "<head>"],
      "correctAnswer": 2,
      "explanation": "The <h1> tag defines the largest heading in HTML."
    },
    {
      "id": 25,
      "question": "Which HTML element is used to display a numbered list?",
      "options": ["<ul>", "<ol>", "<li>", "<dl>"],
      "correctAnswer": 1,
      "explanation": "The <ol> tag is used to create an ordered (numbered) list."
    }
  ],

  "Computer Networks": [
    {
      "id": 26,
      "question": "What does IP stand for?",
      "options": ["Internet Process", "Internet Protocol", "Internal Program", "Internet Procedure"],
      "correctAnswer": 1,
      "explanation": "IP stands for Internet Protocol, used for addressing and routing packets across networks."
    },
    {
      "id": 27,
      "question": "Which protocol is used to send emails?",
      "options": ["HTTP", "SMTP", "FTP", "SNMP"],
      "correctAnswer": 1,
      "explanation": "SMTP (Simple Mail Transfer Protocol) is used to send emails."
    },
    {
      "id": 28,
      "question": "Which layer of the OSI model is responsible for routing?",
      "options": ["Transport layer", "Data Link layer", "Network layer", "Session layer"],
      "correctAnswer": 2,
      "explanation": "The Network layer is responsible for routing packets from source to destination."
    },
    {
      "id": 29,
      "question": "Which device is used to connect different networks together?",
      "options": ["Switch", "Router", "Hub", "Repeater"],
      "correctAnswer": 1,
      "explanation": "A Router connects multiple networks and routes data packets between them."
    },
    {
      "id": 30,
      "question": "What does DNS stand for?",
      "options": ["Data Network System", "Domain Name System", "Dynamic Network Service", "Distributed Naming Service"],
      "correctAnswer": 1,
      "explanation": "DNS stands for Domain Name System, which translates domain names into IP addresses."
    }
  ]
};
