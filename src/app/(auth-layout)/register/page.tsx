import RegisterForm from '@/src/components/RegisterForm/RegisterForm';
import Image from 'next/image';
import css from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={css.page}>
      {/* Two-column content */}
      <main className={css.content}>
        {/* Left — promo */}
        <div className={css.promo}>
          <div className={css.pill_wrap}>
            <Image
              src="/register/roundpill2x.png"
              alt="Round pill"
              width={180}
              height={180}
              sizes="(max-width: 767px) 120px, 180px"
              className={css.pill_img}
              priority
            />
          </div>
          <p className={css.promo_text}>
            Your medication,{' '}delivered{' '}
            <span className={css.promo_highlight}>
              Say goodbye to all your healthcare
            </span>{' '}
            worries with us
          </p>
        </div>

        {/* Right — form */}
        <div className={css.form_wrap}>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
