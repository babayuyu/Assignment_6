assignment-day6/
├── node-api/ # Node.js API implementation
│ ├── .env
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── protected.js
│ └── utils/
│ └── authUtils.js
│
└── ionic-app/ # Ionic React with Firebase Auth
├── src/
│ ├── App.tsx # Main app component
│ ├── main.tsx # App entry point
│ ├── firebase/ # Firebase config
│ │ └── config.ts
│ ├── hooks/ # Custom hooks
│ │ └── useAuth.ts
│ ├── components/ # Shared components
│ ├── pages/
│ │ ├── Home/
│ │ │ ├── Home.tsx # Protected page
│ │ │ └── Home.css
│ │ ├── Login/
│ │ │ ├── Login.tsx # Login page
│ │ │ └── Login.css
│ │ └── Register/
│ │ ├── Register.tsx # Register page
│ │ └── Register.css
│ ├── services/ # Services (if needed)
│ └── assets/
├── public/
├── package.json
├── tsconfig.json
├── ionic.config.json
├── API_SECURITY.md
├── APP_STRUCTURE.md
└── TESTING.md
