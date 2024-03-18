import { ChangeEvent, FocusEvent, useState } from 'react';
import IValidations from '../types/IValidations';
import useValidation from './useValidation';

const useInput = (initialValue:string, validations:IValidations) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    ...valid,
    isDirty,
  };
};

export default useInput;
