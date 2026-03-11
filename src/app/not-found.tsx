import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page does not exist',
  openGraph: {
    title: 'Page not found',
    description: 'The page does not exist',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'logo',
      },
    ],
    url: `https://e-pharmacy/not-found`,
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
