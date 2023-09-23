import React, { useState } from 'react';
import { terminologies } from '../assets/terminologies';
import { Flex, Box, Stack, Button, Icon, IconButton, Grid } from "@chakra-ui/react";
import { MdRefresh, MdCheckCircle } from 'react-icons/md';

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
      choiceIndexes = [ ...choiceIndexes, randomIndex ];
    }
  }

  const indexToInsertCorrectAnswerAt = Math.floor(Math.random() * choicesCount);

  choiceIndexes = [
    ...choiceIndexes.slice(0, indexToInsertCorrectAnswerAt),
    questionIndex,
    ...choiceIndexes.slice(indexToInsertCorrectAnswerAt)
  ];

  choiceIndexes.forEach(choiceIndex => {
    data.choices = [
      ...data.choices,
      {
        terminology: terminologies[choiceIndex].norwegian,
        index: choiceIndex
      }
    ];
  });

  return data;
};

const calculateCorrectAnswerPercentage = answers => {
  const correctAnswerCount = answers.reduce((n, answer) => n + (answer === true));
  const percentage = Math.round(correctAnswerCount * 100 / answers.length);
  return percentage;
};

let guessingData = getKoreanQuestionAndNorwegianChoices();

const GuessTerminology = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);

  return (
    <Flex
      background='cyan.900'
      height='100vh'
      width='100vw'
      padding='1rem'
      flexDirection='column'
      alignItems='center'
    >
      <Box background='cyan.50' padding='1rem' width='50rem' borderRadius='0.5rem' dropShadow=''>
        Guess terminology
        <Box>
          Question { currentQuestion }:
          { guessingData.question.terminology }
        </Box>
        <Stack>
          { guessingData.choices.map(choice =>
            <Button
              key={choice.index}
              value={choice.index}
              colorScheme={ selectedAnswer !== choice.index ? 'gray' :
                selectedAnswer === guessingData.question.index ? 'green' : 'red' }
              onClick={() => {
                if (selectedAnswer === undefined) {
                  console.log(choice.index);
                  setSelectedAnswer(choice.index);
                  setAnswers([
                    ...answers,
                    choice.index === guessingData.question.index
                  ]);
                }
              }}
            >
              <Grid height='100%' width='100%' alignItems='center'>
                {choice.terminology}
                { selectedAnswer !== undefined &&
                  selectedAnswer !== choice.index &&
                  choice.index === guessingData.question.index &&
                  <Icon color='green' as={MdCheckCircle} boxSize='1.8rem' style={{
                    position: 'absolute',
                    right: '0',
                    marginRight: '1rem'
                  }} />
                }
              </Grid>
            </Button>) }
        </Stack>
        { (selectedAnswer !== undefined || currentQuestion > 1) &&
          <Box>
            { calculateCorrectAnswerPercentage(answers) } %
          </Box>
        }
        { selectedAnswer !== undefined &&
          <IconButton
            visibility={selectedAnswer === undefined}
            icon={<MdRefresh />}
            isRound={true}
            onClick={() => {
              guessingData = getKoreanQuestionAndNorwegianChoices();
              const nextQuestion = currentQuestion + 1;
              setCurrentQuestion(nextQuestion);
              setSelectedAnswer(undefined);
            }}
          />
        }
      </Box>
    </Flex>
  );
};

export default GuessTerminology;
