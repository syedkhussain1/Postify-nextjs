import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faMapMarkerAlt, faGrin, faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import styles from './post.module.css';

type Props = {
  post: string;
  imageSrc?: string;
};

const Post: React.FC<Props> = ({ post, imageSrc }) => {
  return (
    <div className={styles.tweetWrapper}>
      <div className={styles.inputBox}>
        <textarea className={styles.tweetArea} value={post} readOnly />
        {imageSrc && <Image src={imageSrc} alt={post} width={475} height={475} className={styles.image} />}
        <div className={styles.privacy}>
          <FontAwesomeIcon icon={faGlobeAsia} />
          <span>Everyone can reply</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <ul className={styles.icons}>
          <li><FontAwesomeIcon icon={faFileImage} /></li>
          <li><FontAwesomeIcon icon={faMapMarkerAlt} /></li>
          <li><FontAwesomeIcon icon={faGrin} /></li>
          <li><FontAwesomeIcon icon={faUser} /></li>
        </ul>
        <div className={styles.content}>
          <span className={styles.counter}>100</span>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Post;