import React from 'react';
import { Box, Link } from "@chakra-ui/react";
import { terminologies } from '../assets/terminologies';


const getKoreanQuestionAndNorwegianChoices = () => {
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
    if (randomIndex != questionIndex && !choiceIndexes.some(choiceIndex => choiceIndex === randomIndex)) {
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
  let guessingData = getKoreanQuestionAndNorwegianChoices();
  return (
    <Box>
      Guess terminology
      <div>
        { guessingData.question.index } { guessingData.question.terminology }
      </div>
      <div>
        { guessingData.choices.map(choice => <div key={choice.index}>{choice.index} {choice.terminology}</div>) }
      </div>
    </Box>
  );
};

export default GuessTerminology;
