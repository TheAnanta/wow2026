// src/services/stubs.ts

export const handleRegister = async () => {
  console.log('Registration submitted');
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const handleSaveToMyIO = async (itemId: string) => {
  console.log(`Saved item ${itemId} to My I/O`);
  return new Promise((resolve) => setTimeout(resolve, 300));
};

export const handleFindEvent = async () => {
  console.log('Finding events near you...');
  return new Promise((resolve) => setTimeout(resolve, 300));
};
