'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { loginUser } from '@/src/lib/api/clientApi';
import { useAuthStore } from '@/src/lib/store/authStore';
import css from './LoginForm.module.css';

interface Fields {
  email: string;
  password: string;
}

type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (fields.password.trim().length < 8)
    errors.password = 'Password must be at least 8 characters.';
  return errors;
}

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitch,
}: LoginFormProps = {}) {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [fields, setFields] = useState<Fields>({ email: '', password: '' });
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
      const auth = await loginUser({
        email: fields.email.trim().toLowerCase(),
        password: fields.password.trim(),
      });
      setAuth(auth.user, auth.token);
      toast.success(`Welcome back, ${auth.user.name}!`);
      if (onSuccess) onSuccess();
      else router.push('/medicine');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? 'Login failed. Please check your credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <div className={css.field}>
        <input
          suppressHydrationWarning
          className={`${css.input} ${errors.email ? css.input_error : ''}`}
          type="email"
          name="email"
          placeholder="Email address"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <p className={css.error_msg}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div className={css.field}>
        <div className={css.password_wrap}>
          <input
            suppressHydrationWarning
            className={`${css.input} ${errors.password ? css.input_error : ''}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            suppressHydrationWarning
            type="button"
            className={css.eye_btn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg width={18} height={18} aria-hidden="true">
              <use href={`/sprite.svg#icon-eye${showPassword ? '' : '-off'}`} />
            </svg>
          </button>
        </div>
        {errors.password && <p className={css.error_msg}>{errors.password}</p>}
      </div>

      <button
        suppressHydrationWarning
        className={css.submit_btn}
        type="submit"
        disabled={loading}
      >
        {loading ? <span className={css.spinner} /> : 'Log in'}
      </button>

      <p className={css.footer_text}>
        {onSwitch ? (
          <button type="button" className={css.footer_link} onClick={onSwitch}>
            Don&apos;t have an account?
          </button>
        ) : (
          <Link href="/register" className={css.footer_link}>
            Don&apos;t have an account?
          </Link>
        )}
      </p>
    </form>
  );
}
