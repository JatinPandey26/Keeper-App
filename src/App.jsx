import Navbar from './components/Header/header';
import { InputNote } from './components/InputBox/inputnote';
import Footer from './components/Footer/footer';
import './App.css'



function App() {
    
    return (
        <div>
            <Navbar></Navbar>
            <InputNote></InputNote>
            <Footer></Footer>
        </div>
    );
}

export default App;
