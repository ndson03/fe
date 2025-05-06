import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import { AdminHomePage } from './presentation/pages/AdminHomePage';
import  SubjectManagementContent  from './presentation/components/subject/SubjectManagementContent'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin" element={<AdminHomePage />} />
				<Route path="/subjects" element={<SubjectManagementContent />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
