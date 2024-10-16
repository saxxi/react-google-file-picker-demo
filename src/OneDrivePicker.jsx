import React, { useEffect } from 'react';

const loadScript = (scriptUrl, callback) => {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
  return script
}

const OneDrivePicker = () => {
  useEffect(() => {
    const script = loadScript('https://js.live.net/v7.2/OneDrive.js', () => {
      console.log('OneDrive.js loaded');
    })

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openPicker = () => {
    const odOptions = {
      clientId: 'dfc6b67c-3f6d-4efb-a6c3-5a817ced9c4d',
      action: "share", // Choose the appropriate action: 'share', 'download', 'query'
      multiSelect: false, // Allow multi-select
      advanced: {
        redirectUri: 'https://together-hippo-square.ngrok-free.app',
        // filter: '.docx,.xlsx,.pptx', // File types filter (optional)
      },
      success: function (files) {
        console.log('Files selected: ', files);
      },
      cancel: function () {
        console.log('User closed the picker.');
      },
      error: function (error) {
        console.error(error);
      },
    };

    window.OneDrive.open(odOptions);
  };

  return (
    <div>
      <button onClick={openPicker}>Open OneDrive Picker</button>
    </div>
  );
};

export default OneDrivePicker;
