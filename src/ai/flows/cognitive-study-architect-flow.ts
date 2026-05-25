'use server';

/**
 * @fileOverview A Cognitive Study Architect AI agent.
 *
 * - cognitiveStudyArchitect - A function that generates a personalized daily study plan.
 * - CognitiveStudyArchitectInput - The input type for the cognitiveStudyArchitect function.
 * - CognitiveStudyArchitectOutput - The return type for the cognitiveStudyArchitect function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CognitiveStudyArchitectInputSchema = z.object({
  recentGrades: z.array(z.object({
    subject: z.string().describe('The name of the academic subject.'),
    grade: z.number().min(0).max(100).describe('The percentage grade received in the subject.'),
  })).describe('An array of recent grades for various subjects.'),
  upcomingDeadlines: z.array(z.object({
    subject: z.string().describe('The academic subject related to the deadline.'),
    task: z.string().describe('Description of the task or assignment.'),
    dueDate: z.string().datetime().describe('The due date of the task in ISO 8601 format.'),
  })).describe('An array of upcoming assignments or exams with their due dates.'),
  timeAvailableHours: z.number().min(0).max(24).describe('The total number of hours the student has available for studying today.'),
  learningStylePreferences: z.string().describe('A description of the student\u0027s preferred learning styles (e.g., "visual learner", "prefers hands-on activities").'),
  areasToImprove: z.array(z.string()).describe('An array of specific topics or subjects the student wishes to improve upon.'),
});
export type CognitiveStudyArchitectInput = z.infer<typeof CognitiveStudyArchitectInputSchema>;

const CognitiveStudyArchitectOutputSchema = z.object({
  dailyPlan: z.array(z.object({
    subject: z.string().describe('The academic subject for this study block.'),
    topic: z.string().describe('The specific topic to focus on within the subject.'),
    activity: z.string().describe('The suggested study activity (e.g., "Review lecture notes", "Practice problems", "Read textbook chapter", "Watch educational video").'),
    durationMinutes: z.number().min(5).describe('The recommended duration for this activity in minutes.'),
    reasoning: z.string().describe('The AI\u0027s reasoning for suggesting this activity based on performance data and deadlines.'),
  })).describe('A structured daily study plan.'),
  focusAreas: z.array(z.string()).describe('Key subjects or topics that require immediate attention and focus based on performance and deadlines.'),
  recommendations: z.string().describe('Additional personalized study tips or general advice for the student.'),
});
export type CognitiveStudyArchitectOutput = z.infer<typeof CognitiveStudyArchitectOutputSchema>;

export async function cognitiveStudyArchitect(input: CognitiveStudyArchitectInput): Promise<CognitiveStudyArchitectOutput> {
  return cognitiveStudyArchitectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cognitiveStudyArchitectPrompt',
  input: { schema: CognitiveStudyArchitectInputSchema },
  output: { schema: CognitiveStudyArchitectOutputSchema },
  prompt: `You are the Cognitive Study Architect, an AI designed to create highly personalized daily study plans for students. Your goal is to optimize the student's learning trajectory, ensuring they focus on areas needing improvement while managing upcoming deadlines.\n\nAnalyze the following student performance data and preferences:\n\nRecent Grades:\n{{#each recentGrades}}\n- Subject: {{{subject}}}, Grade: {{{grade}}}%\n{{/each}}\n\nUpcoming Deadlines:\n{{#each upcomingDeadlines}}\n- Subject: {{{subject}}}, Task: {{{task}}}, Due Date: {{{dueDate}}}\n{{/each}}\n\nTime Available Today: {{{timeAvailableHours}}} hours\n\nLearning Style Preferences: {{{learningStylePreferences}}}\n\nAreas the student wants to improve:\n{{#each areasToImprove}}\n- {{{this}}}\n{{/each}}\n\nBased on this information, generate a daily study plan for today. The plan should be structured into blocks, each with a specific subject, topic, activity, and duration. Prioritize subjects with lower grades or nearing deadlines, and incorporate activities that align with the student's learning style and stated improvement areas. Ensure the total duration of the plan respects the student's available time. Provide clear reasoning for each suggested activity. Also, highlight the main focus areas for today and offer general personalized study recommendations.`,
});

const cognitiveStudyArchitectFlow = ai.defineFlow(
  {
    name: 'cognitiveStudyArchitectFlow',
    inputSchema: CognitiveStudyArchitectInputSchema,
    outputSchema: CognitiveStudyArchitectOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
