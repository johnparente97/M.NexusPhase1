import { ModelGenerationRequest, ModelGenerationResult, ResultSection } from '@meridian-nexus/shared-types';
import { ModelProvider } from './interface';

export class DeterministicDemoModelProvider implements ModelProvider {
  async generate(request: ModelGenerationRequest): Promise<ModelGenerationResult> {
    const startTime = Date.now();
    
    // Parse the request user prompt or inputs to see if we can identify the workflow.
    // In our runner, the user prompt is usually constructed with the input parameters.
    // We will extract variables from the request or fallback to generic templates.
    let slug = 'generic';
    
    // Try to guess slug from userPrompt if it contains identifiers
    if (request.userPrompt.includes('company-intelligence-brief') || request.userPrompt.includes('Company Intelligence Brief')) {
      slug = 'company-intelligence-brief';
    } else if (request.userPrompt.includes('marketing-campaign-builder') || request.userPrompt.includes('Marketing Campaign Builder')) {
      slug = 'marketing-campaign-builder';
    } else if (request.userPrompt.includes('sales-outreach-generator') || request.userPrompt.includes('Sales Outreach Generator')) {
      slug = 'sales-outreach-generator';
    } else if (request.userPrompt.includes('vendor-comparison-analyst') || request.userPrompt.includes('Vendor Comparison Analyst')) {
      slug = 'vendor-comparison-analyst';
    } else if (request.userPrompt.includes('document-insight-extractor') || request.userPrompt.includes('Document Insight Extractor')) {
      slug = 'document-insight-extractor';
    } else if (request.userPrompt.includes('website-opportunity-audit') || request.userPrompt.includes('Website Opportunity Audit')) {
      slug = 'website-opportunity-audit';
    } else if (request.userPrompt.includes('customer-response-assistant') || request.userPrompt.includes('Customer Response Assistant')) {
      slug = 'customer-response-assistant';
    } else if (request.userPrompt.includes('social-content-engine') || request.userPrompt.includes('Social Content Engine')) {
      slug = 'social-content-engine';
    } else if (request.userPrompt.includes('data-analysis-brief') || request.userPrompt.includes('Data Analysis Brief')) {
      slug = 'data-analysis-brief';
    } else if (request.userPrompt.includes('meeting-brief-generator') || request.userPrompt.includes('Meeting Brief Generator')) {
      slug = 'meeting-brief-generator';
    } else if (request.userPrompt.includes('business-strategy-planner') || request.userPrompt.includes('Business Strategy Planner')) {
      slug = 'business-strategy-planner';
    } else if (request.userPrompt.includes('procurement-opportunity-analyzer') || request.userPrompt.includes('Procurement Opportunity Analyzer')) {
      slug = 'procurement-opportunity-analyzer';
    } else if (request.userPrompt.includes('competitive-landscape-mapper') || request.userPrompt.includes('Competitive Landscape Mapper')) {
      slug = 'competitive-landscape-mapper';
    } else if (request.userPrompt.includes('email-newsletter-creator') || request.userPrompt.includes('Email Newsletter Creator')) {
      slug = 'email-newsletter-creator';
    } else if (request.userPrompt.includes('risk-assessment-framework') || request.userPrompt.includes('Risk Assessment Framework')) {
      slug = 'risk-assessment-framework';
    } else if (request.userPrompt.includes('api-architect') || request.userPrompt.includes('OpenAPI')) {
      slug = 'api-architect-generator';
    } else if (request.userPrompt.includes('security-code-auditor') || request.userPrompt.includes('Security Auditor')) {
      slug = 'security-code-auditor';
    } else if (request.userPrompt.includes('terraform-cloud') || request.userPrompt.includes('Terraform Synthesizer')) {
      slug = 'terraform-cloud-architect';
    } else if (request.userPrompt.includes('react-ui-component') || request.userPrompt.includes('Component Architect')) {
      slug = 'react-ui-component-architect';
    }

    // Parse the inputs from the userPrompt text if possible, e.g. "Company Name: [Stripe]"
    const getMatch = (regex: RegExp, fallback: string): string => {
      const match = request.userPrompt.match(regex);
      return match && match[1] ? match[1].trim() : fallback;
    };

    const companyName = getMatch(/Company Name:\s*([^\n]+)/i, 'Acme Corp');
    const productName = getMatch(/(?:Product|Service):\s*([^\n]+)/i, 'Nexus Platform');
    const targetAudience = getMatch(/(?:Target Audience|Audience):\s*([^\n]+)/i, 'SaaS Founders & Engineering Teams');

    const sections = this.getMockResultSections(slug, { companyName, productName, targetAudience });
    
    // Simulate generation delay (e.g. 2 seconds) to feel like a real AI running
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const generationTimeMs = Date.now() - startTime;
    const content = JSON.stringify(sections, null, 2);

    return {
      content,
      parsedSections: sections,
      generationTimeMs,
      tokensUsed: 420,
      promptTokens: 120,
      completionTokens: 300,
      provider: 'demo',
      model: 'deterministic-demo-v1',
      isFallback: true,
      fallbackReason: 'Configured model provider fallback mode or live AI offline.',
    };
  }

