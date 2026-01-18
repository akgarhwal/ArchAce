import React from 'react';


export type Step = 1 | 2 | 3;

export interface Node {
    id: string;
    parentId: string | null;
    name: string;
    description?: string;
    icon?: React.ElementType; // For React Icons
    iconName?: string; // For Lucide icon names
    type: 'domain' | 'technology';
    quizId?: string; // Optional Google Sheet GID for quizzes
}

export interface Domain extends Node {
    type: 'domain';
    parentId: null;
    iconName: string; // Domains use Lucide names
    description: string;
}

export interface Technology extends Node {
    type: 'technology';
    parentId: string; // Technologies must have a parent
    icon: React.ElementType; // Technologies use React Icons
}

export type RevisionMode = 'quiz' | 'flashcards';

export interface WizardState {
    step: Step;
    selectedDomain: Domain | null;
    selectedTech: Technology | null;
    mode: RevisionMode | null;
}
