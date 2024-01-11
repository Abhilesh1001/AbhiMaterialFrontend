import React from 'react'

interface TextInputProps {
    value: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    width?:string
  }

  const TextInput: React.FC<TextInputProps> = ({ value, onChange,onKeyDown,width }) => {
    return (
      <div className='flex'>
        <input
          required
          type="text"
          value={value !== null ? value : ''}
          onChange={onChange}
          className={`form-control text-sm ${width}`}
        />
      </div>
    );
  };
export default TextInput