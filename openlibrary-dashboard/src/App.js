import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import Footer from '../src/components/Footer/index.js';
import {Box} from '@mui/material';


function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Box sx={{ flexGrow: 1 }}> {/* flexGrow: 1 faz este Box ocupar todo o espaço restante */}
        <Dashboard />
      </Box>
        <Footer />

    </Box>
  );
}

export default App;
