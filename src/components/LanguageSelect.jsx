import { Box } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { LanguageSelectOptions } from "./Constants";

const LanguageSelect = props => {
  const { onChange, defaultValue } = props;
  return (
    <Box width='100%'>
      <Select
        colorScheme="blackAlpha"
        onChange={onChange}
        options={LanguageSelectOptions}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        placeholder="Velg et språk..."
        defaultValue={defaultValue} />
    </Box>
  );
}

export default LanguageSelect;
