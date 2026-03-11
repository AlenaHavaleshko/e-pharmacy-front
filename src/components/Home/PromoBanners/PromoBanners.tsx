import PromoBannerItem from './PromoBannerItem';
import styles from './PromoBanners.module.css';

const banners = [
  {
    index: 1,
    title: 'Huge Sale',
    value: '70%',
    buttonLabel: 'Shop now',
    href: '/medicine?discount=70',
  },
  {
    index: 2,
    title: 'Secure delivery',
    value: '100%',
    buttonLabel: 'Read more',
    href: '/medicine-store',
  },
  {
    index: 3,
    title: 'Off',
    value: '35%',
    buttonLabel: 'Shop now',
    href: '/medicine?discount=35',
  },
];

export default function PromoBanners() {
  return (
    <section className={styles.section}>
      {banners.map((banner) => (
        <PromoBannerItem key={banner.index} {...banner} />
      ))}
    </section>
  );
}
