import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm({ onSubmit }) {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please enter your name')
      .min(7, 'Name is too short!'),
    email: Yup.string().email().required('Please enter the email'),
    password: Yup.string()
      .required('Please enter the password')
      .min(7, 'Password is too short!'),
  });

  const handleSubmit = (values, actions) => {
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
            <label htmlFor={nameId}>Name</label>
            <Field id={nameId} name="name" className={styles.formField} />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>
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
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
