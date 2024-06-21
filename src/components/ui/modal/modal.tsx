import { memo } from 'react';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';

import { ModalOverlayUI } from '@ui';

import type { FC } from 'react';
import { TModalUIProps } from './type';

import styles from './modal.module.css';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button className={styles.button} type='button'>
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
