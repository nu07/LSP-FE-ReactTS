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
    username: "",
    password: "",
    nama_admin: "",
    id_level: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username wajib diisi"),
    password: Yup.string()
      .required("Password wajib diisi")
      .min(6, "Password minimal 6 karakter"),
    nama_admin: Yup.string().required("nama admin wajib diisi"),
    id_level: Yup.string().required("Level wajib dipilih"),
  });

  // Fetch tarif data
  const getTarifData = async () => {
    try {
      const response = await Axios.get("/levels");
      setTarifData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getTarifByID = async () => {
    try {
      const res = await Axios.get(`/users/${id}`);
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
      ...formData,
      id_level: parseInt(formData.id_level), // Konversi ke integer
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (isEditPages) {
        Axios.put(`/users/${id}`, payload);
      } else {
        Axios.post(`/users`, payload);
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
      // Tambahkan logika untuk mengirim data ke API di sini
      setErrors({}); // Reset pesan error jika validasi berhasil
      setTimeout(() => {
        navigate("/user");
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
                Pelanggan : {formData.username}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Data Pelanggan
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {/* Username */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Nomer KWH */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="nama_admin"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Nama Admin
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="nama_admin"
                    id="nama_admin"
                    autoComplete="nama_admin"
                    value={formData.nama_admin}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.nama_admin && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.nama_admin}
                    </p>
                  )}
                </div>
              </div>

              {/* ID Tarif */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="id_level"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  ID Level
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="id_level"
                    name="id_level"
                    value={formData.id_level}
                    onChange={handleChange}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Level</option>
                    {tarifData.map((data: any) => (
                      <option key={data.id_level} value={data.id_level}>
                        {data.nama_level}
                      </option>
                    ))}
                  </select>
                  {errors.id_level && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.id_level}
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
