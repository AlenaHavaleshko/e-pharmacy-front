'use client';

import { useState } from 'react';
import Modal from '@/src/components/Modal/Modal';
import LoginForm from '@/src/components/LoginForm/LoginForm';
import RegisterForm from '@/src/components/RegisterForm/RegisterForm';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>('login');

  const isLogin = view === 'login';

  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.title}>
          {isLogin ? 'Log in to your account' : 'Sign Up'}
        </h2>
        <p className={styles.subtitle}>
          {isLogin
            ? 'Please login to your account before continuing.'
            : 'Before proceeding, please register on our site.'}
        </p>

        {isLogin ? (
          <LoginForm onSuccess={onClose} onSwitch={() => setView('register')} />
        ) : (
          <RegisterForm
            onSuccess={onClose}
            onSwitch={() => setView('login')}
            layout="column"
          />
        )}
      </div>
    </Modal>
  );
}
