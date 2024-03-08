
import { Select } from "chakra-react-select";

const SelectOptions = [
  {
    label: "10. Gup",
    value: "10-gup",
  },
  {
    label: "9. Gup",
    value: "9-gup",
  },
];

const BeltMultiSelect = props => {
  const { rows, setSelectedRows } = props;

  return (
    <Select
      colorScheme="purple"
      isMulti
      closeMenuOnSelect={false}
      options={SelectOptions}
      onChange={selected => {
        var rowsTemp = [];
        if (selected.length > 0) {
          selected.forEach(belt => {
            rowsTemp = [...rowsTemp, ...rows.filter(row => row.values.belt === belt.value)];
          })
        } else {
          rowsTemp = rows;
        }

        setSelectedRows(rowsTemp);
        console.log(rowsTemp);
    }} />
  );
};

export default BeltMultiSelect
