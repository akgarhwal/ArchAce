import Papa from 'papaparse';
import { getIcon } from '../utils/iconMap';
import type { Node, Domain, Technology } from '../components/Wizard/types';

// Default URL - user should replace this or we can supply an env var
export const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYnXVJn7BdJlgGZl9svLhgshjtQMn1J_TejMtxdY2XKKPpaPwgDsG6Krz6SlJoCYn2wTyOfacLFFQ7/pub?output=csv';

interface SheetRow {
    id: string;
    parentId: string; // CSV reads as string, empty string for null
    type: string;
    name: string;
    description: string;
    iconName: string;
    quizId?: string;
}

export const fetchSheetData = async (url: string = DEFAULT_SHEET_URL): Promise<Node[]> => {
    try {
        const response = await fetch(url);
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse<SheetRow>(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const parsedData: Node[] = results.data.map(row => {
                        const baseNode = {
                            id: row.id,
                            name: row.name,
                            description: row.description,
                            iconName: row.iconName,
                            icon: getIcon(row.iconName),
                            quizId: row.quizId
                        };

                        if (row.type === 'domain') {
                            return {
                                ...baseNode,
                                type: 'domain',
                                parentId: null
                            } as Domain;
                        } else {
                            return {
                                ...baseNode,
                                type: 'technology',
                                parentId: row.parentId || 'unknown' // Safety fallback
                            } as Technology;
                        }
                    });

                    resolve(parsedData);
                },
                error: (error: Error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Failed to fetch sheet data:", error);
        throw error;
    }
};

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    difficulty: string;
    source: string;
}

interface QuizRow {
    Question: string;
    'Option A': string;
    'Option B': string;
    'Option C': string;
    'Option D': string;
    'Correct Answer': string; // 'A', 'B', 'C', 'D'
    Difficulty: string;
    Source: string;
}

const mapLetterToIndex = (letter: string): number => {
    const map: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return map[letter.toUpperCase()] ?? -1;
};

export const fetchQuizData = async (gid: string): Promise<QuizQuestion[]> => {
    // Construct URL with GID
    // Base URL is the same, just need to switch query params or use the full URL if simplified
    // The provided URL format was: .../pub?gid=...&single=true&output=csv
    const baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYnXVJn7BdJlgGZl9svLhgshjtQMn1J_TejMtxdY2XKKPpaPwgDsG6Krz6SlJoCYn2wTyOfacLFFQ7/pub';
    const url = `${baseUrl}?gid=${gid}&single=true&output=csv`;

    try {
        const response = await fetch(url);
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse<QuizRow>(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const questions: QuizQuestion[] = results.data.map(row => ({
                        question: row.Question,
                        options: [row['Option A'], row['Option B'], row['Option C'], row['Option D']],
                        correctAnswerIndex: mapLetterToIndex(row['Correct Answer']),
                        difficulty: row.Difficulty,
                        source: row.Source
                    })).filter(q => q.question && q.correctAnswerIndex !== -1); // Basic validation

                    resolve(questions);
                },
                error: (error: Error) => reject(error)
            });
        });
    } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        return [];
    }
};
