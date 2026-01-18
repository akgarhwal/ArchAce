import React from 'react';
import type { Technology } from './types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

interface TechnologySelectionProps {
    technologies: Technology[];
    selectedTechId: string | undefined;
    onSelect: (tech: Technology) => void;
    isLoading?: boolean;
}

export const TechnologySelection: React.FC<TechnologySelectionProps> = ({
    technologies,
    selectedTechId,
    onSelect,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => {
                const isSelected = selectedTechId === tech.id;

                const Icon = tech.icon || Code2;

                return (
                    <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelect(tech)}
                        className={clsx(
                            "cursor-pointer rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg flex flex-col items-center text-center gap-4 bg-white",
                            isSelected
                                ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-200"
                                : "border-gray-200 hover:border-emerald-300"
                        )}
                    >
                        <div className={clsx(
                            "p-4 rounded-full transition-colors",
                            isSelected ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"
                        )}>
                            <Icon size={32} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
                        </div>

                        {/* Selection Indicator (optional, but helps clarity in grid) */}
                        <div className={clsx(
                            "mt-2 text-sm font-medium transition-colors",
                            isSelected ? "text-emerald-600" : "text-gray-300"
                        )}>
                            {isSelected ? 'Selected' : 'Select'}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
