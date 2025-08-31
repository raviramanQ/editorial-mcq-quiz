# Question Data Format

## File Structure

Create JSON files in the `public/questions/` directory with the following naming convention:
- **Filename**: `YYYY-MM-DD.json` (e.g., `2025-08-31.json`)
- **Location**: `public/questions/`

## JSON File Format

```json
{
  "date": "2025-08-31",
  "title": "Your Quiz Title",
  "description": "Brief description of the quiz content",
  "questions": [
    {
      "id": 1,
      "question": "Your question text here?",
      "options": [
        "Option A text",
        "Option B text", 
        "Option C text",
        "Option D text"
      ],
      "correctAnswer": "A",
      "explanation": "Explanation of why this answer is correct"
    }
    // ... repeat for all 20 questions
  ]
}
```

## Field Descriptions

- **date**: Date in YYYY-MM-DD format (must match filename)
- **title**: Display title for the quiz set
- **description**: Brief description shown in date selector
- **questions**: Array of exactly 20 question objects
  - **id**: Unique number (1-20)
  - **question**: The question text
  - **options**: Array of exactly 4 answer choices
  - **correctAnswer**: Letter A, B, C, or D indicating correct option
  - **explanation**: Brief explanation of the correct answer

## Adding New Question Sets

1. **Create Question File**:
   - Create new JSON file: `public/questions/YYYY-MM-DD.json`
   - Follow the format above with 20 questions

2. **Update Available Dates**:
   - Edit `public/questions/available-dates.json`
   - Add new entry:
   ```json
   {
     "date": "2025-08-31",
     "title": "Your Quiz Title",
     "description": "Brief description",
     "filename": "2025-08-31.json"
   }
   ```

## Example Topics

You can create question sets for different topics:
- JavaScript Fundamentals
- ES6+ Features
- React Concepts
- Node.js Basics
- Async Programming
- Data Structures & Algorithms
- Web APIs
- Testing Concepts

## Tips

- Keep questions focused on interview-relevant topics
- Provide clear, concise explanations
- Mix difficulty levels within each set
- Use realistic code examples when applicable
- Ensure all 4 options are plausible to avoid obvious answers
