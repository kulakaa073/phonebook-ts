import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: LoginFormValues) => void;
}

export default function LoginForm({ onSubmit }: Props) {
  const emailId = useId();
  const passwordId = useId();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter the email'),
    password: Yup.string().required('Please enter the password'),
  });

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div>
            <label htmlFor={emailId}>Email</label>
            <Field id={emailId} name="email" className={styles.formField} />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>
          <div>
            <label htmlFor={passwordId}>Password</label>
            <Field
              id={passwordId}
              name="password"
              className={styles.formField}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
