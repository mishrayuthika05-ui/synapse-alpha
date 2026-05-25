'use server';
/**
 * @fileOverview A GenAI tool that converts lengthy academic notes into condensed, structured summaries for quick review.
 *
 * - synthesizeLectureNotes - A function that handles the lecture synthesis process.
 * - LectureSynthesisInput - The input type for the synthesizeLectureNotes function.
 * - LectureSynthesisOutput - The return type for the synthesizeLectureNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LectureSynthesisInputSchema = z.object({
  lectureNotes: z
    .string()
    .describe('The full text of the lecture notes to be summarized.'),
});
export type LectureSynthesisInput = z.infer<typeof LectureSynthesisInputSchema>;

const LectureSynthesisOutputSchema = z
  .string()
  .describe(
    'A condensed, structured summary of the lecture notes, formatted with clear headings and bullet points for easy review.'
  );
export type LectureSynthesisOutput = z.infer<
  typeof LectureSynthesisOutputSchema
>;

export async function synthesizeLectureNotes(
  input: LectureSynthesisInput
): Promise<LectureSynthesisOutput> {
  return lectureSynthesisFlow(input);
}

const lectureSynthesisPrompt = ai.definePrompt({
  name: 'lectureSynthesisPrompt',
  input: {schema: LectureSynthesisInputSchema},
  output: {schema: LectureSynthesisOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing academic lecture notes. Your task is to condense the provided lecture notes into a structured summary, highlighting key concepts, definitions, and main points.

The summary should be easy to review quickly. Use clear headings (e.g., using Markdown like '## Section Title') and bullet points (e.g., using Markdown like '- item') where appropriate to organize the information.

Do not include any introductory or concluding remarks; just provide the summary content directly.

Lecture Notes:
{{lectureNotes}}`,
});

const lectureSynthesisFlow = ai.defineFlow(
  {
    name: 'lectureSynthesisFlow',
    inputSchema: LectureSynthesisInputSchema,
    outputSchema: LectureSynthesisOutputSchema,
  },
  async input => {
    const {output} = await lectureSynthesisPrompt(input);
    return output!;
  }
);
