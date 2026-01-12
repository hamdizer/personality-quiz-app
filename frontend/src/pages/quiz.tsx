import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuizPageContent from "@/components/QuizPageContent";
import { Result } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();

  const handleComplete = (result: Result) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("quizResult", JSON.stringify(result));
    }

    router.push("/result");
  };

  return (
    <>
      <Head>
        <title>Take the Quiz - Personality Quiz</title>
        <meta
          name="description"
          content="Answer 10 questions to discover your personality type"
        />
      </Head>

      <QuizPageContent onComplete={handleComplete} />
    </>
  );
}
