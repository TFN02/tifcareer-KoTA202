import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DynamicTextInput = () => {
  const [inputs, setInputs] = useState(['']);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    const newInputs = [...inputs, ''];
    setInputs(newInputs);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>Pertanyaan {index + 1} : </label>
          <input
            type="number"
            value={input}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Misal: 1"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button className="btn btn-ghost" onClick={() => removeInput(index)}>
            <FaTrashAlt />
          </button>
        </div>
      ))}
      <button className='btn btn-primary btn-sm text-xs mt-2' onClick={addInput}>Tambah</button>
    </div>
  );
};

export default DynamicTextInput;
