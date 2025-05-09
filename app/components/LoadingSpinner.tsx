import styles from './loadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div className={styles.spinnerInner}></div>
      </div>
      <p className={styles.loadingText}>Generating your post...</p>
    </div>
  );
};

export default LoadingSpinner; 