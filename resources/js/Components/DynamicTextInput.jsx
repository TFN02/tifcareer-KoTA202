import axios from 'axios';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DynamicTextInput = ({idVideo}) => {
  console.log("ada ga", idVideo)
  const [inputs, setInputs] = useState([{ hour: '', minute: '', second: '' }]);
  console.log("inputs", inputs)

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };


  const addInput = () => {
    const newInputs = [...inputs, { hour: '', minute: '', second: '' }];
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
          <div key={index} className='flex flex-row gap-3 py-2'>
            <label className='py-3'>Pertanyaan {index + 1}:</label>
            <div className='flex flex-row gap-3'>
              <input
                type="number"
                value={input.hour}
                onChange={(event) => handleInputChange(index, 'hour', event.target.value)}
                placeholder="Jam"
                className="input input-bordered input-primary w-full max-w-xs text-center text-sm"
              />
              <input
                type="number"
                value={input.minute}
                onChange={(event) => handleInputChange(index, 'minute', event.target.value)}
                placeholder="Menit"
                className="input input-bordered input-primary w-full max-w-xs text-center text-sm"
              />
              <input
                type="number"
                value={input.second}
                onChange={(event) => handleInputChange(index, 'second', event.target.value)}
                placeholder="Detik"
                className="input input-bordered input-primary w-full max-w-xs text-center text-sm"
              />
            </div>
            <button className="btn btn-ghost" onClick={() => removeInput(index)}>
              <FaTrashAlt />
            </button>
          </div>

        </div>
      ))}
      <div className='flex flex-row gap-2'>
      <button className='btn btn-primary btn-sm text-xs mt-2' onClick={addInput}>Tambah</button>
      </div>
    </div>
  );
};

export default DynamicTextInput;
