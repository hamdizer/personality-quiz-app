import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Psychology as BrainIcon,
  TrackChanges as TargetIcon,
  People as UsersIcon,
  AutoAwesome as SparklesIcon,
  ArrowForward as ArrowRightIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";

export default function Home() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  const features = [
    {
      icon: <TargetIcon sx={{ fontSize: 32 }} />,
      title: "4 Personality Types",
      description:
        "Discover which of our 4 distinct personality types matches you best",
      color: "#4f46e5",
    },
    {
      icon: <UsersIcon sx={{ fontSize: 32 }} />,
      title: "10 Questions",
      description:
        "Answer carefully designed questions to reveal your true personality",
      color: "#8b5cf6",
    },
    {
      icon: <SparklesIcon sx={{ fontSize: 32 }} />,
      title: "Instant Results",
      description: "Get detailed insights and personalized results immediately",
      color: "#ec4899",
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 32 }} />,
      title: "Personalized Tips",
      description: "Get personalized tips to grow and improve",
      color: "#10b981",
    },
  ];

  const personalityTypes = [
    {
      name: "The Architect",
      description:
        "Logical, analytical, and strategic thinker who excels at problem-solving",
      color: "#3b82f6",
    },
    {
      name: "The Adventurer",
      description:
        "Spontaneous, creative, and free-spirited individual who loves new experiences",
      color: "#10b981",
    },
    {
      name: "The Guardian",
      description:
        "Responsible, caring, and dependable person who values relationships",
      color: "#f59e0b",
    },
    {
      name: "The Visionary",
      description:
        "Innovative, ambitious, and forward-thinking leader who creates change",
      color: "#8b5cf6",
    },
  ];

  return (
    <>
      <Head>
        <title>Personality Quiz - Discover Your True Self</title>
        <meta
          name="description"
          content="Take our interactive personality quiz to discover your unique personality type among 4 distinct types."
        />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #DDD6FE 100%)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box textAlign="center" mb={8}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                margin: "0 auto 32px",
              }}
            >
              <BrainIcon sx={{ fontSize: 48 }} />
            </Avatar>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                background: "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Discover Your Personality Type
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
            >
              Take our comprehensive personality quiz and unlock insights about
              yourself through 10 carefully crafted questions
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleStartQuiz}
              endIcon={<ArrowRightIcon />}
              sx={{
                background: "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                py: 2,
                px: 5,
                fontSize: "1.125rem",
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(79, 70, 229, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
                  boxShadow: "0 15px 50px rgba(79, 70, 229, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Quiz Now
            </Button>
          </Box>
          <Grid
            container
            spacing={4}
            sx={{
              mt: 8,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4, flexGrow: 1 }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                      margin: "0 auto 16px",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
        <Box sx={{ py: 8, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 6,
                fontWeight: 700,
              }}
            >
              The 4 Personality Types
            </Typography>

            <Grid
              container
              spacing={3}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
              }}
            >
              {personalityTypes.map((type, index) => (
                <Card
                  key={index}
                  sx={{
                    borderLeft: `4px solid ${type.color}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight={700}>
                      {type.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {type.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ py: 8 }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: { xs: 4, md: 6 } }}>
              <Typography variant="h3" gutterBottom fontWeight={700}>
                Ready to Discover Your Type?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Join thousands of others who have discovered their personality
                type
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleStartQuiz}
                endIcon={<ArrowRightIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)",
                  py: 2,
                  px: 5,
                  fontSize: "1.125rem",
                  borderRadius: 3,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
                  },
                }}
              >
                Take the Quiz
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
