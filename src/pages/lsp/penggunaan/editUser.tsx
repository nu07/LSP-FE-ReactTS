import React, { useState, useEffect } from "react";
import Axios from "@/API/axios";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function EditPelanggan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarifData, setTarifData] = useState([]);
  const [isEditPages, setIsEditPages] = useState(true);
  const [formData, setFormData] = useState({
    id_pelanggan: "",
    bulan: "",
    tahun: "",
    meter_awal: "",
    meter_akhir: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    id_pelanggan: Yup.number().required("id_pelanggan wajib diisi"),
    bulan: Yup.number().required("bulan wajib diisi"),
    tahun: Yup.number().required("tahun wajib diisi"),
    meter_awal: Yup.number().required("meter_awal wajib diisi"),
    meter_akhir: Yup.number().required("meter_akhir wajib diisi"),
  });

  // Fetch tarif data
  const getTarifData = async () => {
    try {
      const response = await Axios.get("/pelanggans");
      setTarifData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getTarifByID = async () => {
    try {
      const res = await Axios.get(`/penggunaans/${id}`);
      setFormData(res.data);
      setIsEditPages(true);
    } catch (e) {
      console.error(e);
      setIsEditPages(false);
    }
  };

  useEffect(() => {
    getTarifData();
    getTarifByID();
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
      id_pelanggan: parseInt(formData.id_pelanggan),
      bulan: parseInt(formData.bulan),
      tahun: parseInt(formData.tahun),
      meter_awal: parseInt(formData.meter_awal),
      meter_akhir: parseInt(formData.meter_akhir),
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (isEditPages) {
        await Axios.put(`/penggunaans/${id}`, payload);
      } else {
        await Axios.post(`/penggunaans`, payload);
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
        navigate("/penggunaan");
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
                Pelanggan : {formData.id_pelanggan}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Data Pelanggan
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {/* id_pelanggan */}
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
                    <option value="">Pilih Pelanggan</option>
                    {tarifData.map((data: any) => (
                      <option key={data.id_pelanggan} value={data.id_pelanggan}>
                        id: {data.id_pelanggan}, uname: {data.username}, no.KWH
                        ={data.username}
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

              {/* bulan */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="bulan"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  bulan
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="bulan"
                    id="bulan"
                    autoComplete="bulan"
                    value={formData.bulan}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.bulan && (
                    <p className="mt-2 text-sm text-red-600">{errors.bulan}</p>
                  )}
                </div>
              </div>

              {/* tahun */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="tahun"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  tahun
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="tahun"
                    id="tahun"
                    autoComplete="tahun"
                    value={formData.tahun}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.tahun && (
                    <p className="mt-2 text-sm text-red-600">{errors.tahun}</p>
                  )}
                </div>
              </div>

              {/* meter_awal */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="meter_awal"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  meter_awal
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="meter_awal"
                    id="meter_awal"
                    autoComplete="meter_awal"
                    value={formData.meter_awal}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.meter_awal && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.meter_awal}
                    </p>
                  )}
                </div>
              </div>

              {/* meter_akhir */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="meter_akhir"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  meter_akhir
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="meter_akhir"
                    id="meter_akhir"
                    autoComplete="meter_akhir"
                    value={formData.meter_akhir}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.meter_akhir && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.meter_akhir}
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
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
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
