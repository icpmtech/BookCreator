import React from 'react'

const Navbar = () => {
    return (
		<div>
			<div className='logo'>
				<h1 className='lg:text-3xl'>Content Generator📚💖</h1>
				<nav>
					<ul className='flex ml-5'>
						<li>
							<a href='/' className='mr-5 focus:text-black'>
								Home
							</a>
						</li>
						<li>
							<a href='/quotes'  className='focus:text-black'>Quotes📔</a>
						</li>
						<li>
							<a href='/books'  className='focus:text-black'>Books</a>
						</li>
						<li>
							<a href='/chapters'  className='focus:text-black'>Chapters</a>
						</li>
						<li>
							<a href='/sections'  className='focus:text-black'>Sections</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Navbar
