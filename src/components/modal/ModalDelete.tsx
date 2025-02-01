import Axios from "@/API/axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  apiDelete: string;
  idData: string | number;
  recallData: () => void;
}

export default function ModalEdit({
  isOpen,
  setIsOpen,
  apiDelete,
  idData,
  recallData,
}: ModalEditProps) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.delete(`${apiDelete}/${idData}`);
      if (res) {
        toast.success("Data berhasil dihapus!", {
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
        recallData(); // Memanggil fungsi untuk memperbarui data
        setTimeout(() => {
          setIsOpen(false); // Menutup modal setelah 1 detik
          setIsLoading(false);
        }, 1000);
      }
    } catch (err) {
      toast.error("Data gagal dihapus!", {
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
      setIsLoading(false);
      console.error("Error deleting data:", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          <DialogPanel className="w-full max-w-2xl space-y-4 border bg-white p-8 rounded-lg">
            <DialogTitle className="font-bold text-lg">Hapus Data</DialogTitle>
            <p className="text-gray-600">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                disabled={isLoading}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={deleteData}
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
              <button
                disabled={isLoading}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
