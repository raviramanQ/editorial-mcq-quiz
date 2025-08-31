class QuestionService {
  async getAvailableDates(section = 'vocabulary') {
    try {
      const response = await fetch(`/questions/available-dates.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch available dates: ${response.status}`);
      }
      const data = await response.json();
      return data[section] || [];
    } catch (error) {
      console.error('Error fetching available dates:', error);
      return [];
    }
  }

  async getQuestionsByDate(date, section = 'vocabulary') {
    try {
      const response = await fetch(`/questions/${section}/${date}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions for date: ${date}`);
      }
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error(`Error fetching questions for ${date}:`, error);
      // Return fallback questions if file not found
      return this.getFallbackQuestions();
    }
  }

  getFallbackQuestions() {
    return [
      {
        question: "What does 'ubiquitous' mean?",
        options: ["Rare", "Present everywhere", "Ancient", "Modern"],
        correctAnswer: "B",
        explanation: "Ubiquitous means present, appearing, or found everywhere."
      },
      {
        question: "What does 'ephemeral' mean?",
        options: ["Permanent", "Lasting for a short time", "Very large", "Very small"],
        correctAnswer: "B",
        explanation: "Ephemeral means lasting for a very short time."
      },
      {
        question: "What does 'perspicacious' mean?",
        options: ["Confused", "Having keen insight", "Lazy", "Talkative"],
        correctAnswer: "B",
        explanation: "Perspicacious means having a ready insight into and understanding of things."
      },
      {
        question: "What does 'sanguine' mean?",
        options: ["Pessimistic", "Optimistic", "Angry", "Confused"],
        correctAnswer: "B",
        explanation: "Sanguine means optimistic or positive, especially in an apparently bad situation."
      }
    ];
  }
}

const questionService = new QuestionService();
export default questionService;
