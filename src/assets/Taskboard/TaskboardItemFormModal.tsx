import {Modal, Form, Input} from "antd";
import React from 'react';

function TaskboardItemFormModal({
    visible,
    initialValues,
    onCancel,
    onOk,
}) {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Task"
            visible={visible}
            destroyOnClose
            forceRender
            onCancel={onCancel}
            // @ts-ignore
            onOk={() => form.submit()}
        >
            <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={(values) => {
                    onOk(values);
                    // @ts-ignore
                    form.resetFields();
                    onCancel();
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {required: true, message: "'Title' is required"},
                        {
                            max: 100,
                            message: "'Title' can not be longer than 100 characters",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {required: true, message: "'Description' is required"},
                        {
                            max: 400,
                            message: "'Description' can not be longer than 400 characters",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TaskboardItemFormModal;