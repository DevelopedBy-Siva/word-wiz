# WordWiz
A Progressive Web Application for vocabulary learning that combines flashcard memorization with interactive quizzes, local-first data storage, and encrypted backup capabilities. Built with React and IndexedDB, the app provides a seamless offline-first experience with smart sorting, filtering, and quiz generation features.

## Overview

WordWiz is a client-side vocabulary learning platform that helps users master new words through spaced repetition and active recall. The application features a dual-mode learning system combining passive flashcard review with active quiz testing. Using IndexedDB for persistent local storage and AES encryption for secure backups, users maintain complete control over their vocabulary data with the ability to import/export encrypted backup files.

## Features

- **Local-First Architecture** – IndexedDB (Dexie.js) for persistent browser storage with offline-first functionality
- **Encrypted Backup System** – AES encryption (CryptoJS) for secure export/import of vocabulary data with `.bytes` file format
- **Smart Quiz Generation** – Dynamic quiz creation with randomized multiple-choice questions from vocabulary pool
- **Advanced Sorting & Filtering** – Multi-criteria sorting (A-Z, Z-A, Date) and filtering (All, Local Storage) with URL parameter persistence
- **Protected Route System** – User authentication with route guards and session management
- **Quiz History Tracking** – IndexedDB-powered score history with timestamp and wrong answer analytics
- **Responsive UI** – React-based interface with lazy loading and suspense boundaries for optimal performance
- **Search Functionality** – Real-time search with case-insensitive prefix matching
- **Bulk Data Operations** – Import/export multiple flashcards with duplicate detection and merge strategies
- **User Session Management** – localStorage-based user profiles with session tracking

## Tech Stack

- **Frontend:** React.js, React Router, React Icons, React Toastify
- **State Management:** Redux, Redux Thunk
- **Database:** IndexedDB (Dexie.js)
- **Security:** CryptoJS (AES Encryption)
- **Utilities:** Lodash, File-Saver
- **Build Tools:** Modern JavaScript (ES6+), Lazy Loading, Code Splitting


## How It Works

1. **User Authentication** – First-time users create a profile stored in localStorage, unlocking access to protected routes
2. **Data Initialization** – Redux thunk loads vocabulary from `words.json` and IndexedDB, prioritizing local modifications
3. **Vocabulary Management** – Users view, add, edit, and delete words with automatic IndexedDB synchronization
4. **Smart Filtering & Sorting** – URL query parameters control display order and filtering with lodash-powered utilities
5. **Quiz Generation** – Random sampling algorithm creates multiple-choice questions with 4 options per word
6. **Quiz Execution** – Users select answers, receive instant feedback, and view detailed results with correct answers
7. **History Tracking** – Quiz scores and wrong answers stored in IndexedDB for progress monitoring
8. **Backup & Restore** – Export encrypts all local words to `.bytes` file; import decrypts and merges with existing data

## Key Features in Detail

### Encrypted Backup System
- **AES Encryption** – CryptoJS encrypts vocabulary data with custom secret key
- **File Export** – FileSaver.js generates downloadable `.bytes` backup files
- **Import Validation** – Malformed data detection with error handling and toast notifications
- **Duplicate Detection** – Smart merge strategy prevents data loss during import

### Quiz Generation Algorithm
- **Random Sampling** – Generates unique random indices for question selection
- **Option Shuffling** – Randomizes correct answer position in 4-option array
- **Range Control** – Supports full vocabulary or "latest words" subset for targeted practice
- **Minimum Requirements** – Enforces 4+ words requirement for valid quiz generation

### IndexedDB Operations
- **Dual Tables** – Separate stores for words and quiz history
- **CRUD Operations** – Full create, read, update, delete support with async/await
- **Bulk Operations** – Efficient batch insert for import functionality
- **Timestamp Tracking** – Automatic `createdAt` updates for modification tracking

### Protected Route System
- **Route Guards** – `isUserPresent()` checks prevent unauthorized access
- **Lazy Loading** – React.lazy() with Suspense for code splitting
- **Session Detection** – Differentiates new users from returning users
- **Redirect Logic** – Automatic navigation to `/whoru` for unauthenticated users

## Usage

### First-Time Setup
1. Navigate to the application URL
2. Enter your name on the "Who R U?" page
3. Access the main dashboard after profile creation

### Adding Vocabulary
1. Go to "Words" page
2. Click "Add New Word"
3. Enter word, meaning, and example sentence
4. Save to IndexedDB automatically

### Taking a Quiz
1. Navigate to "Quiz" page
2. Select quiz mode (All words or Latest N words)
3. Answer multiple-choice questions
4. View score and review wrong answers

### Backup & Restore
1. **Export:** Click "Backup" to download encrypted `.bytes` file
2. **Import:** Upload `.bytes` file to restore vocabulary across devices

### Sorting & Filtering
- **Sort Options:** A-Z, Z-A, Oldest First, Newest First
- **Filter Options:** All Words, Local Storage Only
- URL parameters persist selections (`?sort=Z_A&filter=LOCAL`)

## Data Models

### Word Object
```javascript
{
  name: "vocabulary",           // Primary key
  meaning: "body of words used",
  example: "expand your vocabulary",
  indexedDB: true,             // Flag for local storage
  createdAt: 1733356800000     // Timestamp
}
```

### Quiz Question Object
```javascript
{
  name: "serendipity",
  answer: 2,                    // Correct option index (0-3)
  answerExample: "meeting by pure serendipity",
  options: [...],               // Array of 4 meanings
  myChoice: 1,                  // User's selected index
  status: "wrong"               // "correct" or "wrong"
}
```

### History Entry
```javascript
{
  timestamp: 1733356800000,
  score: "8:10",                // Format: correct:total
  wrongWords: [...]             // Array of missed words
}
```


## Security Features

- **AES-256 Encryption** – Military-grade encryption for backup files
- **Client-Side Only** – No server transmission of personal vocabulary data
- **Secret Key Management** – Configurable encryption key in constants
- **Session Storage** – Temporary session markers cleared on browser close

## Future Enhancements

- Spaced repetition algorithm based on Ebbinghaus forgetting curve
- Audio pronunciation integration with Web Speech API
- Progressive Web App (PWA) with service workers for true offline support
- Multi-language vocabulary support with translation API
- Dark mode theme toggle
- Export to CSV/PDF formats
- Collaborative vocabulary lists with WebRTC peer-to-peer sharing
- Machine learning-based difficulty prediction for adaptive quizzes
