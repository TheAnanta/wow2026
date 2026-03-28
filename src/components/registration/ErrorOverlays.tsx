// src/components/registration/ErrorOverlays.tsx
import React from 'react';
import styles from './Registration.module.css';

interface ErrorOverlayProps {
  type: 'signin' | 'account';
  onTryAgain: () => void;
}

export const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ type, onTryAgain }) => {
  const content = {
    signin: {
      title: 'Whoops!\nUnable to sign in.',
      text: 'To register, grant permission to view, edit and create your Google Developer Profile. A developer profile will allow you to get custom recommendations and create your own agenda with save sessions and learning material in My I/O.',
      button: 'Try again',
    },
    account: {
      title: 'Uh oh.\nSomething went wrong.',
      text: 'The user account type is not allowed. To learn more or get help, visit the FAQ.',
      button: 'Back to home',
    }
  };

  const activeContent = content[type];

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorGraphic}></div>
      <h2 className={styles.errorTitle} style={{ whiteSpace: 'pre-line' }}>{activeContent.title}</h2>
      <p className={styles.errorText}>{activeContent.text}</p>
      
      <button 
        type="button" 
        className={styles.tryAgainButton}
        onClick={onTryAgain}
      >
        {activeContent.button}
      </button>

      <div style={{ marginTop: 'auto', padding: '2rem 0', fontSize: '0.875rem' }}>
        <p>Google I/O 2026</p>
      </div>
    </div>
  );
};
