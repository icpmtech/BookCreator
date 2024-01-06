import React from 'react';
import {
	AppstoreOutlined,
	CalendarOutlined,
	LinkOutlined,
	UserOutlined,
	 SettingOutlined
} from '@ant-design/icons';
import { getItem } from './getItem';

export const items = [
	getItem(<a href="/">
		Home
	</a>,
		'1',
		<AppstoreOutlined />),
	getItem(<a href="/books">
		Books
	</a>,
		'2', <CalendarOutlined />),
	getItem('Generate Content', 'sub1', <AppstoreOutlined />, [
		getItem(<a href="/books">
			Books
		</a>,
			'3', <CalendarOutlined />),
		getItem(<a href="/blogposts">
			Blogposts
		</a>,
			'6', <CalendarOutlined />),
	]),
	getItem('Code Assistant', 'sub2', <SettingOutlined />, [
		getItem(<a href="/code-assistant-python">
		Python
	</a>, '7', <SettingOutlined />),
		getItem('React', '8'),
		getItem('Angular', '9'),
		getItem('C#', '10'),
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
