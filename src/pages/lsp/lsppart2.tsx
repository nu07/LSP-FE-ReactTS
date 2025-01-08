import Navbar from "@/components/navbar/navbarLSP";
import { useState } from "react";

type Input = {
  value: string;
};

function LspPart2() {
  const [inputs, setInputs] = useState<Input[]>([{ value: "" }]);

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

  const sortedInputs = [...inputs].sort(
    (a, b) => a.value.localeCompare(b.value) // Compare strings lexicographically
  );

  console.log(inputs);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Dynamically Render Inputs */}
        yang sudah di sort :
        <div>
          {/* Map through sorted inputs and display each value as text */}
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
        {/* Button to Add New Input */}
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
