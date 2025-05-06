
import { AuthService } from '../../domain/services/AuthService';
import { loginStart, loginSuccess, loginFailure } from '../stores/loginSlice';

export const loginUsecase = (email, password) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const { token, user } = await AuthService.login(email, password);
        dispatch(loginSuccess({ token, user }));
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
};
