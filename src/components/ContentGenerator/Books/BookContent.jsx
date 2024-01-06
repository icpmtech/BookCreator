import React, { useState } from "react";
import GetResponse from '../../API/ChatGPT';

const BookContent = ({initialContent} ) => {
	return (
		
		<div>
			<div className='booklist-container-content'>
				<div>
					<p className='font-bold text-center pt-5'>By: {initialContent} </p>
				</div>
			</div>
		</div>
	);
}

export default BookContent
