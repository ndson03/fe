import { message } from 'antd';

export const toast = {
    success: (text) => message.success(text),
    error: (text) => message.error(text),
    warning: (text) => message.warning(text),
    info: (text) => message.info(text),
};
