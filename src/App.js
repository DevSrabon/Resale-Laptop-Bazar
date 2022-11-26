import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';

function App() {
  return (
		<div className=" max-w-[1200px] mx-auto">
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
