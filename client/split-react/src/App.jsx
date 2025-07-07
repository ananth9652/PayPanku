import {BrowserRouter, Routes, Route} from "react-router-dom"
import AddGroups from "./components/Addgroups"
import AddMembers from "./components/Addmembers"
import AddExpenses from "./components/Addexpenses"
import Settle from "./components/Settle"
import Landing from "./components/Landing"
function App() {
 
  return (
   <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Landing/>}></Route>
      <Route path = "/groups" element = {<AddGroups/>}></Route>
      <Route path = "/groups/:id/members" element = {<AddMembers/>}></Route>
      <Route path = "/groups/:id/expenses" element = {<AddExpenses/>}></Route>
      <Route path = "/groups/:id/settle" element = {<Settle/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App;
