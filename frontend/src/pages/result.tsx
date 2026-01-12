import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ResultPageContent from "@/components/ResultPageContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Result } from "@/types/quiz";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(() => {
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("quizResult");
      if (storedResult) {
        try {
          return JSON.parse(storedResult);
        } catch (error) {
          console.error("Error parsing quiz result:", error);
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!result && typeof window !== "undefined") {
      router.push("/quiz");
    }
  }, [result, router]);

  const handleRestart = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("quizResult");
    }

    router.push("/quiz");
  };

  if (loading) {
    return <LoadingSpinner message="Loading your results..." />;
  }

  if (!result) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Your Results - {result.personality.name} - Personality Quiz
        </title>
        <meta
          name="description"
          content={`You are ${result.personality.name}: ${result.personality.description}`}
        />
      </Head>

      <ResultPageContent result={result} onRestart={handleRestart} />
    </>
  );
}
