import React, { useState } from 'react'
import Navbar from './Navbar'
import { BiRefresh } from 'react-icons/bi';
import{data} from '../../data'

const Chapters = () => {
	const [selectedchapters, setSelectedchapters] = useState(data);

	function handleClick() {
		const randomIndex = Math.floor(Math.random() * data.length);
		setSelectedchapters(data[randomIndex]);
	}
	
	return (
		<div>
			<Navbar />
			<div className='bg-navbar'>
				<div className='overlay-2'>
					<section className='leading-loose max-w-7xl mx-auto'>
						<div className='text-center'>
							<h2 className='lg:text-7xl py-12 lg:py-20'> chapterS </h2>
						</div>
						{selectedchapters && (
							<div>
								<h2 className='text-center lg:text-2xl mt-3 font-mono'>
									{selectedchapters.title}
								</h2>
							</div>
						)}

						<div className='flex justify-center items-center '>
							<button type='button' className='btn-chapter' onClick={handleClick}>
								Click to generate a chapter{' '}
								<span className='ml-2'>
									<BiRefresh />
								</span>
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chapters
