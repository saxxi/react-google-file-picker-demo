import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_CLIENT_ID } from './Constants';
import GooglePicker from './GooglePicker';
import OneDrivePicker from './OneDrivePicker';

function App() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ width: '50%', background: '#eee', padding: 20 }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <div>
            <h1>Google Drive Picker Example</h1>
            <GooglePicker />

            <div style={{ marginTop: 20, background: '#eee', padding: '10px 20px' }}>
              <p>Result:</p>
              <div id="result"></div>
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>

      <div style={{ width: '50%', background: '#eee', padding: 20 }}>
        <OneDrivePicker />
      </div>
    </div>
  );
}

export default App;
