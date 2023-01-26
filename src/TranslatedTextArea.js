import React from 'react';

const TranslatedTextArea = ({ text }) => {
  return (
    <div>
			<textarea 
				value={text}
				disabled
				className='form-control my-textarea'
			/>
    </div>
  );
}

export default TranslatedTextArea;