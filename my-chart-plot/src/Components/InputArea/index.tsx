import React from 'react';

type InputAreaProps = {
    value: any;
    handleChange: (event: any) => void;
}

function InputArea({handleChange, value}: InputAreaProps) {
    return (
        <div className="textarea-container">
            <textarea className='textarea' onChange={handleChange} />
        </div>
    )

}

export default InputArea;
