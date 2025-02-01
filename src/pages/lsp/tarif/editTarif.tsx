import Axios from "@/API/axios";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function EditPelanggan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditPages, setIsEditPages] = useState(true);
  const [formData, setFormData] = useState({
    daya: "",
    tarifperkwh: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    daya: Yup.string().required("daya wajib diisi"),
    tarifperkwh: Yup.string().required("tarifperkwh wajib diisi"),
  });

  const getTarifByID = async () => {
    try {
      const res = await Axios.get(`/pelanggans/${id}`);
      setFormData(res.data);
      setIsEditPages(true);
    } catch (e) {
      console.error(e);
      setIsEditPages(false);
    }
  };

  useEffect(() => {
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
      daya: parseInt(formData.daya), // Konversi ke integer
      tarifperkwh: parseInt(formData.tarifperkwh), // Konversi ke integer
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (isEditPages) {
        Axios.put(`/tarifs/${id}`, payload);
      } else {
        Axios.post(`/tarifs`, payload);
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
        navigate("/tarif");
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
                Daya : {formData.daya}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Data Pelanggan
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {/* Username */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="daya"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  daya
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="daya"
                    id="daya"
                    autoComplete="daya"
                    value={formData.daya}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.daya && (
                    <p className="mt-2 text-sm text-red-600">{errors.daya}</p>
                  )}
                </div>
              </div>

              {/* Nomer KWH */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="tarifperkwh"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Tarif Per KWH
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="tarifperkwh"
                    id="tarifperkwh"
                    autoComplete="tarifperkwh"
                    value={formData.tarifperkwh}
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-2 border-black rounded-md"
                  />
                  {errors.tarifperkwh && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.tarifperkwh}
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
