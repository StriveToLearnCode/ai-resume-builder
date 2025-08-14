import Header from '@/components/custom/Header'
import MainPage from './components/MainPage'
import FeatureList from './components/FeatureList'
import Footer from './components/Footer'

function Home() {
  return (
    <>
      <Header />
      <div className='animate__animated animate__slideInUp'>
        <MainPage />
        <FeatureList />
        <Footer />
      </div>
    </>
  )
}

export default Home
