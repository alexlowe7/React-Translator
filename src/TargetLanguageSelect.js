import React from 'react';

const TargetLanguageSelect = ({ options, handleChange, language }) => {

  return (
    <select value={language} className='form-select select' onChange={(e) => handleChange(e.target.value)}>
			{Object.keys(options).map(key => (
					<option key={key} value={key}>{options[key]}</option>
			))}
    </select>
  );
}

export default TargetLanguageSelect
