import { forwardRef } from "react";
import styles from "./FormInput.module.scss";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type = "text", ...rest }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder=" "
          ref={ref}
          {...rest}
        />
        <label htmlFor={name}>{label}</label>
        <span className={styles.spanBar}></span>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
