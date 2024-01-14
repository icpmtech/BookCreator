import React from 'react';
import {
	AppstoreOutlined,
	MailOutlined,
	LinkOutlined,
	UserOutlined,
	BookOutlined,
	BlockOutlined,
	SettingOutlined,
	CodeOutlined,
	AuditOutlined,
	FolderOpenOutlined 
} from '@ant-design/icons';
import { getItem } from './getItem';
export const itemsPublic = [
	getItem(
		<a href="/">
			Home
		</a>,

		'01',
		<AppstoreOutlined />
	),
	getItem(
		<a href="/plans">
			Plans
		</a>,

		'00',
		<AppstoreOutlined />
	),
	getItem(
		<a href="/login">
			Sign Up
		</a>,
		'02',
		<UserOutlined />
	),
	getItem(
		<a href="/register">
			Register
		</a>,
		'03',
		<UserOutlined />
	),
	getItem(
		<a href="https://cantinhode.net/products/course-prompt-engineering" target="_blank" rel="noopener noreferrer">
			Course Prompt Engineering
		</a>,
		'04',
		<BookOutlined />
	),
	getItem(
		<a href="/contact-us">
			Contact Us
		</a>,
		'05',
		<LinkOutlined />
	),

	getItem(
		<a href="https://cantinhode.net" target="_blank" rel="noopener noreferrer">
			Community Cantinhode.net
		</a>,
		'06',
		<LinkOutlined />
	),

];

export const items = [
	getItem(<a href="/home-private">
		Home
	</a>,
	
		'chat',
		<AppstoreOutlined />),
		getItem(<a href="/chat">
		Chat
	</a>,
	
		'1',
		<AppstoreOutlined />),
		getItem('Projects', 'projects', <FolderOpenOutlined />, [
			getItem(<a href="/project-books">
				Books
			</a>,
				'p-book', <BookOutlined />),
			getItem(<a href="/project-articles">
				Articles
			</a>,
				'p-article', <AuditOutlined />),
			getItem(<a href="/project-blogposts">
				Blogposts
			</a>,
				'p-blog', <AuditOutlined />),
			getItem(<a href="/project-emails">
				Emails
			</a>,
				'p-email', <MailOutlined />),
				getItem(<a href="/project-lessons">
				Lessons
			</a>,
				'p-lesson', <AuditOutlined />),
		]),
	getItem('Generate Content', 'content', <BlockOutlined />, [
		getItem(<a href="/books">
			Books
		</a>,
			'books', <BookOutlined />),
		getItem(<a href="/articles">
			Articles
		</a>,
			'articles', <AuditOutlined />),
		getItem(<a href="/blogposts">
			Blogposts
		</a>,
			'blogposts', <AuditOutlined />),
		getItem(<a href="/emails">
			Emails
		</a>,
			'emails', <MailOutlined />),
	]),
	
	getItem('Code Assistant', 'code', <CodeOutlined />, [
		getItem(<a href="/code-assistant-python">
			Python
		</a>, '7', <CodeOutlined />),
		getItem(<a href="/code-assistant-csharp">
			CSharp
		</a>, '8', <CodeOutlined />),
		getItem(<a href="/code-assistant-angular">
			Angular
		</a>, '9', <CodeOutlined />),
		getItem(<a href="/code-assistant-react">
			React
		</a>, '10', <CodeOutlined />),
		getItem(<a href="/code-assistant-sql">
			SQL
		</a>, '11', <CodeOutlined />),
	]),
	getItem('Prompts', 'settings', <SettingOutlined />, [
		getItem(<a href="/prompt-books">
			Books
		</a>,
			'prompt-book', <BookOutlined />),
		getItem(<a href="/prompt-articles">
			Articles
		</a>,
			'prompt-article', <AuditOutlined />),
		getItem(<a href="/prompt-blogposts">
			Blogposts
		</a>,
			'prompt-blog', <AuditOutlined />),
		getItem(<a href="/prompt-emails">
			Emails
		</a>,
			'prompt-email', <MailOutlined />),
			getItem(<a href="/prompt-lessons">
			Lessons
		</a>,
			'prompt-lesson', <AuditOutlined />),
	]),
	getItem(
		<a href="https://cantinhode.net" target="_blank" rel="noopener noreferrer">
			Cantinhode.net
		</a>,
		'12',
		<LinkOutlined />
	),
	getItem(
		<a href="/update-profile">
			Update Profile
		</a>,
		'13',
		<UserOutlined />
	), getItem(
		<a href="/contact-us">
			Contact Us
		</a>,
		'14',
		<LinkOutlined />
	),

];
