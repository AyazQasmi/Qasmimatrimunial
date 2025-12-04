
const CREDENTIALS_KEY = 'admin_creds';

const DEFAULT_CREDS = {
  username: 'Ayaz Qasmi',
  password: 'Kwsb@786786'
};

export const getCredentials = () => {
  const stored = localStorage.getItem(CREDENTIALS_KEY);
  if (!stored) {
    return DEFAULT_CREDS;
  }
  return JSON.parse(stored);
};

export const updateCredentials = (username: string, password: string) => {
  const newCreds = { username, password };
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newCreds));
};

export const verifyLogin = (u: string, p: string) => {
  const creds = getCredentials();
  return u === creds.username && p === creds.password;
};
