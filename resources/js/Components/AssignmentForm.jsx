import { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"

const AssignmentForm = ({ inputs, handleInputChange, addInput, removeInput }) => {


    return (
        <div>
            <label className="py-3">Pertanyaan Tahap Video Resume :</label>
            {inputs.map((input, index) => (
                
                    <div key={index}>
                        <div className="flex flex-row gap-3 py-2">
                        <label className="py-3">Pertanyaan {[index + 1]} : </label>
                            <input
                                type="text"
                                value={input.question}
                                onChange={(event) => handleInputChange(index, 'question', event.target.value)}
                                placeholder="Contoh: Ceritakan Kelebihan dan kekurangan anda!"
                                className="input input-bordered input-primary w-full max-w-lg text-center text-sm"
                            />
                            <button className="btn btn-ghost" onClick={() => removeInput(index)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div> 
            ))}
            <div className='flex flex-row gap-2'>
                {inputs.length < 20 ?
                    <button className='btn btn-primary btn-sm text-xs mt-2' onClick={addInput}>Tambah Pertanyaan</button>
                    :
                    <button className='btn btn-primary btn-sm text-xs mt-2' disabled>Telah mencapai batas maksimal</button>
                }
            </div>
        </div>
    )
}
export default AssignmentForm