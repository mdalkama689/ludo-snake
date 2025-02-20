import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import RequireAuth from "./components/Auth/RequireAuth";
import Room from "./components/Room";

function App() {
  return (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
<Route element={<RequireAuth />}>
<Route path="/" element={<Main />} />
<Route path='/ludo/:roomId' element={<Room />} />
</Route>
      </Routes>
  );
}

export default App;
