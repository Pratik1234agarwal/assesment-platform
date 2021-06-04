import "./App.css";
import { Route, Switch } from "react-router-dom";
import Loginout from "./pages/Loginout";
import Sidepanel from "./pages/Sidepanel";
import Instdsat from "./pages/Instdsat";
import EndTest from "./pages/Endtest";
import ReportCard from "./pages/ReportCard";
import Admin1 from "./pages/Admin1";
import QuestionAdd from "./pages/QuestionAdd";
import AdminResult from "./pages/AdminResult";
import AdminLogin from "./pages/AdminLogin";
import AdminRoutes from "./pages/AdminRoutes";
import AdminTestSet from "./pages/AdminTestSet";
import video from "./pages/Video";
import Tables from "./pages/Tables";
import Cameraweb from "./Components/Cameraweb";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Loginout} />
        <Route path="/sidepanel" component={Sidepanel} />
        <Route path="/instdsat" component={Instdsat} />
        <Route path="/finish" component={EndTest} />
        <Route path="/repadmin1ortcard" component={ReportCard} />
        <Route path="/" component={Admin1} />
        <Route path="/addingquestions" component={QuestionAdd} />
        <Route path="/adminresult" component={AdminResult} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/adminroutes" component={AdminRoutes} />
        <Route path="/settest" component={AdminTestSet} />
        <Route path="/video" component={video} />
        <Route path="/tables" component={Tables} />
        <Route path="/camera" component={Cameraweb} />
      </Switch>
    </>
  );
}

export default App;
