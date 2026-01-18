import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type { Node, Domain, Technology, RevisionMode, Step } from './types';
import { StepIndicator } from './StepIndicator';
import { DomainSelection } from './DomainSelection';
import { TechnologySelection } from './TechnologySelection';
import { RevisionModeSelection } from './RevisionModeSelection';
import { DATA as MOCK_DATA } from '../../data/mockData';
import { DEFAULT_SHEET_URL, fetchSheetData } from '../../services/sheetService';
import { clsx } from 'clsx';
import { QuizGame } from './Quiz/QuizGame';
import { ComingSoon } from './ComingSoon';

const SHEET_URL = DEFAULT_SHEET_URL;

export const WizardContainer: React.FC = () => {
    const [data, setData] = useState<Node[]>(MOCK_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [step, setStep] = useState<Step>(1);
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
    const [selectedMode, setSelectedMode] = useState<RevisionMode | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const isInitialized = React.useRef(false);

    useEffect(() => {
        if (SHEET_URL && !isInitialized.current) {
            isInitialized.current = true;
            setLoading(true);
            fetchSheetData(SHEET_URL)
                .then(fetchedData => {
                    setData(fetchedData);
                    setError(null);
                })
                .catch(err => {
                    console.error("Using mock data due to error:", err);
                    setError("Failed to load live data (using offline backup)");
                    // Keep using MOCK_DATA (initial state)
                })
                .finally(() => setLoading(false));
        }
    }, []);

    const domains = data.filter(item => item.type === 'domain') as Domain[];

    // Filter technologies based on selected domain
    const availableTechnologies = selectedDomain
        ? (data.filter(item => item.type === 'technology' && item.parentId === selectedDomain.id) as Technology[])
        : [];

    const handleNext = () => {
        if (step < 3) {
            setStep((prev) => (prev + 1) as Step);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => (prev - 1) as Step);
        }
    };

    const handleFinish = () => {
        // Navigate or show completion
        setIsFinished(true);
        console.log('Finished with:', { selectedDomain, selectedTech, selectedMode });
    };

    // Validation for Next button
    const canProceed = () => {
        if (step === 1) return !!selectedDomain;
        if (step === 2) return !!selectedTech;
        if (step === 3) return !!selectedMode;
        return false;
    };

    if (isFinished) {
        // Check if we should show the quiz
        if (selectedMode === 'quiz' && selectedTech?.quizId) {
            return (
                <QuizGame
                    sheetGid={selectedTech.quizId}
                    technologyName={selectedTech.name}
                    onExit={() => setIsFinished(false)}
                />
            );
        }

        // For all other cases, show Coming Soon
        return (
            <ComingSoon
                technologyName={selectedTech?.name || 'Unknown Technology'}
                mode={selectedMode || 'quiz'}
                onBack={() => setIsFinished(false)}
            />
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 min-h-screen flex flex-col justify-center py-12 pb-32">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    UCX Learning Path
                </h1>
                <p className="text-lg text-gray-600">Choose your domain and master the technology.</p>
            </div>

            {error && (
                <div className="max-w-md mx-auto mb-6 p-3 bg-amber-50 text-amber-600 rounded-lg text-sm text-center border border-amber-200">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
                    <p className="text-gray-500">Loading learning paths...</p>
                </div>
            ) : (
                <>
                    <StepIndicator currentStep={step} />

                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 1 && (
                                    <DomainSelection
                                        domains={domains}
                                        selectedDomainId={selectedDomain?.id}
                                        onSelect={setSelectedDomain}
                                    />
                                )}
                                {step === 2 && (
                                    <TechnologySelection
                                        technologies={availableTechnologies}
                                        selectedTechId={selectedTech?.id}
                                        onSelect={setSelectedTech}
                                    />
                                )}
                                {step === 3 && (
                                    <RevisionModeSelection
                                        selectedMode={selectedMode}
                                        onSelect={setSelectedMode}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sticky Bottom Navigation */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                        <div className="max-w-5xl mx-auto flex justify-between items-center">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={clsx(
                                    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
                                    step === 1
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={clsx(
                                    "flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg",
                                    !canProceed()
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95"
                                )}
                            >
                                {step === 3 ? 'Start' : 'Next'}
                                {step !== 3 && <ArrowRight size={20} />}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
