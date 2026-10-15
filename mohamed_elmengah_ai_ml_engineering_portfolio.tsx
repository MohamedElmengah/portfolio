import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Terminal,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Cpu,
  Database,
  Cloud,
  Code2,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  BookOpen,
  Award,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Search,
  Sliders,
  Activity,
  GitBranch,
  FileText,
  Workflow,
  ShieldCheck,
  ExternalLink,
  Mail,
  MapPin,
  GraduationCap,
  Play,
  RotateCcw,
  Eye,
  Check,
  AlertCircle,
  Filter,
  BarChart3,
  ListTodo,
  Binary,
  Server,
  Boxes,
  ArrowUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// ============================================================================
// 01. PERSONAL CONFIGURATION & CENTRALIZED DATA ARCHITECTURE
// ============================================================================

const PROFILE_CONFIG = {
  name: 'Mohamed Elmengah',
  monogram: 'ME // AI.ENG',
  role: 'AI / Machine Learning Engineer (In Progress)',
  positioningBadge: 'Building toward AI Engineering · B.Sc. CS ’27',
  location: 'Cairo, Egypt',
  university: 'El Shorouk Academy',
  degree: 'B.Sc. in Computer Science',
  graduationYear: '2027 (Expected)',
  email: 'mohamed.elmengah@outlook.com',
  github: 'https://github.com/mohamedelmengah',
  linkedin: 'https://linkedin.com/in/mohamedelmengah',
  headline: 'Building intelligent systems, one architectural layer at a time.',
  subheadline:
    "I'm a Computer Science student in Cairo focused on Machine Learning, Generative AI, RAG, Agentic workflows, and cloud-based AI engineering — with a strong interest in building complete products from backend retrieval pipelines to the user interface.",
  aboutPhilosophy:
    'I enjoy the layer where software engineering meets intelligence — building systems that do not just process data in an isolated notebook, but turn models, retrieval pipelines, and interfaces into reliable, useful software experiences.'
};

// Complete AI Product Lifecycle Layers (Signature Narrative)
const AI_LIFECYCLE_LAYERS = [
  {
    id: 'frontend',
    index: '01',
    name: 'Frontend UI',
    shortLabel: 'Frontend',
    role: 'Client Interface & State',
    description: 'Translates complex model outputs, citations, and streaming states into responsive, legible human interfaces.',
    payloadSchema: '{ query: string, session_id: uuid, stream: true }',
    linkedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Flutter'],
    linkedProjects: ['ai-analytics-dashboard', 'ai-productivity-app']
  },
  {
    id: 'api',
    index: '02',
    name: 'API Gateway',
    shortLabel: 'API',
    role: 'Request Routing & Validation',
    description: 'Exposes structured REST/streaming endpoints, validates schemas, and bridges frontend interfaces with Python AI backends.',
    payloadSchema: 'POST /v1/orchestrate -> Pydantic Schema Validation',
    linkedSkills: ['FastAPI', 'Python', 'SQL', 'C#'],
    linkedProjects: ['ml-prediction-app', 'rag-knowledge-assistant']
  },
  {
    id: 'application',
    index: '03',
    name: 'AI Application',
    shortLabel: 'AI App',
    role: 'Orchestration & Guardrails',
    description: 'Manages prompt templates, conversation state, context window budgets, and fallback logic across user turns.',
    payloadSchema: '{ system_prompt, memory_window, token_budget: 4096 }',
    linkedSkills: ['LLM Applications', 'Prompt Engineering', 'LangChain'],
    linkedProjects: ['ai-productivity-app', 'rag-knowledge-assistant']
  },
  {
    id: 'llm',
    index: '04',
    name: 'LLM & ML Core',
    shortLabel: 'LLM / ML',
    role: 'Reasoning & Predictive Inference',
    description: 'Executes language generation, structured JSON extraction, or classical supervised machine learning inference.',
    payloadSchema: 'Inference(temperature=0.2, response_format="json_object")',
    linkedSkills: ['LLMs', 'Generative AI', 'Machine Learning', 'Deep Learning', 'TensorFlow'],
    linkedProjects: ['rag-knowledge-assistant', 'ml-prediction-app']
  },
  {
    id: 'rag',
    index: '05',
    name: 'RAG & Retrieval',
    shortLabel: 'RAG / Vector',
    role: 'Semantic Grounding & Vector Search',
    description: 'Chunks documents, generates dense embeddings, and retrieves relevant context from vector storage before generation.',
    payloadSchema: 'top_k_chunks = vector_store.similarity_search(query_emb, k=4)',
    linkedSkills: ['RAG', 'Vector Databases', 'Python', 'EDA'],
    linkedProjects: ['rag-knowledge-assistant', 'ai-productivity-app']
  },
  {
    id: 'agents',
    index: '06',
    name: 'Agents & Tools',
    shortLabel: 'Agents',
    role: 'Task Decomposition & Tool Calling',
    description: 'Decomposes multi-step problems, selects external tools, evaluates intermediate outputs, and iterates toward a goal.',
    payloadSchema: 'StateGraph(nodes=[Planner, ToolExecutor, Verifier])',
    linkedSkills: ['Agentic AI', 'AI Agents', 'LangGraph', 'LangChain'],
    linkedProjects: ['agentic-research-assistant']
  },
  {
    id: 'data',
    index: '07',
    name: 'Data Pipelines',
    shortLabel: 'Data',
    role: 'EDA, Quality & Feature Engineering',
    description: 'Prepares clean datasets, evaluates annotation quality, transforms features, and structures analytical warehouses.',
    payloadSchema: 'Pipeline([Imputer(), StandardScaler(), FeatureSelector()])',
    linkedSkills: ['SQL', 'EDA', 'Microsoft Fabric', 'Python'],
    linkedProjects: ['ai-analytics-dashboard', 'ml-prediction-app']
  },
  {
    id: 'cloud',
    index: '08',
    name: 'Cloud & Deployment',
    shortLabel: 'Cloud / MLOps',
    role: 'Containerization & Cloud Infrastructure',
    description: 'Packages services with Docker, manages environment reproducibility, and deploys workloads on cloud infrastructure.',
    payloadSchema: 'Dockerfile -> AWS Compute / Container Runtime',
    linkedSkills: ['AWS', 'Docker', 'MLOps'],
    linkedProjects: ['ml-prediction-app', 'rag-knowledge-assistant']
  }
];

// Interactive Hero Pipeline Simulation Scenarios
const HERO_SCENARIOS = [
  {
    id: 'rag-flow',
    label: '01 // Grounded RAG Synthesis',
    query: 'How does chunk overlap affect retrieval recall in technical docs?',
    activeNodes: ['frontend', 'api', 'application', 'rag', 'llm'],
    latencyNote: 'Simulated Trace · 5 Architectural Hops',
    steps: [
      { node: 'frontend', detail: 'Captures user query & dispatches typed request payload' },
      { node: 'api', detail: 'FastAPI validates input schema & initializes trace ID' },
      { node: 'rag', detail: 'Embeds query & retrieves top-4 chunks via cosine similarity' },
      { node: 'application', detail: 'Injects retrieved chunks into grounded system prompt' },
      { node: 'llm', detail: 'Synthesizes answer strictly anchored to cited document spans' }
    ],
    outputPreview:
      'Chunk overlap (typically 10–20% of chunk size) preserves semantic continuity across boundary splits, reducing context fragmentation during vector retrieval. [Source: retrieval_architecture.md#L42]'
  },
  {
    id: 'agent-flow',
    label: '02 // Multi-Step Agentic Workflow',
    query: 'Compare retrieval strategies and draft an architecture checklist.',
    activeNodes: ['frontend', 'api', 'agents', 'rag', 'llm'],
    latencyNote: 'Simulated Trace · Stateful Graph Loop',
    steps: [
      { node: 'frontend', detail: 'Submits complex multi-part research objective' },
      { node: 'agents', detail: 'Planner node decomposes objective into 3 sequential sub-tasks' },
      { node: 'rag', detail: 'Executes targeted search tool across indexed knowledge base' },
      { node: 'agents', detail: 'Evaluator node verifies context sufficiency before synthesis' },
      { node: 'llm', detail: 'Compiles structured comparison table & implementation checklist' }
    ],
    outputPreview:
      'Task Decomposed → [1] Dense vs. Hybrid Search analyzed [2] Reranking tradeoffs evaluated [3] 6-point engineering checklist generated with verification steps.'
  },
  {
    id: 'ml-flow',
    label: '03 // Classical ML Inference Pipeline',
    query: 'Predict system resource demand from structured telemetry features.',
    activeNodes: ['frontend', 'api', 'data', 'llm', 'cloud'],
    latencyNote: 'Simulated Trace · Scikit-Learn + FastAPI',
    steps: [
      { node: 'frontend', detail: 'Collects structured numerical & categorical feature inputs' },
      { node: 'api', detail: 'Validates feature ranges & missing value constraints' },
      { node: 'data', detail: 'Applies fitted StandardScaler & One-Hot encoding pipeline' },
      { node: 'llm', detail: 'Executes trained ensemble model inference & feature attribution' },
      { node: 'cloud', detail: 'Returns prediction JSON from containerized API service' }
    ],
    outputPreview:
      'Predicted Load Index: 0.74 (High ConfidenceBand) · Primary drivers: Concurrent_Requests (weight: 0.41), Payload_KB (weight: 0.29).'
  }
];

