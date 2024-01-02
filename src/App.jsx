import React from 'react'
import Home from './components/Home'
import{Routes,Route} from 'react-router-dom'
import Quotes from './components/Quotes';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';
import Book from './components/Book';
import Chapters from './components/Chapters';
import Sections from './components/Sections';

const App = () => {
  return (
		<div>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/quotes' element={<Quotes />}></Route>
				<Route path='/books' element={<Book />}></Route>
				<Route path='/chapters' element={<Chapters />}></Route>
				<Route path='/sections' element={<Sections />}></Route>
				<Route path='Books/:id' element={<BookDetails />}></Route>
				<Route path='*' element={<NotFound/>} />
			</Routes>
		</div>
	);
}

export default App

