const BASE_URL = 'https://backend.etijah.sa/website';

interface QueryOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

interface QueryResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export async function query<T>({
  endpoint,
  method = 'GET',
  data,
  params,
  headers = {},
}: QueryOptions): Promise<QueryResponse<T>> {
  try {
    // Construct URL with query parameters
    let url = `${BASE_URL}/${endpoint}`;
    console.log(url);
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url += `?${queryParams.toString()}`;
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    // Add body for non-GET requests if data exists
    if (method !== 'GET' && data) {
      requestOptions.body = JSON.stringify(data);
    }

    // Make the request
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    return {
      data: responseData as T,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    throw new Error(`Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
