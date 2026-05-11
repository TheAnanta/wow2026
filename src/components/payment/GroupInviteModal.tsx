import React, { useEffect, useState } from 'react';
import { generateGroupCoupons } from '../../services/registrationStubs';
import { IconCheck } from './Icons';

interface GroupInviteModalProps {
  orderId: string;
  onFinish: () => void;
  isMock?: boolean;
}

export const GroupInviteModal: React.FC<GroupInviteModalProps> = ({ orderId, onFinish, isMock }) => {
  const [groupEmails, setGroupEmails] = useState(['', '', '', '']);
  const [generatedCodes, setGeneratedCodes] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isMock) {
      const saved = localStorage.getItem('wow_mock_group_invites');
      if (saved) {
        setGeneratedCodes(JSON.parse(saved));
      }
    } else if (orderId) {
      setIsGenerating(true);
      generateGroupCoupons(orderId, [])
        .then(codes => {
          if (codes && codes.length > 0) setGeneratedCodes(codes);
        })
        .catch(console.error)
        .finally(() => setIsGenerating(false));
    }
  }, [isMock, orderId]);

  const handleGenerateInvites = async () => {
    if (groupEmails.some(e => !e.trim() || !e.includes('@'))) {
      alert('Please enter 4 valid email addresses.');
      return;
    }

    setIsGenerating(true);
    try {
      if (isMock) {
        await new Promise(r => setTimeout(r, 1500));
        const mockCodes = groupEmails.map((email, i) => ({
          code: `MOCK-WOW-${i}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          restricted_emails: [email]
        }));
        setGeneratedCodes(mockCodes);
        localStorage.setItem('wow_mock_group_invites', JSON.stringify(mockCodes));
      } else {
        const codes = await generateGroupCoupons(orderId, groupEmails);
        setGeneratedCodes(codes);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to generate invites.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onFinish} />

      {/* Modal Card - M3 Expressive Tonal Design */}
      <div className="relative w-full max-w-[540px] rounded-[40px] overflow-hidden shadow-2xl animate-scale-in"
        style={{ background: 'var(--m-surface-container-low)', border: '1px solid var(--m-outline-variant)' }}>

        {/* Header Banner */}
        <div className="p-8 pb-4 flex items-start gap-4">
          <div className="w-14 h-14 rounded-3xl flex items-center justify-center flex-none"
            style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
          </div>
          <div>
            <h2 className="t-headline-s" style={{ color: 'var(--m-on-surface)' }}>Invite your squad</h2>
            <p className="t-body-m" style={{ color: 'var(--m-on-surface-variant)' }}>Distribution of 4 group passes</p>
          </div>
        </div>

        <div className="px-8 pb-8">
          {generatedCodes.length === 0 ? (
            <div className="flex flex-col gap-4">
              <p className="t-body-m" style={{ color: 'var(--m-on-surface-variant)' }}>
                Enter the email IDs of your 4 friends. We'll generate 100% discount codes locked to their addresses.
              </p>

              <div className="grid grid-cols-1 gap-3 mt-2">
                {groupEmails.map((email, i) => (
                  <input
                    key={i}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...groupEmails];
                      newEmails[i] = e.target.value;
                      setGroupEmails(newEmails);
                    }}
                    placeholder={`Friend ${i + 1} Email`}
                    className="w-full h-14 px-6 rounded-2xl t-body-m transition-all outline-none focus:ring-2 focus:ring-[var(--m-primary)]"
                    style={{ background: 'var(--m-surface-container-highest)', color: 'var(--m-on-surface)', border: '1px solid var(--m-outline-variant)' }}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={onFinish}
                  className="flex-1 h-14 rounded-full font-bold transition-all"
                  style={{ color: 'var(--m-primary)' }}
                >
                  Skip for now
                </button>
                <button
                  onClick={handleGenerateInvites}
                  disabled={isGenerating}
                  className="flex-[2] h-14 rounded-full font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                  style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
                >
                  {isGenerating ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <IconCheck size={20} stroke={3} />}
                  {isGenerating ? 'Generating...' : 'Generate Codes'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="p-5 rounded-3xl" style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
                <p className="t-title-s">Successfully generated!</p>
                <p className="t-body-s opacity-90">Share these codes with your friends. They can register for free.</p>
              </div>

              <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                {generatedCodes.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl flex items-center justify-between group transition-colors"
                    style={{ background: 'var(--m-surface-container-highest)', border: '1px solid var(--m-outline-variant)' }}>
                    <div className="flex flex-col min-w-0">
                      <span className="t-label-s opacity-60 truncate">{item.restricted_emails[0]}</span>
                      <span className="t-title-m font-mono tracking-wider" style={{ color: 'var(--m-on-surface)' }}>{item.code}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.code);
                        alert('Code copied!');
                      }}
                      className="p-3 rounded-full hover:bg-[var(--m-primary-container)] hover:text-[var(--m-on-primary-container)] transition-colors flex-none"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={onFinish}
                className="w-full h-14 rounded-full font-bold transition-all mt-2"
                style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
              >
                Close & View Badge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
