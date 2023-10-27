// This is a reading bit...

function InfoL ({}) {
}

function QuizL ({}) {
}

function ResultsL ({}) {
}

function StartL ({}) {
}

function EndL ({}) {
}

function FetchLessonDataL({}) {
    const getLessonIdFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const lessonId = urlParams.get('id');
      console.log('Lesson ID:', lessonId);
      return lessonId;
    };
  
    // Call the function to extract and log the lesson ID
    getLessonIdFromURL();
  
    return <div>Fetching lesson data...</div>;
  }

export { InfoL, QuizL, ResultsL, StartL, EndL, FetchLessonDataL };