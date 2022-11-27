import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';

function App() {
  return (
		<div className="w-11/12 mx-auto">
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
