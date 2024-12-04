
import { Select } from 'chakra-react-select';
import { BeltSelectOptions } from './constants';
import { Box } from '@chakra-ui/react';

const BeltMultiSelect = props => {
  const { onChange } = props;
  return (
    <Box width='100%'>
      <Select
        colorScheme="blackAlpha"
        isMulti
        closeMenuOnSelect={false}
        onChange={onChange}
        options={BeltSelectOptions}
        placeholder="Velg en beltegrad..." />
    </Box>
  );
};

export default BeltMultiSelect
