import ENV_CONFIG from 'constant/env.config';
import Axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  CancelToken,
  CancelTokenSource,
  RawAxiosRequestHeaders,
} from 'axios';
import { localStorageService } from '../LocalStorageService';

interface RequestConfig extends AxiosRequestConfig {
  requestId?: string;
  redirectIfUnauthorized?: boolean;
}

export declare type QueryParams = {
  [key: string]: string | string[];
};

const BASE_URL = ENV_CONFIG.BACKEND_URL as string;

export class BaseApiService {
  private static instance: BaseApiService;

  private requestMap = new Map<string, CancelTokenSource>();

  public static getInstance(): BaseApiService {
    if (!this.instance) {
      this.instance = new BaseApiService();
    }
    return this.instance;
  }

  public get<T = any>(
    url: string,
    opts?: {
      params?: QueryParams;
      headers?: AxiosRequestHeaders;
      extras?: {
        requestId?: string;
        useAuth?: boolean;
      };
    }
  ): Promise<T> {
    return this.request<T>(
      {
        method: 'GET',
        url,
        headers: opts?.headers,
        params: opts?.params,
        requestId: opts?.extras?.requestId,
      },
      opts?.extras?.useAuth
    );
  }

  public delete<T = any>(
    url: string,
    opts?: {
      params?: QueryParams;
      headers?: AxiosRequestHeaders;
      extras?: {
        requestId?: string;
        useAuth?: boolean;
      };
    }
  ) {
    return this.request<T>(
      {
        method: 'DELETE',
        url,
        headers: opts?.headers,
        params: opts?.params,
        requestId: opts?.extras?.requestId,
      },
      opts?.extras?.useAuth
    );
  }

  public post<T = any>(
    url: string,
    id: string,
    data?: any,
    opts?: {
      headers?: AxiosRequestHeaders;
      params?: QueryParams;
      extras?: {
        requestId?: string;
        useAuth?: boolean;
      };
    }
  ) {
    const payload = {
      id,
      ver: '1.0',
      ts: '2024-09-20T17:43:49+05:30',
      params: {
        msgid: 'd297e367-7b72-45c1-883c-18005a7ea888',
      },
      request: data,
    };
    return this.request<T>(
      {
        method: 'POST',
        url,
        data: payload,
        headers: { ...opts?.headers },
        params: opts?.params,
        requestId: opts?.extras?.requestId,
      },
      opts?.extras?.useAuth
    );
  }

  public put<T = any>(
    url: string,
    data?: any,
    opts?: {
      headers?: AxiosRequestHeaders;
      params?: QueryParams;
      extras?: {
        requestId?: string;
        useAuth?: boolean;
      };
    }
  ) {
    return this.request<T>(
      {
        method: 'PUT',
        url,
        data,
        headers: opts?.headers,
        params: opts?.params,
        requestId: opts?.extras?.requestId,
      },
      opts?.extras?.useAuth
    );
  }

  public patch<T = any>(
    url: string,
    data?: any,
    opts?: {
      headers?: AxiosRequestHeaders;
      params?: QueryParams;
      extras?: {
        requestId?: string;
        useAuth: boolean;
      };
    }
  ) {
    return this.request<T>(
      {
        method: 'PATCH',
        url,
        data,
        headers: opts?.headers,
        params: opts?.params,
        requestId: opts?.extras?.requestId,
      },
      opts?.extras?.useAuth
    );
  }

  generateHeaders = async (
    headers?: RawAxiosRequestHeaders,
    useAuth?: boolean
  ) => {
    let defaultHeaders = {};

    if (useAuth) {
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `bearer ${localStorageService.getAuthToken()}`,
      };
    }

    if (!headers) {
      return defaultHeaders;
    }
    return {
      ...defaultHeaders,
      ...headers,
      'CSRF-Token': `${localStorageService.getCSRFToken()}`,
    };
  };

  private async request<T>(
    config: RequestConfig,
    useAuth?: boolean
  ): Promise<T> {
    const cancelToken = this.addToRequestMap(config.requestId);
    try {
      const response = await Axios.request({
        baseURL: BASE_URL,
        cancelToken,
        ...config,
        withCredentials: true,
        headers: await this.generateHeaders(config.headers, useAuth ?? true),
      });
      this.removeFromRequestMap(config.requestId);
      return response?.data as T;
    } catch (error: any) {
      if (error.response && error.response.data) {
        // eslint-disable-next line no-console
        console.log(error.response.data);
      } else {
        // eslint-disable-next line no-console
        console.log(error);
      }
      throw error;
    }
  }

  private addToRequestMap(requestId?: string): CancelToken | undefined {
    if (!requestId) {
      return undefined;
    }

    const source = Axios.CancelToken.source();
    this.requestMap.set(requestId, source);
    return source.token;
  }

  private removeFromRequestMap(requestId?: string) {
    if (!requestId) {
      return;
    }

    this.requestMap.delete(requestId);
  }
}

export const baseApiService = BaseApiService.getInstance();
