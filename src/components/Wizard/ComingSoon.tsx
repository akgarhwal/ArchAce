import React from 'react';
import { Rocket, Construction, Sparkles } from 'lucide-react';

interface ComingSoonProps {
    technologyName: string;
    mode: string;
    onBack: () => void;
}

const ONE_LINERS = [
    "Rome wasn't built in a day, and neither was this quiz!",
    "Our elves are furiously typing code to bring you this content.",
    "Good things come to those who wait (but not too long we hope).",
    "Loading awesomeness... please check back later.",
    "This feature is currently baking in the oven at 350°F.",
    "We're still teaching our AI how to explain this topic.",
    "Under construction, but we promise it'll be worth the wait!",
    "Imagine something really cool here. That's what we're building.",
    "404: Content not found, but our motivation is 200 OK.",
    "We're polishing the pixels to make this perfect for you."
];

export const ComingSoon: React.FC<ComingSoonProps> = ({ technologyName, mode, onBack }) => {
    // Pick a random one-liner
    const randomOneLiner = ONE_LINERS[Math.floor(Math.random() * ONE_LINERS.length)];

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 animate-in fade-in zoom-in duration-500">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <Construction size={48} />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg animate-bounce">
                    <Rocket size={24} />
                </div>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                {mode === 'quiz' ? 'Quiz' : 'Flashcards'} Coming Soon!
            </h2>
            <p className="text-xl text-emerald-600 font-medium mb-6">
                {technologyName}
            </p>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl max-w-lg mb-8 relative overflow-hidden">
                <Sparkles className="absolute top-2 left-2 text-emerald-200 opacity-50" size={24} />
                <p className="text-lg text-emerald-800 italic relative z-10">
                    "{randomOneLiner}"
                </p>
            </div>

            <button
                onClick={onBack}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                Go Back
            </button>
        </div>
    );
};
