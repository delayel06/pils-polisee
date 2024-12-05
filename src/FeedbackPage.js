import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';
import { UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import BackgroundWrapperSearch from './BackgroundWrapperSearch';

const { Title } = Typography;
const { TextArea } = Input;

const FeedbackPage = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = async (values) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('https://email.delayel06.workers.dev/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                message.success('Feedback sent successfully!');
                form.resetFields();
            } else {
                message.error(data.error || 'Failed to send feedback. Please try again.');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            message.error(error.message || 'An error occurred. Please try again.');
        }
        setIsSubmitting(false);
    };

    const formContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
    };

    const cardStyles = {
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
    };

    return (
        <BackgroundWrapperSearch>
            <div style={formContainerStyles}>
                <Card style={cardStyles}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                        We Value Your Feedback
                    </Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Your Name"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Your Email (Optional)"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="feedback"
                            rules={[{ required: true, message: 'Please enter your feedback' }]}
                        >
                            <TextArea
                                prefix={<MessageOutlined />}
                                rows={4}
                                placeholder="Your Feedback"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={isSubmitting}
                            >
                                Send Feedback
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </BackgroundWrapperSearch>
    );
};

export default FeedbackPage;
