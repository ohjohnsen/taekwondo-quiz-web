import React, { useState } from "react";
import { Page, BeltMultiSelect, TerminologyTable } from "../components";
import { BeltSelectOptions } from "../components/Constants";
import { Box, Heading } from "@chakra-ui/react";
import { terminologies } from "../assets/terminologies";

const TerminologyPage = () => {
  const [selectedBelts, setSelectedBelts] = useState([]);

  return (
    <Page>
      <Box
        marginTop="2rem"
        marginBottom="2rem"
        background="gray.200"
        padding="1rem"
        width={['auto', '30rem', '46rem']}
        height="100%"
        borderRadius="0.5rem"
        overflowY="auto">
        <BeltMultiSelect
          onChange={selected => { setSelectedBelts(selected); }} />

        {
          BeltSelectOptions.map(belt => {
            // Check if any specific belt(s) have been selected, or else show terminologies for all belts
            if (selectedBelts.some(selectedBelt => selectedBelt.value === belt.value) || selectedBelts.length === 0) {
              return (
                <div key={belt.value}>
                  <Heading size="md" marginTop="2rem">{belt.label}</Heading>
                  <TerminologyTable terminologies={
                    terminologies.filter(terminology => terminology.belt === belt.value)
                  } />
                </div>
              );
            }
            else return false;
          })
        }

      </Box>
    </Page>

  )
}

export default TerminologyPage;
