import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import tppLogo from './assets/logo.png';
import Login from './login';

function App() {
  return (
    <div className="App">
      <div className="app_container">
        <div className="app_container_title">
          <img src={tppLogo} alt="Picture of the author" />
          <span>Transparent Process Protocol</span>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
