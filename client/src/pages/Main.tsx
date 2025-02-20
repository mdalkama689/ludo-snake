import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import LandingPage from "../components/LandingPage"
import Home from '../components/Home'

const Main = () => {
    const auth = useContext(AuthContext)
    if(!auth) return 
    const {isAuthenticated} = auth 
    

return (
    <>
    {isAuthenticated ? <Home/> : <LandingPage />}
    </>
)
}

export default Main