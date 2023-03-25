import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import BookProvider from './contexts/BookProvider.js';
import { router } from './Routes/Routes';
function App() {
  return (
	  <div>
		  <BookProvider>
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		  </BookProvider>
		</div>
	);
}

export default App;
