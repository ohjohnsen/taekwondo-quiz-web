
import { Select } from "chakra-react-select";

export const SelectOptions = [
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
  const { onChange } = props;

  return (
    <Select
      colorScheme="blackAlpha"
      isMulti
      closeMenuOnSelect={false}
      options={SelectOptions}
      onChange={onChange} />
  );
};

export default BeltMultiSelect
