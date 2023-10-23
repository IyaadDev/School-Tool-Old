import React, { useState, useEffect } from 'react';
import Nav from "Nav";

function JSONToHTML() {
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = urlParams.get('lessonId');
  const [lessonContent, setLessonContent] = useState(null);

  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        const response = await fetch(`https://doserverless.co/lesson?lessonId=${lessonId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const lessonData = await response.json();
        setLessonContent(lessonData);
      } catch (error) {
        console.error('Error fetching lesson content:', error);
      }
    };

    if (lessonId) {
      fetchLessonContent();
    }
  }, [lessonId]);

  const convertToHTML = (jsonContent) => {
    if (!jsonContent) return null;

    return jsonContent.blocks.map((block) => {
      if (block.type === 'header-one') {
        return <h1 key={block.key}>{block.text}</h1>;
      } else if (block.type === 'header-two') {
        return <h2 key={block.key}>{block.text}</h2>;
      } else if (block.type === 'header-three') {
        return <h3 key={block.key}>{block.text}</h3>;
      } else {
        return <p key={block.key}>{block.text}</p>;
      }
    });
  };

  const htmlContent = convertToHTML(lessonContent);

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="html-content">
        {htmlContent}
      </div>
    </div>
  );
}

export default JSONToHTML;
