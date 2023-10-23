import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./editor.css";
import Nav from "./Nav";

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleExport = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState, null, 2));
    // You can further process the JSON content as needed, such as downloading it as a file
  };

  const toolbar = {
    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'image', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline'],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    },
  };

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="editor container editorGG">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          placeholder="Start typing here..."
          toolbar={toolbar}
        />
        <button onClick={handleExport}>Export</button>
      </div>
    </div>
  );
}

export default MyEditor;
