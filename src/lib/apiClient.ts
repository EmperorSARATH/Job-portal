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


export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const isPublicEndpoint = url.includes("/ESsearch");

  const headers: HeadersInit = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  if (token && !isPublicEndpoint) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn("Unauthorized request");
  }

  return response;
};
