import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';


export class Http {

  protected readonly instance = axios.create({ baseURL: this.baseUrl });

  constructor(
    protected readonly baseUrl: string = '',
    protected readonly defaultHeaders: { [key: string]: string } = {},
  ) {
  }

  protected get _defaultHeaders() {
    // TODO: auth headers
    return {
      ...this.defaultHeaders,
      'Content-Type': 'application/json',
    };
  }

  async request<R, T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: T,
    headers: { [key: string]: string } = {},
  ): Promise<{ request: Promise<AxiosResponse<R>>, cancel: Canceler }> {
    const requestHeaders = { ...this._defaultHeaders, ...headers };
    const source = axios.CancelToken.source();

    const config: AxiosRequestConfig<T> = {
      method,
      url,
      headers: requestHeaders,
      cancelToken: source.token,
    };
    if (data) {
      config.data = data;
    }

    return {
      request: this.instance.request(config),
      cancel: source.cancel,
    };
  }

  get<R>(url: string, customHeaders: { [key: string]: string } = {}) {
    return this.request<R>('GET', url, null, customHeaders);
  }

  post<R, T = any>(url: string, data: T, customHeaders = {}) {
    return this.request<R, T>('POST', url, data, customHeaders);
  }

  put<R, T = any>(url: string, data: T, customHeaders = {}) {
    return this.request<R, T>('PUT', url, data, customHeaders);
  }

  delete<R>(url: string, customHeaders = {}) {
    return this.request<R>('DELETE', url, null, customHeaders);
  }
}
