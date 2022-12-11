import { NhostReactProvider } from '@nhost/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { nhost, queryClient } from './utils';
import { router } from './router';

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NhostReactProvider>
  );
}

export default App;
