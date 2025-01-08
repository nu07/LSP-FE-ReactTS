import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import Index from "@/pages/index";
// import authStore from "@/store/loginStore";
import LspPart2 from "./pages/lsp/lsppart2";

const App: React.FC = () => {
  // const { isLogin } = authStore();
  return (
    <Router>
      <Routes>
        <Route path="/lsp2" element={<LspPart2 />} />
        {/* <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/"
          element={
            <DefaultTemplate>
              <Index />
            </DefaultTemplate>
          }
        />
        {/* <Route
          path="/history-booking"
          element={
            <ProtectedRoute>
              <HistoryBooking />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
