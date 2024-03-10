import React, { useState, useEffect } from "react";
import { Box, Button, Icon, IconButton, Grid, SimpleGrid, Heading } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { VscDebugRestart, VscArrowRight } from "react-icons/vsc";
import { Page, BeltMultiSelect } from "../components";
import { terminologies } from "../assets/terminologies";
import { differenceInMilliseconds, format } from "date-fns";

const getKoreanQuestionAndNorwegianChoices = selectedBelts => {
  let terminologiesTemp = [];
  if (selectedBelts.length > 0) {
    selectedBelts.forEach(belt => {
      terminologiesTemp = [...terminologiesTemp, ...terminologies.filter(terminology => terminology.belt === belt.value)];
    })
  } else {
    terminologiesTemp = terminologies;
  }

  const questionIndex = Math.floor(Math.random() * terminologiesTemp.length);
  const data = {
    question: {
      terminology: terminologiesTemp[questionIndex].korean,
      index: questionIndex
    },
    choices: []
  };

  const choicesCount = 4;
  let choiceIndexes = [];
  while (choiceIndexes.length < choicesCount - 1) {
    const randomIndex = Math.floor(Math.random() * terminologiesTemp.length);
    if (randomIndex !== questionIndex && !choiceIndexes.some(choiceIndex => choiceIndex === randomIndex)) {
      choiceIndexes = [ ...choiceIndexes, randomIndex ];
    }
  }

  // Insert the correct answer at a random position in the choise array
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
        terminology: terminologiesTemp[choiceIndex].norwegian,
        index: choiceIndex
      }
    ];
  });

  return data;
};

const getCorrectAnswerCount = answers =>
{
  if (answers.length > 0)
    return answers.filter(answer => answer === true).length;
  else
    return 0;
}

const getCorrectAnswerPercentage = answers => {
  const correctAnswerCount = getCorrectAnswerCount(answers);
  const percentage = Math.round(correctAnswerCount * 100 / answers.length);
  return percentage;
};

const TerminologyQuizPage = () => {
  const [selectedBelts, setSelectedBelts] = useState([]);
  const [guessingData, setGuessingData] = useState(getKoreanQuestionAndNorwegianChoices(selectedBelts));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(Date.now);
  const [elapsedTime, setElapsedTime] = useState(0);

  const QuestionCount = 20;

  useEffect(() => {
    let timer = null;
    if(isTimerActive){
      timer = setInterval(() => {
        const newElapsedTime = differenceInMilliseconds(new Date(), startTimestamp);
        setElapsedTime(newElapsedTime);
      }, 30);
    }
    return () => {
      clearInterval(timer);
    };
  });

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
        overflowY="auto"
      >
        <Heading size="lg" marginBottom="1rem">Terminologi-quiz</Heading>
        <BeltMultiSelect onChange={selected => {
          setSelectedBelts(selected);
          setCurrentQuestion(1);
          setSelectedAnswer(undefined);
          setAnswers([]);
          setIsTimerActive(false);
          setElapsedTime(0);
          setGuessingData(getKoreanQuestionAndNorwegianChoices(selected));
        }} />
        <Box fontSize="lg" marginTop="1rem" marginBottom="1rem">
          Spørsmål {currentQuestion}/{QuestionCount}:
          Hva betyr "{ guessingData.question.terminology }" på norsk?
        </Box>
        <SimpleGrid columns={2} spacing="1rem">
          { guessingData.choices.map(choice =>
            <Button
              key={choice.index}
              value={choice.index}
              colorScheme={ selectedAnswer !== choice.index ? 'gray' :
                selectedAnswer === guessingData.question.index ? 'green' : 'red' }
              onClick={() => {
                if (selectedAnswer === undefined) {
                  setSelectedAnswer(choice.index);
                  setAnswers([
                    ...answers,
                    choice.index === guessingData.question.index
                  ]);
                  if (!isTimerActive) {
                    setIsTimerActive(true);
                    setStartTimestamp(new Date());
                  } else if (currentQuestion === QuestionCount) {
                    setIsTimerActive(false);
                  }
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
        </SimpleGrid>

        <SimpleGrid columns={2} width="100%" spacingX="1rem" fontSize="xl" marginTop="2rem">
          <Box textAlign="right">Tid:</Box>
          <Box>{format(elapsedTime, "m:ss,S")}</Box>

          <Box textAlign="right">Antall rette:</Box>
          <Box>
            {getCorrectAnswerCount(answers)}/{answers.length}
            {' '}
            (
              {(selectedAnswer !== undefined || currentQuestion > 1) ?
                getCorrectAnswerPercentage(answers) :
                "0"}
            %)
          </Box>
        </SimpleGrid>

        { (selectedAnswer !== undefined || currentQuestion > 1) &&
          <Box width="100%" textAlign="center">
            {/* Restart quiz button */}
            <IconButton
              icon={<VscDebugRestart />}
              isRound={true}
              marginRight="1rem"
              width="5rem"
              height="5rem"
              fontSize="3rem"
              onClick={() => {
                setCurrentQuestion(1);
                setSelectedAnswer(undefined);
                setAnswers([]);
                setIsTimerActive(false);
                setElapsedTime(0);
                setGuessingData(getKoreanQuestionAndNorwegianChoices(selectedBelts));
              }}
            />

            {/* Next question button */}
            <IconButton
              visibility={selectedAnswer === undefined}
              icon={<VscArrowRight />}
              isRound={true}
              width="5rem"
              height="5rem"
              fontSize="4rem"
              isDisabled={selectedAnswer === undefined || currentQuestion === QuestionCount ? true : false}
              onClick={() => {
                setGuessingData(getKoreanQuestionAndNorwegianChoices(selectedBelts));
                const nextQuestion = currentQuestion + 1;
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(undefined);
              }}
            />
          </Box>
        }
      </Box>
    </Page>
  );
};

export default TerminologyQuizPage;
