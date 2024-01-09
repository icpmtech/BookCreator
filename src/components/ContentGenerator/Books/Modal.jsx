import React, { useState } from "react";
import { Input, Space, Radio, Card, Button, Form, Dropdown, Modal, Avatar, List, notification } from 'antd';
const data = [
    {
        title: 'Python Book',
    },
    {
        title: 'UI/UX Book',
    },
];
const { TextArea } = Input;
const BookModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <><Button type="primary" onClick={showModal}>
            Add to Book Project
        </Button><Modal title="List of the Books" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Card  >
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                                <Button>Add</Button>
                            </List.Item>
                        )} />
                </Card>
                <Card  >
                    <h2>Create New Book:</h2>
                    <Form
                     layout={'vertical'}
                    >
                        <Form.Item label="Title   ">
                            <Input placeholder="Title..." />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input placeholder="Description..." />
                        </Form.Item>
                        <Form.Item label="Content">
                            <TextArea rows={10}
						type='text'
						placeholder='Outline Course Book...'
						autoComplete='off'
						className='input' />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary">Create Book Project</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal></>
    );
}

export default BookModal

