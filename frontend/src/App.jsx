import Login from "./pages/Login"
import Home from "./pages/Home"
import { useUserContext } from "./context/user.context"

const App = () => {

  const { isLoggedIn } = useUserContext();

  return (
    <>
    {isLoggedIn ? <Home /> : <Login />}
    </>
  )
}

export default App