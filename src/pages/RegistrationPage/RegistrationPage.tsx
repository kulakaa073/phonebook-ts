import { useDispatch } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { register } from '../../redux/auth/operations';
import styles from './RegistrationPage.module.css';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';

import type { AppDispatch } from '../../redux/store';
import type { Credentials } from '../../types';

export default function RegistrationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const toastOptions: ToastOptions = {
    duration: 4000,
    position: 'top-right',
  };

  const toasts = {
    success: () =>
      toast.success('Registered successfully! Welcome', toastOptions),
    fail: () =>
      toast.error(
        "Sorry, we're encountered an error! Try again later!",
        toastOptions
      ),
  };

  const handleSignup = (signupData: Credentials) => {
    dispatch(
      register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      })
    )
      .unwrap()
      .then(() => toasts.success())
      .catch(() => toasts.fail());
  };

  return (
    <div className={styles.container}>
      <RegistrationForm onSubmit={handleSignup} />
      <Toaster />
    </div>
  );
}
