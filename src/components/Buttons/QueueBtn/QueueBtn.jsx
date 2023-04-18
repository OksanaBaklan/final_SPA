import styles from './LoadMoreBtn.module.scss';
import PropTypes from 'prop-types';

export default function QueueBtn({ onClickQueueBtn }) {
  return (
    <button
      type="button"
      name="Load more"
      className={styles.Button}
      onClick={onClickQueueBtn}
    >
      <span className="lable">add to queue / remove from queue</span>
    </button>
  );
}

QueueBtn.propType = {
  onClick: PropTypes.func.isRequired,
};