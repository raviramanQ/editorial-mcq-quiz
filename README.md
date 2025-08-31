# Editorial Vocabulary Practice App

A React-based vocabulary practice application that loads vocabulary words from newspaper editorials organized by date. Perfect for improving English vocabulary from The Hindu and Indian Express editorials with a 20-second timer per question.

## Features

- **Vocabulary MCQ Questions**: Loaded from local JSON files organized by date
- **Timer Functionality**: 20-second countdown timer per question
- **Interactive UI**: Modern, responsive design with smooth animations
- **Progress Tracking**: Visual progress bar and question indicators
- **Detailed Results**: Score breakdown with explanations for each answer
- **Weekly Organization**: Select vocabulary sets by date for weekly revision

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd editorial-mcq-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open the app**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Select a date to load your weekly vocabulary set

## How to Use

1. **Select Date**: Choose a vocabulary set from your weekly reading
2. **Answer Questions**: Click on your preferred answer (A, B, C, or D)
3. **Monitor Time**: Each question has 20 seconds - auto-advances when time runs out
4. **Navigate**: Use Previous/Next buttons or click question numbers
5. **Complete Practice**: Finish all vocabulary words
6. **Review Results**: See your score and detailed explanations

## Project Structure

```
src/
├── components/
│   ├── Quiz.js          # Main quiz component
│   └── Quiz.css         # Quiz styling
├── services/
│   └── questionService.js # Local JSON file service
├── App.js               # Main app component
└── App.css              # Global styles
```

## Technologies Used

- **React**: Frontend framework
- **Local JSON Files**: Question storage and retrieval
- **CSS3**: Modern styling with animations
- **JavaScript ES6+**: Modern JavaScript features

## API Integration

The app loads vocabulary words from local JSON files organized by date. Each file contains vocabulary from newspaper editorials covering:

- Advanced vocabulary from editorials
- Political and economic terms
- Legal and social terminology
- Academic and formal language
- Context-based word meanings
- And more!

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Adding Your Own Questions

See `QUESTION_FORMAT.md` for detailed instructions on creating your vocabulary sets. Simply:

1. Read The Hindu & Indian Express editorials during the week
2. Note down difficult vocabulary words and their meanings
3. Create a new JSON file in `public/questions/` with date format `YYYY-MM-DD.json`
4. Add the entry to `public/questions/available-dates.json`
5. Follow the specified JSON format with your vocabulary words

## Contributing

Feel free to submit issues and enhancement requests!
