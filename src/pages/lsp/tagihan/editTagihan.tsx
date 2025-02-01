import Axios from "@/API/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function EditPelanggan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditPages, setIsEditPages] = useState(true);
  const [penggunaans, setPenggunaans] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [formData, setFormData] = useState({
    id_penggunaan: "",
    id_pelanggan: "",
    bulan: "",
    tahun: "",
    jumlah_meter: "",
    status: "Belum Dibayar", // Default value
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    id_penggunaan: Yup.number().required("ID Penggunaan wajib diisi"),
    id_pelanggan: Yup.number().required("ID Pelanggan wajib diisi"),
    bulan: Yup.number().required("Bulan wajib diisi"),
    tahun: Yup.number().required("Tahun wajib diisi"),
    jumlah_meter: Yup.number().required("Jumlah Meter wajib diisi"),
    status: Yup.string().required("Status wajib diisi"),
  });

  const getPenggunaanByID = async () => {
    try {
      const res = await Axios.get(`/tagihans/${id}`);
      setFormData(res.data);
      setIsEditPages(true);
    } catch (e) {
      console.error(e);
      setIsEditPages(false);
    }
  };

  const getPenggunaan = async () => {
    try {
      const res = await Axios.get("/penggunaans");
      setPenggunaans(res.data);
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

  useEffect(() => {
    getPenggunaanByID();
    getPenggunaan();
    getPelanggan();
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
      id_penggunaan: parseInt(formData.id_penggunaan),
      id_pelanggan: parseInt(formData.id_pelanggan),
      bulan: parseInt(formData.bulan),
      tahun: parseInt(formData.tahun),
      jumlah_meter: parseInt(formData.jumlah_meter),
      status: formData.status,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (isEditPages) {
        await Axios.put(`/tagihans/${id}`, payload);
      } else {
        await Axios.post(`/tagihans`, payload);
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
        navigate("/tagihan");
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
                Penggunaan : {formData.id_penggunaan}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Data Penggunaan
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {/* ID Penggunaan */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="id_penggunaan"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  id_penggunaan
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="id_penggunaan"
                    name="id_penggunaan"
                    value={formData.id_penggunaan}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    {penggunaans.map((data: any) => (
                      <option
                        key={data.id_penggunaan}
                        value={data.id_penggunaan}
                      >
                        {" "}
                        ID: {data.id_penggunaan}, Tahun : {data.tahun}
                      </option>
                    ))}
                  </select>
                  {errors.id_penggunaan && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.id_penggunaan}
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

              {/* Bulan */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="bulan"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Bulan
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

              {/* Tahun */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="tahun"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Tahun
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

              {/* Jumlah Meter */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="jumlah_meter"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Jumlah Meter
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="jumlah_meter"
                    id="jumlah_meter"
                    autoComplete="jumlah_meter"
                    value={formData.jumlah_meter}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.jumlah_meter && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.jumlah_meter}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Status
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Belum Dibayar">Belum Dibayar</option>
                    <option value="Sudah Dibayar">Sudah Dibayar</option>
                  </select>
                  {errors.status && (
                    <p className="mt-2 text-sm text-red-600">{errors.status}</p>
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
