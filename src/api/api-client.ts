

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @param endpoint
 * @param params 
 */
export const get = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
  const url = buildUrl(endpoint, params);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  const responseData = await response.json();
  
  if (responseData && 'data' in responseData) {
    return responseData.data as T;
  }
  
  return responseData as T;
};

/**
 * @param endpoint
 * @param data 
 */
export const post = async <T, D extends Record<string, unknown>>(endpoint: string, data: D): Promise<T> => {
  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response.json();
};

/**
 * @param endpoint 
 * @param data
 */
export const put = async <T, D extends Record<string, unknown>>(endpoint: string, data: D): Promise<T> => {
  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response.json();
};

/**
 * @param endpoint
 */
export const del = async <T>(endpoint: string): Promise<T> => {
  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response.json();
};


const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`${API_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};