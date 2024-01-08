import React from 'react'

const Navbar = () => {
    return (
		<div>
			<div className='logo'>
				<h1 className='lg:text-3xl'>AI Content Editor📚💖</h1>
				<nav>
					<ul className='flex ml-5'>
						<li>
							<a href='/' className='mr-5 focus:text-black'>
								Home📚
							</a>
						</li>
						<li>
							<a href='/blogposts'  className='focus:text-black'>BlogPosts📔</a>
						</li>
						<li>
							<a href='/books'  className='focus:text-black'>Books📚</a>
						</li>
						
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Navbar
