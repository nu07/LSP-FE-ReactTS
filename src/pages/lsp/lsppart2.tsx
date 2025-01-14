type Input = {
  value: string;
};

function LspPart2() {
  const [inputs, setInputs] = useState<Input[]>([{ value: "" }]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const handleAdd = () => {
    setInputs([...inputs, { value: "" }]);
  };

  const handleRemove = (index: number) => {
    if (inputs.length > 1) {
      const values = [...inputs];
      values.splice(index, 1);
      setInputs(values);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const found = inputs.find((input) => input.value === searchValue);
    setSearchResult(
      found ? `Angka ${searchValue} ditemukan` : "Angka tidak ditemukan"
    );
  }, [searchValue, inputs]);


  const sortedInputs = [...inputs].sort(
    (a, b) => parseFloat(a.value) - parseFloat(b.value)
  );

  console.log(inputs);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <label>Cari Data</label>
        <input
          type="number"
          value={searchValue}
          onChange={handleSearchChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700 rounded-md py-2"
        />
        <div className="border-b-2 my-4" />
        <div>{searchResult}</div>
        <div>yang sudah di sort :</div>
        <div>
          {sortedInputs.map((input, index) => (
            <p key={index}>{input.value}</p>
          ))}
        </div>
        {inputs.map((input, index) => (
          <div key={index} className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={input.value}
              onChange={(event) => handleChange(index, event)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
              placeholder={`Input ${index + 1}`}
            />
            {inputs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Input
          </button>
        </div>
      </div>
    </>
  );
}

export default LspPart2;
