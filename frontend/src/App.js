import ChatRoom from "./ChatRoomPage";
import Calender from "./Calender";
import CodeEditor from "./CodeEditorPage";
import ForgotPassword from "./ForgotPasswordPage";
import LandingPage from "./LandingPage";
import LogIn from "./LogInPage";
import SignUp from "./SignUpPage";
import DashBoard from "./DashBoard";
import Logout from "./logout";
import Profile from "./profile";
import Fetch from "./fetch";
import { BrowserRouter , Routes , Route} from "react-router-dom";
function App() {
  return(<>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/LogIn" element={<LogIn/>}/>
        <Route exact path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/ChatRoom" element={<ChatRoom/>}/>
        <Route exact path="/Calender" element={<Calender/>}/>
        <Route exact path="/CodeEditor" element={<CodeEditor/>}/>
        <Route exact path="/LogIn/:id" element={<DashBoard/>}/>
        <Route exact path="/LogIn/:id/fetch" element={<Fetch/>}/>
        <Route exact path="/LogIn/:id/Calender" element={<DashBoard/>}/>
        <Route exact path="/LogIn/:id/logout" element={<Logout/>}/>
        <Route exact path="/LogIn/:id/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  </>)
}

export default App;
