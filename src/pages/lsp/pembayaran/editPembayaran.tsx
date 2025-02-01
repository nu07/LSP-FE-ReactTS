import React, { useState, useEffect } from "react";
import Axios from "@/API/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function EditPelanggan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditPages, setIsEditPages] = useState(true);
  const [pelanggan, setPelanggan] = useState([]);
  const [allTagihan, setAllTagihan] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_tagihan: "",
    id_pelanggan: "",
    bulan_bayar: "",
    biaya_admin: "",
    total_bayar: "",
    id_user: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    id_tagihan: Yup.number().required("ID Tagihan wajib diisi"),
    id_pelanggan: Yup.number().required("ID Pelanggan wajib diisi"),
    bulan_bayar: Yup.number().required("Bulan Bayar wajib diisi"),
    biaya_admin: Yup.number().required("Biaya Admin wajib diisi"),
    total_bayar: Yup.number().required("Total Bayar wajib diisi"),
    id_user: Yup.number().required("ID User wajib diisi"),
  });

  const getTagihanByID = async () => {
    try {
      const res = await Axios.get(`/pembayarans/${id}`);
      setFormData(res.data);
      setIsEditPages(true);
    } catch (e) {
      console.error(e);
      setIsEditPages(false);
    }
  };

  const getAllTagihan = async () => {
    try {
      const res = await Axios.get("/tagihans");
      setAllTagihan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getPelanggan = async () => {
    try {
      const res = await Axios.get("/pelanggans");
      setPelanggan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await Axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllTagihan();
    getTagihanByID();
    getPelanggan();
    getUsers();
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Hapus pesan error saat input berubah
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id_tagihan: parseInt(formData.id_tagihan),
      id_pelanggan: parseInt(formData.id_pelanggan),
      bulan_bayar: parseInt(formData.bulan_bayar),
      biaya_admin: parseInt(formData.biaya_admin),
      total_bayar: parseInt(formData.total_bayar),
      id_user: parseInt(formData.id_user),
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (isEditPages) {
        await Axios.put(`/pembayarans/${id}`, payload);
      } else {
        await Axios.post(`/pembayarans`, payload);
      }

      toast.success("Data berhasil Di Update!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setErrors({}); // Reset pesan error jika validasi berhasil
      setTimeout(() => {
        navigate("/pembayaran");
      }, 1000);
    } catch (validationErrors: any) {
      toast.error("Data Gagal Di Update!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      // Tangani error validasi
      const newErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-8 divide-y divide-gray-200 max-w-7xl mx-auto sm:px-6 lg:px-8"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Tagihan : {formData.id_tagihan}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Data Tagihan
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {/* ID Tagihan */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="id_tagihan"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  ID Tagihan
                </label>

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="id_tagihan"
                    name="id_tagihan"
                    value={formData.id_tagihan}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    {allTagihan.map((data: any) => (
                      <option key={data.id_tagihan} value={data.id_tagihan}>
                        {" "}
                        ID: {data.id_tagihan}, ID Pengguna :{" "}
                        {data.id_penggunaan} Status = {data.status}
                      </option>
                    ))}
                  </select>
                  {errors.id_tagihan && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.id_tagihan}
                    </p>
                  )}
                </div>
              </div>

              {/* ID Pelanggan */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="id_pelanggan"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  ID Pelanggan
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="id_pelanggan"
                    name="id_pelanggan"
                    value={formData.id_pelanggan}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    {pelanggan.map((data: any) => (
                      <option key={data.id_pelanggan} value={data.id_pelanggan}>
                        {" "}
                        ID: {data.id_pelanggan}, Uname : {data.username} No KWH
                        = {data.nomer_kwh}
                      </option>
                    ))}
                  </select>
                  {errors.id_pelanggan && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.id_pelanggan}
                    </p>
                  )}
                </div>
              </div>

              {/* Bulan Bayar */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="bulan_bayar"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Bulan Bayar
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="bulan_bayar"
                    id="bulan_bayar"
                    autoComplete="bulan_bayar"
                    value={formData.bulan_bayar}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.bulan_bayar && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.bulan_bayar}
                    </p>
                  )}
                </div>
              </div>

              {/* Biaya Admin */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="biaya_admin"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Biaya Admin
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="biaya_admin"
                    id="biaya_admin"
                    autoComplete="biaya_admin"
                    value={formData.biaya_admin}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.biaya_admin && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.biaya_admin}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Bayar */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="total_bayar"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Total Bayar
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="total_bayar"
                    id="total_bayar"
                    autoComplete="total_bayar"
                    value={formData.total_bayar}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.total_bayar && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.total_bayar}
                    </p>
                  )}
                </div>
              </div>

              {/* ID User */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="id_user"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  ID User
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="id_user"
                    name="id_user"
                    value={formData.id_user}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    {users.map((data: any) => (
                      <option key={data.id_user} value={data.id_user}>
                        {" "}
                        ID: {data.id_user}, Username : {data.username}
                      </option>
                    ))}
                  </select>
                  {errors.id_user && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.id_user}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="py-5">
          <div className="flex justify-end">
            <Link
              to="/tagihan"
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
