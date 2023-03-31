import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import { useUserContext } from "./hooks/useUserContext";

function App() {

  const { username , email} = useUserContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(username && email ) ? <Home /> :  <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!(username && email )  ? <Login /> :  <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
