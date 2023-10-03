// note from Ethan: import '@/' not working properly in replit workspaces

import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";

/*
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
*/

function MyApp({ Component, pageProps }) {
return (
<ChakraProvider>
<Component {...pageProps} />
</ChakraProvider>
);
}
export default MyApp;