import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import styles from '../../components/items/Items.module.css'; // ensure headerWrapper is here

export default function ItemDetailLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className={`flex-grow-1 ${styles.mainContent}`}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
