import { ChangeEvent } from "react";
import styles from "./FormInput.module.scss";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div className={styles.inputContainer}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={name}>{label}</label>
      <span className={styles.spanBar}></span>
    </div>
  );
}
