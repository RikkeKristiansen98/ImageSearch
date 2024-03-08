import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"

export const Home = () => {

  const {isAuthenticated } = useAuth0()
    return (
    <>
 {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </>)
}