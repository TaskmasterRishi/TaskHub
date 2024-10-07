import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Tasks from "./pages/Tasks.jsx";
import Trash from "./pages/Trash.jsx";
import Users from "./pages/Users.jsx";

function Layout() {
  const user = "";

  const loaction = useLocation(); // location hook

  return user ? (
    //true
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white stickytop-0 hidden md:block">
        {/* <SideBar/> */}
      </div>
      {/* <MobileSideBar/> */}

      <div className="flex-1 overflow-y-auto">
        {/* <NavBar/> */}
        <div className="p-4 2xl:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    //false
    <Navigate to="/log-in" status={{ from: Location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      {/* protected routes */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progrees/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/teams" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
      </Routes>
      {/* <Toaster  /> */}
    </main>
  );
}

export default App;
