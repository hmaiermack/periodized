import * as React from 'react';
import { string } from 'yup/lib/locale';

interface IFormInputProps {
    children: React.ReactNode;
    label: string;
    required?: boolean
    register: any;
    errors?: any;
}

//probably naive implementation -> look into doing it better
const FormInput = ({children, register, label, required, errors}: IFormInputProps) => {

  return (
    <div>
        <label className={errors ? "text-sm font-bold text-red-600 block" : "text-sm font-bold text-gray-600 block"}>{label}</label>
        <input type="text" {...register(label, {required: required})} className={errors ? "w-full p-2 border-2 border-red-600 rounded mt-1" : "w-full p-2 border border-gray-600 rounded mt-1" } />
        {errors && (<span className="text-red-600">
            {children}
            </span>)}
    </div>
  );
};

export default FormInput;
