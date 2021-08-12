import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import { useHistory } from "react-router";
import "./Quiz.css";


const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [counter, setCounter] = useState(40);
  const history = useHistory();


  
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

 //console.log(time);

  if (counter == 1) {
    history.push("/result");
  }


  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          ...questions[currQues].incorrect_answers,
          questions[currQues].correct_answer,
         
        ])
    );
  }, [currQues,questions]);

//  console.log(questions);

  const handleShuffle = (options) => {
    console.log(options)
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              {/* {questions[currQues].difficulty} */}
              Score : {score}
            </span>
            <span>Quij time {counter}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
