import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'

import { QueryClient,QueryClientProvider } from 'react-query';
export const queryclient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <ChakraProvider>
    <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

