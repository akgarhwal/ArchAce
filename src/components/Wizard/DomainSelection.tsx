import React from 'react';
import type { Domain } from './types';
import * as Icons from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface DomainSelectionProps {
    domains: Domain[];
    selectedDomainId: string | undefined;
    onSelect: (domain: Domain) => void;
}

export const DomainSelection: React.FC<DomainSelectionProps> = ({ domains, selectedDomainId, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domains.map((domain, index) => {
                // Dynamically get icon component
                const IconComponent = (Icons as any)[domain.iconName] || Icons.Code;

                const isSelected = selectedDomainId === domain.id;

                return (
                    <motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(domain)}
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
                            <IconComponent size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{domain.description}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
