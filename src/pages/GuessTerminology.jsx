import React, { useState } from 'react';
import { Box, Stack } from "@chakra-ui/react";
import { terminologies } from '../assets/terminologies';


const getKoreanQuestionAndNorwegianChoices = () => {
  console.log("Generating guesses");
  const questionIndex = Math.floor(Math.random() * terminologies.length);
  const choicesCount = 4;
  let choiceIndexes = [];
  const data = {
    question: {
      terminology: terminologies[questionIndex].korean,
      index: questionIndex
    },
    choices: []
  };
  while (choiceIndexes.length < choicesCount - 1) {
    const randomIndex = Math.floor(Math.random() * terminologies.length);
    if (randomIndex !== questionIndex && !choiceIndexes.some(choiceIndex => choiceIndex === randomIndex)) {
      choiceIndexes.push(randomIndex);
    }
  }

  const indexToInsertCorrectAnswerAt = Math.floor(Math.random() * choicesCount);

  choiceIndexes = [
    ...choiceIndexes.slice(0, indexToInsertCorrectAnswerAt),
    questionIndex,
    ...choiceIndexes.slice(indexToInsertCorrectAnswerAt)
  ];

  choiceIndexes.forEach(choiceIndex => {
    data.choices.push({
      terminology: terminologies[choiceIndex].norwegian,
      index: choiceIndex
    });
  });

  return data;
};

const GuessTerminology = () => {
  const guessingData = getKoreanQuestionAndNorwegianChoices();
  const [selectedChoice, setSelectedChoice] = useState("");

  return (
    <Box>
      Guess terminology
      <div>
        { guessingData.question.terminology }
      </div>
      <Stack>
        { guessingData.choices.map(choice =>
          <button key={choice.index} onClick={event => {
            setSelectedChoice(choice.index);
            console.log(choice.index + " " + selectedChoice);
          }}>
            {choice.terminology}
          </button>) }
      </Stack>
    </Box>
  );
};

export default GuessTerminology;
