import { authApi } from '../../infrastructure/api/authApi';
import { User } from '../models/User';

export class AuthService {
    static async login(email, password) {
        const response = await authApi.login(email, password);
        const { access_token, user } = response.data;
        return {
            token: access_token,
            user: new User(user)
        };
    }
}
