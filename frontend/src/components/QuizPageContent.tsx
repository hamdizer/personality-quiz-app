import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import {
  ArrowForward as ArrowRightIcon,
  ArrowBack as ArrowLeftIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import QuizAPI from "@/pages/api/api";
import { Question, Result, Answer } from "@/types/quiz";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessge";

interface QuizPageContentProps {
  onComplete: (result: Result) => void;
}

const QuizPageContent: React.FC<QuizPageContentProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await QuizAPI.getQuestions();

      if (!data || data.length === 0) {
        throw new Error("No questions available");
      }

      setQuestions(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load questions";
      setError(errorMessage);
      console.error("Error loading questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = event.target.value;
    setSelectedOptionId(optionId);
  };

  const handleNext = () => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].pubkey]: selectedOptionId,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const answerArray: Answer[] = Object.entries(answers).map(
        ([questionId, optionId]) => ({
          questionId: questionId,
          optionId,
        })
      );

      const result = await QuizAPI.submitAnswers({ answers: answerArray });
      onComplete(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit answers";
      setError(errorMessage);
      console.error("Error submitting answers:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your personality quiz..." />;
  }

  if (error && questions.length === 0) {
    return <ErrorMessage message={error} onRetry={loadQuestions} />;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = selectedOptionId !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #DDD6FE 100%)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              background: "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Personality Quiz
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover your unique personality type
          </Typography>
        </Box>

        <Card sx={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 12,
              borderRadius: 0,
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%)",
              },
            }}
          />

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box mb={4}>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Chip
                  label={`Question ${currentQuestion + 1} of ${
                    questions.length
                  }`}
                  sx={{
                    backgroundColor: "grey.200",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={`Weight: ${question.weight}/5`}
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {question.text}
              </Typography>
            </Box>

            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
              <RadioGroup
                value={answers[question.pubkey] || ""}
                onChange={handleAnswer}
              >
                <Stack spacing={2}>
                  {question.options.map((option) => (
                    <Card
                      key={option.pubkey}
                      sx={{
                        border: 2,
                        borderColor:
                          selectedOptionId == option.pubkey
                            ? "primary.main"
                            : "grey.300",
                        backgroundColor:
                          selectedOptionId == option.pubkey
                            ? "primary.50"
                            : "white",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.light",
                          backgroundColor: "grey.50",
                          transform: "scale(1.01)",
                        },
                      }}
                      onClick={() => setSelectedOptionId(option.pubkey)}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <FormControlLabel
                          value={option.pubkey}
                          control={
                            <Radio
                              checked={selectedOptionId == option.pubkey}
                            />
                          }
                          label={
                            <Typography
                              variant="body1"
                              fontWeight={
                                selectedOptionId === option.pubkey ? 600 : 400
                              }
                            >
                              {option.text}
                            </Typography>
                          }
                          sx={{ m: 0, width: "100%" }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                startIcon={<ArrowLeftIcon />}
                sx={{ px: 3 }}
              >
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  endIcon={submitting ? null : <CheckCircleIcon />}
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  {submitting ? "Calculating Results..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isAnswered}
                  endIcon={<ArrowRightIcon />}
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  Next Question
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary">
            {Object.keys(answers).length} of {questions.length} questions
            answered
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default QuizPageContent;
