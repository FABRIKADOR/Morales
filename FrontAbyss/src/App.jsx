import './App.css';
import Gallery from './Gallery.jsx'
import Nav from './Components/Navbar.jsx'

function App() {
	return (

		<>
			<Nav />
			<div className="overlay"></div>
			<img className='FondoImg' src="/Images/fondo-arte-slide.jpg" alt="Imagen de fondo" />
			<Gallery />
		</>
	);
};

export default App;