import {
    SiAmazondynamodb,
    SiPostgresql,
    SiMongodb,
    SiApachekafka,
    SiApachepulsar,
    SiRabbitmq
} from 'react-icons/si';
import {
    Database,
    MessageSquare,
    Server,
    Split,
    Code2,
    Check
} from 'lucide-react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

// Define a type that covers both icon libraries
export type IconComponent = IconType | LucideIcon;

export const ICON_MAP: Record<string, IconComponent> = {
    // Domains (Lucide)
    'Database': Database,
    'MessageSquare': MessageSquare,
    'Server': Server,

    // Technologies (Simple Icons)
    'SiAmazondynamodb': SiAmazondynamodb,
    'SiPostgresql': SiPostgresql,
    'SiMongodb': SiMongodb,
    'SiApachekafka': SiApachekafka,
    'SiApachepulsar': SiApachepulsar,
    'SiRabbitmq': SiRabbitmq,

    // Technologies (Lucide)
    'Consistency': Database, // Reusing Database for consistency concept
    'Split': Split,
    'Code2': Code2, // Fallback
    'Check': Check,
};

export const getIcon = (name: string): IconComponent => {
    return ICON_MAP[name] || Code2;
};
