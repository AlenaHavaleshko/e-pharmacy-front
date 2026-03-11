'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { registerUser, loginUser } from '@/src/lib/api/clientApi';
import { useAuthStore } from '@/src/lib/store/authStore';
import css from './RegisterForm.module.css';

interface Fields {
  name: string;
  email: string;
  phone: string;
  password: string;
}

type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (!/^\+?[\d\s\-(]{7,15}$/.test(fields.phone.trim()))
    errors.phone = 'Enter a valid phone number.';
  if (fields.password.length < 8)
    errors.password = 'Password must be at least 8 characters.';
  return errors;
}

export default function RegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setLoading(true);
    try {
      // Register
      await registerUser(fields);
      // Auto-login (RegisterForm v2 — redirect to private page)
      const auth = await loginUser({
        email: fields.email,
        password: fields.password,
      });
      setAuth(auth.user, auth.token);
      toast.success(`Welcome, ${auth.user.name}!`);
      router.push('/medicine');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof Fields, placeholder: string, type = 'text') => (
    <div className={css.field}>
      <input
        className={`${css.input} ${errors[key] ? css.input_error : ''}`}
        type={key === 'password' ? (showPassword ? 'text' : 'password') : type}
        name={key}
        placeholder={placeholder}
        value={fields[key]}
        onChange={handleChange}
        autoComplete={
          key === 'email'
            ? 'email'
            : key === 'password'
              ? 'new-password'
              : key === 'name'
                ? 'name'
                : 'tel'
        }
      />
      {key === 'password' && (
        <button
          type="button"
          className={css.eye_btn}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <svg width={18} height={18} aria-hidden="true">
            <use href={`/sprite.svg#icon-eye${showPassword ? '' : '-off'}`} />
          </svg>
        </button>
      )}
      {errors[key] && <p className={css.error_msg}>{errors[key]}</p>}
    </div>
  );

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.grid}>
        {field('name', 'User Name')}
        {field('email', 'Email address', 'email')}
        {field('phone', 'Phone number', 'tel')}
        {field('password', 'Password')}
      </div>

      <div className={css.submit_wrap}>
       <button className={css.submit_btn} type="submit" disabled={loading}>
        {loading ? <span className={css.spinner} /> : 'Register'}
      </button>

      <p className={css.footer_text}>
        <Link href="/login" className={css.footer_link}>
          Already have an account?
        </Link>
      </p>

      </div>

      
    </form>
  );
}
