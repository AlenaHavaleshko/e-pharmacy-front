'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '@/src/lib/api/clientApi';
import { useAuthStore } from '@/src/lib/store/authStore';
import css from './LoginForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
});

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const auth = await loginUser({
            email: values.email.trim().toLowerCase(),
            password: values.password.trim(),
          });
          setAuth(auth.user, auth.token);
          toast.success(`Welcome back, ${auth.user.name}!`);
          if (onSuccess) onSuccess();
          else router.push('/medicine');
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? 'Login failed. Please check your credentials.';
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          {/* Email */}
          <div className={css.field}>
            <Field
              suppressHydrationWarning
              className={`${css.input} ${errors.email && touched.email ? css.input_error : ''}`}
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
            />
            <ErrorMessage
              name="email"
              component="p"
              className={css.error_msg}
            />
          </div>

          {/* Password */}
          <div className={css.field}>
            <div className={css.password_wrap}>
              <Field
                suppressHydrationWarning
                className={`${css.input} ${errors.password && touched.password ? css.input_error : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
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
                  <use
                    href={`/sprite.svg#icon-eye${showPassword ? '' : '-off'}`}
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className={css.error_msg}
            />
          </div>

          <button
            suppressHydrationWarning
            className={css.submit_btn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className={css.spinner} /> : 'Log in'}
          </button>

          <p className={css.footer_text}>
            {onSwitch ? (
              <button
                type="button"
                className={css.footer_link}
                onClick={onSwitch}
              >
                Don&apos;t have an account?
              </button>
            ) : (
              <Link href="/register" className={css.footer_link}>
                Don&apos;t have an account?
              </Link>
            )}
          </p>
        </Form>
      )}
    </Formik>
  );
}
