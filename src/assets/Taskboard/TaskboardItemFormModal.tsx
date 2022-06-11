import {createRef, useEffect, useRef} from 'react';
import {Modal, Form, Input} from 'antd';
import {FormInstance} from 'antd/es/form';
import {TaskItem} from "../../tasks";
import React from 'react';


export const TaskboardItemFormModal = ({
    visible,
    initialValues,
    onCancel,
    onOk,
}) => {
    const formRef = React.createRef<FormInstance>();


    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Modal>
            <Form
                name="basic"
                form={formRef.current!}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}
