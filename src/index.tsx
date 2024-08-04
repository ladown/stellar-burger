import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import store from '@store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Provider store={store}>
      {/* Its needed to use HashRouter to hav proper routing in GitHubPages or in subdomains */}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
