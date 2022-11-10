import { ThemeProvider } from 'next-themes'
import '../styles/global.scss'
import 'reactflow/dist/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
