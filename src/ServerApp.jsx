import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from './App';

export default (url, opts) => {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <App/>
    </StaticRouter>,
    opts
  );
}