// Real Experience Data (Strict Adherence to Honesty Rules)
const EXPERIENCES = [
  {
    id: 'echo-inc',
    organization: 'Echo INC.',
    role: 'AI Internship',
    status: 'ONGOING',
    statusLabel: 'Ongoing · Active Internship',
    category: 'AI Engineering & Agentic Systems',
    summary:
      'Focusing on practical AI engineering workflows around Retrieval-Augmented Generation (RAG), Agentic RAG, LLM applications, and multi-step AI agent architectures.',
    details: [
      'Working with RAG pipelines to ground Large Language Model responses in structured and unstructured knowledge sources.',
      'Currently exploring Agentic AI patterns, tool-using agents, and graph-based workflow orchestration concepts (including LangChain and LangGraph ecosystems).',
      'Training in vector database indexing strategies, embedding retrieval evaluation, and modular LLM application design.'
    ],
    technologies: [
      { name: 'RAG', qualifier: 'Working with' },
      { name: 'Agentic RAG', qualifier: 'Currently exploring' },
      { name: 'AI Agents', qualifier: 'Working with' },
      { name: 'LLM Applications', qualifier: 'Working with' },
      { name: 'Vector Databases', qualifier: 'Training in' },
      { name: 'LangChain / LangGraph', qualifier: 'Currently exploring' }
    ]
  },
  {
    id: 'depi',
    organization: 'DEPI (Digital Egypt Pioneers Initiative)',
    role: 'AWS Machine Learning Engineer Trainee',
    status: 'ONGOING',
    statusLabel: 'Ongoing · Active Track',
    category: 'Machine Learning & Cloud Engineering',
    summary:
      'Developing core competencies in Machine Learning engineering paired with AWS cloud infrastructure and practical model lifecycle workflows.',
    details: [
      'Training in supervised and unsupervised machine learning pipelines, feature engineering, and model evaluation methodologies.',
      'Working with AWS cloud fundamentals and exploring how ML workloads move from local notebooks toward cloud-hosted environments.',
      'Practicing applied Python data science workflows and end-to-end ML problem framing.'
    ],
    technologies: [
      { name: 'Machine Learning', qualifier: 'Working with' },
      { name: 'AWS Cloud', qualifier: 'Training in' },
      { name: 'Python', qualifier: 'Working with' },
      { name: 'Practical AI/ML', qualifier: 'Working with' }
    ]
  },
  {
    id: 'iti',
    organization: 'ITI (Information Technology Institute)',
    role: 'Machine Learning Intern',
    status: 'COMPLETED',
    statusLabel: 'Completed Internship',
    category: 'Machine Learning & Mathematical Foundations',
    summary:
      'Completed intensive hands-on training covering classical Machine Learning, Deep Learning fundamentals, and the mathematical foundations behind AI systems.',
    details: [
      'Studied linear algebra, probability, and optimization concepts that underpin gradient-based learning and model convergence.',
      'Implemented supervised and unsupervised machine learning workflows, exploratory data analysis (EDA), and neural network fundamentals.',
      'Built practical intuition for diagnosing overfitting, feature scaling, and validation splitting.'
    ],
    technologies: [
      { name: 'Machine Learning', qualifier: 'Practiced' },
      { name: 'Deep Learning', qualifier: 'Foundations' },
      { name: 'AI Mathematics', qualifier: 'Foundations' },
      { name: 'EDA & Python', qualifier: 'Practiced' }
    ]
  },
  {
    id: 'outlier',
    organization: 'Outlier',
    role: 'AI Data Annotator',
    status: 'PREVIOUS',
    statusLabel: 'Previous Experience',
    category: 'AI Data Quality & Evaluation Workflows',
    summary:
      'Contributed to AI data annotation and quality evaluation workflows, gaining firsthand perspective on how training and evaluation data impact LLM behavior.',
    details: [
      'Evaluated model-generated responses against strict rubrics for factual accuracy, instruction adherence, and formatting.',
      'Performed structured data annotation tasks supporting AI/ML data preparation workflows.',
      'Developed practical appreciation for data quality as the foundation of reliable downstream AI systems.'
    ],
    technologies: [
      { name: 'AI Data Annotation', qualifier: 'Practiced' },
      { name: 'Data Quality Review', qualifier: 'Practiced' },
      { name: 'AI/ML Data Workflows', qualifier: 'Practiced' }
    ]
  },
  {
    id: 'icthub',
    organization: 'IctHub Egypt',
    role: 'Mobile Application Development Intern — Flutter',
    status: 'COMPLETED',
    statusLabel: 'Completed Training · Secondary Track',
    category: 'Software & UI Engineering Foundation',
    summary:
      'Completed practical training in cross-platform application development using Flutter and Dart, strengthening component architecture and responsive UI engineering skills.',
    details: [
      'Built responsive mobile application interfaces using Flutter widget trees and Dart state management patterns.',
      'Reinforced core software engineering habits including clean code modularity, asynchronous API consumption, and user-centric UI layout.'
    ],
    technologies: [
      { name: 'Flutter', qualifier: 'Practiced' },
      { name: 'Dart', qualifier: 'Practiced' },
      { name: 'Responsive UI', qualifier: 'Practiced' }
    ]
  }
];

// Ongoing Boot Camp Section Data (Strict Adherence: NO dates, NO end date, Ongoing status)
const ONGOING_BOOTCAMP = {
  title: 'ACC × Sprints — AI Engineering Boot Camp',
  statusText: 'AI Engineering Boot Camp — Ongoing',
  description:
    'An intensive, ongoing engineering track focused on bridging core Machine Learning with modern Generative AI application development, backend API serving, containerization, and deployment workflows.',
  focusAreas: [
    { name: 'Python', layer: 'Core Language', status: 'Working With' },
    { name: 'LLMs', layer: 'Generative Core', status: 'Developing Familiarity' },
    { name: 'RAG', layer: 'Retrieval Systems', status: 'Working With' },
    { name: 'LangChain', layer: 'Orchestration', status: 'Currently Exploring' },
    { name: 'LangGraph', layer: 'Stateful Agents', status: 'Currently Exploring' },
    { name: 'Agentic AI', layer: 'Autonomous Workflows', status: 'Currently Exploring' },
    { name: 'FastAPI', layer: 'Backend Serving', status: 'Developing Familiarity' },
    { name: 'Docker', layer: 'Containerization', status: 'Developing Familiarity' },
    { name: 'MLOps', layer: 'Lifecycle & Ops', status: 'Currently Exploring' },
    { name: 'Cloud Deployment', layer: 'Infrastructure', status: 'Currently Exploring' }
  ]
};

// 8-Step Interactive Engineering Journey
const LEARNING_JOURNEY = [
  {
    step: '01',
    title: 'Computer Science Foundations',
    layer: 'Core CS & Algorithms',
    summary:
      'Building a rigorous base in data structures, algorithms, object-oriented programming, and systems thinking through my B.Sc. in Computer Science at El Shorouk Academy.',
    keyConcepts: ['Data Structures & Algorithms', 'C / C++ / C#', 'Problem Decomposition', 'Software Architecture'],
    connectionToAI: 'Provides the computational efficiency and algorithmic reasoning required to design scalable AI pipelines.'
  },
  {
    step: '02',
    title: 'Programming & Data Analytics',
    layer: 'Python, SQL & EDA',
    summary:
      'Moving into Python programming, relational databases with SQL, exploratory data analysis (EDA), and enterprise analytics concepts including Microsoft Fabric.',
    keyConcepts: ['Python Ecosystem', 'SQL Queries', 'Exploratory Data Analysis', 'Microsoft Fabric'],
    connectionToAI: 'Clean, well-understood data is the prerequisite for every reliable machine learning model and retrieval index.'
  },
  {
    step: '03',
    title: 'Machine Learning & Deep Learning',
    layer: 'Mathematical & Predictive ML',
    summary:
      'Studying the mathematics of AI, classical supervised/unsupervised models, and deep learning foundations with TensorFlow through ITI and academic coursework.',
    keyConcepts: ['Supervised & Unsupervised ML', 'AI Mathematics', 'Deep Learning Basics', 'TensorFlow & Scikit-learn'],
    connectionToAI: 'Establishes how models learn representations, optimize loss functions, and generalize to unseen inputs.'
  },
  {
    step: '04',
    title: 'Cloud & AWS Infrastructure',
    layer: 'Cloud-Native ML Foundations',
    summary:
      'Expanding beyond local scripts through the DEPI AWS Machine Learning Engineer track to understand how data and models operate in cloud environments.',
    keyConcepts: ['AWS Cloud Foundations', 'Cloud Storage & Compute', 'Scalable ML Workflows', 'Environment Management'],
    connectionToAI: 'Connects experimental machine learning with resilient infrastructure capable of serving real applications.'
  },
  {
    step: '05',
    title: 'Generative AI & LLM Applications',
    layer: 'Foundation Models & Prompt Systems',
    summary:
      'Working with Large Language Models, structured prompt engineering, context window design, and programmatic API integration.',
    keyConcepts: ['LLM APIs', 'Structured Prompt Engineering', 'JSON Schema Outputs', 'Context Management'],
    connectionToAI: 'Unlocks reasoning, summarization, and natural language interfaces inside modern software products.'
  },
  {
    step: '06',
    title: 'RAG (Retrieval-Augmented Generation)',
    layer: 'Semantic Search & Grounding',
    summary:
      'Designing pipelines that ingest documents, compute dense embeddings, query vector databases, and ground LLM outputs in verifiable context.',
    keyConcepts: ['Document Chunking', 'Dense Embeddings', 'Vector Databases', 'Context Injection & Citations'],
    connectionToAI: 'Reduces hallucinations and allows AI systems to reason over private or rapidly changing knowledge bases.'
  },
  {
    step: '07',
    title: 'Agentic AI Systems',
    layer: 'Multi-Step Reasoning & Tool Use',
    summary:
      'Exploring how LLMs transition from passive responders to active agents capable of task decomposition, tool selection, and stateful graph execution.',
    keyConcepts: ['Agent Workflows', 'Tool Calling', 'LangChain & LangGraph', 'Agentic RAG'],
    connectionToAI: 'Enables software systems to execute multi-step research and operational workflows autonomously.'
  },
  {
    step: '08',
    title: 'Full-Stack AI Engineering',
    layer: 'End-to-End AI Product Delivery',
    summary:
      'Unifying FastAPI backends, Docker containers, MLOps practices, and responsive React/TypeScript interfaces to ship cohesive AI products.',
    keyConcepts: ['FastAPI Microservices', 'Docker & MLOps', 'React & TypeScript UI', 'Production AI Architecture'],
    connectionToAI: 'Transforms isolated AI capabilities into complete, trustworthy applications that humans can actually use.'
  }
];

// "Currently Exploring" Lab Matrix
const CURRENTLY_EXPLORING = [
  {
    id: 'rag-systems',
    topic: 'RAG Systems & Retrieval Evaluation',
    status: 'Active Focus',
    focusNote: 'Experimenting with chunking boundaries, hybrid keyword + vector retrieval, and context grounding fidelity.',
    layer: 'Retrieval Layer'
  },
  {
    id: 'llm-apps',
    topic: 'LLM Application Architecture',
    status: 'Active Focus',
    focusNote: 'Structuring deterministic JSON outputs, prompt routing, and resilient API error handling around LLM calls.',
    layer: 'Application Layer'
  },
  {
    id: 'agentic-ai',
    topic: 'Agentic AI & Tool Use',
    status: 'Exploring',
    focusNote: 'Studying how agents decompose ambiguous goals, invoke external search/computation tools, and verify results.',
    layer: 'Agent Layer'
  },
  {
    id: 'langgraph',
    topic: 'LangGraph & Stateful Workflows',
    status: 'Currently Learning',
    focusNote: 'Learning graph-based agent state machines, conditional edges, and controlled loop termination.',
    layer: 'Orchestration'
  },
  {
    id: 'ai-engineering',
    topic: 'End-to-End AI Engineering',
    status: 'Core Direction',
    focusNote: 'Connecting Python AI backends (FastAPI) with modern TypeScript/React frontends into unified products.',
    layer: 'Full Lifecycle'
  },
  {
    id: 'cloud-ai',
    topic: 'Cloud AI & AWS ML Workflows',
    status: 'Training In',
    focusNote: 'Building familiarity with AWS cloud services, managed ML pipelines, and cloud deployment patterns.',
    layer: 'Cloud Layer'
  },
  {
    id: 'prod-ai',
    topic: 'Production AI Systems',
    status: 'Exploring',
    focusNote: 'Investigating latency tradeoffs, token budget management, and observability in AI-powered web services.',
    layer: 'System Design'
  },
  {
    id: 'mlops',
    topic: 'MLOps & Containerization',
    status: 'Currently Learning',
    focusNote: 'Developing practical habits with Docker containerization, reproducible environments, and model serving.',
    layer: 'Operations'
  }
];

