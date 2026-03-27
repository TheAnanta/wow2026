// src/components/sections/RegistrationOverlay.tsx
import React, { useState } from 'react';
import styles from './RegistrationOverlay.module.css';
import { Button } from '../ui/Button';
import { handleRegister } from '../../services/stubs';

interface RegistrationOverlayProps {
  onClose: () => void;
}

const INTERESTS = ['Android', 'Mobile', 'Machine Learning', 'Web', 'Cloud', 'Open Source', 'Design', 'Location/Maps'];

export const RegistrationOverlay: React.FC<RegistrationOverlayProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const onSubmit = async () => {
    setLoading(true);
    await handleRegister();
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Register for I/O</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        
        <div className={styles.banner}>
          <div className={styles.bannerGraphic}></div>
        </div>

        <div className={styles.body}>
          <p style={{ marginBottom: '2rem' }}>
            Create a developer profile to get recommendations for the best I/O content and custom I/O pins. You'll be able to see your profile across Google for Developers on demand.
          </p>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Display Name *</label>
            <input type="text" className={styles.input} placeholder="Developer" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Pronouns</label>
            <input type="text" className={styles.input} placeholder="e.g. they/them" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Role or job title</label>
            <input type="text" className={styles.input} placeholder="e.g. Software Engineer" />
          </div>

          <h3 className={styles.label} style={{ marginTop: '2rem' }}>Select your interests</h3>
          <p style={{ fontSize: '0.875rem', color: '#5f6368' }}>This will help us provide you with the most relevant I/O content.</p>
          
          <div className={styles.pillGroup}>
            {INTERESTS.map(interest => (
              <Button 
                key={interest}
                variant={selectedInterests.includes(interest) ? 'primary' : 'pill'}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="primary" onClick={onSubmit} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </div>
      </div>
    </div>
  );
};
