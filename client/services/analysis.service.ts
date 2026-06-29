import axios from "axios";
import { AnalyzeResponseDto, EventType } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function analyzeSession(
  events: EventType[]
): Promise<AnalyzeResponseDto> {
  const response = await api.post<AnalyzeResponseDto>("/analysis", {
    events,
  });

  return response.data;
}