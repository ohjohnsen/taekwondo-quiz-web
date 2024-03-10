
import { Select } from "chakra-react-select";
import { BeltSelectOptions } from './Constants';

const BeltMultiSelect = props => {
  const { onChange } = props;
  return (
    <Select
      colorScheme="blackAlpha"
      isMulti
      closeMenuOnSelect={false}
      onChange={onChange}
      options={BeltSelectOptions}
      placeholder="Velg en beltegrad..." />
  );
};

export default BeltMultiSelect
