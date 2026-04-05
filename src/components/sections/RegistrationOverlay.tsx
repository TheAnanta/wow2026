// src/components/sections/RegistrationOverlay.tsx
import React, { useState } from 'react';
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
    <div className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-[100]">
      <div className="bg-white border border-[#000000] rounded-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#000000] flex justify-between items-center">
          <h2 className="text-xl font-medium">Register for WOW</h2>
          <button className="bg-none border-none text-2xl cursor-pointer text-[#202124]" onClick={onClose}>&times;</button>
        </div>

        {/* Banner */}
        <div className="h-[120px] flex justify-center items-end" style={{ background: 'linear-gradient(135deg, #a4f21d 0%, #00ffff 33%, #4169e1 66%, #ff00ff 100%)' }}>
          <div className="w-[120px] h-[60px] bg-white border border-[#000000] rounded-tl-[60px] rounded-tr-[60px] border-b-0" />
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="mb-8">
            Create a developer profile to get recommendations for the best WOW content and custom WOW pins. You'll be able to see your profile across Google for Developers on demand.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Display Name *</label>
            <input type="text" className="w-full py-3 px-4 border border-[#000000] rounded-lg bg-white text-[#202124] font-[inherit]" placeholder="Developer" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Pronouns</label>
            <input type="text" className="w-full py-3 px-4 border border-[#000000] rounded-lg bg-white text-[#202124] font-[inherit]" placeholder="e.g. they/them" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Role or job title</label>
            <input type="text" className="w-full py-3 px-4 border border-[#000000] rounded-lg bg-white text-[#202124] font-[inherit]" placeholder="e.g. Software Engineer" />
          </div>

          <h3 className="text-sm font-medium mt-8">Select your interests</h3>
          <p className="text-sm text-[#5f6368]">This will help us provide you with the most relevant WOW content.</p>

          <div className="flex flex-wrap gap-3 mt-4">
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

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#000000] flex justify-end">
          <Button variant="primary" onClick={onSubmit} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </div>
      </div>
    </div>
  );
};
