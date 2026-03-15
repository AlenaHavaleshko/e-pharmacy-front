import styles from './Title.module.css';

interface TitleProps {
  text?: string;
}

export default function Title({text}: TitleProps) {


 return (   <h2 className={styles.medicineStoresTitle}>
     {text}
   </h2>
 );

}