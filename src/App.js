import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import { LoginPage } from './presentation/pages/LoginPage';
import { AdminHomePage } from './presentation/pages/AdminHomePage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin" element={<AdminHomePage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
