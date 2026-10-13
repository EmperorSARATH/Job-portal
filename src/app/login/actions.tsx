


'use server';


import {config} from '@/lib/config';

export async function authenticateUser(credentials: { email: string; password: string; userType:string }) {
  try {
    // This runs securely on your server. 
    // Your actual backend URL is never exposed to the browser.
      //
      const targetUrl = `${config.apiBaseUrl}/api/users/login`;

      console.log("🌐 STEP 2: Attempting to fetch URL:", targetUrl);

    const response = await fetch(`${config.apiBaseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("📡 STEP 3: Received response with status:", response.status);

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Server action error:", err);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}
