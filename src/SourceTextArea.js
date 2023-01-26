import React from 'react';

const SourceTextArea = ({ text, onTextChange, onKeyDown }) => {
  return (
    <div>
        <textarea 
          value={text} 
          onChange={(event) => onTextChange(event.target.value)}
          onKeyDown={(event) => onKeyDown(event)}
          className='form-control my-textarea'
          placeholder='Type to translate'
          autoFocus
        />
    </div>
  );
}

export default SourceTextArea;

