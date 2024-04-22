import { createContext, useContext } from 'react';
import { HttpService } from '../lib/service/http.service';

const http = new HttpService();
const httpContext = createContext(http);
const HttpProvider = httpContext.Provider;

export const useHttp = () => useContext(httpContext);
export default HttpProvider;
