import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from './hooks/useMousePosition';
import { useHamsterState } from './hooks/useHamsterState';
import HamsterCanvas from './components/HamsterCanvas/HamsterCanvas';
import LoginForm from './components/LoginForm/LoginForm';

export default function App() {
  const mousePos = useMousePosition();
  const {
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
  } = useHamsterState();

  return (
    <div className="w-screen h-screen m-0 p-0 bg-[#fcf8f5] flex items-center justify-center font-sans overflow-hidden">
      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full bg-white shadow-none overflow-hidden flex flex-col lg:flex-row m-0 p-0"
      >
        {/* Left Side: Interactive Hamster Canvas */}
        <HamsterCanvas
          mousePos={mousePos}
          focusedField={focusedField}
          showPassword={showPassword}
          loginStatus={loginStatus}
          isSleeping={isSleeping}
          onToggleSleep={toggleSleep}
        />

        {/* Right Side: Sign Up/Sign In Form or Dashboard */}
        <AnimatePresence mode="wait">
          {!isSleeping && (
            <motion.div
              key={currentUser ? 'dashboard' : 'login-form'}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white"
            >
              {currentUser ? (
                <div className="text-center p-8 max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-[#f7cad0] text-white font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    {currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-bold text-[#4a4252]">Hello, {currentUser.email}!</h2>
                  <p className="text-sm text-[#8e8296] mt-2 mb-6">
                    Account verified successfully. Campbell is happy to see you! 🎉
                  </p>
                  <button
                    onClick={handleLogout}
                    className="py-3 px-6 bg-[#e8b4b8] hover:bg-[#e09fa4] text-white font-medium rounded-full shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <LoginForm
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isSubmitting={isSubmitting}
                  loginStatus={loginStatus}
                  errorMessage={errorMessage}
                  isSignUp={isSignUp}
                  setIsSignUp={setIsSignUp}
                  onSignUp={handleSignUp}
                  onSignIn={handleSignIn}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}