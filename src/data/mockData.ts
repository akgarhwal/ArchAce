import type { Node, Domain, Technology } from '../components/Wizard/types';
import {
    SiAmazondynamodb,
    SiPostgresql,
    SiMongodb,
    SiApachekafka,
    SiApachepulsar,
    SiRabbitmq
} from 'react-icons/si';
import { Split, Database } from 'lucide-react';

export const DATA: Node[] = [
    // Domains
    {
        id: 'db',
        parentId: null,
        type: 'domain',
        name: 'Databases',
        iconName: 'Database',
        description: 'Core concepts of SQL and NoSQL storage engines.',
    } as Domain,
    {
        id: 'msg',
        parentId: null,
        type: 'domain',
        name: 'Messaging Queues',
        iconName: 'MessageSquare',
        description: 'Asynchronous communication and event streaming.',
    } as Domain,
    {
        id: 'dist',
        parentId: null,
        type: 'domain',
        name: 'Distributed Systems',
        iconName: 'Server',
        description: 'Scalability, reliability, and consensus protocols.',
    } as Domain,

    // Technologies
    // Databases
    { id: 'dynamodb', parentId: 'db', type: 'technology', name: 'DynamoDB', icon: SiAmazondynamodb, quizId: '995429884' } as Technology,
    { id: 'postgres', parentId: 'db', type: 'technology', name: 'PostgreSQL', icon: SiPostgresql } as Technology,
    { id: 'mongo', parentId: 'db', type: 'technology', name: 'MongoDB', icon: SiMongodb } as Technology,
    // Messaging
    { id: 'kafka', parentId: 'msg', type: 'technology', name: 'Kafka', icon: SiApachekafka } as Technology,
    { id: 'pulsar', parentId: 'msg', type: 'technology', name: 'Pulsar', icon: SiApachepulsar } as Technology,
    { id: 'rabbitmq', parentId: 'msg', type: 'technology', name: 'RabbitMQ', icon: SiRabbitmq } as Technology,
    // Distributed Systems (Concepts using Lucide)
    { id: 'consistency', parentId: 'dist', type: 'technology', name: 'Consistency', icon: Database } as Technology,
    { id: 'sharding', parentId: 'dist', type: 'technology', name: 'Sharding', icon: Split } as Technology,
];
