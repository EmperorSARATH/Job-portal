// src/lib/apiClient.ts
//
// export const apiClient = async (
//   url: string,
//   options: RequestInit = {}
// ): Promise<Response> => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//
//
//   const headers: HeadersInit = {
//     ...(options.headers || {}),
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     "Content-Type": "application/json",
//   };
//
//
//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });
//
//
//   if (response.status === 401) {
//     // Handle unauthorized
//     console.warn("Unauthorized request");
//   }
//
//   return response;
// };
//
//
//
//


const refreshToken = async (): Promise<boolean> => {

  const currentRefreshToken =
    localStorage.getItem("refreshToken");

  if (!currentRefreshToken) {
    return false;
  }

  const response = await fetch(
    `${config.apiBaseUrl}/api/users/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: currentRefreshToken,
      }),
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();

  localStorage.setItem(
    "accessToken",
    data.accessToken
  );

  localStorage.setItem(
    "refreshToken",
    data.refreshToken
  );

  return true;
};


export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {

  let token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const isPublicEndpoint = url.includes("/ESsearch");

  let headers: HeadersInit = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  if (token ) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && isPublicEndpoint) {
      const refreshed =
      await refreshToken();

    if (!refreshed) {

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      window.location.href = "/login";

      return response;

  }
  token =
      localStorage.getItem(
        "accessToken"
      );

    headers = {
      ...headers,
      Authorization:
        `Bearer ${token}`,
    };

    response = await fetch(url, {
      ...options,
      headers,
    });
  }

  return response;
};
