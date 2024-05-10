import { createContext, useContext } from 'react';
import { Http } from '../core/service/http';

const http = new Http();
const httpContext = createContext(http);
const HttpProvider = httpContext.Provider;

export const useHttp = () => useContext(httpContext);
export default HttpProvider;
