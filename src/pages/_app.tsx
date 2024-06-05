import { GlobalStyles } from "@/styles/GlobalStyle"
import type { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default App
