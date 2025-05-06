import { useDispatch, useSelector } from 'react-redux';
import { loginUsecase } from '../usecases/loginUsecase';

export function useLogin() {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.login);

    const login = (email, password) => {
        dispatch(loginUsecase(email, password));
    };

    return { login, loading, error, user };
}