  private getMockResultSections(slug: string, vars: { companyName: string; productName: string; targetAudience: string }): ResultSection[] {
    const { companyName, productName, targetAudience } = vars;

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
            key: 'businessModel',
            label: 'Business Model Analysis',
            type: 'paragraph',
            content: `The business model is primarily built on Software-as-a-Service (SaaS) subscription tiers, supplemented by usage-based pricing for advanced transactional features. Enterprise contracts typically feature multi-year commitments with minimum volume guarantees. Customer acquisition is driven by a hybrid model: developer-led bottom-up adoption coupled with a direct enterprise sales force. High net revenue retention (NRR) highlights strong product stickiness.`,
          },
          {
            key: 'opportunities',
            label: 'Key Opportunities',
            type: 'list',
            content: [
              'Expanding product offerings into adjacent workflow automation verticals.',
              'Accelerating international growth, specifically in the APAC and LATAM regions.',
              'Integrating advanced machine learning agents to automate routine administrative steps.',
              'Developing robust professional services partnerships to ease enterprise onboarding workloads.',
            ],
          },
          {
            key: 'risks',
            label: 'Key Risks',
            type: 'risks',
            content: [
              {
                risk: 'Increased Platform Competition',
                impact: 'High',
                mitigation: 'Double down on API extensibility and ecosystem integrations.',
              },
              {
                risk: 'Talent Retention in Engineering',
                impact: 'Medium',
                mitigation: 'Offer competitive performance incentives and remote-first flexibility.',
              },
              {
                risk: 'Data Compliance and Localization Regulations',
                impact: 'High',
                mitigation: 'Implement multi-region hosting architecture and strict GDPR/SOC2 compliance framework.',
              },
            ],
          },
          {
            key: 'nextSteps',
            label: 'Recommended Next Steps',
            type: 'action-items',
            content: [
              { item: 'Schedule follow-up discussion with department stakeholders.', priority: 'High' },
              { item: 'Request current developer API documentation for integration testing.', priority: 'Medium' },
              { item: 'Conduct technical security review of current endpoint exposures.', priority: 'High' },
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
              'Trust and Transparency: Clean verification layers, secure data handling, and predictable settlement billing.',
            ],
          },
          {
            key: 'channels',
            label: 'Channel Strategy',
            type: 'table',
            content: {
              headers: ['Channel', 'Strategy', 'Allocation'],
              rows: [
                ['LinkedIn Ads', 'Targeted professional messaging focused on decision-makers.', '40%'],
                ['Email Marketing', 'Nurture sequences offering strategic guides and user stories.', '25%'],
                ['Content / SEO', 'Deep dive blog articles detailing custom workflow builds.', '20%'],
                ['Developer Relations', 'Hosting interactive virtual build sessions and hackathons.', '15%'],
              ],
            },
          },
          {
            key: 'content',
            label: 'Content Ideas',
            type: 'list',
            content: [
              'Blog: How to scale workflow automation inside enterprise operations.',
              'Case Study: How a mid-market team reduced administrative friction by 60%.',
              'Video series: Building a workflow in 3 simple steps (90-second clips).',
              'Whitepaper: The Strategic Architecture of Intelligent Operations.',
            ],
          },
          {
            key: 'timeline',
            label: 'Timeline',
            type: 'timeline',
            content: [
              { phase: 'Weeks 1-2: Asset Creation', tasks: ['Write copy, design visual assets, build landing pages, set up tracking tags.'] },
              { phase: 'Weeks 3-4: Launch & Seed', tasks: ['Activate email nurture, deploy organic social content, launch initial ad sets.'] },
              { phase: 'Weeks 5-8: Scale & Optimize', tasks: ['Monitor conversion metrics, adjust ad spend, double down on high-performing copy.'] },
            ],
          },
          {
            key: 'kpis',
            label: 'KPI Framework',
            type: 'metrics',
            content: [
              { metric: 'Conversion Rate', target: '3.5%', status: 'Target' },
              { metric: 'Cost per Acquisition', target: '$45.00', status: 'Target' },
              { metric: 'Pipeline Generated', target: '$150,000', status: 'Target' },
            ],
          },
          {
            key: 'checklist',
            label: 'Launch Checklist',
            type: 'action-items',
            content: [
              { item: 'Verify all tracking links contain valid UTM parameters.', priority: 'High' },
              { item: 'Perform multi-device responsive review on target landing pages.', priority: 'High' },
              { item: 'Confirm email autoresponders trigger successfully.', priority: 'High' },
            ],
          },
        ];

      case 'sales-outreach-generator':
        return [
          {
            key: 'emailSequence',
            label: 'Email Sequence',
            type: 'content-draft',
            content: `### Touch 1: The Friction Opener\n**Subject**: Resolving administrative friction at ${companyName}\n\nHi {{Prospect Name}},\n\nI noticed you oversee operational workflows at ${companyName}. Often, engineering teams spend up to 15 hours a week coordinating manual tasks between tools.\n\nOur platform, ${productName}, automates these connections using intelligent models without custom infrastructure.\n\nAre you open to a brief 10-minute preview next Tuesday?\n\nBest,\n{{Sender Name}}`,
          },
          {
            key: 'linkedin',
            label: 'LinkedIn Message',
            type: 'content-draft',
            content: `Hi {{Prospect Name}} - noticed your work leading engineering teams at ${companyName}. We just released a strategic guide on reducing developer friction inside distributed teams. Thought it might resonate with your current initiatives. Open to connecting?`,
          },
          {
            key: 'callScript',
            label: 'Call Opening Script',
            type: 'content-draft',
            content: `"Hi {{Prospect Name}}, Alex here from Nexus. I know I caught you out of the blue, but I was researching operational structures at ${companyName} and had a quick question about how you manage workflow versioning..."`,
          },
          {
            key: 'objections',
            label: 'Objection Responses',
            type: 'table',
            content: {
              headers: ['Objection', 'Best Response Pivot'],
              rows: [
                ['We already use Zapier/Make', 'Acknowledge. Pivot to: We do not replace integrations; we add intelligence and reasoning steps that legacy APIs cannot handle.'],
                ['No budget this quarter', 'Pivot to: That is completely fine. We offer a robust free tier and developer workspace. Let us get your team set up with testing keys.'],
                ['Is it secure?', 'Pivot to: Absolutely. We enforce strict data handling policies and use server-side credentials with zero client-side key exposure.'],
              ],
            },
          },
          {
            key: 'cadence',
            label: 'Follow-up Cadence',
            type: 'timeline',
            content: [
              { phase: 'Day 1', tasks: ['LinkedIn connection request + Opener email (Touch 1)'] },
              { phase: 'Day 4', tasks: ['Phone call (morning) + LinkedIn profile view'] },
              { phase: 'Day 7', tasks: ['Follow-up email (Value focus, Touch 2) + LinkedIn message'] },
              { phase: 'Day 10', tasks: ['Final email bump (Touch 3) + Phone call'] },
            ],
          },
        ];

      case 'vendor-comparison-analyst':
        return [
          {
            key: 'comparison',
            label: 'Comparison Matrix',
            type: 'table',
            content: {
              headers: ['Vendor', 'Pricing', 'Security Rating', 'Ease of Integration', 'Support Tier'],
              rows: [
                ['Option Alpha', 'Premium ($$$)', 'SOC2 Type II / HIPAA', 'High (Modern REST APIs)', '24/7 Dedicated Account Manager'],
                ['Option Beta', 'Moderate ($$)', 'SOC2 Type I Pending', 'Medium (Legacy Webhooks)', 'Email Support 8am-8pm EST'],
                ['Option Gamma', 'Budget ($)', 'Self-assessment only', 'Low (Manual CSV import)', 'Forum-only support'],
              ],
            },
          },
          {
            key: 'strengths',
            label: 'Strengths & Weaknesses',
            type: 'paragraph',
            content: `**Option Alpha** stands out for robust security controls and stellar developer documentation, making it the fastest to integrate securely. However, its premium price tag requires high initial commitment. **Option Beta** offers the best balance of price and feature depth but shows potential integration hurdles. **Option Gamma** is cost-effective but presents operational security risks.`,
          },
          {
            key: 'risks',
            label: 'Risk Assessment',
            type: 'risks',
            content: [
              { risk: 'Data leakage via Option Gamma', impact: 'High', mitigation: 'Avoid Option Gamma for sensitive datasets.' },
              { risk: 'Beta API deprecations', impact: 'Medium', mitigation: 'Build local adapter layer to buffer updates.' },
            ],
          },
          {
            key: 'recommendation',
            label: 'Scored Recommendation',
            type: 'paragraph',
            content: `We highly recommend **Option Alpha** if compliance and developer speed are primary drivers. If budget constraints are strict, proceed with **Option Beta** but require an initial security audit before production launch.`,
          },
        ];

      case 'document-insight-extractor':
        return [
          {
            key: 'summary',
            label: 'Executive Summary',
            type: 'paragraph',
            content: `This analysis covers the submitted operational agreement. The document establishes terms for system deployment, service level agreements (SLAs), data ownership, and pricing parameters. The document is generally balanced but contains a few critical clauses requiring stakeholder attention before signature.`,
          },
          {
            key: 'findings',
            label: 'Key Findings',
            type: 'list',
            content: [
              'Intellectual Property: Client retains all ownership of custom workflow definitions and outputs.',
              'Uptime SLA: Provider guarantees 99.9% uptime, with service credits issued if performance falls below.',
              'Data Retention: Provider agrees to purge all transactional logs within 30 days of session completion.',
              'Termination: Requires 60 days written notice prior to annual renewal.',
            ],
          },
          {
            key: 'dates',
            label: 'Important Dates',
            type: 'table',
            content: {
              headers: ['Event / Deadline', 'Date', 'Significance'],
              rows: [
                ['Effective Date', 'Immediately upon signing', 'Commences billing cycles.'],
                ['Renewal Window', '60 days before anniversary', 'Last opportunity to prevent auto-renewal.'],
                ['First SLA Review', 'End of Q1', 'Review performance metrics against SLAs.'],
              ],
            },
          },
          {
            key: 'risks',
            label: 'Risks & Concerns',
            type: 'risks',
            content: [
              { risk: 'Automatic 5% Price Increase', impact: 'Medium', mitigation: 'Request deletion of the automatic escalation clause.' },
              { risk: 'Vague Indemnification Limits', impact: 'High', mitigation: 'Propose a standard liability cap equal to 12 months fees.' },
            ],
          },
          {
            key: 'actionItems',
            label: 'Action Items',
            type: 'action-items',
            content: [
              { item: 'Submit revised liability cap clause to legal counsel.', priority: 'High' },
              { item: 'Set calendar reminder for renewal window notice date.', priority: 'High' },
              { item: 'Verify security team has signed off on data retention protocols.', priority: 'Medium' },
            ],
          },
        ];

      case 'meeting-brief-generator':
        return [
          {
            key: 'summary',
            label: 'Briefing Summary',
            type: 'paragraph',
            content: `Briefing prepared for the upcoming stakeholder meeting. The objective is to review pilot performance and secure sign-off for next phase deployment. Key attendees represent engineering, operations, and finance teams.`,
          },
          {
            key: 'attendees',
            label: 'Attendee Context',
            type: 'table',
            content: {
              headers: ['Name', 'Role', 'Perspective / Bias'],
              rows: [
                ['Eng Lead', 'VP Engineering', 'Highly supportive of technology stack, focused on security & API design.'],
                ['Finance Lead', 'CFO', 'Budget-conscious. Wants to see proof of ROI and clear cost controls.'],
                ['Ops Lead', 'VP Operations', 'Focused on user adoption, training needs, and operational disruption.'],
              ],
            },
          },
          {
            key: 'talkingPoints',
            label: 'Talking Points',
            type: 'list',
            content: [
              'Pilot Performance: Highlight the 40% reduction in workflow coordination time.',
              'Security Architecture: Stress that no client-side private credentials are ever exposed.',
              'Deployment Plan: Phased rollout over 6 weeks with zero legacy system downtime.',
            ],
          },
          {
            key: 'questions',
            label: 'Questions to Ask',
            type: 'list',
            content: [
              'To Eng Lead: Are there specific security certifications your team requires next?',
              'To CFO: What ROI thresholds does your team look for to justify enterprise tiering?',
              'To Ops Lead: What is your team\'s current training budget for operations staff?',
            ],
          },
          {
            key: 'risks',
            label: 'Potential Risks',
            type: 'risks',
            content: [
              { risk: 'Budget Pushback', impact: 'High', mitigation: 'Emphasize the developer free tier and low startup cost.' },
              { risk: 'Security Approval Delay', impact: 'Medium', mitigation: 'Provide complete architectural docs at the start of the meeting.' },
            ],
          },
        ];

      case 'api-architect-generator':
        return [
          {
            key: 'overview',
            label: 'API Architecture Blueprint',
            type: 'paragraph',
            content: `Designed a high-throughput REST API schema for ${companyName}. Built with OpenAPI 3.1 specifications, Hono route handlers, Zod schema validation, and x402 header settlement middleware.`,
          },
          {
            key: 'endpoints',
            label: 'Endpoint Specifications',
            type: 'table',
            content: {
              headers: ['HTTP Method', 'Endpoint Path', 'Auth Level', 'Rate Limit'],
              rows: [
                ['POST', '/api/v1/auth/login', 'Public', '10 req/min'],
                ['GET', '/api/v1/capabilities', 'Bearer JWT', '200 req/min'],
                ['POST', '/api/v1/workflows/run', 'x402 Header', '50 req/min'],
                ['GET', '/api/v1/settlement/receipts', 'Bearer JWT', '100 req/min'],
              ],
            },
          },
          {
            key: 'code',
            label: 'OpenAPI 3.1 Spec (YAML)',
            type: 'code',
            content: `openapi: 3.1.0\ninfo:\n  title: ${companyName} API\n  version: 1.0.0\npaths:\n  /api/v1/workflows/run:\n    post:\n      summary: Execute capability workflow\n      security:\n        - X402Payment: []`,
          },
        ];

      case 'security-code-auditor':
        return [
          {
            key: 'overview',
            label: 'Security Audit Executive Summary',
            type: 'paragraph',
            content: `Analyzed core codebase for ${companyName}. 0 Critical vulnerabilities, 1 High Severity issue identified (CORS wildcard header in production), and 2 Medium hardening recommendations.`,
          },
          {
            key: 'vulnerabilities',
            label: 'Vulnerability Assessment',
            type: 'risks',
            content: [
              { risk: 'CORS Wildcard Access Control', impact: 'High', mitigation: 'Bind Access-Control-Allow-Origin strictly to env.CORS_ORIGIN.' },
              { risk: 'Missing Parameter Sanitization', impact: 'Medium', mitigation: 'Apply Zod string schema stripping for HTML tags.' },
            ],
          },
          {
            key: 'patch',
            label: 'Code Fix Patch',
            type: 'code',
            content: `// Security Patch Fix:\n- app.use('*', cors({ origin: '*' }));\n+ app.use('*', cors({ origin: c.env.CORS_ORIGIN, credentials: true }));`,
          },
        ];

      case 'terraform-cloud-architect':
        return [
          {
            key: 'overview',
            label: 'Multi-Region Infrastructure Architecture',
            type: 'paragraph',
            content: `Synthesized cloud infrastructure blueprint for ${companyName} on Cloudflare Workers & AWS S3. Designed for 100,000 requests/second with global edge caching and D1 database replication.`,
          },
          {
            key: 'resources',
            label: 'Resource Allocation & Monthly Budget',
            type: 'table',
            content: {
              headers: ['Resource Type', 'Provider', 'Scale Capacity', 'Monthly Cost'],
              rows: [
                ['Edge Workers', 'Cloudflare', 'Unlimited', '$5.00'],
                ['D1 Relational DB', 'Cloudflare', '10GB Storage', 'Included'],
                ['S3 Storage', 'AWS', '1TB Assets', '$23.00'],
              ],
            },
          },
        ];

      case 'react-ui-component-architect':
        return [
          {
            key: 'overview',
            label: 'React 19 + Tailwind Component Architecture',
            type: 'paragraph',
            content: `Synthesized accessible UI component library for ${companyName} using React 19, Tailwind CSS v4, and Framer Motion micro-animations with full ARIA keyboard accessibility.`,
          },
          {
            key: 'code',
            label: 'TypeScript React Component',
            type: 'code',
            content: `export const ActionCard = ({ title, status }: Props) => (\n  <div className="p-6 bg-[#171719] border border-zinc-800 rounded-2xl">\n    <h3 className="text-base font-bold text-white">{title}</h3>\n  </div>\n);`,
          },
        ];

      default:
        return [
          {
            key: 'overview',
            label: 'Overview Summary',
            type: 'paragraph',
            content: 'This is a high-quality demonstration result generated by the Meridian Nexus fallback engine. It represents the structured strategic output defined for this workflow capability.',
          },
          {
            key: 'findings',
            label: 'Key Observations',
            type: 'list',
            content: [
              'Data points validate the outcome statement and highlight operational optimization potential.',
              'Identified strategic paths prioritize developer efficiency and user security.',
              'Recommended timelines target a phased, low-risk implementation strategy.',
            ],
          },
          {
            key: 'recommendations',
            label: 'Strategic Recommendations',
            type: 'action-items',
            content: [
              { item: 'Review current process metrics to establish baseline performance.', priority: 'High' },
              { item: 'Coordinate next steps with relevant team stakeholders.', priority: 'Medium' },
              { item: 'Deploy pilot test cases to verify integration boundaries.', priority: 'High' },
            ],
          },
        ];
    }
  }
}
