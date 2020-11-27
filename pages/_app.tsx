import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useStore } from '../store';
import { Provider } from 'react-redux';

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App