
// This is a mock service to simulate Supabase Edge Function calls.
// In a real application, you would use the Supabase client library.

export const sendOtp = (phoneNumber: string): Promise<{ success: boolean }> => {
  console.log(`Simulating sending OTP to ${phoneNumber}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('OTP sent successfully (mocked).');
      resolve({ success: true });
    }, 1500);
  });
};

export const verifyOtp = (phoneNumber: string, otp: string): Promise<{ success: boolean; isNewUser: boolean }> => {
  console.log(`Simulating verifying OTP ${otp} for ${phoneNumber}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      // Mock logic: Correct OTP is "123456".
      // Mock logic: Any number ending in '0' is a new user.
      if (otp === '123456') {
        const isNewUser = phoneNumber.endsWith('0');
        console.log(`OTP verified successfully (mocked). New user: ${isNewUser}`);
        resolve({ success: true, isNewUser });
      } else {
        console.log('OTP verification failed (mocked).');
        resolve({ success: false, isNewUser: false });
      }
    }, 1500);
  });
};

export const registerUser = (details: { phoneNumber: string, fullName: string; nationalId: string; carModel: string; plateNumber: string; productionYear: string; }): Promise<{ success: boolean }> => {
    console.log(`Simulating registering user:`, details);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('User registered successfully (mocked).');
            resolve({ success: true });
        }, 1500);
    });
};
