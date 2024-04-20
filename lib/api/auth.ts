import { API_URL } from "./config";

export const login = async (data: { email: string }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status !== 200) {
    throw new Error('Error during the login process');
  }
};

export const authenticate = async (data: {
  email: string, 
  emailToken: string
}) => {
  const res = await fetch(`${API_URL}/auth/authenticate`, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status !== 200) {
    throw new Error('Error during the login process');
  }
  return res.json();
};

export const register = async (data: { email: string; username: string; name: string }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify(data),
  });
  return res;  // Return the fetch response directly for detailed handling in the component
};
