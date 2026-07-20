import { Workflow, WorkflowRun, ResultSection, WorkflowRunStep, WorkflowResult } from '@meridian-nexus/shared-types';

export const MOCK_CREATORS: Record<string, { id: string; displayName: string; bio: string; verified: boolean; verificationLabel: string }> = {
  'crt-meridian': {
    id: 'crt-meridian',
    displayName: 'Meridian Labs',
    bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
    verified: true,
    verificationLabel: 'Verified Meridian Creator',
  },
  'crt-growth': {
    id: 'crt-growth',
    displayName: 'Growth Studio',
    bio: 'Marketing and growth automation workflows for modern teams.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
  'crt-pipeline': {
    id: 'crt-pipeline',
    displayName: 'Pipeline AI',
    bio: 'Sales intelligence and outreach automation powered by AI.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
  'crt-sourcing': {
    id: 'crt-sourcing',
    displayName: 'Sourcing Pro',
    bio: 'Procurement and vendor management intelligence workflows.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
  'crt-digital': {
    id: 'crt-digital',
    displayName: 'Digital Edge',
    bio: 'Digital strategy, website optimization, and conversion intelligence.',
    verified: false,
    verificationLabel: 'Creator verification pending',
  },
  'crt-support': {
    id: 'crt-support',
    displayName: 'Support AI',
    bio: 'Customer experience and support automation workflows.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
  'crt-content': {
    id: 'crt-content',
    displayName: 'Content Forge',
    bio: 'Content creation and social media workflows for brands.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
  'crt-sarah': {
    id: 'crt-sarah',
    displayName: 'Strategy Works',
    bio: 'Business strategy, planning, and data analysis workflows.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
  },
};

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-company-intel',
    creatorId: 'crt-meridian',
    name: 'Company Intelligence Brief',
    slug: 'company-intelligence-brief',
    shortDescription: 'Generate a concise strategic company research report with market position, risks, and opportunities.',
    fullDescription: 'Transform any company name into a comprehensive intelligence brief. This workflow analyzes publicly available information to produce a structured strategic research report covering company overview, market positioning, business model analysis, competitive landscape, key opportunities and risks, and actionable next steps. Ideal for pre-meeting preparation, due diligence, partnership evaluation, and competitive intelligence.',
    outcomeStatement: 'Generate a concise strategic company research report',
    category: 'research',
    tags: ['research', 'intelligence', 'company analysis', 'due diligence', 'competitive'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 4.99,
    estimatedDurationSeconds: 45,
    totalRuns: 1247,
    completedRuns: 1198,
    averageRating: 4.8,
    reviewCount: 89,
    savedCount: 234,
    dataHandlingSummary: 'Company names and research parameters are processed in memory. No data is stored beyond the execution session. Results are saved to your activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: 1,
    currentVersionId: 'wv-company-intel-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-company-intel-1',
      workflowId: 'wf-company-intel',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Structure company overview, market position, and next steps.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.7,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-ci-1', versionId: 'wv-company-intel-1', fieldKey: 'companyName', label: 'Company Name', description: 'The company you want to research', type: 'text', placeholder: 'e.g., Stripe, Shopify, Datadog', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 },
        { id: 'inp-ci-2', versionId: 'wv-company-intel-1', fieldKey: 'website', label: 'Website URL', description: 'Company website for context (optional)', type: 'url', placeholder: 'https://example.com', required: false, defaultValue: null, options: null, validation: null, displayOrder: 1 }
      ],
    }
  },
  {
    id: 'wf-marketing-campaign',
    creatorId: 'crt-growth',
    name: 'Marketing Campaign Builder',
    slug: 'marketing-campaign-builder',
    shortDescription: 'Create an integrated marketing campaign with messaging, channel strategy, content ideas, and KPIs.',
    fullDescription: 'Build a complete marketing campaign from scratch. Define your product, audience, and objectives, and receive a structured campaign plan including core messaging pillars, channel-specific strategies, content ideas, a deployment timeline, measurable KPIs, and a launch checklist. Works for product launches, brand awareness, lead generation, and seasonal campaigns.',
    outcomeStatement: 'Create an integrated marketing campaign plan',
    category: 'marketing',
    tags: ['marketing', 'campaign', 'content strategy', 'growth', 'branding'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 6.99,
    estimatedDurationSeconds: 55,
    totalRuns: 892,
    completedRuns: 861,
    averageRating: 4.6,
    reviewCount: 67,
    savedCount: 178,
    dataHandlingSummary: 'Product and audience details are processed in memory only. Campaign outputs are saved to your activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
    featuredOrder: 2,
    currentVersionId: 'wv-marketing-campaign-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-growth',
      userId: 'usr-creator-3',
      displayName: 'Growth Studio',
      bio: 'Marketing and growth automation workflows for modern teams.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified demonstration creator',
      publishedWorkflowCount: 2,
      totalRuns: 1523,
      averageRating: 4.6,
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-marketing-campaign-1',
      workflowId: 'wf-marketing-campaign',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create messaging and channel strategy.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.8,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-mc-1', versionId: 'wv-marketing-campaign-1', fieldKey: 'productService', label: 'Product or Service', description: 'What are you marketing?', type: 'textarea', placeholder: 'Describe your product or service...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 },
        { id: 'inp-mc-2', versionId: 'wv-marketing-campaign-1', fieldKey: 'audience', label: 'Target Audience', description: 'Who are you trying to reach?', type: 'textarea', placeholder: 'e.g. tech leads...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 1 }
      ],
    }
  },
  {
    id: 'wf-sales-outreach',
    creatorId: 'crt-pipeline',
    name: 'Sales Outreach Generator',
    slug: 'sales-outreach-generator',
    shortDescription: 'Create personalized multi-channel sales messaging with email sequences, LinkedIn messages, and call scripts.',
    fullDescription: 'Generate a complete outreach package tailored to your prospect. Provide the target company, prospect role, your offer, and key pain points to receive a multi-touch email sequence, LinkedIn connection message, cold call opening script, objection handling responses, and a follow-up cadence schedule. Designed for SDRs, AEs, and sales leaders.',
    outcomeStatement: 'Create personalized sales outreach messaging',
    category: 'sales',
    tags: ['sales', 'outreach', 'email', 'LinkedIn', 'prospecting', 'cold calling'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 3.99,
    estimatedDurationSeconds: 35,
    totalRuns: 987,
    completedRuns: 954,
    averageRating: 4.7,
    reviewCount: 72,
    savedCount: 203,
    dataHandlingSummary: 'Prospect and company information is processed in memory only. No CRM data is accessed or stored.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified demonstration creator',
    featuredOrder: 3,
    currentVersionId: 'wv-sales-outreach-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-pipeline',
      userId: 'usr-creator-4',
      displayName: 'Pipeline AI',
      bio: 'Sales intelligence and outreach automation powered by AI.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified demonstration creator',
      publishedWorkflowCount: 1,
      totalRuns: 987,
      averageRating: 4.7,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-sales-outreach-1',
      workflowId: 'wf-sales-outreach',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create custom emails and call openings.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.7,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-so-1', versionId: 'wv-sales-outreach-1', fieldKey: 'company', label: 'Target Company', description: 'Company you are reaching out to', type: 'text', placeholder: 'e.g., Acme Corp', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 },
        { id: 'inp-so-2', versionId: 'wv-sales-outreach-1', fieldKey: 'prospectRole', label: 'Prospect Role', description: 'Role or title of your target contact', type: 'text', placeholder: 'e.g. Engineer Lead', required: true, defaultValue: null, options: null, validation: null, displayOrder: 1 }
      ],
    }
  },
  {
    id: 'wf-document-extractor',
    creatorId: 'crt-meridian',
    name: 'Document Insight Extractor',
    slug: 'document-insight-extractor',
    shortDescription: 'Turn any document into structured findings with key insights, risks, obligations, and action items.',
    fullDescription: 'Extract intelligence from documents without reading them end-to-end. Provide a document or paste its content along with your analysis goal, and receive a structured summary, key findings, important dates and deadlines, risks and concerns, obligations, and prioritized action items. Works with contracts, reports, proposals, policies, and research papers.',
    outcomeStatement: 'Turn a document into structured findings',
    category: 'data-analysis',
    tags: ['document analysis', 'extraction', 'summarization', 'insights', 'contracts'],
    status: 'published',
    visibility: 'public',
    isFree: true,
    pricePerRun: 0.00,
    estimatedDurationSeconds: 40,
    totalRuns: 2134,
    completedRuns: 2089,
    averageRating: 4.9,
    reviewCount: 156,
    savedCount: 412,
    dataHandlingSummary: 'Document text is processed in memory during execution. Content is not stored after the session. Results are saved to your activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: null,
    currentVersionId: 'wv-document-extractor-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-document-extractor-1',
      workflowId: 'wf-document-extractor',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create summaries and deadlines.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.5,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-de-1', versionId: 'wv-document-extractor-1', fieldKey: 'documentContent', label: 'Document Content', description: 'Paste content here', type: 'textarea', placeholder: 'Paste content...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 }
      ],
    }
  },
  {
    id: 'wf-api-architect',
    creatorId: 'crt-meridian',
    name: 'Smart API Architect & OpenAPI Spec',
    slug: 'api-architect-generator',
    shortDescription: 'Design production-ready REST & GraphQL API schemas with Zod validation, error handling, rate limiting rules, and OpenAPI 3.1 specifications.',
    fullDescription: 'Synthesize production-ready REST & GraphQL API specifications. Input your domain entity and target framework to receive full OpenAPI 3.1 YAML/JSON specs, Hono/Fastify TypeScript handlers, Zod schema validation, error contracts, and x402 header settlement middleware rules.',
    outcomeStatement: 'Synthesize production-ready REST & GraphQL API specifications',
    category: 'development',
    tags: ['development', 'api', 'openapi', 'typescript', 'hono', 'zod', 'schema'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 5.99,
    estimatedDurationSeconds: 35,
    totalRuns: 1420,
    completedRuns: 1390,
    averageRating: 4.9,
    reviewCount: 84,
    savedCount: 312,
    dataHandlingSummary: 'API schema specifications are processed in memory only during execution session. Results are saved to your activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: null,
    currentVersionId: 'wv-api-architect-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-api-architect-1',
      workflowId: 'wf-api-architect',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create OpenAPI YAML formats.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.5,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-api-1', versionId: 'wv-api-architect-1', fieldKey: 'entityName', label: 'Domain Entity Name', description: 'The main data model to construct CRUD API for', type: 'text', placeholder: 'e.g. UserProfile, AgentSession', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 }
      ],
    }
  },
  {
    id: 'wf-security-auditor',
    creatorId: 'crt-meridian',
    name: 'Autonomous Security & Code Auditor',
    slug: 'security-code-auditor',
    shortDescription: 'Audit TypeScript, Rust, and Solidity code for reentrancy bugs, secret exposure, CORS leaks, and OWASP Top 10 vulnerabilities with exact code patch fixes.',
    fullDescription: 'Perform automated deep security audits on backend and smart contract codebases. Receives source code snippets or repository links to output an executive vulnerability report, CVSS severity ratings, proof-of-concept exploits, and exact diff patch fixes.',
    outcomeStatement: 'Perform automated deep security audits on codebases',
    category: 'development',
    tags: ['development', 'security', 'audit', 'vulnerabilities', 'owasp', 'solidity', 'typescript'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 8.99,
    estimatedDurationSeconds: 45,
    totalRuns: 1890,
    completedRuns: 1850,
    averageRating: 4.9,
    reviewCount: 118,
    savedCount: 450,
    dataHandlingSummary: 'Code snippets are processed in memory during the audit execution session only. No source code is permanently stored.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: null,
    currentVersionId: 'wv-security-auditor-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-security-auditor-1',
      workflowId: 'wf-security-auditor',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Analyze files for reentrancy vulnerabilities and OWASP bugs.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.4,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-sec-1', versionId: 'wv-security-auditor-1', fieldKey: 'sourceCode', label: 'Source Code / Snippet', description: 'Paste the file code to audit', type: 'textarea', placeholder: 'Paste code here...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 }
      ],
    }
  },
  {
    id: 'wf-terraform-architect',
    creatorId: 'crt-meridian',
    name: 'Cloud Infrastructure & Terraform Synthesizer',
    slug: 'terraform-cloud-architect',
    shortDescription: 'Synthesize multi-region cloud infrastructure blueprints across Cloudflare, AWS, and GCP with IaC Terraform code, IAM policies, and cost projections.',
    fullDescription: 'Build infrastructure-as-code deployment blueprints. Describe workload requirements and target cloud providers to generate multi-region architecture diagrams, HCL Terraform definitions, IAM security policies, and monthly budget cost estimates.',
    outcomeStatement: 'Build infrastructure-as-code deployment blueprints',
    category: 'development',
    tags: ['development', 'cloud', 'terraform', 'infrastructure', 'aws', 'cloudflare', 'gcp'],
    status: 'published',
    visibility: 'public',
    isFree: false,
    pricePerRun: 6.99,
    estimatedDurationSeconds: 40,
    totalRuns: 1120,
    completedRuns: 1090,
    averageRating: 4.8,
    reviewCount: 62,
    savedCount: 280,
    dataHandlingSummary: 'Architecture specs are processed in memory only. Results saved to activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: null,
    currentVersionId: 'wv-terraform-architect-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-terraform-architect-1',
      workflowId: 'wf-terraform-architect',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create multi-region Terraform deployment plans.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.5,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-tf-1', versionId: 'wv-terraform-architect-1', fieldKey: 'infrastructureGoal', label: 'Infrastructure Requirements', description: 'Describe what you want to host', type: 'textarea', placeholder: 'e.g. global serverless API...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 }
      ],
    }
  },
  {
    id: 'wf-react-component-architect',
    creatorId: 'crt-meridian',
    name: 'React 19 + Tailwind UI Component Architect',
    slug: 'react-ui-component-architect',
    shortDescription: 'Generate accessible, production-ready React 19 TypeScript component code with Tailwind CSS styling, Framer Motion animations, and ARIA keyboard navigation.',
    fullDescription: 'Synthesize modern frontend UI component libraries. Provide design requirements or mockup descriptions to generate copy-paste TypeScript React 19 components with Tailwind CSS v4 utility classes, Framer Motion micro-animations, and full WCAG ARIA compliance.',
    outcomeStatement: 'Synthesize modern frontend UI component libraries',
    category: 'development',
    tags: ['development', 'react', 'tailwind', 'frontend', 'ui', 'components', 'framer motion'],
    status: 'published',
    visibility: 'public',
    isFree: true,
    pricePerRun: 0.00,
    estimatedDurationSeconds: 30,
    totalRuns: 2450,
    completedRuns: 2410,
    averageRating: 4.9,
    reviewCount: 164,
    savedCount: 620,
    dataHandlingSummary: 'UI specifications are processed in memory only. Generated code saved to activity history.',
    refundPolicy: 'Demonstration refund policies apply.',
    verified: true,
    verificationLabel: 'Verified Meridian workflow',
    featuredOrder: null,
    currentVersionId: 'wv-react-component-architect-1',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    deletedAt: null,
    thumbnailUrl: null,
    creator: {
      id: 'crt-meridian',
      userId: 'usr-creator-2',
      displayName: 'Meridian Labs',
      bio: 'Official Meridian research and intelligence workflows. Built by the Meridian team.',
      avatarUrl: null,
      website: null,
      verified: true,
      verificationLabel: 'Verified Meridian Creator',
      publishedWorkflowCount: 4,
      totalRuns: 2847,
      averageRating: 4.8,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    currentVersion: {
      id: 'wv-react-component-architect-1',
      workflowId: 'wf-react-component-architect',
      versionNumber: 1,
      versionNotes: 'Initial release',
      systemInstructions: 'Create React 19 components with Tailwind v4 styling.',
      creatorInstructions: '',
      modelProvider: 'gemini',
      modelId: 'gemini-2.5-flash',
      outputSchema: null,
      maxTokens: 4096,
      temperature: 0.6,
      createdAt: '2025-01-15T10:00:00Z',
      outputDefinitions: [],
      inputDefinitions: [
        { id: 'inp-re-1', versionId: 'wv-react-component-architect-1', fieldKey: 'componentDesc', label: 'UI Component Description', description: 'Describe the component interface', type: 'textarea', placeholder: 'e.g. modal popup dialog...', required: true, defaultValue: null, options: null, validation: null, displayOrder: 0 }
      ],
    }
  }
];

