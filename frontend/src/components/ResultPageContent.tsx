import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Refresh as RotateCcwIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as AwardIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { Result } from "@/types/quiz";

interface ResultPageContentProps {
  result: Result;
  onRestart: () => void;
}

const ResultPageContent: React.FC<ResultPageContentProps> = ({
  result,
  onRestart,
}) => {
  const { personality, scores } = result;
  const [animatedScores, setAnimatedScores] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScores(scores.map((s) => s.percentage));
    }, 100);

    return () => clearTimeout(timer);
  }, [scores]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Personality Quiz Result",
          text: `I'm ${personality.name}! ${personality.description}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(
        `I'm ${personality.name}! ${personality.description} - Take the quiz at ${window.location.origin}`
      );
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #DDD6FE 100%)",
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${
                personality.color
              } 0%, ${adjustColor(personality.color, -20)} 100%)`,
              color: "white",
              p: { xs: 6, md: 10 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 220,
                height: 220,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  margin: "0 auto 24px",
                }}
              >
                <AwardIcon sx={{ fontSize: 48 }} />
              </Avatar>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                You are {personality.name}!
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  opacity: 0.95,
                  maxWidth: 700,
                  mx: "auto",
                }}
              >
                {personality.description}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            <Box mb={6}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                <TrendingUpIcon sx={{ fontSize: 28, color: "primary.main" }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                  }}
                >
                  Your Personality Breakdown
                </Typography>
              </Stack>

              <Stack spacing={4}>
                {scores.map((item, index) => (
                  <Box
                    key={item.personality.pubkey}
                    sx={{
                      "&:hover .personality-dot": {
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1.5}
                      flexWrap="wrap"
                      gap={1}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          className="personality-dot"
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: item.personality.color,
                            boxShadow: 2,
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "1rem", md: "1.125rem" },
                            fontWeight: 700,
                          }}
                        >
                          {item.personality.name}
                        </Typography>
                        {index === 0 && (
                          <Chip
                            label="TOP MATCH"
                            size="small"
                            sx={{
                              background:
                                "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
                              color: "white",
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              height: 24,
                            }}
                          />
                        )}
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.score} points
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            minWidth: 60,
                            textAlign: "right",
                          }}
                        >
                          {item.percentage}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Box
                      sx={{
                        width: "100%",
                        backgroundColor: "grey.200",
                        borderRadius: 2,
                        height: 16,
                        overflow: "hidden",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          borderRadius: 2,
                          background: `linear-gradient(90deg, ${
                            item.personality.color
                          } 0%, ${adjustColor(
                            item.personality.color,
                            20
                          )} 100%)`,
                          width: `${animatedScores[index] || 0}%`,
                          transition: "width 1s ease-out",
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            animation: "pulse 2s ease-in-out infinite",
                          },
                          "@keyframes pulse": {
                            "0%, 100%": {
                              opacity: 1,
                            },
                            "50%": {
                              opacity: 0.5,
                            },
                          },
                        }}
                      />
                    </Box>

                    {index === 0 && (
                      <Paper
                        elevation={0}
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "grey.50",
                          border: "1px solid",
                          borderColor: "grey.200",
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.7,
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.personality.description}
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Paper
              elevation={0}
              sx={{
                background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
                borderRadius: 3,
                p: 4,
                mb: 4,
                border: "1px solid",
                borderColor: "primary.100",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: "primary.main",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 28 }} />
                </Avatar>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                    }}
                  >
                    What does this mean?
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Your personality is primarily{" "}
                    <Box component="strong" sx={{ color: "text.primary" }}>
                      {personality.name}
                    </Box>
                    , which means you tend to be{" "}
                    {personality.description.toLowerCase()}. This combination of
                    traits influences how you approach challenges, interact with
                    others, and make decisions in your daily life.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                    }}
                  >
                    While {personality.name} is your dominant type, you also
                    show traits from the other personality types. This unique
                    blend makes you who you are!
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={onRestart}
                startIcon={<RotateCcwIcon />}
                fullWidth
                sx={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                  py: 2,
                  px: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(79, 70, 229, 0.25)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(79, 70, 229, 0.35)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Take Quiz Again
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleShare}
                startIcon={<ShareIcon />}
                fullWidth
                sx={{
                  py: 2,
                  px: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "primary.dark",
                    backgroundColor: "primary.50",
                  },
                }}
              >
                Share Results
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Results are based on your responses to 10 weighted questions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default ResultPageContent;
