import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonalSettingsImg from "../assets/images/PersonalSettingsImg";
import PersonalSettings from "../assets/images/PersonalSettings.svg";
import Textarea from "@mui/joy/Textarea";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Breadcrumb from "../assets/components/breadcrumb";
import RoundButtonForward from "../assets/components/roundbuttonforward";
import RoundButtonBack from "../assets/components/roundbuttonback";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MyGlobalContext } from "../App";
import Aos from "aos";
import "aos/dist/aos.css";

interface QuestionType {
  id: number;
  question: string;
  realQuestion: string;
  answer: string;
}

function Questions() {
  const { buddyName, setBuddyName } = useContext(MyGlobalContext);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [hasName, setHasName] = useState(false);
  const navigate = useNavigate();
  var qArray = [
    {
      id: 1,
      question: "What is your buddy's name?",
      realQuestion: "What is your name?",
      answer: name,
    },
    {
      id: 2,
      question: "What is their gender?",
      realQuestion: "What is your gender?",
      answer: gender,
    },
    {
      id: 3,
      question: `What is ${name}'s age?`,
      realQuestion: "What is your age?",
      answer: "",
    },
    {
      id: 4,
      question: `Where is ${name} located?`,
      realQuestion: "What is your location?",
      answer: "",
    },
    {
      id: 5,
      question: `What is ${name}'s occupation?`,
      realQuestion: "What is your occupation?",
      answer: "",
    },
    {
      id: 6,
      question: `What is ${name}'s interests?`,
      realQuestion: "What are your interests?",
      answer: "",
    },
    {
      id: 7,
      question: `What is ${name}'s personality?`,
      realQuestion: "What is your personality?",
      answer: "",
    },
  ];
  const [questions, setQuestions] = useState(qArray);
  const [customQs, setCustomQs] = useState([] as QuestionType[]);

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  //Input validation
  const handleInput = (event: any) => {
    console.log(event.target.value);
    if (event.target.id === "nameQuestion") {
      if (event.target.value.length <= 30) {
        setName(event.target.value);
        setQuestions(
          questions.map((question) =>
            question.id === 1
              ? { ...question, answer: event.target.value }
              : question
          )
        );
      }
    } else if (
      event.target.value === "male" ||
      event.target.value === "female" ||
      event.target.value === "other"
    ) {
      setGender(event.target.value);
      setQuestions(
        questions.map((question) =>
          question.id === 2
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    } else if (event.target.id === "ageQuestion") {
      setQuestions(
        questions.map((question) =>
          question.id === 3
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    } else if (event.target.id === "locationQuestion") {
      setQuestions(
        questions.map((question) =>
          question.id === 4
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    } else if (event.target.id === "occupationQuestion") {
      setQuestions(
        questions.map((question) =>
          question.id === 5
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    } else if (event.target.id === "interestsQuestion") {
      setQuestions(
        questions.map((question) =>
          question.id === 6
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    } else if (event.target.id === "personalityQuestion") {
      setQuestions(
        questions.map((question) =>
          question.id === 7
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    }
  };
  const handleNext = () => {
    console.log(name);
    if (name !== "" && gender !== "" && questions[0]["answer"] === name) {
      console.log(questions[0]["answer"]);
      console.log(questions);
      setBuddyName(name);
      setHasName(true);
    }
  };

  const handleCustomInput = (event: any) => {
    if (event.target.id.substr(event.target.id.length - 1) === "Q") {
      const newID = event.target.id.slice(0, -1);
      console.log(+newID);
      setCustomQs(
        customQs.map((question, i) =>
          i === +newID
            ? { ...question, realQuestion: event.target.value }
            : question
        )
      );
    } else {
      setCustomQs(
        customQs.map((question, i) =>
          i === +event.target.id
            ? { ...question, answer: event.target.value }
            : question
        )
      );
    }
  };

  const addBuddy: () => any = async () => {
    const URL = "http://localhost:3001/add-persona";
    const response = await axios.post(URL, questions.concat(customQs));
    return response;
  };
  const {
    data: buddyData,
    refetch: buddyRefetch,
    isSuccess: buddySuccess,
  } = useQuery(["addBuddy"], addBuddy, { enabled: false });

  useEffect(() => {
    setQuestions(
      questions.map((q) =>
        q.id === 3
          ? { ...q, question: `What is ${name}'s age?` }
          : q.id === 4
          ? { ...q, question: `Where is ${name} located?` }
          : q.id === 5
          ? { ...q, question: `What is ${name}'s occupation?` }
          : q.id === 6
          ? { ...q, question: `What is ${name}'s interests?` }
          : q.id === 7
          ? { ...q, question: `What is ${name}'s personality?` }
          : { ...q }
      )
    );
  }, [name]);

  function submitForm() {
    const jsonBody = questions.concat(customQs);
    console.log(jsonBody);
    buddyRefetch();
  }
  useEffect(() => {
    if (buddySuccess) {
      console.log(buddyData);
      navigate("/BuddyChat");
    }
  }, [buddySuccess]);

  if (!hasName) {
    return (
      <>
        <Box>
          <p
            data-aos="fade-up"
            data-aos-once
            data-aos-delay="100"
            className="text-gray-500 text-lg lg:text-xl px-8 mt-8 lg:px-20 lg:pt-12"
          >
            Step 1:
          </p>
          <h1
            data-aos="fade-up"
            data-aos-once
            data-aos-delay="200"
            className="px-8 lg:px-20  text-3xl font-bold text-gray-600"
          >
            Build your <span className="text-primary">buddy</span>.
          </h1>

          <div
            data-aos="fade-up"
            data-aos-once
            data-aos-delay="300"
            className="flex items-center justify-center mt-24 lg:mt-12 lg:justify-start"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={2}
                sx={{ borderRadius: "22px", margin: "2px" }}
              >
                <div className="mx-auto lg:ml-20 xl:ml-32">
                  <Grid>
                    <Grid container spacing={1} margin={"10px"}>
                      <FormControl>
                        <FormLabel htmlFor="nameQuestion">
                          {questions[0]["question"]}
                        </FormLabel>
                        <Textarea
                          slotProps={{
                            textarea: {
                              id: "nameQuestion",
                            },
                          }}
                          sx={{ width: "100%" }}
                          onChange={(event) => handleInput(event)}
                          minRows={3}
                          placeholder="Could be Anything :)"
                          value={questions[0]["answer"]}
                        ></Textarea>
                        <FormLabel
                          sx={{ marginTop: "30px" }}
                          htmlFor="genderQuestion"
                          id="genderQuestion"
                        >
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="genderQuestion"
                          name="genderQuestion"
                          id="genderQuestion"
                          onChange={(event) => handleInput(event)}
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            id="genderQuestion"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                        <button
                          onClick={() => handleNext()}
                          className="py-3 px-12 bg-primary text-white font-semibold rounded-2xl mt-3 hover:shadow-lg hover:bg-[#4e48be]"
                        >
                          Next
                        </button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid className="lg:mx-24 xl:mx-44">
                    <div
                      data-aos="fade-up"
                      data-aos-once
                      data-aos-delay="300"
                      className="hidden lg:inline"
                      // className="hidden lg:flex h-full mt-16 items-center justify-center"
                    >
                      <img
                        width={400}
                        src={PersonalSettings}
                        alt="Personal settings"
                      />
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Box>
          </div>
        </Box>
        <RoundButtonBack page="/" />
        <RoundButtonForward page="/BuddyChat" />
        <Breadcrumb home="/" configure="#" chat="/BuddyChat" />
      </>
    );
  }
  return (
    <>
      <Box>
        <p className="text-gray-500 text-lg lg:text-xl px-8 mt-8 lg:px-20 lg:pt-12">
          Step 1:
        </p>
        <h1 className="px-8 lg:px-20  text-3xl font-bold text-gray-600">
          Build your <span className="text-primary">buddy</span>.
        </h1>

        <div className="flex items-center justify-center  lg:mt-12 lg:justify-start">
          <Box sx={{ flexGrow: 5 }}>
            <Grid
              container
              spacing={2}
              sx={{ borderRadius: "22px", margin: "2px" }}
            >
              <div className="mx-auto lg:ml-20 xl:ml-32">
                <Grid item>
                  <Grid container spacing={2} margin={"10px"}>
                    <FormControl>
                      <FormLabel htmlFor="ageQuestion">
                        {questions[2]["question"]}
                      </FormLabel>
                      <Textarea
                        slotProps={{
                          textarea: {
                            id: "ageQuestion",
                          },
                        }}
                        sx={{ width: "100%" }}
                        onChange={(event) => handleInput(event)}
                        minRows={3}
                        placeholder=""
                        value={questions[2]["answer"]}
                      ></Textarea>
                      <FormLabel htmlFor="locationQuestion">
                        {questions[3]["question"]}
                      </FormLabel>
                      <Textarea
                        slotProps={{
                          textarea: {
                            id: "locationQuestion",
                          },
                        }}
                        sx={{ width: "100%" }}
                        onChange={(event) => handleInput(event)}
                        minRows={3}
                        placeholder=""
                        value={questions[3]["answer"]}
                      ></Textarea>
                      <FormLabel htmlFor="occupationQuestion">
                        {questions[4]["question"]}
                      </FormLabel>
                      <Textarea
                        slotProps={{
                          textarea: {
                            id: "occupationQuestion",
                          },
                        }}
                        sx={{ width: "100%" }}
                        onChange={(event) => handleInput(event)}
                        minRows={3}
                        placeholder=""
                        value={questions[4]["answer"]}
                      ></Textarea>
                      <FormLabel htmlFor="interestsQuestion">
                        {questions[5]["question"]}
                      </FormLabel>
                      <Textarea
                        slotProps={{
                          textarea: {
                            id: "interestsQuestion",
                          },
                        }}
                        sx={{ width: "100%" }}
                        onChange={(event) => handleInput(event)}
                        minRows={3}
                        placeholder=""
                        value={questions[5]["answer"]}
                      ></Textarea>
                      <FormLabel htmlFor="personalityQuestion">
                        {questions[6]["question"]}
                      </FormLabel>
                      <Textarea
                        slotProps={{
                          textarea: {
                            id: "personalityQuestion",
                          },
                        }}
                        sx={{ width: "100%" }}
                        onChange={(event) => handleInput(event)}
                        minRows={3}
                        placeholder=""
                        value={questions[6]["answer"]}
                      ></Textarea>

                      {customQs.length > 0 && (
                        <FormLabel>
                          {
                            "Write a custom questions in the 2nd person. (i.e. What is your favorite hobby?)"
                          }
                        </FormLabel>
                      )}
                      {customQs.map((q, i) => (
                        <>
                          <FormLabel>
                            {"Custom Question " + i.toString()}
                          </FormLabel>
                          <div className="my-2">
                            <Textarea
                              slotProps={{
                                textarea: {
                                  id: i.toString() + "Q",
                                },
                              }}
                              sx={{ width: "100%" }}
                              onChange={(event) => handleCustomInput(event)}
                              minRows={1}
                              placeholder="Question"
                              value={customQs[i]["realQuestion"]}
                            ></Textarea>
                          </div>
                          <Textarea
                            slotProps={{
                              textarea: {
                                id: i.toString(),
                              },
                            }}
                            sx={{ width: "100%" }}
                            onChange={(event) => handleCustomInput(event)}
                            minRows={3}
                            placeholder="Answer"
                            value={customQs[i]["answer"]}
                          ></Textarea>
                        </>
                      ))}
                      <div className="mb-2 mt-2 flex flex-col h-screen items-center gap-0">
                        <button
                          onClick={() => {
                            setCustomQs((qs) => [
                              ...qs,
                              { question: "", id: 0 } as QuestionType,
                            ]);
                          }}
                          className="py-3 px-12 bg-primary text-white font-semibold rounded-2xl mt-3 hover:shadow-lg hover:bg-[#4e48be]"
                        >
                          Add Questions
                        </button>
                        <button
                          onClick={() => {
                            submitForm();
                          }}
                          className="py-3 px-12 bg-primary text-white font-semibold rounded-2xl mt-3 hover:shadow-lg hover:bg-[#4e48be]"
                        >
                          Submit
                        </button>
                      </div>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid className="lg:mx-24 xl:mx-44">
                  <div className="hidden lg:inline">
                    <img
                      width={400}
                      src={PersonalSettings}
                      alt="Personal Settings"
                    />
                  </div>
                </Grid>
              </div>
            </Grid>
          </Box>
        </div>
      </Box>
      <RoundButtonBack page="/" />
      <RoundButtonForward page="/BuddyChat" />
      <Breadcrumb home="/" configure="#" chat="/BuddyChat" />
    </>
  );
}
export default Questions;
