import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './store/auth';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
