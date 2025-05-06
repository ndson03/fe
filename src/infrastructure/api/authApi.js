import { api } from './axiosClient';
import { API_ROUTES } from '../constants/apiRoutes';

export const authApi = {
    login: (email, password) => api.post(API_ROUTES.LOGIN, { email, password })
};
