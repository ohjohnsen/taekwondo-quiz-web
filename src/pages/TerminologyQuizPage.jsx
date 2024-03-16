import React, { useState, useEffect } from "react";
import { Box, Button, Icon, IconButton, Grid, SimpleGrid, Heading, Flex, Text } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { VscDebugRestart, VscArrowRight } from "react-icons/vsc";
import { Page, BeltMultiSelect, LanguageSelect } from "../components";
import { terminologies } from "../assets/terminologies";
import { differenceInMilliseconds, format } from "date-fns";
import { LanguageSelectOptions } from "../components/Constants";

const QuestionCount = 20;
const AnswerCount = 4;

const getQuestionAndAnswers = selectedBelts => {
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
      terminology: terminologiesTemp[questionIndex],
      index: questionIndex
    },
    answers: []
  };

  let answerIndexes = [];
  while (answerIndexes.length < AnswerCount - 1) {
    const randomIndex = Math.floor(Math.random() * terminologiesTemp.length);
    if (randomIndex !== questionIndex && !answerIndexes.some(answerIndex => answerIndex === randomIndex)) {
      answerIndexes = [ ...answerIndexes, randomIndex ];
    }
  }

  // Insert the correct answer at a random position in the answer array
  const indexToInsertCorrectAnswerAt = Math.floor(Math.random() * AnswerCount);
  answerIndexes = [
    ...answerIndexes.slice(0, indexToInsertCorrectAnswerAt),
    questionIndex,
    ...answerIndexes.slice(indexToInsertCorrectAnswerAt)
  ];

  answerIndexes.forEach(answerIndex => {
    data.answers = [
      ...data.answers,
      {
        terminology: terminologiesTemp[answerIndex],
        index: answerIndex
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
  const [selectedLanguage, setSelectedLanguage] = useState(LanguageSelectOptions[0]);
  const [guessingData, setGuessingData] = useState(getQuestionAndAnswers(selectedBelts));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(Date.now);
  const [elapsedTime, setElapsedTime] = useState(0);

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
        overflowY="auto">
        <Heading size="lg" marginBottom="1rem">Terminologi-quiz</Heading>

        <Flex direction='row' alignItems='center'>
          <Text minWidth='4em'>Grader:</Text>
          <BeltMultiSelect onChange={selected => {
            setSelectedBelts(selected);
            setCurrentQuestion(1);
            setSelectedAnswer(undefined);
            setAnswers([]);
            setIsTimerActive(false);
            setElapsedTime(0);
            setGuessingData(getQuestionAndAnswers(selected));
          }} />
        </Flex>

        <Flex direction='row' alignItems='center'>
          <Text minWidth='4rem'>Språk:</Text>
          <LanguageSelect
            onChange={selected => {
              setSelectedLanguage(selected);
              setGuessingData(getQuestionAndAnswers(selectedBelts));
            }}
            defaultValue={selectedLanguage} />
        </Flex>

        <Box fontSize="lg" marginTop="1rem" marginBottom="1rem">
          Spørsmål {currentQuestion}/{QuestionCount}:
          Hva betyr "{ selectedLanguage.value === 'norwegianToKorean'
            ? guessingData.question.terminology.norwegian + '" på koreansk?'
            : guessingData.question.terminology.korean + '" på norsk?'}
        </Box>
        <SimpleGrid columns={2} spacing="1rem">
          { guessingData.answers.map(answer =>
            <Button
              key={answer.index}
              value={answer.index}
              colorScheme={ selectedAnswer !== answer.index ? 'gray' :
                selectedAnswer === guessingData.question.index ? 'green' : 'red' }
              onClick={() => {
                if (selectedAnswer === undefined) {
                  setSelectedAnswer(answer.index);
                  setAnswers([
                    ...answers,
                    answer.index === guessingData.question.index
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
                { selectedLanguage.value === 'norwegianToKorean'
                  ? answer.terminology.korean
                  : answer.terminology.norwegian }
                { selectedAnswer !== undefined &&
                  selectedAnswer !== answer.index &&
                  answer.index === guessingData.question.index &&
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
                setGuessingData(getQuestionAndAnswers(selectedBelts));
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
                setGuessingData(getQuestionAndAnswers(selectedBelts));
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
