import React, { useState } from 'react'
import Navbar from './Navbar'
import { BiRefresh } from 'react-icons/bi';
import{data} from '../../data'

const Book = () => {
	const [selectedbooks, setSelectedbooks] = useState(data);
	const [term, setTerm] = useState('Anything');
	function handleClick() {
		const randomIndex = Math.floor(Math.random() * data.length);
		setSelectedbooks(data[randomIndex]);
	}
	
	return (
		
		<div>
			<Navbar />
			<div className='bg-navbar'>
				<div className='overlay-2'>
					<section className='leading-loose max-w-7xl mx-auto'>
						<div className='text-center'>
							<h2 className='lg:text-7xl py-12 lg:py-20'> bookS </h2>
						</div>
						{selectedbooks && (
							<div>
								<h2 className='text-center lg:text-2xl mt-3 font-mono'>
									{selectedbooks.title}
								</h2>
							</div>
						)}

						<div className='flex justify-center items-center '>
							<button type='button' className='btn-book' onClick={handleClick}>
								Click to generate a book{' '}
								<span className='ml-2'>
									<BiRefresh />
								</span>
							</button>
						</div>
					</section>
				</div>
			</div>
			<div>
			<>
				<Navbar />
				<div className='header'>
					<div className='overlay'>
						<h2 className='Heading-text'>Books on {term}</h2>

						<p className='text-md mb-4 px-2 lg:px-0'>
							“Reading is an act of civilization; it’s one of the greatest acts
							of civilization because it takes the free raw material of the mind
							and builds castles of possibilities.”
						</p>

						<Input searchBooks={(search) => setTerm(search)} />
					</div>
				</div>
				<div>
					{isLoading && (
						<div className='flex items-center justify-center mt-6 lg:mt-20'>
							<Circles
								height='50'
								width='50'
								color='brown'
								ariaLabel='circles-loading'
								wrapperStyle={{}}
								wrapperClass=''
								visible={true}
							/>
						</div>
					)}
				</div>

				<div className='max-w-7xl mx-auto'>
					{!isLoading && <BookList books={books} />}
				</div>
				{error && (
					<div className='text-center md:text-2xl font-mono font-bold mt-3'>
						{error}
					</div>
				)}
			</>
		</div>
		</div>
	);
}

export default Book