export function mockGetWorkflows(params: any = {}): Workflow[] {
  let list = [...MOCK_WORKFLOWS];

  if (params.category) {
    list = list.filter((w) => w.category === params.category);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.shortDescription.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params.isFree !== undefined) {
    const isFreeBool = params.isFree === 'true' || params.isFree === true;
    list = list.filter((w) => w.isFree === isFreeBool);
  }

  if (params.verified !== undefined) {
    const verifiedBool = params.verified === 'true' || params.verified === true;
    list = list.filter((w) => w.verified === verifiedBool);
  }

  if (params.sort) {
    if (params.sort === 'newest') {
      list = [...list].reverse();
    } else if (params.sort === 'rating') {
      list.sort((a, b) => b.averageRating - a.averageRating);
    } else if (params.sort === 'price-asc') {
      list.sort((a, b) => a.pricePerRun - b.pricePerRun);
    } else if (params.sort === 'price-desc') {
      list.sort((a, b) => b.pricePerRun - a.pricePerRun);
    }
  }

  return list;
}

export function mockGetWorkflow(idOrSlug: string): Workflow | null {
  return (
    MOCK_WORKFLOWS.find((w) => w.id === idOrSlug || w.slug === idOrSlug) || null
  );
}

export function mockGetMockResultSections(slug: string, vars: any): ResultSection[] {
  const companyName = vars.companyName || vars.company || 'Acme Corp';
  const productName = vars.productName || vars.productService || 'Nexus Platform';
  const targetAudience = vars.audience || 'SaaS Founders & Teams';
  const entityName = vars.entityName || 'UserProfile';

  switch (slug) {
    case 'company-intelligence-brief':
      return [
        {
          key: 'overview',
          label: 'Company Overview',
          type: 'paragraph',
          content: `${companyName} is a leading technology company operating in the enterprise software ecosystem. Founded by industry veterans, the organization has achieved notable market penetration by addressing core operational friction points. Headquartered strategically, they command a strong engineering culture and have successfully scaled their product portfolio to serve both mid-market and enterprise accounts.`,
        },
        {
          key: 'marketPosition',
          label: 'Market Position',
          type: 'paragraph',
          content: `Operating in a highly competitive market valued at billions globally, ${companyName} positions itself as a premium, high-reliability solution. While incumbent players focus on legacy support, ${companyName} has gained market share through superior usability, modern API architectures, and rapid feature deployment. Key industry analysts classify them as a 'High Performer' with strong growth momentum.`,
        },
        {
          key: 'opportunities',
          label: 'Key Opportunities',
          type: 'list',
          content: [
            'Expanding product offerings into adjacent workflow automation verticals.',
            'Accelerating international growth, specifically in the APAC and LATAM regions.',
            'Integrating advanced machine learning agents to automate routine administrative steps.',
          ],
        },
      ];

    case 'marketing-campaign-builder':
      return [
        {
          key: 'concept',
          label: 'Campaign Concept',
          type: 'paragraph',
          content: `The theme of this campaign is 'Workflow Autonomy' for ${productName}. The narrative centers on liberating teams from operational overhead, positioning ${productName} as the intelligence layer that coordinates disparate processes seamlessly. By focusing on outcomes rather than features, the campaign establishes a strong emotional connection with ${targetAudience} who feel overwhelmed by legacy tools.`,
        },
        {
          key: 'messaging',
          label: 'Messaging Pillars',
          type: 'list',
          content: [
            'Speed to Outcome: Deploy intelligent agents in minutes, not months.',
            'Universal Extensibility: Integrates with your existing database and workspace stack without custom code.',
          ],
        },
      ];

    case 'api-architect-generator':
      return [
        {
          key: 'openApi',
          label: 'OpenAPI 3.1 Specification',
          type: 'code',
          content: `openapi: 3.1.0\ninfo:\n  title: ${entityName} API\n  version: 1.0.0\n  description: Production CRUD endpoints for ${entityName}\npaths:\n  /api/v1/${entityName.toLowerCase()}:\n    post:\n      summary: Create a new ${entityName}\n      responses:\n        '201':\n          description: Success`,
        },
        {
          key: 'zodSchema',
          label: 'Zod Validation Schema',
          type: 'code',
          content: `import { z } from 'zod';\n\nexport const ${entityName}Schema = z.object({\n  id: z.string().uuid(),\n  createdAt: z.string().datetime(),\n  status: z.enum(['active', 'pending', 'archived'])\n});`,
        },
      ];

    case 'security-code-auditor':
      return [
        {
          key: 'summary',
          label: 'Audit Executive Summary',
          type: 'paragraph',
          content: `Vulnerability analysis completed on user-submitted files. Found 2 medium severity vulnerabilities and 1 high severity vulnerability. Mitigation plans and code patch diffs have been generated.`,
        },
        {
          key: 'vulnerabilities',
          label: 'Vulnerability Registry',
          type: 'table',
          content: {
            headers: ['Ref', 'Vulnerability', 'Severity', 'Status'],
            rows: [
              ['SEC-01', 'Cross-Origin Resource Sharing (CORS) Overly Permissive Policy', 'Medium', 'Mitigated'],
              ['SEC-02', 'Secrets Stored in Environment Configuration variables', 'High', 'Mitigated'],
            ],
          },
        },
      ];

    default:
      return [
        {
          key: 'summary',
          label: 'Executive Summary',
          type: 'paragraph',
          content: `Mock analysis completed successfully. Inputs: ${JSON.stringify(vars)}`,
        },
      ];
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockRunWorkflow(workflowId: string, inputs: any): Promise<WorkflowRun> {
  await sleep(1500);

  const wf = MOCK_WORKFLOWS.find((w) => w.id === workflowId || w.slug === workflowId);
  if (!wf) throw new Error(`Workflow ${workflowId} not found`);

  const runId = `run-${Math.random().toString(36).slice(2, 11)}`;
  const sections = mockGetMockResultSections(wf.slug, inputs);

  const steps: WorkflowRunStep[] = [
    { id: `step-${runId}-1`, runId, stepKey: 'validate', label: 'Validate Request Headers', status: 'completed', startedAt: new Date().toISOString(), completedAt: new Date().toISOString(), durationMs: 200, metadata: null, displayOrder: 0 },
    { id: `step-${runId}-2`, runId, stepKey: 'compile', label: 'Compile Agent System Prompts', status: 'completed', startedAt: new Date().toISOString(), completedAt: new Date().toISOString(), durationMs: 300, metadata: null, displayOrder: 1 },
    { id: `step-${runId}-3`, runId, stepKey: 'llm', label: 'Invoke Gemini Inference Gateway', status: 'completed', startedAt: new Date().toISOString(), completedAt: new Date().toISOString(), durationMs: 500, metadata: null, displayOrder: 2 },
    { id: `step-${runId}-4`, runId, stepKey: 'settle', label: 'Format Output Sections & Settle x402', status: 'completed', startedAt: new Date().toISOString(), completedAt: new Date().toISOString(), durationMs: 200, metadata: null, displayOrder: 3 }
  ];

  const result: WorkflowResult = {
    id: `res-${runId}`,
    runId,
    sections,
    rawOutput: JSON.stringify(sections),
    createdAt: new Date().toISOString(),
    metadata: {
      modelProvider: 'demo',
      modelId: 'deterministic-demo-v1',
      isFallback: true,
      fallbackReason: 'Clientside offline fallback gateway triggered.',
      tokensUsed: 350,
      promptTokens: 100,
      completionTokens: 250,
      generationTimeMs: 1200,
      workflowVersion: 1
    }
  };

  const mockRun: WorkflowRun = {
    id: runId,
    workflowId: wf.id,
    workflowVersionId: wf.currentVersionId || 'wv-unknown',
    userId: 'usr-demo-1',
    status: 'completed',
    inputs,
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    durationMs: 1200,
    modelProvider: 'demo',
    modelId: 'deterministic-demo-v1',
    isFallback: true,
    fallbackReason: 'Clientside offline fallback gateway triggered.',
    estimatedPrice: wf.pricePerRun,
    actualPrice: wf.pricePerRun,
    errorMessage: null,
    errorCode: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    workflow: wf,
    steps,
    result,
  };

  const savedRuns = JSON.parse(localStorage.getItem('nexus_runs_history') || '[]');
  savedRuns.unshift(mockRun);
  localStorage.setItem('nexus_runs_history', JSON.stringify(savedRuns));

  return mockRun;
}

export function mockGetRuns(): WorkflowRun[] {
  return JSON.parse(localStorage.getItem('nexus_runs_history') || '[]');
}

export function mockGetRun(id: string): WorkflowRun | null {
  const runs = mockGetRuns();
  return runs.find((r) => r.id === id) || null;
}
