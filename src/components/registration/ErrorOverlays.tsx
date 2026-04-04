// src/components/registration/ErrorOverlays.tsx
import React from 'react';

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
    <div className="flex flex-col items-center text-center h-full">
      <div
        className="w-[120px] h-[120px] rounded-full border-4 border-[#000000] mt-8 mb-8"
        style={{ background: 'linear-gradient(135deg, #a4f21d 0%, #00ffff 33%, #4169e1 66%, #ff00ff 100%)' }}
      />
      <h2 className="text-xl font-bold mb-4 whitespace-pre-line">{activeContent.title}</h2>
      <p className="text-sm text-[#5f6368] leading-[1.5] mb-6">{activeContent.text}</p>

      <button
        type="button"
        onClick={onTryAgain}
        className="py-3 px-10 bg-[#000000] text-white border-none rounded-full font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 w-fit"
      >
        {activeContent.button}
      </button>

      <div className="mt-auto py-8 text-sm">
        <p>Google I/O 2026</p>
      </div>
    </div>
  );
};
