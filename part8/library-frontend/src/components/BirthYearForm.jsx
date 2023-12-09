import { useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { EDIT_AUTHOR } from "../queries";

const BirthYearForm = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [birthyear, setBirthyear] = useState("");

  const [changeBirthyear] = useMutation(EDIT_AUTHOR);

  const submitHandler = async (e) => {
    e.preventDefault();

    const author = selectedOption.value;

    changeBirthyear({ variables: { author, birthyear } });
    setBirthyear("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submitHandler}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          birthyear
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>
        <button type="submit">Set birthyear</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
