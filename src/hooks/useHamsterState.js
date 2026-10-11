import { useState } from 'react';

export function useHamsterState() {
  const [isSleeping, setIsSleeping] = useState(true);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true); // Default Sign Up aktif pertama kali

  // Menyimpan data registrasi sementara dalam memori (React State)
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const toggleSleep = () => {
    setIsSleeping((prev) => !prev);
    setFocusedField(null);
    setLoginStatus(null);
    setErrorMessage('');
  };

  const handleFocus = (field) => {
    setFocusedField(field);
    setLoginStatus(null);
    setErrorMessage('');
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Logika pendaftaran akun (Sign Up)
  const handleSignUp = (email, password) => {
    setIsSubmitting(true);
    setLoginStatus(null);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);

      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        setLoginStatus('error');
        setErrorMessage('Email sudah terdaftar! Silakan pindah ke tab Sign In.');
        return;
      }

      const newUser = { email, password };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setLoginStatus('success');
      setCurrentUser(newUser);
    }, 800);
  };

  // Logika masuk akun (Sign In)
  const handleSignIn = (email, password) => {
    setIsSubmitting(true);
    setLoginStatus(null);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);

      const user = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        setLoginStatus('success');
        setCurrentUser(user);
      } else {
        setLoginStatus('error');
        setErrorMessage('Email atau password salah / belum terdaftar!');
      }
    }, 800);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginStatus(null);
    setErrorMessage('');
  };

  return {
    isSleeping,
    toggleSleep,
    focusedField,
    showPassword,
    setShowPassword,
    isSubmitting,
    loginStatus,
    errorMessage,
    currentUser,
    isSignUp,
    setIsSignUp,
    handleSignUp,
    handleSignIn,
    handleLogout,
    handleFocus,
    handleBlur
  };
} 