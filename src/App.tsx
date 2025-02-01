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
import Pelanggan from "./pages/lsp/pelanggan";
import EditPelanggan from "./pages/lsp/pelanggan/editPelanggan";
import Level from "@/pages/lsp/level";
import EditLevel from "@/pages/lsp/level/EditLevel";
import Tarif from "@/pages/lsp/tarif";
import EditTarif from "@/pages/lsp/tarif/editTarif";
import User from "@/pages/lsp/user";
import UserEdit from "@/pages/lsp/user/editUser";
import Penggunaan from "@/pages/lsp/penggunaan";
import EditPenggunaan from "@/pages/lsp/penggunaan/editUser";
import Tagihan from "@/pages/lsp/tagihan";
import EditTagihan from "@/pages/lsp/tagihan/editTagihan";
import Pembayaran from "@/pages/lsp/pembayaran";
import EditPembayaran from "@/pages/lsp/pembayaran/editPembayaran";

const App: React.FC = () => {
  // const { isLogin } = authStore();
  return (
    <Router>
      <Routes>
        <Route
          path="/lsp2"
          element={
            <DefaultTemplate>
              <LspPart2 />
            </DefaultTemplate>
          }
        />
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
        <Route
          path="/pelanggan"
          element={
            <DefaultTemplate>
              <Pelanggan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/pelanggan/:id?"
          element={
            <DefaultTemplate>
              <EditPelanggan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/level"
          element={
            <DefaultTemplate>
              <Level />
            </DefaultTemplate>
          }
        />
        <Route
          path="/level/:id?"
          element={
            <DefaultTemplate>
              <EditLevel />
            </DefaultTemplate>
          }
        />

        <Route
          path="/tarif"
          element={
            <DefaultTemplate>
              <Tarif />
            </DefaultTemplate>
          }
        />
        <Route
          path="/tarif/:id?"
          element={
            <DefaultTemplate>
              <EditTarif />
            </DefaultTemplate>
          }
        />
        <Route
          path="/user"
          element={
            <DefaultTemplate>
              <User />
            </DefaultTemplate>
          }
        />
        <Route
          path="/user/:id?"
          element={
            <DefaultTemplate>
              <UserEdit />
            </DefaultTemplate>
          }
        />
        <Route
          path="/penggunaan"
          element={
            <DefaultTemplate>
              <Penggunaan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/penggunaan/:id?"
          element={
            <DefaultTemplate>
              <EditPenggunaan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/tagihan"
          element={
            <DefaultTemplate>
              <Tagihan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/tagihan/:id?"
          element={
            <DefaultTemplate>
              <EditTagihan />
            </DefaultTemplate>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <DefaultTemplate>
              <Pembayaran />
            </DefaultTemplate>
          }
        />
        <Route
          path="/pembayaran/:id?"
          element={
            <DefaultTemplate>
              <EditPembayaran />
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
