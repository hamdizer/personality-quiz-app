// lib/api.ts
import axios, { AxiosError } from "axios";
import {
  Personality,
  Question,
  Result,
  SubmitAnswersRequest,
} from "@/types/quiz";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error(
      "[API Response Error]",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export class QuizAPI {
  /**
   * Fetch all personalities
   */
  static async getPersonalities(): Promise<Personality[]> {
    try {
      const response = await apiClient.get<Personality[]>("/api/personalities");
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch personalities");
    }
  }

  /**
   * Fetch personality by ID
   */
  static async getPersonalityById(pubkey: string): Promise<Personality> {
    try {
      const response = await apiClient.get<Personality>(
        `/personalities/${pubkey}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch personality ${pubkey}`);
    }
  }

  /**
   * Fetch all questions with options
   */
  static async getQuestions(): Promise<Question[]> {
    try {
      const response = await apiClient.get<Question[]>("/api/questions");
      console.log("Fetched questions:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching questions:", error);
      throw this.handleError(error, "Failed to fetch questions");
    }
  }

  /**
   * Fetch question by ID
   */
  static async getQuestionById(pubkey: string): Promise<Question> {
    try {
      const response = await apiClient.get<Question>(
        `/api/questions/${pubkey}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch question ${pubkey}`);
    }
  }

  /**
   * Submit quiz answers
   */
  static async submitAnswers(data: SubmitAnswersRequest): Promise<Result> {
    try {
      const response = await apiClient.post<Result>("/api/quiz/submit", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Failed to submit quiz answers");
    }
  }

  /**
   * Get quiz statistics
   */
  static async getStatistics(): Promise<{
    totalQuestions: number;
    totalPersonalities: number;
    totalWeight: number;
  }> {
    try {
      const response = await apiClient.get("/api/quiz/statistics");
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Failed to fetch statistics");
    }
  }

  /**
   * Handle API errors
   */
  private static handleError(error: unknown, defaultMessage: string): Error {
    console.log("Handling API error:", error);
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || defaultMessage;
      const statusCode = error.response?.status;
      console.log("API Error Status:", statusCode);

      if (statusCode === 404) {
        return new Error("Resource not found");
      } else if (statusCode === 400) {
        return new Error(`Validation error: ${message}`);
      } else if (statusCode === 500) {
        return new Error("Server error. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        return new Error("Request timeout. Please check your connection.");
      } else if (error.code === "ERR_NETWORK") {
        return new Error(
          "Network error. Please check your internet connection."
        );
      }

      return new Error(message);
    }

    return new Error(defaultMessage);
  }
}

export default QuizAPI;
