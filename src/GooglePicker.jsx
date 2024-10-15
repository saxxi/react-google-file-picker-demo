import React, { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_ID, API_DEVELOPER_KEY } from './Constants';

const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
].join(' ');

const loadScript = (scriptUrl, callback) => {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
  return script
}

const GooglePicker = () => {
  const [tokenClient, setTokenClient] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [pickerInited, setPickerInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  useEffect(() => {
    const script = loadScript('https://apis.google.com/js/api.js', () => window.gapi.load('picker', onPickerApiLoad))
    const gisScript = loadScript('https://accounts.google.com/gsi/client', () => {
      const newTokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: '',
      });
      setTokenClient(newTokenClient);
      setGisInited(true);
    })

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(gisScript);
    };
  }, []);

  const onPickerApiLoad = () => {
    setPickerInited(true);
  };

  function pickerCallback(data) {
    console.log('pickerCallback', data);
    let url = 'nothing';
    if (data[window.google.picker.Response.ACTION] == window.google.picker.Action.PICKED) {
      const doc = data[window.google.picker.Response.DOCUMENTS][0];
      url = doc[window.google.picker.Document.URL];
    }
    const message = `You picked: ${url}`;
    document.getElementById('result').textContent = message;
  }

  const createPicker = () => {
    const showPicker = (accessToken) => {
      const picker = new window.google.picker.PickerBuilder()
        .addView(window.google.picker.ViewId.DOCS)
        .setOAuthToken(accessToken)
        .setDeveloperKey(API_DEVELOPER_KEY)
        .setAppId(GOOGLE_CLIENT_ID)
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }

    tokenClient.callback = async (response) => {
      if (response.error !== undefined) {
        throw (response);
      }
      const accessToken = response.access_token;
      console.log('accessToken', accessToken);
      showPicker(accessToken);
    };

    if (accessToken === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  return (
    <div>
      {/* Your component UI goes here */}
      <h1>Google Picker Integration</h1>
      <p>Picker Initialized: {pickerInited ? 'Yes' : 'No'}</p>
      <p>GIS Initialized: {gisInited ? 'Yes' : 'No'}</p>
      <button onClick={createPicker}>open</button>
    </div>
  );
};

export default GooglePicker;
