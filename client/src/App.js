import "./App.css";
import { Route, Switch } from "react-router-dom";
import Loginout from "./pages/Loginout";
import Sidepanel from "./pages/Sidepanel";
import Instdsat from "./pages/Instdsat";
import EndTest from "./pages/Endtest";
import ReportCard from "./pages/ReportCard";
import Admin1 from "./pages/Admin1";
import AdminResult from "./pages/AdminResult";
import AdminLogin from "./pages/AdminLogin";
import AdminRoutes from "./pages/AdminRoutes";
import AdminTestSet from "./pages/AdminTestSet";
import video from "./pages/Video";
import Tables from "./pages/Tables";
import Cameraweb from "./Components/Cameraweb";
import PSDM_log from "./images/PSDM_logo.jpg";
import logonew from "./images/logonew.png";
import axios from "axios";

import logos from "./images/logos.png";
import ADSATreg from "./pages/ADSATreg";
import QuestionAddDemo from "./pages/QuestionAddDemo";
import QuestionAddLogin from "./pages/QuestionAddLogin";
import QuestionListTable from "./pages/QuestionListTable";
import AddingQuestionRoute from "./pages/AddingQuestionRoute";
import SignIn from "./pages/SignIn";
import SlotsChecking from "./pages/SlotsChecking";
import StudentPerSlot from "./pages/StudentPerSlot";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/TrainingProgram/Admin";
import CreateBatch from "./pages/TrainingProgram/CreateBatch";
import TimeTable from "./pages/TrainingProgram/TimeTable";
import Users from "./pages/TrainingProgram/Users";
import Batches from "./pages/TrainingProgram/Batches";
import TestDetails from "./pages/TrainingProgram/TestDetails";
import AddQuestion from "./pages/TrainingProgram/AddQuestion";
import TestQuestionsDatabase from "./pages/TrainingProgram/TestQuestionsDatabase";
import UserDashboard from "./pages/TrainingProgram/User/UserDashboard";
import AllTest from "./pages/TrainingProgram/User/AllTest";
import UserSignup from "./pages/TrainingProgram/User/UserSignup";
import TestInstructions from "./pages/TrainingProgram/User/TestInstructions";
import TestPanel from "./pages/TrainingProgram/User/TestPanel";

// axios.defaults.baseURL = "https://adsatiitropar.com";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Loginout} />
        <Route path="/sidepanel" component={Sidepanel} />
        <Route path="/instdsat" component={Instdsat} />
        <Route path="/finish" component={EndTest} />
        <Route path="/repadmin1ortcard" component={ReportCard} />
        <Route path="/admin1" component={Admin1} />
        <Route path="/adminresult" component={AdminResult} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/adminroutes" component={AdminRoutes} />
        <Route path="/settest" component={AdminTestSet} />
        <Route path="/video" component={video} />
        <Route path="/tables" component={Tables} />
        <Route path="/camera" component={Cameraweb} />
        <Route path="/A-DSAT_Registration" component={ADSATreg} />

        <Route path="/addingquestions" component={QuestionAddDemo} />
        <Route path="/questionaddlogin" component={QuestionAddLogin} />

        <Route path="/questiontable" component={QuestionListTable} />
        <Route path="/questionroutes" component={AddingQuestionRoute} />

        {/* /////////////////// */}
        <Route path="/signin" component={SignIn} />
        <Route path="/studentslots" component={SlotsChecking} />
        <Route
          path="/studentsperslot"
          render={(props) => <StudentPerSlot {...props} />}
        />
        <Route path="/resetpassword" component={ResetPassword} />

        {/* //////////// Training Programs Admin Route ///////////////// */}
        <Route path="/trainingadmin" component={Admin} />
        <Route path="/createbatch" component={CreateBatch} />
        <Route path="/classtimetable" component={TimeTable} />
        <Route path="/studentdashboard" component={Users} />
        <Route path="/batches/:_id" component={Batches} />
        <Route path="/testdetails/:id" component={TestDetails} />
        <Route path="/addquestionstest/:id" component={AddQuestion} />
        <Route
          path="/testquestiondatabase/:id"
          component={TestQuestionsDatabase}
        />
        {/* //////////// Training Programs User Route ///////////////// */}
        <Route path="/studentsignup" component={UserSignup} />
        <Route path="/userdashboard" component={UserDashboard} />
        <Route path="/alltest" component={AllTest} />
        {/* //////////// Training Programs User Test Route ///////////////// */}
        <Route path="/testinstructions/:id" component={TestInstructions} />
        <Route path="/test/:id" component={TestPanel} />
      </Switch>
    </>
  );
}

export default App;
