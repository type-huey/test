import { createBrowserRouter } from 'react-router-dom';
import { RootPage } from '~/pages/root.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
  },
]);
