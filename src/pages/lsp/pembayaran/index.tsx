import Axios from "@/API/axios";
import { Link } from "react-router-dom";
import ModalDelete from "@/components/modal/ModalDelete";

export default function Pelanggan() {
  const [dataPelanggan, setDataPelanggan] = useState<any>([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDataDelete, setidDataDelete] = useState(0);

  const getDataPelanggan = async () => {
    try {
      const data = await Axios.get("/pembayarans");
      setDataPelanggan(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getDataPelanggan();

    return () => {
      setDataPelanggan([]);
    };
  }, []);

  return (
    <div className="flex flex-col max-w-7xl mx-auto sm:px-6 lg:px-8">
      <ModalDelete
        isOpen={modalDelete}
        setIsOpen={setModalDelete}
        apiDelete={"/pembayarans"}
        idData={idDataDelete}
        recallData={getDataPelanggan}
      />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="flex justify-end">
              <Link
                to="/tagihan/null"
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Data
              </Link>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID Pembayaran
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wIDer"
                  >
                    ID Tagihan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID Pelanggan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Pembayaran
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bulan Bayar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Biaya Admin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Biaya Admin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Bayar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id User
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPelanggan.map((person: any, personIdx: any) => (
                  <tr
                    key={person.id_pembayaran}
                    className={personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {person.id_pembayaran}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.id_tagihan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.id_pelanggan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.tanggal_pembayaran}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.bulan_bayar}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.biaya_admin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.total_bayar}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.id_user}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={"/pembayaran/" + person.id_pembayaran}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 pl-4"
                        onClick={() => (
                          setidDataDelete(person.id_pembayaran),
                          setModalDelete(true)
                        )}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
