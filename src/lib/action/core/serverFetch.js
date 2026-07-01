'use server'

import { getUserToken } from "../getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {}
  return header;
}


export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`);

    
    if (!res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const errorData = await res.json();
        console.error('Server API Error:', errorData);
      } else {
        console.error('Server API Error:', res.status, res.statusText);
      }
      return []; 
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.error('Expected JSON but got:', contentType);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('serverFetch failed:', err.message);
    return [];
  }
}

export const protectedFetch = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: await authHeader(),
    });

    if (!res.ok) {
      console.error('protectedFetch Error:', res.status, res.statusText);
      return [];
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.error('Expected JSON but got:', contentType);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('protectedFetch failed:', err.message);
    return [];
  }
}