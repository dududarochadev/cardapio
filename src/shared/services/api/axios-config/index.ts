import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.baseUrl,
  withCredentials: true,
  // headers: {
  //   // Authorization: `Bearer ${token}`
  //   'Content-Type': 'application/json'
  // }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };