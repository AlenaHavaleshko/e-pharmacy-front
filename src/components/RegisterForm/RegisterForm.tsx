'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, loginUser } from '@/src/lib/api/clientApi';
import { useAuthStore } from '@/src/lib/store/authStore';
import css from './RegisterForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters.')
    .required('Name is required.'),
  email: Yup.string()
    .email('Enter a valid email address.')
    .required('Email is required.'),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-()]{7,20}$/, 'Enter a valid phone number.')
    .required('Phone is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
});

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
  layout?: 'grid' | 'column';
}

export default function RegisterForm({
  onSuccess,
  onSwitch,
  layout = 'grid',
}: RegisterFormProps = {}) {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await registerUser(values);
          const auth = await loginUser({
            email: values.email,
            password: values.password,
          });
          setAuth(auth.user, auth.token);
          toast.success(`Welcome, ${auth.user.name}!`);
          if (onSuccess) onSuccess();
          else router.push('/medicine');
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? 'Registration failed. Please try again.';
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={layout === 'column' ? css.gridColumn : css.grid}>
            {/* Name */}
            <div className={css.field}>
              <Field
                suppressHydrationWarning
                className={`${css.input} ${errors.name && touched.name ? css.input_error : ''}`}
                type="text"
                name="name"
                placeholder="User Name"
                autoComplete="name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className={css.error_msg}
              />
            </div>

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

            {/* Phone */}
            <div className={css.field}>
              <Field
                suppressHydrationWarning
                className={`${css.input} ${errors.phone && touched.phone ? css.input_error : ''}`}
                type="tel"
                name="phone"
                placeholder="Phone number"
                autoComplete="tel"
              />
              <ErrorMessage
                name="phone"
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
                  autoComplete="new-password"
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
          </div>

          <div className={css.submit_wrap}>
            <button
              suppressHydrationWarning
              className={css.submit_btn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className={css.spinner} /> : 'Register'}
            </button>

            <p className={css.footer_text}>
              {onSwitch ? (
                <button
                  type="button"
                  className={css.footer_link}
                  onClick={onSwitch}
                >
                  Already have an account?
                </button>
              ) : (
                <Link href="/login" className={css.footer_link}>
                  Already have an account?
                </Link>
              )}
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
