import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

import type { Credentials } from '../../types';

interface LoginFormProps {
  onSubmit: (values: Credentials) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const emailId = useId();
  const passwordId = useId();

  const initialValues: Credentials = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter the email'),
    password: Yup.string().required('Please enter the password'),
  });

  const handleSubmit = (
    values: Credentials,
    actions: FormikHelpers<Credentials>
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
              type={'password'}
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
