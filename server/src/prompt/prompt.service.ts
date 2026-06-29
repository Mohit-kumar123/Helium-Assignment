import { Injectable } from '@nestjs/common';
import { EventType } from 'src/common/enums/event-type.enum';

@Injectable()
export class PromptService {

  buildPrompt(events: EventType[]): string {

    return `
You are an AI assistant specializing in ecommerce shopper behavior analysis.

Your task is to analyze the following shopper session and classify the shopper into EXACTLY ONE of these categories:

- Browser
- Comparer
- Discount Seeker
- Cart Abandoner
- Loyal Customer

Rules:

1. Select ONLY one shopper type.
2. Base your reasoning ONLY on the provided events.
3. Confidence must be between 0 and 100.
4. Avoid overconfidence.
5. Return ONLY valid JSON.
6. Do NOT wrap the response in markdown.
7. Do NOT add explanations outside the JSON.

Evidence Rules:
- Return exactly 3 evidence points.
- Each point should be short (maximum 12 words).
- Do not mention event numbers.
- Do not repeat information.

Recommendation Rules:
- title: Maximum 4 words.
- primaryAction: Maximum 10 words.
- secondaryAction: Maximum 10 words.
- reasoning: Maximum 25 words.

Confidence Guidelines:
- 90-100 → Very strong evidence
- 70-89 → Strong evidence
- 50-69 → Moderate evidence
- Below 50 → Weak evidence

Session Data:

${JSON.stringify({ events }, null, 2)}

Return this exact JSON structure:

{
  "shopperType": "",
  "confidence": 0,
  "evidence": [
    "",
    "",
    ""
  ],
  "recommendation": {
    "title": "",
    "primaryAction": "",
    "secondaryAction": "",
    "reasoning": ""
  }
}
`;
  }
}