// Interactive Skills System (Strict Adherence: Never use "Expert", use honest labels)
const SKILLS_DATA = [
  // Programming
  { name: 'Python', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'llm', context: 'Primary language for ML, data pipelines, RAG scripts, and FastAPI backends.' },
  { name: 'C', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'data', context: 'Core procedural programming, memory concepts, and foundational CS coursework.' },
  { name: 'C++', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'data', context: 'Object-oriented design, data structures, and algorithmic problem solving.' },
  { name: 'C#', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'api', context: 'Structured object-oriented software engineering and application logic.' },
  { name: 'SQL', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'data', context: 'Relational data querying, joins, aggregations, and analytical data preparation.' },
  { name: 'Dart', category: 'Programming', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Typed application development for cross-platform Flutter interfaces.' },

  // AI / ML
  { name: 'Machine Learning', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'llm', context: 'Supervised & unsupervised learning, model evaluation, and feature engineering.' },
  { name: 'Deep Learning', category: 'AI / ML', levelLabel: 'Currently Learning', lifecycleNode: 'llm', context: 'Neural network architectures, backpropagation, and representation learning.' },
  { name: 'TensorFlow', category: 'AI / ML', levelLabel: 'Currently Learning', lifecycleNode: 'llm', context: 'Building and training deep learning models in Python.' },
  { name: 'EDA', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'data', context: 'Statistical profiling, missing-value analysis, and distribution visualization.' },
  { name: 'Prompt Engineering', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'application', context: 'System prompt structuring, few-shot conditioning, and schema enforcement.' },
  { name: 'Generative AI', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'llm', context: 'Text synthesis, semantic transformation, and foundation model integration.' },
  { name: 'LLMs', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'llm', context: 'Integrating Large Language Models into practical software workflows.' },
  { name: 'RAG', category: 'AI / ML', levelLabel: 'Working With', lifecycleNode: 'rag', context: 'Grounding LLM outputs with semantic retrieval over external documents.' },
  { name: 'Agentic AI', category: 'AI / ML', levelLabel: 'Exploring', lifecycleNode: 'agents', context: 'Designing autonomous reasoning loops, planning, and tool use.' },

  // AI Engineering
  { name: 'Vector Databases', category: 'AI Engineering', levelLabel: 'Currently Learning', lifecycleNode: 'rag', context: 'Storing dense embeddings and executing fast cosine/dot-product retrieval.' },
  { name: 'LLM Applications', category: 'AI Engineering', levelLabel: 'Working With', lifecycleNode: 'application', context: 'End-to-end application logic wrapping language models and user interfaces.' },
  { name: 'AI Agents', category: 'AI Engineering', levelLabel: 'Exploring', lifecycleNode: 'agents', context: 'Task-oriented agents that combine LLM reasoning with external tools.' },
  { name: 'LangChain', category: 'AI Engineering', levelLabel: 'Currently Learning', lifecycleNode: 'application', context: 'Composable chains, document loaders, and retrieval abstractions.' },
  { name: 'LangGraph', category: 'AI Engineering', levelLabel: 'Exploring', lifecycleNode: 'agents', context: 'Stateful, cyclical graph workflows for multi-step agent architectures.' },
  { name: 'FastAPI', category: 'AI Engineering', levelLabel: 'Currently Learning', lifecycleNode: 'api', context: 'High-performance asynchronous Python APIs for serving ML and RAG models.' },
  { name: 'Docker', category: 'AI Engineering', levelLabel: 'Currently Learning', lifecycleNode: 'cloud', context: 'Containerizing AI microservices and dependencies for reproducible runs.' },
  { name: 'MLOps', category: 'AI Engineering', levelLabel: 'Exploring', lifecycleNode: 'cloud', context: 'Lifecycle management, experiment tracking, and deployment pipelines.' },

  // Cloud / Data
  { name: 'AWS', category: 'Cloud / Data', levelLabel: 'Currently Learning', lifecycleNode: 'cloud', context: 'Cloud infrastructure and machine learning services via DEPI training.' },
  { name: 'Microsoft Fabric', category: 'Cloud / Data', levelLabel: 'Working With', lifecycleNode: 'data', context: 'Certified Fabric Analytics Engineer Associate — lakehouses, dataflows, and analytics.' },

  // Development
  { name: 'React', category: 'Development', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Component-driven web interfaces, hooks, and interactive AI dashboards.' },
  { name: 'Flutter', category: 'Development', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Cross-platform mobile UI engineering completed at IctHub Egypt.' },
  { name: 'HTML', category: 'Development', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Semantic document structure and accessible web foundations.' },
  { name: 'CSS', category: 'Development', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Responsive layout systems, design tokens, and fluid interfaces.' },
  { name: 'JavaScript', category: 'Development', levelLabel: 'Working With', lifecycleNode: 'frontend', context: 'Asynchronous client logic, DOM interaction, and modern ES6+ patterns.' }
];

// Confirmed Certifications from CV (Exact 7 items, zero fabrication)
const CERTIFICATIONS = [
  {
    id: 'ms-fabric',
    title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    category: 'Data & Cloud Analytics',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Enterprise data analytics, lakehouse architecture, data transformation, and semantic modeling in Microsoft Fabric.'
  },
  {
    id: 'google-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    category: 'Artificial Intelligence',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Core AI principles, practical generative AI workflows, and responsible AI implementation.'
  },
  {
    id: 'intro-ai-eng',
    title: 'Introduction to AI Engineering — Certified',
    issuer: 'Certified Program',
    category: 'AI Engineering',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Foundational concepts of building software systems powered by machine learning and language models.'
  },
  {
    id: 'coursera-eda',
    title: 'Exploratory Data Analysis for Machine Learning',
    issuer: 'Coursera',
    category: 'Machine Learning Foundations',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Data cleaning, feature transformation, distribution analysis, and dataset preparation for ML pipelines.'
  },
  {
    id: 'coursera-data-analytics',
    title: 'Introduction to Data Analytics',
    issuer: 'Coursera',
    category: 'Data Analytics',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Analytical thinking, data lifecycle stages, and extracting structured insights from raw datasets.'
  },
  {
    id: 'iti-ml-ai',
    title: 'Introduction to Machine Learning and Artificial Intelligence',
    issuer: 'Information Technology Institute (ITI)',
    category: 'Machine Learning & AI',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Supervised and unsupervised learning fundamentals, evaluation methodologies, and core AI concepts.'
  },
  {
    id: 'freecodecamp-python',
    title: 'Python Certification',
    issuer: 'freeCodeCamp',
    category: 'Programming',
    verifiedStatus: 'Confirmed Certification',
    focus: 'Python syntax, data structures, algorithmic problem solving, and modular scripting.'
  }
];

// Selected Builds & Experiments (5 Projects with Full 11-Section Case Studies)
const SELECTED_PROJECTS = [
  {
    id: 'rag-knowledge-assistant',
    number: '01',
    type: 'PERSONAL AI PROJECT',
    focusTag: 'Retrieval-Augmented Generation',
    title: 'RAG Knowledge Assistant',
    tagline: 'Ask questions across technical documents without losing the verifiable context behind the answer.',
    shortDescription:
      'An end-to-end Retrieval-Augmented Generation prototype designed to ingest markdown and PDF documentation, chunk text with semantic continuity, index dense vector embeddings, and synthesize answers strictly grounded in cited source passages.',
    stack: [
      { name: 'Python', status: 'Core' },
      { name: 'RAG Pipeline', status: 'Core' },
      { name: 'Embeddings', status: 'Core' },
      { name: 'Vector Database', status: 'Working With' },
      { name: 'LLM API', status: 'Core' },
      { name: 'React UI Preview', status: 'Frontend' }
    ],
    architectureFlow: ['Query', 'Retriever', 'Vector DB', 'Context Injection', 'LLM Synthesis', 'Cited Answer'],
    features: [
      'Configurable document ingestion & overlapping token chunking',
      'Dense vector embedding generation & top-K semantic retrieval',
      'Strict prompt context injection with source span references',
      'Interactive retrieval inspector showing similarity scores per chunk'
    ],
    githubUrl: 'https://github.com/mohamed-elmengah',
    demoSectionId: 'preview-rag',
    lifecycleNodes: ['frontend', 'api', 'rag', 'llm'],
    caseStudy: {
      overview:
        'A personal AI engineering project built to deeply understand every stage of a Retrieval-Augmented Generation (RAG) system—moving beyond black-box wrapper calls to inspect how chunk sizes, embedding similarity, and prompt constraints affect answer trustworthiness.',
      problem:
        'Standard Large Language Models frequently hallucinate when asked about specific technical documentation or private repositories outside their training cutoff, and users cannot easily verify which paragraph produced a claim.',
      goal:
        'Build a transparent RAG pipeline that ingests technical documents, retrieves relevant passages via vector search, injects explicit context into the LLM prompt, and surfaces exact source citations alongside the generated response.',
      architecture:
        'Document Loader → Recursive Text Splitter (Overlap-aware) → Embedding Model → Vector Store Index → Query Embedder → Top-K Cosine Similarity Retriever → Grounded Prompt Assembler → LLM Generator → Citation Formatter.',
      approach:
        'Designed the pipeline modularly in Python so that chunking strategies, embedding models, and retrieval thresholds can be swapped independently and inspected through a clean developer interface.',
      designDecisions:
        'Chose recursive boundary-aware chunking with sliding overlap rather than naive fixed-character splitting to prevent cutting code blocks or definitions in half. Enforced a system prompt rule requiring the LLM to state when context is insufficient.',
      implementation:
        'Implemented document parsing, chunk metadata tagging (document title, section header, chunk index), vector indexing, and a structured response schema that separates the synthesized explanation from the raw retrieved evidence.',
      challenges:
        'Balancing chunk granularity: overly small chunks lacked surrounding context for complex questions, while overly large chunks diluted embedding specificity and consumed unnecessary prompt tokens.',
      whatILearned:
        'Learned that RAG quality is primarily an information retrieval problem before it is a generation problem—cleaning input text and preserving structural metadata often improves output more than switching LLMs.',
      technology: ['Python', 'LLM APIs', 'Dense Embeddings', 'Vector Database', 'LangChain Concepts', 'React / TypeScript'],
      futureImprovements:
        'Add hybrid retrieval (combining BM25 keyword search with dense embeddings) and cross-encoder reranking to improve precision on exact technical identifiers.'
    }
  },
  {
    id: 'agentic-research-assistant',
    number: '02',
    type: 'PERSONAL AI EXPERIMENT',
    focusTag: 'Agentic AI & Workflows',
    title: 'Agentic Research Assistant',
    tagline: 'Decomposing multi-step technical questions into structured planning, tool execution, and synthesis stages.',
    shortDescription:
      'An experimental agentic workflow exploring how language models can break down broad technical research queries, decide which retrieval or search tools to call, inspect intermediate findings, and compile a structured briefing.',
    stack: [
      { name: 'LLM Reasoning', status: 'Core' },
      { name: 'Agent Workflow', status: 'Explored / Learning' },
      { name: 'Tool Calling', status: 'Explored / Learning' },
      { name: 'LangGraph / LangChain', status: 'Explored / Learning' },
      { name: 'Python', status: 'Core' }
    ],
    architectureFlow: ['User Objective', 'Task Planner', 'Tool Selector', 'Retrieval / Search', 'State Evaluator', 'Final Synthesis'],
    features: [
      'Explicit task decomposition into sequential research sub-questions',
      'Deterministic tool selection trace (Knowledge Base vs. Structured Lookup)',
      'Stateful step evaluation loop with maximum iteration guardrails',
      'Transparent reasoning log exposing intermediate agent decisions'
    ],
    githubUrl: 'https://github.com/mohamed-elmengah',
    demoSectionId: 'preview-agent',
    lifecycleNodes: ['application', 'agents', 'rag', 'llm'],
    caseStudy: {
      overview:
        'A personal AI experiment created to explore the transition from single-turn prompt pipelines to multi-step agentic workflows using graph-based state management concepts.',
      problem:
        'Single-pass RAG pipelines struggle when a user asks a compound question that requires comparing multiple concepts, gathering separate pieces of context, and synthesizing them only after all evidence is collected.',
      goal:
        'Experiment with a structured agent workflow that decomposes a high-level query into sub-tasks, invokes specialized retrieval tools, checks whether enough context has been gathered, and outputs a structured technical summary.',
      architecture:
        'Objective Input → Planner Node (Sub-task Generation) → Conditional Router → Tool Execution Node (Search / Doc Lookup) → Reflection / Sufficiency Check Node → Synthesizer Node.',
      approach:
        'Modeled the agent as an explicit state machine rather than an unconstrained autonomous loop, ensuring each transition is inspectable and bounded by a strict step limit.',
      designDecisions:
        'Used structured JSON schemas for tool invocations and constrained the maximum loop depth to prevent infinite reasoning cycles and excessive token consumption.',
      implementation:
        'Constructed modular Python nodes representing Planning, Tool Execution, Observation State Updates, and Final Synthesis, paired with an interactive frontend trace viewer.',
      challenges:
        'Handling ambiguous tool outputs and ensuring the agent reliably recognizes when to stop searching and transition to final answer generation.',
      whatILearned:
        'Gained practical intuition for why constrained, graph-based workflows (such as LangGraph patterns) are much easier to debug and reason about than open-ended autonomous agent loops.',
      technology: ['Python', 'LLM Tool Calling', 'Agent Workflows (Explored / Learning)', 'LangGraph / LangChain (Explored / Learning)'],
      futureImprovements:
        'Introduce human-in-the-loop approval checkpoints before executing high-cost tool calls and add persistent memory across research sessions.'
    }
  },
  {
    id: 'ai-analytics-dashboard',
    number: '03',
    type: 'PERSONAL PROJECT',
    focusTag: 'AI + Data + Frontend Engineering',
    title: 'AI Analytics & Telemetry Dashboard',
    tagline: 'Connecting structured data visualization with automated AI diagnostic summaries in a responsive React interface.',
    shortDescription:
      'A full-stack personal project combining my interest in data analytics, React/TypeScript frontend architecture, and AI-assisted data interpretation—allowing users to filter dataset slices, inspect charts, and generate contextual explanations.',
    stack: [
      { name: 'React', status: 'Core' },
      { name: 'TypeScript', status: 'Core' },
      { name: 'Recharts', status: 'Core' },
      { name: 'Python / API', status: 'Backend' },
      { name: 'AI Insights', status: 'Integration' }
    ],
    architectureFlow: ['Dataset Store', 'Python API Filter', 'React State Store', 'Recharts Canvas', 'AI Insight Generator'],
    features: [
      'Interactive multi-dimensional data filtering & time-window slicing',
      'Responsive Recharts visualizations for latency, throughput, and drift',
      'Contextual AI insight panel that summarizes anomalies in the active view',
      'Searchable metric table with keyboard-accessible controls'
    ],
    githubUrl: 'https://github.com/mohamed-elmengah',
    demoSectionId: 'preview-analytics',
    lifecycleNodes: ['frontend', 'api', 'data', 'llm'],
    caseStudy: {
      overview:
        'A personal project bridging data analytics, backend API design, and modern React frontend engineering to make complex system and dataset metrics easier to explore and interpret.',
      problem:
        'Raw analytical dashboards often overwhelm users with charts without highlighting key anomalies, while standalone chat interfaces lack visual data context.',
      goal:
        'Create a cohesive dashboard where interactive charts and deterministic data filters work alongside a structured AI summary panel that explains trends in the currently filtered view.',
      architecture:
        'Structured Dataset → Python/FastAPI Aggregation Endpoint → Typed React State → Recharts Interactive Views + Structured Summary Payload → AI Diagnostic Panel.',
      approach:
        'Focused on clean separation between data transformation logic and presentation components, ensuring zero layout shift and responsive rendering across mobile and desktop viewports.',
      designDecisions:
        'Computed statistical summaries (min, max, delta, anomalies) deterministically first, then passed those structured aggregates to the AI insight module rather than sending raw CSV rows into an LLM prompt.',
      implementation:
        'Built reusable chart wrappers in React with TypeScript interfaces, custom tooltips, category filters, and an insight inspector that updates immediately when the user switches dataset views.',
      challenges:
        'Maintaining crisp chart legibility across both dark and light themes while keeping interactive filtering instantaneous.',
      whatILearned:
        'Learned how combining deterministic data engineering (SQL/Python aggregations) with concise LLM synthesis produces far more reliable analytics interfaces than relying on either alone.',
      technology: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Python / REST API', 'EDA Concepts'],
      futureImprovements:
        'Add natural-language-to-filter translation so users can type a query that automatically configures the dashboard filters and chart axes.'
    }
  },
  {
    id: 'ai-productivity-app',
    number: '04',
    type: 'PERSONAL PROJECT',
    focusTag: 'AI Product Development',
    title: 'Context-Aware AI Workspace & Task Planner',
    tagline: 'Turning high-level engineering goals into structured execution roadmaps with context-aware suggestions.',
    shortDescription:
      'An AI-assisted product prototype built with React and TypeScript that helps break down technical milestones into actionable sub-tasks, attaches relevant study/documentation context via RAG concepts, and tracks execution progress.',
    stack: [
      { name: 'React', status: 'Core' },
      { name: 'TypeScript', status: 'Core' },
      { name: 'LLM API', status: 'Core' },
      { name: 'RAG Context', status: 'Working With' },
      { name: 'Tailwind CSS', status: 'Core' }
    ],
    architectureFlow: ['Milestone Input', 'Context Retriever', 'LLM Task Decomposer', 'Interactive Board', 'Progress Tracker'],
    features: [
      'AI task breakdown transforming broad goals into concrete engineering steps',
      'Context-aware smart recommendations linked to project documentation notes',
      'Interactive status toggling, priority tagging, and completion tracking',
      'Clean product-focused interface designed around keyboard and pointer speed'
    ],
    githubUrl: 'https://github.com/mohamed-elmengah',
    demoSectionId: 'preview-productivity',
    lifecycleNodes: ['frontend', 'application', 'rag', 'llm'],
    caseStudy: {
      overview:
        'A personal product engineering project exploring how AI capabilities can be embedded naturally inside everyday developer productivity workflows rather than confined to a generic chat box.',
      problem:
        'When planning a technical build, developers often switch back and forth between static task lists and separate AI chat threads, losing the connection between project context and actionable tasks.',
      goal:
        'Design a unified workspace prototype where users define a technical objective, generate structured sub-tasks enriched with relevant reference notes, and track completion progress in place.',
      architecture:
        'User Goal + Workspace Context Notes → Context Retriever → Structured LLM Decomposition Schema → React State Store → Interactive Task & Recommendation UI.',
      approach:
        'Treated AI output as structured application state (typed JSON task objects with priority, estimated complexity, and linked reference notes) rather than unstructured markdown prose.',
      designDecisions:
        'Designed non-intrusive inline AI recommendations that the user can review, accept, or toggle without disrupting their manual task management flow.',
      implementation:
        'Engineered in React and TypeScript with modular state handlers, interactive task filters, progress indicators, and contextual recommendation cards.',
      challenges:
        'Designing the UI so that AI-generated suggestions feel helpful and structured rather than cluttered or overwhelming.',
      whatILearned:
        'Deepened my understanding of AI product design: the strongest AI interfaces use structured outputs to manipulate real UI components rather than forcing the user to read walls of chat text.',
      technology: ['React', 'TypeScript', 'Tailwind CSS', 'LLM Structured Outputs', 'RAG Context Linking'],
      futureImprovements:
        'Add local IndexedDB persistence and exportable Markdown/JSON sprint plans for seamless integration with GitHub Issues.'
    }
  },
  {
    id: 'ml-prediction-app',
    number: '05',
    type: 'PERSONAL ML PROJECT',
    focusTag: 'Traditional Machine Learning',
    title: 'End-to-End Classical ML Prediction Interface',
    tagline: 'Demonstrating foundational Machine Learning from feature preprocessing and Scikit-learn inference to FastAPI & React.',
    shortDescription:
      'A dedicated classical Machine Learning application built to demonstrate core ML engineering beyond LLMs—featuring data preprocessing pipelines, supervised model prediction, feature attribution visualization, and an interactive web form.',
    stack: [
      { name: 'Python', status: 'Core' },
      { name: 'Scikit-learn', status: 'Core' },
      { name: 'FastAPI', status: 'Developing Familiarity' },
      { name: 'React', status: 'Core' },
      { name: 'EDA & Preprocessing', status: 'Core' }
    ],
    architectureFlow: ['Feature Form', 'FastAPI Schema', 'Preprocessing Pipeline', 'Scikit-Learn Model', 'Prediction + Feature Weights'],
    features: [
      'Interactive feature input controls with real-time range validation',
      'Explicit visualization of preprocessing stages (Imputation, Scaling, Encoding)',
      'Live simulated supervised model inference with confidence intervals',
      'Feature importance breakdown explaining which variables drove the prediction'
    ],
    githubUrl: 'https://github.com/mohamed-elmengah',
    demoSectionId: 'preview-ml',
    lifecycleNodes: ['frontend', 'api', 'data', 'llm', 'cloud'],
    caseStudy: {
      overview:
        'A personal Machine Learning project built to showcase solid grounding in traditional supervised ML workflows—connecting exploratory data analysis and Scikit-learn pipelines with a clean web interface.',
      problem:
        'Many classical ML models remain trapped inside Jupyter notebooks where stakeholders cannot interactively test input combinations or inspect how feature scaling and model weights produce a prediction.',
      goal:
        'Wrap a classical supervised learning pipeline in a structured API and interactive React frontend so users can adjust input features, inspect the preprocessing transformations, and view feature importance.',
      architecture:
        'React Input Form → Typed JSON Payload → FastAPI Endpoint → Scikit-learn Pipeline (SimpleImputer → StandardScaler → Supervised Estimator) → Prediction & Feature Importance Response.',
      approach:
        'Built the preprocessing and estimator steps as a unified pipeline object to prevent data leakage between training and inference, then designed an educational UI that exposes each step.',
      designDecisions:
        'Included a local feature contribution chart alongside the numerical prediction so the model output remains interpretable rather than opaque.',
      implementation:
        'Implemented interactive parameter sliders, live pipeline transformation previews (showing raw vs. scaled feature values), and dynamic feature importance bars.',
      challenges:
        'Ensuring that categorical encodings and numerical scaling transformations applied at inference time match the exact distribution statistics fitted during training.',
      whatILearned:
        'Reinforced the importance of disciplined feature engineering, preventing train-test leakage, and bridging Python data science artifacts with clean API schemas.',
      technology: ['Python', 'Scikit-learn', 'Pandas / NumPy', 'FastAPI', 'React', 'TypeScript'],
      futureImprovements:
        'Containerize the FastAPI inference service with Docker and add automated input drift detection when user inputs fall outside training distributions.'
    }
  }
];

// "What I Can Build" Capabilities Section
const CAPABILITIES = [
  {
    number: '01',
    title: 'AI-Powered Web Interfaces',
    layer: 'Frontend + AI Integration',
    description:
      'Responsive React and TypeScript interfaces designed specifically for AI workflows—handling streaming states, structured citations, tool execution traces, and clear user controls.'
  },
  {
    number: '02',
    title: 'RAG Applications',
    layer: 'Retrieval & Grounding',
    description:
      'Document ingestion pipelines, semantic chunking, embedding generation, vector database retrieval, and grounded prompt construction that anchor LLM answers in real source documents.'
  },
  {
    number: '03',
    title: 'Interactive Dashboards',
    layer: 'Data Visualization & EDA',
    description:
      'Analytical interfaces built with React, Recharts, and clean data pipelines that allow users to filter metrics, inspect distributions, and pair charts with structured AI insights.'
  },
  {
    number: '04',
    title: 'Modern React Applications',
    layer: 'Frontend Architecture',
    description:
      'Component-driven web applications engineered with strong TypeScript typing, accessible UI patterns, state management, dark/light theme systems, and intentional motion.'
  },
  {
    number: '05',
    title: 'AI Product Prototypes',
    layer: 'End-to-End Systems',
    description:
      'Functional prototypes connecting Python/FastAPI backends, LLM/RAG pipelines, or classical Machine Learning models with usable frontend experiences.'
  },
  {
    number: '06',
    title: 'Data-Driven Interfaces',
    layer: 'Analytics & Workflows',
    description:
      'Interfaces backed by SQL, exploratory data analysis, and structured schemas that turn complex datasets and model predictions into clear, actionable software tools.'
  }
];

// ============================================================================
// 02. INTERACTIVE PROJECT UI PREVIEW COMPONENTS (REAL REACT PREVIEWS)
// ============================================================================

// Preview 01: RAG Knowledge Assistant Interactive Simulator
const RagProjectPreview = () => {
  const sampleQueries = [
    {
      id: 'q1',
      question: 'Why use overlapping chunks in a RAG pipeline?',
      topChunks: [
        {
          id: 'chunk-104',
          source: 'docs/retrieval_architecture.md',
          lines: 'L40–L56',
          score: 0.91,
          text: 'Sliding window chunk overlap (e.g., 64 tokens overlap on 512-token chunks) preserves semantic continuity when sentences or code blocks cross chunk boundaries.'
        },
        {
          id: 'chunk-219',
          source: 'docs/vector_indexing_guide.md',
          lines: 'L12–L28',
          score: 0.84,
          text: 'Without chunk overlap, key entity definitions split across adjacent segments suffer lower cosine similarity during dense embedding lookup.'
        }
      ],
      synthesizedAnswer:
        'Overlapping chunks preserve semantic context across split boundaries [chunk-104]. When definitions or sentences are divided between two chunks without overlap, embedding similarity drops during vector retrieval [chunk-219].',
      ungroundedAnswer:
        'Chunk overlap is generally used in text processing to make sure information is not lost when splitting strings.'
    },
    {
      id: 'q2',
      question: 'How does context injection reduce LLM hallucination?',
      topChunks: [
        {
          id: 'chunk-308',
          source: 'docs/prompt_grounding.md',
          lines: 'L88–L104',
          score: 0.94,
          text: 'Context injection constrains the LLM via system instructions to synthesize answers strictly from retrieved passages and explicitly cite chunk IDs.'
        },
        {
          id: 'chunk-312',
          source: 'docs/evaluation_notes.md',
          lines: 'L19–L31',
          score: 0.81,
          text: 'When retrieved similarity falls below threshold, the prompt guardrail instructs the model to abstain rather than extrapolate from parametric memory.'
        }
      ],
      synthesizedAnswer:
        'Context injection embeds retrieved source passages directly into the system prompt and constrains the model to answer strictly from that evidence with explicit chunk citations [chunk-308], abstaining if retrieval confidence is insufficient [chunk-312].',
      ungroundedAnswer:
        'Context injection helps language models by giving them extra information in the prompt so they can answer better.'
    }
  ];

  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const [contextGrounded, setContextGrounded] = useState(true);
  const [activeStage, setActiveStage] = useState(4);
  const current = sampleQueries[selectedQueryIdx];

  const pipelineStages = ['Query', 'Retriever', 'Vector DB', 'Context', 'LLM', 'Answer'];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 text-xs font-mono">
      {/* Top Pipeline Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-[var(--muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="uppercase tracking-wider text-[10px] font-semibold text-[var(--foreground)]">
            Interactive RAG Pipeline Inspector
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setContextGrounded(!contextGrounded)}
            className={`px-2.5 py-1 rounded border text-[10px] transition-colors ${contextGrounded
              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
              : 'border-[var(--border)] text-[var(--muted)]'
              }`}
          >
            {contextGrounded ? 'RAG Context: INJECTED' : 'RAG Context: BYPASSED'}
          </button>
        </div>
      </div>

      {/* Visual Flow Stepper */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
        {pipelineStages.map((stage, idx) => (
          <button
            key={stage}
            type="button"
            onClick={() => setActiveStage(idx)}
            className={`py-1.5 px-2 rounded border text-center transition-all ${idx <= activeStage
              ? 'border-[var(--accent)]/60 bg-[var(--surface)] text-[var(--foreground)]'
              : 'border-[var(--border)] text-[var(--muted)] opacity-60'
              }`}
          >
            <div className="text-[9px] text-[var(--muted)]">0{idx + 1}</div>
            <div className="text-[10px] font-semibold truncate">{stage}</div>
          </button>
        ))}
      </div>

      {/* Query Selector */}
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
          Select Test Query:
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {sampleQueries.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedQueryIdx(idx)}
              className={`flex-1 text-left p-2.5 rounded-lg border transition-all font-sans text-xs ${selectedQueryIdx === idx
                ? 'border-[var(--accent)] bg-[var(--surface)] text-[var(--foreground)] font-medium'
                : 'border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
            >
              “{item.question}”
            </button>
          ))}
        </div>
      </div>

      {/* Retrieved Vector Chunks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
        {current.topChunks.map((chunk) => (
          <div
            key={chunk.id}
            className={`p-3 rounded-lg border transition-opacity ${contextGrounded
              ? 'border-[var(--border)] bg-[var(--surface)]/60 opacity-100'
              : 'border-dashed border-[var(--border)] opacity-40'
              }`}
          >
            <div className="flex items-center justify-between text-[10px] mb-1.5">
              <span className="text-[var(--accent)] font-semibold">[{chunk.id}] {chunk.source}</span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">
                cos_sim: {chunk.score}
              </span>
            </div>
            <p className="font-sans text-[11px] text-[var(--muted)] leading-relaxed">
              {chunk.text}
            </p>
          </div>
        ))}
      </div>

      {/* Generated Output with Citations */}
      <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)] mb-1">
          <span>LLM SYNTHESIS OUTPUT</span>
          <span className="text-[var(--accent)]">
            {contextGrounded ? 'Grounded with Source Spans' : 'Unverified Parametric Output'}
          </span>
        </div>
        <p className="font-sans text-xs text-[var(--foreground)] leading-relaxed">
          {contextGrounded ? current.synthesizedAnswer : current.ungroundedAnswer}
        </p>
      </div>
    </div>
  );
};

// Preview 02: Agentic Research Assistant Interactive Trace
const AgenticProjectPreview = () => {
  const [selectedStep, setSelectedStep] = useState(2);

  const workflowSteps = [
    {
      id: 0,
      node: '01 // Planner Node',
      status: 'Decomposed',
      tool: 'TaskDecomposer()',
      log: 'Objective split into: (A) Retrieve dense vs. hybrid RAG tradeoffs, (B) Check latency impact, (C) Format decision matrix.'
    },
    {
      id: 1,
      node: '02 // Tool Selector',
      status: 'Dispatched',
      tool: 'VectorKnowledgeSearch(query="hybrid retrieval BM25")',
      log: 'Selected semantic + lexical search tool; extracted 3 architecture notes from indexed corpus.'
    },
    {
      id: 2,
      node: '03 // State Evaluator',
      status: 'Verified',
      tool: 'ContextSufficiencyCheck()',
      log: 'Evaluated retrieved observations against sub-tasks A & B. Coverage complete; loop terminated at step 3/5.'
    },
    {
      id: 3,
      node: '04 // Synthesizer Node',
      status: 'Completed',
      tool: 'StructuredReportGenerator()',
      log: 'Generated final comparison table contrasting Pure Vector Lookup vs. Hybrid + Reranker pipeline.'
    }
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 text-xs font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="uppercase tracking-wider text-[10px] font-semibold text-[var(--foreground)]">
            Stateful Agent Graph Trace (Explored / Learning)
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[10px] text-[var(--muted)]">
          Max Iterations: 5 · Status: Converged
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
        {workflowSteps.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedStep(idx)}
            className={`p-2.5 rounded-lg border text-left transition-all ${selectedStep === idx
              ? 'border-[var(--accent)] bg-[var(--surface)] text-[var(--foreground)]'
              : 'border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
          >
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="text-[var(--accent)] font-semibold">{s.status}</span>
              <span>#{idx + 1}</span>
            </div>
            <div className="font-sans text-xs font-medium truncate">{s.node.split('// ')[1]}</div>
          </button>
        ))}
      </div>

      <div className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] border-b border-[var(--border)] pb-2">
          <span className="text-[var(--foreground)] font-semibold">
            ACTIVE NODE: {workflowSteps[selectedStep].node}
          </span>
          <span className="text-[var(--accent)]">{workflowSteps[selectedStep].tool}</span>
        </div>
        <p className="font-sans text-xs text-[var(--foreground)] leading-relaxed">
          {workflowSteps[selectedStep].log}
        </p>
      </div>
    </div>
  );
};

// Preview 03: AI Analytics Dashboard with Real Recharts
const AnalyticsProjectPreview = () => {
  const [metricMode, setMetricMode] = useState('latency');

  const dataset = {
    latency: {
      label: 'Pipeline Token Latency vs. Retrieval Depth (ms)',
      unit: 'ms',
      aiSummary:
        'Diagnostic Insight: Increasing retrieval top-K from k=4 to k=8 adds +115ms context processing overhead while retrieval recall plateaus after k=5.',
      data: [
        { window: 'k=2', value: 310, baseline: 300 },
        { window: 'k=3', value: 345, baseline: 320 },
        { window: 'k=4', value: 390, baseline: 350 },
        { window: 'k=5', value: 420, baseline: 380 },
        { window: 'k=6', value: 485, baseline: 410 },
        { window: 'k=8', value: 535, baseline: 440 }
      ]
    },
    relevance: {
      label: 'Grounded Context Relevance Score by Chunk Strategy',
      unit: 'score',
      aiSummary:
        'Diagnostic Insight: Recursive 512-token chunking with 64-token overlap shows the most stable semantic relevance across technical queries.',
      data: [
        { window: 'Fixed-256', value: 72, baseline: 68 },
        { window: 'Fixed-512', value: 78, baseline: 72 },
        { window: 'Recur-256', value: 84, baseline: 75 },
        { window: 'Recur-512', value: 91, baseline: 80 },
        { window: 'Semantic', value: 89, baseline: 82 },
        { window: 'Hybrid', value: 94, baseline: 84 }
      ]
    }
  };

  const currentView = dataset[metricMode];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 font-mono">
          <BarChart3 className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="uppercase tracking-wider text-[10px] font-semibold text-[var(--foreground)]">
            Interactive Recharts + AI Insight Inspector
          </span>
        </div>
        <div className="flex gap-1.5 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setMetricMode('latency')}
            className={`px-2.5 py-1 rounded border transition-colors ${metricMode === 'latency'
              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
              : 'border-[var(--border)] text-[var(--muted)]'
              }`}
          >
            Latency Profile
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('relevance')}
            className={`px-2.5 py-1 rounded border transition-colors ${metricMode === 'relevance'
              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
              : 'border-[var(--border)] text-[var(--muted)]'
              }`}
          >
            Chunk Relevance
          </button>
        </div>
      </div>

      <div className="h-44 w-full mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentView.data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="window" stroke="var(--muted)" fontSize={10} tickLine={false} />
            <YAxis stroke="var(--muted)" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                borderRadius: '8px',
                fontSize: '11px',
                color: 'var(--foreground)'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#accentGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--foreground)] leading-relaxed">
          {currentView.aiSummary}
        </p>
      </div>
    </div>
  );
};

// Preview 04: AI Productivity Application Interactive Workspace
const ProductivityProjectPreview = () => {
  const [tasks, setTasks] = useState([
    {
      id: 't1',
      title: 'Design document chunking schema with section metadata',
      tag: 'RAG Layer',
      priority: 'High',
      done: true,
      aiNote: 'Recommended: Store parent section header in chunk metadata for citation clarity.'
    },
    {
      id: 't2',
      title: 'Implement FastAPI endpoint with Pydantic validation',
      tag: 'API Layer',
      priority: 'High',
      done: false,
      aiNote: 'Recommended: Enforce strict max_tokens and timeout defaults on request body.'
    },
    {
      id: 't3',
      title: 'Build citation highlight drawer in React & TypeScript',
      tag: 'Frontend UI',
      priority: 'Medium',
      done: false,
      aiNote: 'Recommended: Map source chunk IDs directly to accessible keyboard-focusable cards.'
    }
  ]);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border)] font-mono">
        <div className="flex items-center gap-2">
          <ListTodo className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="uppercase tracking-wider text-[10px] font-semibold text-[var(--foreground)]">
            AI Task Decomposition & Context Planner
          </span>
        </div>
        <span className="text-[10px] text-[var(--accent)] font-semibold">
          Progress: {completedCount}/{tasks.length} Milestones
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]/70 hover:border-[var(--accent)]/60 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  aria-label={`Toggle ${task.title}`}
                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${task.done
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                    : 'border-[var(--muted)] bg-transparent'
                    }`}
                >
                  {task.done && <Check className="w-2.5 h-2.5" />}
                </button>
                <div>
                  <div
                    className={`font-medium text-xs ${task.done ? 'line-through text-[var(--muted)]' : 'text-[var(--foreground)]'
                      }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-1 flex items-center gap-1.5">
                    <span className="text-[var(--accent)] font-mono text-[10px]">[AI Context]</span>
                    <span>{task.aiNote}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] font-mono text-[10px] text-[var(--muted)] shrink-0">
                {task.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Preview 05: Classical ML Prediction Application Simulator
const MlPredictionProjectPreview = () => {
  const [featureA, setFeatureA] = useState(68); // e.g., Normalized Data Completeness
  const [featureB, setFeatureB] = useState(42); // e.g., Query Complexity Index

  // Deterministic classical linear/ensemble simulation for educational preview
  const scaledA = ((featureA - 50) / 25).toFixed(2);
  const scaledB = ((featureB - 50) / 25).toFixed(2);
  const predictedScore = Math.min(98, Math.max(12, Math.round(featureA * 0.62 + (100 - featureB) * 0.35)));

  const importanceData = [
    { feature: 'Data_Completeness', weight: 0.48 },
    { feature: 'Feature_Variance', weight: 0.31 },
    { feature: 'Complexity_Index', weight: 0.21 }
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)] font-mono">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="uppercase tracking-wider text-[10px] font-semibold text-[var(--foreground)]">
            Scikit-Learn Preprocessing & Inference Simulator
          </span>
        </div>
        <span className="text-[10px] text-[var(--muted)]">
          Imputer → StandardScaler → Estimator
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[var(--muted)]">Feature 01: Data Completeness (%)</span>
              <span className="font-mono text-[var(--foreground)]">
                Raw: {featureA} | z-score: {scaledA}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={featureA}
              onChange={(e) => setFeatureA(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[var(--muted)]">Feature 02: Noise Ratio Index</span>
              <span className="font-mono text-[var(--foreground)]">
                Raw: {featureB} | z-score: {scaledB}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={featureB}
              onChange={(e) => setFeatureB(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[var(--muted)]">
              Model Output (FastAPI JSON)
            </span>
            <span className="font-mono text-[10px] text-[var(--accent)]">status: 200 OK</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--foreground)]">
              {predictedScore}%
            </span>
            <span className="text-[11px] text-[var(--muted)]">Predicted Stability Score</span>
          </div>
          <div className="space-y-1">
            {importanceData.map((f) => (
              <div key={f.feature} className="flex items-center gap-2 text-[10px] font-mono">
                <span className="w-32 truncate text-[var(--muted)]">{f.feature}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[var(--background)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent)]"
                    style={{ width: `${f.weight * 100}%` }}
                  />
                </div>
                <span className="text-[var(--foreground)]">{f.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 03. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Theme Management (Default Dark, Persisted in localStorage, Respects System on First Visit)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('me_portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Fallback to default dark
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('me_portfolio_theme', theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Brief, Restrained Page Load Reveal (~650ms)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 450);
    return () => clearTimeout(timer);
  }, []);

  // Scroll & Active Navigation Detection
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global AI Lifecycle Active Layer State (Connects Hero, Skills, and Projects)
  const [selectedLifecycleId, setSelectedLifecycleId] = useState('rag');

  // Hero Interactive Scenario State
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activePacketStep, setActivePacketStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  // Journey Step State
  const [activeJourneyIdx, setActiveJourneyIdx] = useState(5); // Default highlighted: 06 RAG

  // Skills Filter State
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('All');
  const [skillStatusFilter, setSkillStatusFilter] = useState('All');

  // Active Case Study Modal State
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState(null);

  // Custom Cursor State (Desktop only)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'interactive' | 'project'
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'focus' | 'submitting' | 'success' | 'error'
  const [formError, setFormError] = useState('');

  // Setup SEO Document Metadata
  useEffect(() => {
    document.title = 'Mohamed Elmengah — AI / Machine Learning Engineer Portfolio';
  }, []);

  // Detect Touch Device & Track Mouse for Minimal Custom Cursor
  useEffect(() => {
    const checkTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
    setIsTouchDevice(checkTouch);

    if (checkTouch) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Progress & Section Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 32);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, (scrollY / docHeight) * 100));
      }

      const sections = ['hero', 'about', 'experience', 'journey', 'skills', 'work', 'credentials', 'contact'];
      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or case study modal is open
  useEffect(() => {
    if (mobileMenuOpen || activeCaseStudyProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, activeCaseStudyProject]);

  // Animated Data Flow Interval for Hero Architecture System
  useEffect(() => {
    if (!isSimulating) return;
    const currentScenario = HERO_SCENARIOS[activeScenarioIdx];
    const interval = setInterval(() => {
      setActivePacketStep((prev) => (prev + 1) % currentScenario.steps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeScenarioIdx, isSimulating]);

  // Filtered Skills Memo
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCat = skillCategoryFilter === 'All' || skill.category === skillCategoryFilter;
      const matchesStatus = skillStatusFilter === 'All' || skill.levelLabel === skillStatusFilter;
      return matchesCat && matchesStatus;
    });
  }, [skillCategoryFilter, skillStatusFilter]);

  const currentLifecycleLayer = useMemo(() => {
    return (
      AI_LIFECYCLE_LAYERS.find((l) => l.id === selectedLifecycleId) || AI_LIFECYCLE_LAYERS[4]
    );
  }, [selectedLifecycleId]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setFormStatus('error');
      setFormError('Please enter your name (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormStatus('error');
      setFormError('Please enter a valid email address so I can reply.');
      return;
    }
    if (!trimmedMessage || trimmedMessage.length < 12) {
      setFormStatus('error');
      setFormError('Please include a brief message (at least 12 characters).');
      return;
    }

    setFormError('');
    setFormStatus('submitting');

    // Structured for clean backend API attachment while validating on frontend
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 900);
  };

  const renderProjectPreview = (projectId) => {
    switch (projectId) {
      case 'rag-knowledge-assistant':
        return <RagProjectPreview />;
      case 'agentic-research-assistant':
        return <AgenticProjectPreview />;
      case 'ai-analytics-dashboard':
        return <AnalyticsProjectPreview />;
      case 'ai-productivity-app':
        return <ProductivityProjectPreview />;
      case 'ml-prediction-app':
        return <MlPredictionProjectPreview />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'credentials', label: 'Credentials' }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-[var(--accent)] selection:text-white ${theme === 'dark' ? 'theme-dark' : 'theme-light'
        }`}
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)'
      }}
    >
      {/* Global CSS Design System Variables & Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        .theme-dark {
          --background: #0B0C0E;
          --foreground: #F3F4F6;
          --muted: #8E929C;
          --surface: #121418;
          --surface-hover: #191C22;
          --border: #22262F;
          --accent: #FF552E;
          --accent-foreground: #FFFFFF;
        }

        .theme-light {
          --background: #F6F5F1;
          --foreground: #121316;
          --muted: #5C606A;
          --surface: #ECEAE3;
          --surface-hover: #E2DFD6;
          --border: #D5D1C7;
          --accent: #D93F18;
          --accent-foreground: #FFFFFF;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.03em;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .architectural-grid {
          background-size: 48px 48px;
          background-image: 
            linear-gradient(to right, rgba(142, 146, 156, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(142, 146, 156, 0.05) 1px, transparent 1px);
        }

        @keyframes pulseFlow {
          0%, 100% { opacity: 0.35; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        .animate-flow {
          animation: pulseFlow 2.2s infinite ease-in-out;
        }
      `}</style>

      {/* Top Scroll Progress Hairline */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Minimal Custom Cursor */}
      {!isTouchDevice && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden lg:flex items-center justify-center"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className={`rounded-full transition-all duration-200 flex items-center justify-center ${cursorMode === 'project'
              ? 'w-14 h-14 bg-[var(--accent)] text-white text-[10px] font-mono font-semibold shadow-lg'
              : cursorMode === 'interactive'
                ? 'w-7 h-7 border border-[var(--accent)] bg-[var(--accent)]/15'
                : 'w-2.5 h-2.5 bg-[var(--accent)]'
              }`}
          >
            {cursorMode === 'project' && 'View'}
          </div>
        </div>
      )}

      {/* Subtle Architectural Grid Background */}
      <div className="fixed inset-0 architectural-grid pointer-events-none z-0" />

      {/* =====================================================================
          04. STICKY NAVBAR & MOBILE FULLSCREEN NAVIGATION
      ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'py-3 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)]'
          : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Monogram & Name */}
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setCursorMode('interactive')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <span className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--surface)] font-mono text-xs font-semibold tracking-tight text-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
              ME <span className="text-[var(--accent)]">//</span> AI
            </span>
            <div className="hidden sm:block">
              <div className="text-sm font-display font-semibold tracking-tight text-[var(--foreground)]">
                {PROFILE_CONFIG.name}
              </div>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Cairo, EG · CS ’27
              </div>
            </div>
          </button>

          {/* Center: Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
                    ? 'bg-[var(--foreground)] text-[var(--background)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Toggle & Let's Talk CTA */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onMouseEnter={() => setCursorMode('interactive')}
              onMouseLeave={() => setCursorMode('default')}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursorMode('interactive')}
              onMouseLeave={() => setCursorMode('default')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-mono font-semibold tracking-wide hover:opacity-90 transition-all"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-30 bg-[var(--background)] pt-24 px-6 pb-8 flex flex-col justify-between md:hidden"
        >
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] mb-4">
              System Navigation
            </div>
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="w-full py-3.5 border-b border-[var(--border)] flex items-center justify-between text-left group"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--accent)]">0{idx + 1}</span>
                  <span className="text-2xl font-display font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)]" />
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="w-full py-3.5 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
              <span>{PROFILE_CONFIG.location}</span>
              <span>B.Sc. CS ’27</span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          05. HERO SECTION & INTERACTIVE AI ARCHITECTURE VISUALIZER
      ===================================================================== */}
      <main className="relative z-10 pt-28 sm:pt-32 lg:pt-36">
        <section
          id="hero"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 border-b border-[var(--border)]"
        >
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* LEFT COLUMN: Editorial Positioning & Personal Identity (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                <span className="font-mono text-[11px] font-medium text-[var(--foreground)]">
                  Building toward AI Engineering
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[46px] font-bold tracking-tight leading-[1.08] text-[var(--foreground)]">
                Building intelligent systems,{' '}
                <span className="text-[var(--accent)]">one architectural layer</span> at a time.
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {PROFILE_CONFIG.subheadline}
              </p>

              {/* Academic & Direction Metadata Strip */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--muted)]">
                    Academic Foundation
                  </div>
                  <div className="font-medium text-[var(--foreground)] mt-0.5">
                    B.Sc. Computer Science
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    El Shorouk Academy · ’27
                  </div>
                </div>
                <div className="border-l border-[var(--border)] pl-3">
                  <div className="font-mono text-[10px] uppercase text-[var(--muted)]">
                    Primary Focus
                  </div>
                  <div className="font-medium text-[var(--foreground)] mt-0.5">
                    AI / ML Engineering
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    RAG · Agents · Cloud · UI
                  </div>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-mono text-xs font-semibold hover:bg-[var(--accent)] hover:text-white transition-all group"
                >
                  <span>Explore my work</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] font-mono text-xs font-semibold hover:border-[var(--accent)] transition-colors"
                >
                  <span>Let&apos;s connect</span>
                </button>
              </div>

              {/* Direct External Links */}
              <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-5 text-xs font-mono text-[var(--muted)]">
                <a
                  href={PROFILE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>
                <a
                  href={PROFILE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>
                <a
                  href={`mailto:${PROFILE_CONFIG.email}`}
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
                >
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Signature Interactive AI Architecture Visualizer (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm p-4 sm:p-6 shadow-xl">
                {/* Visualizer Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                        Interactive System Architecture
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] font-mono text-[10px] text-[var(--muted)]">
                        Click any node to inspect
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-base font-display font-semibold text-[var(--foreground)] mt-0.5">
                      End-to-End AI Product Lifecycle Flow
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSimulating(!isSimulating)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-[10px] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
                  >
                    <Play className={`w-3 h-3 ${isSimulating ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`} />
                    <span>{isSimulating ? 'Flow: Live' : 'Flow: Paused'}</span>
                  </button>
                </div>

                {/* Scenario Selector Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  {HERO_SCENARIOS.map((scen, idx) => (
                    <button
                      key={scen.id}
                      type="button"
                      onClick={() => {
                        setActiveScenarioIdx(idx);
                        setActivePacketStep(0);
                      }}
                      className={`p-2.5 rounded-lg border text-left font-mono text-[11px] transition-all ${activeScenarioIdx === idx
                        ? 'border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] font-semibold'
                        : 'border-[var(--border)] bg-[var(--background)]/40 text-[var(--muted)] hover:text-[var(--foreground)]'
                        }`}
                    >
                      {scen.label}
                    </button>
                  ))}
                </div>

                {/* Interactive 8-Layer Architecture Nodes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  {AI_LIFECYCLE_LAYERS.map((layer) => {
                    const currentScenario = HERO_SCENARIOS[activeScenarioIdx];
                    const isScenarioActive = currentScenario.activeNodes.includes(layer.id);
                    const isSelected = selectedLifecycleId === layer.id;
                    const activeStepObj = currentScenario.steps[activePacketStep];
                    const isPacketHere = isSimulating && activeStepObj && activeStepObj.node === layer.id;

                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => setSelectedLifecycleId(layer.id)}
                        onMouseEnter={() => {
                          setSelectedLifecycleId(layer.id);
                          setCursorMode('interactive');
                        }}
                        onMouseLeave={() => setCursorMode('default')}
                        className={`relative p-3 rounded-xl border text-left transition-all ${isSelected
                          ? 'border-[var(--accent)] bg-[var(--background)] ring-1 ring-[var(--accent)]/40'
                          : isScenarioActive
                            ? 'border-[var(--border)] bg-[var(--background)]/80 hover:border-[var(--accent)]/50'
                            : 'border-[var(--border)]/60 bg-[var(--background)]/30 opacity-60 hover:opacity-100'
                          }`}
                      >
                        {isPacketHere && (
                          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                        )}
                        <div className="font-mono text-[10px] text-[var(--muted)] mb-1 flex items-center justify-between">
                          <span>LAYER {layer.index}</span>
                          {isScenarioActive && (
                            <span className="text-[9px] text-[var(--accent)]">● ACTIVE</span>
                          )}
                        </div>
                        <div className="font-display text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                          {layer.shortLabel}
                        </div>
                        <div className="text-[10px] text-[var(--muted)] truncate mt-0.5">
                          {layer.role}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Node Inspector Panel */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-mono text-[10px] font-semibold">
                        NODE {currentLifecycleLayer.index}
                      </span>
                      <span className="font-display text-sm font-semibold text-[var(--foreground)]">
                        {currentLifecycleLayer.name} — {currentLifecycleLayer.role}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      {currentLifecycleLayer.payloadSchema}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {currentLifecycleLayer.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[var(--muted)] mr-1">
                        Tools in this layer:
                      </span>
                      {currentLifecycleLayer.linkedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] font-mono text-[10px] text-[var(--foreground)]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scenario Trace Footer */}
                <div className="mt-3 px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-[var(--foreground)] truncate">
                    <span className="text-[var(--accent)] font-semibold">TRACE:</span>
                    <span className="truncate">
                      {HERO_SCENARIOS[activeScenarioIdx].steps[activePacketStep]?.detail}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)] shrink-0">
                    {HERO_SCENARIOS[activeScenarioIdx].latencyNote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            06. ABOUT SECTION — HONEST PERSONAL NARRATIVE
        ===================================================================== */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Section Index & Label */}
            <div className="lg:col-span-4 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                01 // Who I Am
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)] leading-tight">
                A Computer Science student deliberately building toward AI Engineering.
              </h2>
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="font-mono text-[var(--muted)]">Location</span>
                  <span className="font-medium text-[var(--foreground)]">Cairo, Egypt</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="font-mono text-[var(--muted)]">Education</span>
                  <span className="font-medium text-[var(--foreground)]">El Shorouk Academy</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="font-mono text-[var(--muted)]">Degree</span>
                  <span className="font-medium text-[var(--foreground)]">B.Sc. Computer Science</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-mono text-[var(--muted)]">Expected Graduation</span>
                  <span className="font-mono text-[var(--accent)] font-semibold">2027</span>
                </div>
              </div>
            </div>

            {/* Editorial Narrative & System Mindset */}
            <div className="lg:col-span-8 space-y-6">
              <blockquote className="p-6 rounded-2xl border-l-4 border-l-[var(--accent)] border border-[var(--border)] bg-[var(--surface)]/60 font-display text-lg sm:text-xl font-medium text-[var(--foreground)] leading-relaxed">
                “{PROFILE_CONFIG.aboutPhilosophy}”
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--muted)] leading-relaxed">
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold">
                    Engineering Direction
                  </h3>
                  <p>
                    I am currently pursuing my Bachelor&apos;s degree in Computer Science in Cairo while focusing my hands-on training and internships on{' '}
                    <span className="text-[var(--foreground)] font-medium">
                      Machine Learning, Generative AI, Retrieval-Augmented Generation (RAG), and Agentic AI workflows
                    </span>
                    .
                  </p>
                  <p>
                    Rather than treating AI models as isolated notebooks, I approach them as components inside a broader software architecture—where data quality, retrieval precision, cloud infrastructure, and clean API boundaries determine whether a system actually works.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold">
                    Why Full-Lifecycle Matters
                  </h3>
                  <p>
                    Alongside AI and Machine Learning, I maintain a strong interest in{' '}
                    <span className="text-[var(--foreground)] font-medium">
                      Software Engineering, Cloud Computing, and Frontend Development
                    </span>
                    .
                  </p>
                  <p>
                    Being able to build both the Python retrieval/inference pipeline and the React/TypeScript user interface allows me to prototype complete AI products—making retrieval citations inspectable, agent workflows transparent, and model predictions understandable to the end user.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            07. EXPERIENCE & ONGOING PROGRAMS (STRICT HONESTY & STATUS LABELS)
        ===================================================================== */}
        <section
          id="experience"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                02 // Practical Experience & Training
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                Internships, Traineeships & Applied Work
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--muted)] max-w-md">
              Clearly distinguishing between active ongoing tracks, completed technical internships, and previous data workflows.
            </p>
          </div>

          {/* Experience List */}
          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => {
              const isOngoing = exp.status === 'ONGOING';
              return (
                <div
                  key={exp.id}
                  className="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 hover:border-[var(--accent)]/50 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Organization & Status Badge */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[var(--muted)]">0{idx + 1}</span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold ${isOngoing
                            ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40'
                            : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]'
                            }`}
                        >
                          {isOngoing && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />}
                          {exp.statusLabel}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[var(--foreground)]">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-[var(--accent)]">
                        {exp.organization}
                      </div>
                      <div className="text-xs font-mono text-[var(--muted)]">
                        {exp.category}
                      </div>
                    </div>

                    {/* Right Column: Responsibilities & Qualified Tech Tags */}
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-sm text-[var(--foreground)] leading-relaxed font-medium">
                        {exp.summary}
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)]">
                        {exp.details.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="text-[var(--accent)] font-mono mt-0.5">→</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <div
                            key={tech.name}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)] font-mono text-[11px]"
                          >
                            <span className="text-[var(--muted)] text-[10px]">{tech.qualifier}:</span>
                            <span className="text-[var(--foreground)] font-medium">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dedicated Section: "Currently Building / Where I'm Going Next" — ACC × Sprints Boot Camp */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--surface)] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/40 font-mono text-xs text-[var(--accent)] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                  <span>Currently Building · Where I&apos;m Going Next</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                  {ONGOING_BOOTCAMP.title}
                </h3>
                <div className="font-mono text-xs text-[var(--accent)] font-semibold">
                  {ONGOING_BOOTCAMP.statusText}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                {ONGOING_BOOTCAMP.description}
              </p>
            </div>

            <div className="pt-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] mb-3">
                Curriculum Areas Currently Developing Familiarity With:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {ONGOING_BOOTCAMP.focusAreas.map((area) => (
                  <div
                    key={area.name}
                    className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] mb-1">
                      <span>{area.layer}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    </div>
                    <div className="font-display text-sm font-semibold text-[var(--foreground)]">
                      {area.name}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--accent)] mt-1">
                      {area.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            08. INTERACTIVE LEARNING JOURNEY & "CURRENTLY EXPLORING"
        ===================================================================== */}
        <section
          id="journey"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
              03 // Engineering Progression
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
              Interactive Learning Journey (01 → 08)
            </h2>
            <p className="text-sm text-[var(--muted)] mt-2 max-w-2xl">
              How my Computer Science foundations compound step-by-step toward full-lifecycle AI Engineering. Select any stage to inspect its role.
            </p>
          </div>

          {/* 8-Step Interactive Progression */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Stepper List */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LEARNING_JOURNEY.map((item, idx) => {
                const isSelected = activeJourneyIdx === idx;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveJourneyIdx(idx)}
                    onMouseEnter={() => setCursorMode('interactive')}
                    onMouseLeave={() => setCursorMode('default')}
                    className={`p-4 rounded-xl border text-left transition-all ${isSelected
                      ? 'border-[var(--accent)] bg-[var(--surface)] shadow-md'
                      : 'border-[var(--border)] bg-[var(--surface)]/40 hover:border-[var(--accent)]/40'
                      }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className={isSelected ? 'text-[var(--accent)] font-bold' : 'text-[var(--muted)]'}>
                        STEP {item.step}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">{item.layer}</span>
                    </div>
                    <div className="font-display text-base font-bold text-[var(--foreground)]">
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detail Card */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                    STAGE {LEARNING_JOURNEY[activeJourneyIdx].step} OF 08
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-0.5">
                    {LEARNING_JOURNEY[activeJourneyIdx].title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-[var(--muted)]">
                  {LEARNING_JOURNEY[activeJourneyIdx].layer}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {LEARNING_JOURNEY[activeJourneyIdx].summary}
              </p>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-2">
                  Core Building Blocks:
                </div>
                <div className="flex flex-wrap gap-2">
                  {LEARNING_JOURNEY[activeJourneyIdx].keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-[var(--foreground)]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] mb-1">
                  Architectural Link:
                </div>
                <p className="text-xs text-[var(--foreground)] leading-relaxed">
                  {LEARNING_JOURNEY[activeJourneyIdx].connectionToAI}
                </p>
              </div>
            </div>
          </div>

          {/* "Currently Exploring" Interactive Lab Matrix */}
          <div className="pt-8 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Active R&amp;D Focus
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-1">
                  Currently Exploring &amp; Experimenting With
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--muted)]">
                Distinguishing active exploration from foundational coursework
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CURRENTLY_EXPLORING.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 hover:border-[var(--accent)]/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="text-[var(--muted)]">{item.layer}</span>
                      <span className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-semibold">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-[var(--foreground)] mb-1.5">
                      {item.topic}
                    </h4>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {item.focusNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            09. TOOLS I BUILD WITH — INTERACTIVE SKILLS SYSTEM
        ===================================================================== */}
        <section
          id="skills"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                04 // Technical Stack &amp; Honest Calibration
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                Tools I Build With
              </h2>
              <p className="text-sm text-[var(--muted)] mt-2 max-w-2xl">
                Organized by engineering domain and calibrated with transparent experience labels (<span className="text-[var(--foreground)] font-mono text-xs">Working With</span>, <span className="text-[var(--foreground)] font-mono text-xs">Currently Learning</span>, <span className="text-[var(--foreground)] font-mono text-xs">Exploring</span>).
              </p>
            </div>

            {/* Category & Status Filters */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Programming', 'AI / ML', 'AI Engineering', 'Cloud / Data', 'Development'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSkillCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all ${skillCategoryFilter === cat
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white font-semibold'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Status Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-[var(--border)] text-xs font-mono">
            <span className="text-[var(--muted)] mr-2">Filter by Experience Stage:</span>
            {['All', 'Working With', 'Currently Learning', 'Exploring'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSkillStatusFilter(st)}
                className={`px-2.5 py-1 rounded border transition-colors ${skillStatusFilter === st
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-semibold'
                  : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill, idx) => (
              <div
                key={`${skill.category}-${skill.name}-${idx}`}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      {skill.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${skill.levelLabel === 'Working With'
                        ? 'bg-[var(--foreground)]/10 text-[var(--foreground)] border border-[var(--border)]'
                        : 'bg-[var(--accent)]/15 text-[var(--accent)]'
                        }`}
                    >
                      {skill.levelLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--foreground)] mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {skill.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            10. SELECTED BUILDS & EXPERIMENTS (EDITORIAL SHOWCASE + LIVE PREVIEWS)
        ===================================================================== */}
        <section
          id="work"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                05 // Selected Builds &amp; Technical Experiments
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                Practical AI Systems &amp; Software Prototypes
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--muted)] max-w-md">
              Every build below is a transparent personal project or AI experiment—complete with an interactive UI preview and an 11-part architectural case study.
            </p>
          </div>

          <div className="space-y-12">
            {SELECTED_PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <article
                  key={project.id}
                  className="p-6 sm:p-8 lg:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 hover:border-[var(--accent)]/50 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Project Editorial Narrative Column (5 Cols) */}
                    <div className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-bold text-[var(--accent)]">
                          {project.number}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 font-mono text-[10px] font-semibold text-[var(--accent)]">
                          {project.type}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--muted)]">
                          // {project.focusTag}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)] leading-tight">
                        {project.title}
                      </h3>

                      <p className="font-display text-sm sm:text-base font-medium text-[var(--foreground)]/90">
                        “{project.tagline}”
                      </p>

                      <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Architecture Flow Strip */}
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-2">
                          System Architecture Flow:
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                          {project.architectureFlow.map((node, nIdx) => (
                            <React.Fragment key={node}>
                              <span className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                                {node}
                              </span>
                              {nIdx < project.architectureFlow.length - 1 && (
                                <span className="text-[var(--accent)]">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Stack Badges with Status */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)] font-mono text-[11px] text-[var(--foreground)]"
                          >
                            {tech.name}{' '}
                            <span className="text-[10px] text-[var(--muted)]">({tech.status})</span>
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--border)]">
                        <button
                          type="button"
                          onClick={() => setActiveCaseStudyProject(project)}
                          onMouseEnter={() => setCursorMode('project')}
                          onMouseLeave={() => setCursorMode('default')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-mono text-xs font-semibold hover:bg-[var(--accent)] hover:text-white transition-all group"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
                        >
                          <span>GitHub Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Interactive React UI Preview Column (7 Cols) */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[var(--muted)] px-1">
                        <span>LIVE INTERACTIVE COMPONENT PREVIEW</span>
                        <span>REACT + TYPESCRIPT SIMULATION</span>
                      </div>
                      {renderProjectPreview(project.id)}

                      {/* Key Engineering Features List */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 flex items-center gap-2 text-xs text-[var(--muted)]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            11. CONFIRMED CERTIFICATIONS & "WHAT I CAN BUILD"
        ===================================================================== */}
        <section
          id="credentials"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]"
        >
          {/* Confirmed Certifications */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                  06 // Verified Credentials
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                  Certifications &amp; Completed Credentials
                </h2>
              </div>
              <p className="text-xs font-mono text-[var(--muted)] max-w-md">
                Confirmed certifications from Microsoft, Google, ITI, Coursera, and freeCodeCamp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] mb-3">
                      <span className="text-[var(--accent)] font-semibold">0{idx + 1} // {cert.issuer}</span>
                      <span className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
                        {cert.category}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[var(--foreground)] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {cert.focus}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1 text-[var(--foreground)]">
                      <Award className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {cert.verifiedStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "What I Can Build" Section */}
          <div className="pt-12 border-t border-[var(--border)]">
            <div className="mb-10">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                07 // Practical Capabilities
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                What I Can Build
              </h2>
              <p className="text-sm text-[var(--muted)] mt-2 max-w-2xl">
                Realistic systems and interfaces I can design, implement, and explain across AI engineering and frontend development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.number}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 hover:bg-[var(--surface)] transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[var(--accent)] font-bold">{cap.number}</span>
                    <span className="text-[11px] text-[var(--muted)]">{cap.layer}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            12. CONTACT SECTION & VALIDATED INTERACTIVE FORM
        ===================================================================== */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left CTA Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                08 // Initiate Connection
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
                Let&apos;s build something intelligent.
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-xl">
                I&apos;m currently growing toward AI Engineering and looking for opportunities to learn, build, collaborate, and solve meaningful problems.
              </p>

              {/* Direct Contact Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${PROFILE_CONFIG.email}`}
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-semibold hover:opacity-90 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>
                <a
                  href={PROFILE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] font-mono text-xs font-semibold hover:border-[var(--accent)] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={PROFILE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorMode('interactive')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] font-mono text-xs font-semibold hover:border-[var(--accent)] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 font-mono text-xs text-[var(--muted)] space-y-1">
                <div>STATUS: Open to AI / ML Internships, Junior AI Engineering Roles &amp; Technical Collaborations</div>
                <div>LOCATION: Cairo, Egypt (UTC+2 / EEST)</div>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <span className="font-mono text-xs font-semibold text-[var(--foreground)]">
                    DIRECT MESSAGE DISPATCH
                  </span>
                  <span className="font-mono text-[10px] text-[var(--accent)] uppercase">
                    State: {formStatus}
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-[var(--muted)] mb-1.5"
                  >
                    01 // Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onFocus={() => setFormStatus('focus')}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Ahmed Hassan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-[var(--muted)] mb-1.5"
                  >
                    02 // Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onFocus={() => setFormStatus('focus')}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-[var(--muted)] mb-1.5"
                  >
                    03 // Project or Opportunity Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onFocus={() => setFormStatus('focus')}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the team, internship, or AI system you are building..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                {formStatus === 'error' && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-xs text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {formStatus === 'success' && (
                  <div
                    role="status"
                    className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-400 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Message validated and ready. You can also reach me directly at {PROFILE_CONFIG.email}.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[var(--accent)] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {formStatus === 'submitting' ? 'Validating Payload...' : 'Send Message'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          13. MINIMAL ARCHITECTURAL FOOTER
      ===================================================================== */}
      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)]/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-[var(--foreground)]">
              {PROFILE_CONFIG.name}
            </div>
            <div className="font-mono text-xs text-[var(--muted)]">
              AI / Machine Learning Engineer · {PROFILE_CONFIG.location}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-[var(--muted)]">
            <a
              href={PROFILE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE_CONFIG.email}`}
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[var(--muted)]">
            <span>Built with React &amp; TypeScript · {new Date().getFullYear()}</span>
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              aria-label="Back to top"
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          14. FULL 11-SECTION ENGINEERING CASE STUDY MODAL
      ===================================================================== */}
      {activeCaseStudyProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Sticky Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 pb-4 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)]">
                  <span>{activeCaseStudyProject.number}</span>
                  <span>//</span>
                  <span>{activeCaseStudyProject.type}</span>
                </div>
                <h2
                  id="case-study-title"
                  className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)]"
                >
                  {activeCaseStudyProject.title} — Engineering Case Study
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseStudyProject(null)}
                aria-label="Close Case Study"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Preview Embedded Inside Case Study */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-2">
                Interactive System Prototype
              </div>
              {renderProjectPreview(activeCaseStudyProject.id)}
            </div>

            {/* 11 Required Engineering Case Study Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  01 // Overview
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.overview}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  02 // Problem
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  03 // Goal
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.goal}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  04 // Architecture
                </div>
                <p className="font-mono text-xs text-[var(--foreground)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.architecture}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  05 // Approach
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.approach}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  06 // Design Decisions
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.designDecisions}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  07 // Implementation
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.implementation}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  08 // Challenges
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.challenges}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  09 // What I Learned
                </div>
                <p className="text-[var(--foreground)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.whatILearned}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-1.5">
                <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                  11 // Future Improvements
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  {activeCaseStudyProject.caseStudy.futureImprovements}
                </p>
              </div>
            </div>

            {/* 10 // Technology Stack */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50">
              <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold mb-2">
                10 // Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCaseStudyProject.caseStudy.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-[var(--foreground)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}