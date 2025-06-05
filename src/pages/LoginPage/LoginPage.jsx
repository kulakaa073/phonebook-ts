import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../redux/auth/operations';
import styles from './LoginPage.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useDispatch();

  const toastOptions = {
    duration: 4000,
    position: 'top-right',
  };

  const toasts = {
    success: () =>
      toast.success('Logged in successfully! Welcome', toastOptions),
    fail: () =>
      toast.error(
        "Sorry, we're encountered an error! Try again later!",
        toastOptions
      ),
  };

  const handleSubmit = loginData => {
    dispatch(login({ email: loginData.email, password: loginData.password }))
      .unwrap()
      .then(() => toasts.success())
      .catch(() => toasts.fail());
  };

  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleSubmit} />
      <Toaster />
    </div>
  );
}
