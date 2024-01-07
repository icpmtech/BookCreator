import React from 'react';
import {
	AppstoreOutlined,
	CalendarOutlined,
	LinkOutlined,
	UserOutlined,
	BookOutlined,
	BlockOutlined,
	SettingOutlined,
	CodeOutlined,
	AuditOutlined
} from '@ant-design/icons';
import { getItem } from './getItem';

export const items = [
	getItem(<a href="/">
		Home
	</a>,
		'1',
		<AppstoreOutlined />),
	getItem('Generate Content', 'sub1', <BlockOutlined />, [
		getItem(<a href="/books">
			Books
		</a>,
			'3', <BookOutlined />),
		getItem(<a href="/blogposts">
			Blogposts
		</a>,
			'6', <AuditOutlined />),
	]),
	getItem('Code Assistant', 'sub2', <CodeOutlined />, [
		getItem(<a href="/code-assistant-python">
		Python
	</a>, '7', <CodeOutlined />),
		getItem('React', '8', <CodeOutlined />),
		getItem('Angular', '9', <CodeOutlined />),
		getItem('C#', '10', <CodeOutlined />),
	]),
	getItem(
		<a href="https://cantinhode.net" target="_blank" rel="noopener noreferrer">
			Cantinhode.net
		</a>,
		'link',
		<LinkOutlined />
	),
	getItem(
		<a href="/update-profile">
		Update Profile
	</a>,
		'link',
		<UserOutlined />
	),
							  
];
