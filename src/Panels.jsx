import React from 'react';
import "./bootstrap.min.css"
import "./widgets.css"

function TextPanel({ heading, content, className }) {
  return (
    <div className={className}>
      <div className="panel panel-default">
        <div className="panel-body text-center">
          <h1 className="textPanelHeading">{heading}</h1>
          <p className="textPanelContent">{content}</p>
        </div>
      </div>
    </div>
  );
}

function TextPanelWithIcon({ heading, content, className, icon, iconHeight, iconWidth, fullLink }) {
  return (
    <div className={className}>
      <div className="panel panel-default">
        <div className="panel-body text-center">
          <img src={icon} height={iconHeight} width={iconWidth} className="textPanelWithIconImg" alt="icon" />
          <h2 className="textPanelWithIconHeading">{heading}</h2>
          <p className="textPanelWithIconContent">{content}</p>
        </div>
      </div>
    </div>
  );
}

function Notes({ heading, preview, fullLink, className }) {
  const renderPreviewElements = () => {
    return Object.entries(preview).map(([key, value], index) => {
      if (key === "list") {
        return (
          <div className="notesList justify-content-center" key={index}>
            <h2 className="notesListHeading">{value.name}</h2>
            <ul className="notesListList d-flex">
              <div className="row justify-content-center">
              {value.content.map((item, idx) => (
                <li className="notesListItem" key={idx}>
                  {item}
                </li>
              ))}
              </div>
            </ul>
          </div>
        );
      } else if (key === "h1" || key === "h2" || key === "p" || key === "h3") {
        const TagName = key;
        return (
          <div className={`notes${key.toUpperCase()}`} key={index}>
            {typeof value === "string" ? (
              <TagName className="notesInfoContent">{value}</TagName>
            ) : (
              value
            )}
          </div>
        );
      } else if (key === "question") {
        return (
          <div className="notesQuestion" key={index}>
            <h2 className="questionTitle">{value.title}</h2>
            <p className="questionAnswer">{value.answer}</p>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className={className}>
      <div className="panel panel-default">
        <div className="panel-body text-center">
          <h1 className="notesHeader">
            <b>{heading}</b>
          </h1>
          <div className="notesContainer">{renderPreviewElements()}</div>
          <a
            className="btn btn-primary notesRedirect"
            target="blank"
            href={fullLink}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

function Info({ header, content, className }) {
  return (
    <div className={className}>
      <div className="infoBox">
        <h1 className="infoHeader">{header}</h1>
        <p className="infoContent">{content}</p>
      </div>
    </div>
  );
}

function Lesson({ content }) {
  const renderLessonContent = () => {
    return Object.entries(content).map(([key, value]) => {
      if (value.Type === 'Heading') {
        return <h1 className="lessonH justify-content-center" key={key}>{value.Content}</h1>;
      } else if (value.Type === 'Paragraph') {
        return <p className="lessonP justify-content-center" key={key}>{value.Content}</p>;
      } else if (value.Type === 'Image') {
        return <img className="lessonI justify-content-center" src={value.Content} alt={`Lesson Image ${key}`} key={key} />;
      } else if (value.Type === 'Video') {
        if (value.Content.type === 'embed') {
          return (
            <div className="lessonVC justify-content-center" key={key}>
              <iframe className='lessonV' title={`Lesson Video ${key}`} src={value.Content.source} />
            </div>
          );
        }
      } else if (value.Type === '2COL') {
        return (
          <div className="row justify-content-center" key={key}>
            <div className="col-md-5 justify-content-center">
              {renderLessonContentInColumns(value.Content.column_1)}
            </div>
            <div className="col-md-5 justify-content-center">
              {renderLessonContentInColumns(value.Content.column_2)}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const renderLessonContentInColumns = (columnContent) => {
    return Object.entries(columnContent).map(([key, value]) => {
      if (value.Type === 'Heading') {
        return <h1 className="lessonH" key={key}>{value.Content}</h1>;
      } else if (value.Type === 'Paragraph') {
        return <p className="lessonP" key={key}>{value.Content}</p>;
      } else if (value.Type === 'Image') {
        return <img className="lessonI" src={value.Content} alt={`Lesson Image ${key}`} key={key} />;
      } else if (value.Type === 'Video') {
        if (value.Content.type === 'embed') {
          return (
            <div className="lessonVC" key={key}>
              <iframe className='lessonV' title={`Lesson Video ${key}`} src={value.Content.source} allowfullscreen="true" />
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div className="panel justify-content-center">
      <div className="container justify-content-center text-center">
        {renderLessonContent()}
      </div>
    </div>
  );
}

export { TextPanel, TextPanelWithIcon, Notes, Info, Lesson };