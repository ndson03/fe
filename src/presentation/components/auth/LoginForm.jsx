import { useLogin } from '../../../application/hooks/useLogin';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';

const { Title } = Typography;

export function LoginForm() {
    const { login, loading, error } = useLogin();

    const onFinish = (values) => {
        const { email, password } = values;
        login(email, password);
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Đăng nhập</Title>

            {error && (
                <Alert
                    message="Lỗi"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: '1rem' }}
                />
            )}

            <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ email: '', password: '' }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

