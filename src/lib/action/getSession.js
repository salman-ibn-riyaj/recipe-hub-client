
'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"




export const getSessionData = async ()  => {
 const session =  await auth.api.getSession({
    headers: await headers() 
})

  return session?.user || null
}

export const getUserToken = async () => {
  try {
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get('cookie');
    const baseUrl = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const tokenUrl = `${baseUrl}/api/auth/token`;
    const res = await fetch(tokenUrl, {
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return data.token;
    }
    console.error("Token fetch failed:", res.status, "from", tokenUrl);
  } catch (err) {
    console.error("Failed to get JWT token", err);
  }
  return null;
}

export const requireRole = async (role) => {
  const user = await getSessionData()
  if(user.role !== role){
    return redirect('/unauthorized')
  }
}