-- ─── Meridian Nexus — Seed Data ──────────────────────────────────────
-- Populates the marketplace with demo users, creators, and 15 workflows.
-- Run after migrations: npx wrangler d1 execute nexus-db --file=seed/seed.sql
-- ─────────────────────────────────────────────────────────────────────

-- ── Demo Users ──

INSERT OR IGNORE INTO users (id, clerk_id, email, display_name, avatar_url, role, created_at) VALUES
  ('usr-demo-1', 'clerk_demo_1', 'demo@nexus.dev', 'Alex Chen', NULL, 'user', '2025-01-15T10:00:00Z'),
  ('usr-creator-1', 'clerk_creator_1', 'creator@nexus.dev', 'Sarah Mitchell', NULL, 'creator', '2024-11-01T10:00:00Z'),
  ('usr-creator-2', 'clerk_creator_2', 'labs@meridian.dev', 'Sarah Mitchell', NULL, 'creator', '2024-10-01T10:00:00Z'),
  ('usr-creator-3', 'clerk_creator_3', 'growth@studio.dev', 'James Park', NULL, 'creator', '2024-12-01T10:00:00Z'),
  ('usr-creator-4', 'clerk_creator_4', 'pipeline@ai.dev', 'Rachel Torres', NULL, 'creator', '2025-01-01T10:00:00Z'),
  ('usr-creator-5', 'clerk_creator_5', 'sourcing@pro.dev', 'Marcus Webb', NULL, 'creator', '2024-11-15T10:00:00Z'),
  ('usr-creator-6', 'clerk_creator_6', 'digital@edge.dev', 'Priya Sharma', NULL, 'creator', '2025-02-01T10:00:00Z'),
  ('usr-creator-7', 'clerk_creator_7', 'support@ai.dev', 'David Kim', NULL, 'creator', '2024-12-15T10:00:00Z'),
  ('usr-creator-8', 'clerk_creator_8', 'content@forge.dev', 'Emma Wilson', NULL, 'creator', '2025-01-10T10:00:00Z'),
  ('usr-admin-1', 'clerk_admin_1', 'admin@nexus.dev', 'Admin User', NULL, 'admin', '2024-09-01T10:00:00Z');

INSERT OR IGNORE INTO user_profiles (id, user_id, bio, company, theme) VALUES
  ('prof-demo-1', 'usr-demo-1', 'Product manager exploring AI workflows', 'Acme Corp', 'dark'),
  ('prof-admin-1', 'usr-admin-1', 'Nexus platform administrator', 'Meridian', 'dark');

-- ── Creator Profiles ──

INSERT OR IGNORE INTO creator_profiles (id, user_id, display_name, bio, verified, verification_label, published_workflow_count, total_runs, average_rating) VALUES
  ('crt-meridian', 'usr-creator-2', 'Meridian Labs', 'Official Meridian research and intelligence workflows. Built by the Meridian team.', 1, 'Verified Meridian Creator', 4, 2847, 4.8),
  ('crt-growth', 'usr-creator-3', 'Growth Studio', 'Marketing and growth automation workflows for modern teams.', 1, 'Verified demonstration creator', 2, 1523, 4.6),
  ('crt-pipeline', 'usr-creator-4', 'Pipeline AI', 'Sales intelligence and outreach automation powered by AI.', 1, 'Verified demonstration creator', 1, 987, 4.7),
  ('crt-sourcing', 'usr-creator-5', 'Sourcing Pro', 'Procurement and vendor management intelligence workflows.', 1, 'Verified demonstration creator', 2, 1245, 4.5),
  ('crt-digital', 'usr-creator-6', 'Digital Edge', 'Digital strategy, website optimization, and conversion intelligence.', 0, 'Creator verification pending', 1, 634, 4.4),
  ('crt-support', 'usr-creator-7', 'Support AI', 'Customer experience and support automation workflows.', 1, 'Verified demonstration creator', 1, 1876, 4.8),
  ('crt-content', 'usr-creator-8', 'Content Forge', 'Content creation and social media workflows for brands.', 1, 'Verified demonstration creator', 2, 2134, 4.6),
  ('crt-sarah', 'usr-creator-1', 'Strategy Works', 'Business strategy, planning, and data analysis workflows.', 1, 'Verified demonstration creator', 3, 1678, 4.7);

-- ── Workflows ──

-- 1. Company Intelligence Brief
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-company-intel', 'crt-meridian', 'Company Intelligence Brief', 'company-intelligence-brief',
 'Generate a concise strategic company research report with market position, risks, and opportunities.',
 'Transform any company name into a comprehensive intelligence brief. This workflow analyzes publicly available information to produce a structured strategic research report covering company overview, market positioning, business model analysis, competitive landscape, key opportunities and risks, and actionable next steps. Ideal for pre-meeting preparation, due diligence, partnership evaluation, and competitive intelligence.',
 'Generate a concise strategic company research report',
 'research', '["research","intelligence","company analysis","due diligence","competitive"]',
 'published', 'public', 0, 4.99, 45,
 1247, 1198, 4.8, 89, 234,
 'Company names and research parameters are processed in memory. No data is stored beyond the execution session. Results are saved to your activity history.',
 1, 'Verified Meridian workflow', 1);

-- 2. Marketing Campaign Builder
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-marketing-campaign', 'crt-growth', 'Marketing Campaign Builder', 'marketing-campaign-builder',
 'Create an integrated marketing campaign with messaging, channel strategy, content ideas, and KPIs.',
 'Build a complete marketing campaign from scratch. Define your product, audience, and objectives, and receive a structured campaign plan including core messaging pillars, channel-specific strategies, content ideas, a deployment timeline, measurable KPIs, and a launch checklist. Works for product launches, brand awareness, lead generation, and seasonal campaigns.',
 'Create an integrated marketing campaign plan',
 'marketing', '["marketing","campaign","content strategy","growth","branding"]',
 'published', 'public', 0, 6.99, 55,
 892, 861, 4.6, 67, 178,
 'Product and audience details are processed in memory only. Campaign outputs are saved to your activity history.',
 1, 'Verified demonstration workflow', 2);

-- 3. Sales Outreach Generator
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-sales-outreach', 'crt-pipeline', 'Sales Outreach Generator', 'sales-outreach-generator',
 'Create personalized multi-channel sales messaging with email sequences, LinkedIn messages, and call scripts.',
 'Generate a complete outreach package tailored to your prospect. Provide the target company, prospect role, your offer, and key pain points to receive a multi-touch email sequence, LinkedIn connection message, cold call opening script, objection handling responses, and a follow-up cadence schedule. Designed for SDRs, AEs, and sales leaders.',
 'Create personalized sales outreach messaging',
 'sales', '["sales","outreach","email","LinkedIn","prospecting","cold calling"]',
 'published', 'public', 0, 3.99, 35,
 987, 954, 4.7, 72, 203,
 'Prospect and company information is processed in memory only. No CRM data is accessed or stored.',
 1, 'Verified demonstration workflow', 3);

-- 4. Vendor Comparison Analyst
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-vendor-comparison', 'crt-sourcing', 'Vendor Comparison Analyst', 'vendor-comparison-analyst',
 'Compare vendors using structured criteria with strengths, weaknesses, risks, and a clear recommendation.',
 'Make better vendor decisions with structured analysis. Input your vendor shortlist, evaluation criteria, requirements, and budget constraints to receive a detailed comparison table, strengths and weaknesses analysis per vendor, risk assessment, a scored recommendation, and follow-up questions for vendor discussions. Ideal for procurement, IT selection, and partnership evaluation.',
 'Compare vendors using structured criteria',
 'procurement', '["procurement","vendor evaluation","comparison","sourcing","decision support"]',
 'published', 'public', 0, 7.99, 50,
 634, 612, 4.5, 45, 156,
 'Vendor names and evaluation criteria are processed in memory. No vendor contracts or pricing data is stored.',
 1, 'Verified demonstration workflow', NULL);

-- 5. Document Insight Extractor
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-document-extractor', 'crt-meridian', 'Document Insight Extractor', 'document-insight-extractor',
 'Turn any document into structured findings with key insights, risks, obligations, and action items.',
 'Extract intelligence from documents without reading them end-to-end. Provide a document or paste its content along with your analysis goal, and receive a structured summary, key findings, important dates and deadlines, risks and concerns, obligations, and prioritized action items. Works with contracts, reports, proposals, policies, and research papers.',
 'Turn a document into structured findings',
 'data-analysis', '["document analysis","extraction","summarization","insights","contracts"]',
 'published', 'public', 1, 0, 40,
 2134, 2089, 4.9, 156, 412,
 'Document text is processed in memory during execution. Content is not stored after the session. Results are saved to your activity history.',
 1, 'Verified Meridian workflow', NULL);

-- 6. Website Opportunity Audit
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-website-audit', 'crt-digital', 'Website Opportunity Audit', 'website-opportunity-audit',
 'Identify website and conversion improvements with UX findings, messaging gaps, and a priority roadmap.',
 'Get actionable website improvement recommendations without hiring a consultant. Provide your website URL, business type, audience, and conversion goals to receive an executive summary, UX audit findings, messaging effectiveness analysis, conversion optimization opportunities, technical recommendations, and a prioritized improvement roadmap.',
 'Identify website and conversion improvements',
 'marketing', '["website audit","UX","conversion","optimization","digital strategy"]',
 'published', 'public', 0, 9.99, 60,
 456, 432, 4.4, 34, 98,
 'Website URLs are noted for analysis context. No crawling or scraping is performed. Analysis is based on the information you provide.',
 0, 'Demonstration verification', NULL);

-- 7. Customer Response Assistant
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-customer-response', 'crt-support', 'Customer Response Assistant', 'customer-response-assistant',
 'Draft a professional customer response with internal notes, risk flags, and a resolution plan.',
 'Handle customer communications with confidence. Paste the customer message, provide context and your desired resolution, and receive a recommended response draft, internal team notes, risk flags for escalation, a resolution plan, and suggested next actions. Maintains professional tone while addressing concerns thoroughly.',
 'Draft a professional customer response',
 'customer-support', '["customer support","response","communication","resolution","service"]',
 'published', 'public', 0, 2.99, 25,
 1876, 1834, 4.8, 134, 367,
 'Customer messages are processed in memory only. No customer PII is stored beyond the execution session.',
 1, 'Verified demonstration workflow', NULL);

-- 8. Social Content Engine
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-social-content', 'crt-content', 'Social Content Engine', 'social-content-engine',
 'Create a cross-platform social content package with posts for LinkedIn, X, Instagram, and more.',
 'Generate a complete social media content package from a single topic. Define your topic, audience, brand voice, and target platforms to receive a core message framework, platform-specific posts (LinkedIn, X, Instagram), content variations, a posting schedule, hashtag strategy, and engagement tips. Perfect for content managers and social media teams.',
 'Create a cross-platform social content package',
 'content', '["social media","content creation","LinkedIn","X","Instagram","copywriting"]',
 'published', 'public', 0, 4.99, 35,
 1567, 1534, 4.6, 98, 289,
 'Topics and brand guidelines are processed in memory only. Generated content is saved to your activity history.',
 1, 'Verified demonstration workflow', NULL);

-- 9. Data Analysis Brief
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-data-analysis', 'crt-sarah', 'Data Analysis Brief', 'data-analysis-brief',
 'Turn a dataset description into an executive analysis with trends, anomalies, and recommendations.',
 'Transform raw data context into executive-ready insights. Describe your dataset, business question, and key metrics to receive an executive summary, trend analysis, anomaly detection, actionable recommendations, suggested visualizations, and data limitation notes. Ideal for analysts preparing board reports, investor updates, or quarterly reviews.',
 'Turn a dataset into an executive analysis',
 'data-analysis', '["data analysis","analytics","trends","insights","reporting","executive"]',
 'published', 'public', 0, 5.99, 45,
 823, 798, 4.7, 56, 167,
 'Data descriptions and metrics are processed in memory. Raw data files are not stored.',
 1, 'Verified demonstration workflow', NULL);

-- 10. Meeting Brief Generator
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-meeting-brief', 'crt-meridian', 'Meeting Brief Generator', 'meeting-brief-generator',
 'Prepare for important meetings with a structured briefing, talking points, questions, and risk areas.',
 'Walk into every meeting prepared. Provide the meeting purpose, attendees, organization context, and desired outcome to receive a comprehensive briefing summary, attendee context and dynamics, suggested talking points, strategic questions to ask, potential risks, and recommended next steps. Works for client meetings, board presentations, partnership discussions, and team reviews.',
 'Prepare someone for an important meeting',
 'productivity', '["meetings","preparation","briefing","talking points","strategy"]',
 'published', 'public', 1, 0, 30,
 1456, 1423, 4.8, 112, 345,
 'Meeting details and attendee information are processed in memory only. No calendar data is accessed.',
 1, 'Verified Meridian workflow', NULL);

-- 11. Business Strategy Planner
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-strategy-planner', 'crt-sarah', 'Business Strategy Planner', 'business-strategy-planner',
 'Create a structured business initiative plan with workstreams, milestones, risks, and a 30/60/90-day plan.',
 'Turn a business initiative into an actionable strategic plan. Define your initiative, current situation, objectives, resources, and constraints to receive a strategic thesis, structured workstreams, milestone definitions, risk analysis, KPI framework, and a phased 30/60/90-day execution plan. Built for executives, operations leaders, and project sponsors.',
 'Create a structured business initiative plan',
 'strategy', '["strategy","planning","business plan","roadmap","execution","OKRs"]',
 'published', 'public', 0, 8.99, 55,
 567, 548, 4.7, 42, 134,
 'Strategic plans and business context are processed in memory. No financial data is stored beyond execution.',
 1, 'Verified demonstration workflow', NULL);

-- 12. Procurement Opportunity Analyzer
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-procurement-analyzer', 'crt-sourcing', 'Procurement Opportunity Analyzer', 'procurement-opportunity-analyzer',
 'Identify sourcing, contract, and vendor optimization opportunities across your spend categories.',
 'Uncover savings and efficiency opportunities in your procurement operations. Provide your spend category, current vendors, business requirements, and pain points to receive an opportunity summary, vendor rationalization ideas, sourcing strategy recommendations, negotiation priorities, risk considerations, and actionable next steps. Designed for procurement teams, CFOs, and operations leaders.',
 'Identify sourcing and vendor optimization opportunities',
 'procurement', '["procurement","sourcing","vendor management","cost optimization","contracts"]',
 'published', 'public', 0, 7.99, 50,
 389, 374, 4.5, 28, 89,
 'Spend categories and vendor information are processed in memory. No contract data is stored.',
 1, 'Verified demonstration workflow', NULL);

-- 13. Competitive Landscape Mapper
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-competitive-landscape', 'crt-meridian', 'Competitive Landscape Mapper', 'competitive-landscape-mapper',
 'Map your competitive landscape with positioning analysis, threat assessment, and strategic recommendations.',
 'Understand your competitive environment with structured analysis. Provide your company, industry, and known competitors to receive a competitive landscape overview, positioning map, threat and opportunity assessment, differentiation analysis, strategic recommendations, and monitoring priorities. Essential for strategy teams, product managers, and investor discussions.',
 'Map your competitive landscape',
 'research', '["competitive analysis","market research","positioning","strategy","intelligence"]',
 'published', 'public', 0, 6.99, 50,
 678, 654, 4.6, 48, 156,
 'Company and competitor names are processed in memory. Analysis is based on publicly available context.',
 1, 'Verified Meridian workflow', NULL);

-- 14. Email Newsletter Creator
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-newsletter-creator', 'crt-content', 'Email Newsletter Creator', 'email-newsletter-creator',
 'Create a professional email newsletter with subject lines, sections, CTAs, and audience-specific content.',
 'Build engaging email newsletters without starting from scratch. Define your topic, audience, key messages, and desired tone to receive multiple subject line options, an opening hook, structured newsletter sections, call-to-action recommendations, audience segmentation tips, and send-time optimization suggestions. Perfect for marketers, founders, and community managers.',
 'Create a professional email newsletter',
 'content', '["email","newsletter","content","marketing","copywriting","formatting"]',
 'published', 'public', 0, 3.99, 30,
 1234, 1209, 4.5, 76, 198,
 'Newsletter topics and audience details are processed in memory only.',
 1, 'Verified demonstration workflow', NULL);

-- 15. Risk Assessment Framework
INSERT OR IGNORE INTO workflows (id, creator_id, name, slug, short_description, full_description, outcome_statement, category, tags, status, visibility, is_free, price_per_run, estimated_duration_seconds, total_runs, completed_runs, average_rating, review_count, saved_count, data_handling_summary, verified, verification_label, featured_order) VALUES
('wf-risk-assessment', 'crt-sarah', 'Risk Assessment Framework', 'risk-assessment-framework',
 'Build a comprehensive risk assessment with probability analysis, mitigation strategies, and monitoring plan.',
 'Systematically assess risks for any initiative or project. Describe your initiative, context, and known concerns to receive a risk register, probability and impact analysis, categorized risk matrix, mitigation strategies per risk, contingency plans, and a monitoring dashboard framework. Essential for project managers, compliance teams, and executive decision-makers.',
 'Build a comprehensive risk assessment',
 'business-operations', '["risk assessment","risk management","compliance","mitigation","governance"]',
 'published', 'public', 0, 5.99, 40,
 445, 428, 4.7, 32, 112,
 'Initiative details and risk factors are processed in memory. No compliance data is stored.',
 1, 'Verified demonstration workflow', NULL);

-- ── Workflow Versions (one per workflow) ──

INSERT OR IGNORE INTO workflow_versions (id, workflow_id, version_number, version_notes, system_instructions, creator_instructions, model_provider, model_id, max_tokens, temperature) VALUES
('wv-company-intel-1', 'wf-company-intel', 1, 'Initial release',
 'You are a senior business intelligence analyst. Generate a comprehensive company research brief based on the provided company name and research parameters. Structure your output with clear sections: Company Overview, Market Position, Business Model Analysis, Key Opportunities, Key Risks, Competitive Observations, and Recommended Next Steps. Be specific, actionable, and professional. Use data-driven language. Each section should have 3-5 substantive points.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.7),

('wv-marketing-campaign-1', 'wf-marketing-campaign', 1, 'Initial release',
 'You are a senior marketing strategist. Create an integrated marketing campaign plan based on the provided product, audience, and objectives. Structure your output with: Campaign Concept, Messaging Pillars (3-4), Channel Strategy, Content Ideas (5-8), Timeline, KPI Framework, and Launch Checklist. Be creative yet actionable. Include specific metrics targets.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.8),

('wv-sales-outreach-1', 'wf-sales-outreach', 1, 'Initial release',
 'You are a senior sales strategist specializing in B2B outreach. Create personalized multi-channel sales messaging. Structure output as: Email Sequence (3 emails), LinkedIn Connection Message, Cold Call Opening Script, Objection Responses (4-5 common objections), Follow-up Cadence. Make each message personalized to the prospect role and company. Be concise, value-focused, and avoid generic sales language.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.7),

('wv-vendor-comparison-1', 'wf-vendor-comparison', 1, 'Initial release',
 'You are a procurement analyst. Create a structured vendor comparison based on the provided vendors and evaluation criteria. Include: Comparison Matrix (table format), Per-Vendor Analysis (strengths, weaknesses, risks), Scored Recommendation with rationale, and Follow-up Questions for vendor discussions. Be objective and data-driven.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.6),

('wv-document-extractor-1', 'wf-document-extractor', 1, 'Initial release',
 'You are a document analysis specialist. Extract structured insights from the provided document content. Include: Executive Summary, Key Findings (5-8 points), Important Dates and Deadlines, Risks and Concerns, Obligations and Requirements, and Prioritized Action Items. Be thorough and precise. Flag any ambiguities.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.5),

('wv-website-audit-1', 'wf-website-audit', 1, 'Initial release',
 'You are a digital strategy consultant specializing in website optimization. Provide a comprehensive website opportunity audit based on the provided URL and business context. Include: Executive Summary, UX Findings (5-7), Messaging Effectiveness Analysis, Conversion Optimization Opportunities, Technical Recommendations, and Prioritized Improvement Roadmap with effort/impact ratings.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.7),

('wv-customer-response-1', 'wf-customer-response', 1, 'Initial release',
 'You are a customer experience specialist. Draft a professional customer response based on the provided message and context. Include: Recommended Response (ready to send), Internal Notes (for the team), Risk Flags (if any), Resolution Plan, and Next Action. Match the specified tone and stay within policy constraints.',
 '', 'gemini', 'gemini-2.5-flash', 2048, 0.6),

('wv-social-content-1', 'wf-social-content', 1, 'Initial release',
 'You are a social media strategist. Create a complete cross-platform content package. Include: Core Message Framework, LinkedIn Post (professional tone, 150-200 words), X/Twitter Post (concise, engaging, under 280 chars), Instagram Caption (visual-first, with emoji), Content Variations (3 alternatives), Posting Schedule, and Hashtag Strategy. Match the brand voice.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.8),

('wv-data-analysis-1', 'wf-data-analysis', 1, 'Initial release',
 'You are a senior data analyst. Create an executive analysis brief based on the described dataset and business question. Include: Executive Summary, Trend Analysis, Anomaly Detection, Actionable Recommendations, Suggested Visualizations (with chart type and data mapping), and Data Limitations. Use precise language and quantitative reasoning.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.6),

('wv-meeting-brief-1', 'wf-meeting-brief', 1, 'Initial release',
 'You are an executive advisor. Prepare a comprehensive meeting brief based on the provided details. Include: Briefing Summary, Attendee Context and Dynamics, Talking Points (5-7), Strategic Questions to Ask (4-5), Potential Risks, and Recommended Next Steps. Be concise, strategic, and action-oriented.',
 '', 'gemini', 'gemini-2.5-flash', 3072, 0.7),

('wv-strategy-planner-1', 'wf-strategy-planner', 1, 'Initial release',
 'You are a management consultant. Create a structured business strategy plan. Include: Strategic Thesis, Workstreams (3-5 with owners and deliverables), Milestones (with dates), Risk Analysis (probability and impact), KPI Framework, and 30/60/90-Day Plan. Be specific about resources, timelines, and success metrics.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.7),

('wv-procurement-analyzer-1', 'wf-procurement-analyzer', 1, 'Initial release',
 'You are a procurement consultant. Analyze sourcing and vendor optimization opportunities. Include: Opportunity Summary, Vendor Rationalization Ideas, Sourcing Strategy Recommendations, Negotiation Priorities, Risk Considerations, and Next Steps. Focus on measurable savings and efficiency gains.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.6),

('wv-competitive-landscape-1', 'wf-competitive-landscape', 1, 'Initial release',
 'You are a competitive intelligence analyst. Map the competitive landscape. Include: Landscape Overview, Competitor Profiles, Positioning Analysis, Threat Assessment, Differentiation Opportunities, Strategic Recommendations, and Monitoring Priorities. Be specific and evidence-based.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.7),

('wv-newsletter-creator-1', 'wf-newsletter-creator', 1, 'Initial release',
 'You are a content strategist specializing in email marketing. Create a complete email newsletter. Include: Subject Line Options (3), Preheader Text, Opening Hook, Newsletter Sections (3-5 with headers and body), Call-to-Action, Audience Notes, and Send-Time Recommendation. Be engaging, scannable, and value-focused.',
 '', 'gemini', 'gemini-2.5-flash', 3072, 0.8),

('wv-risk-assessment-1', 'wf-risk-assessment', 1, 'Initial release',
 'You are a risk management consultant. Build a comprehensive risk assessment framework. Include: Risk Register (table: risk, category, probability, impact, score), Risk Matrix Summary, Mitigation Strategies (per risk), Contingency Plans, Monitoring Indicators, and Review Schedule. Be systematic and actionable.',
 '', 'gemini', 'gemini-2.5-flash', 4096, 0.6);

-- ── Update workflows with current_version_id ──

UPDATE workflows SET current_version_id = 'wv-company-intel-1' WHERE id = 'wf-company-intel';
UPDATE workflows SET current_version_id = 'wv-marketing-campaign-1' WHERE id = 'wf-marketing-campaign';
UPDATE workflows SET current_version_id = 'wv-sales-outreach-1' WHERE id = 'wf-sales-outreach';
UPDATE workflows SET current_version_id = 'wv-vendor-comparison-1' WHERE id = 'wf-vendor-comparison';
UPDATE workflows SET current_version_id = 'wv-document-extractor-1' WHERE id = 'wf-document-extractor';
UPDATE workflows SET current_version_id = 'wv-website-audit-1' WHERE id = 'wf-website-audit';
UPDATE workflows SET current_version_id = 'wv-customer-response-1' WHERE id = 'wf-customer-response';
UPDATE workflows SET current_version_id = 'wv-social-content-1' WHERE id = 'wf-social-content';
UPDATE workflows SET current_version_id = 'wv-data-analysis-1' WHERE id = 'wf-data-analysis';
UPDATE workflows SET current_version_id = 'wv-meeting-brief-1' WHERE id = 'wf-meeting-brief';
UPDATE workflows SET current_version_id = 'wv-strategy-planner-1' WHERE id = 'wf-strategy-planner';
UPDATE workflows SET current_version_id = 'wv-procurement-analyzer-1' WHERE id = 'wf-procurement-analyzer';
UPDATE workflows SET current_version_id = 'wv-competitive-landscape-1' WHERE id = 'wf-competitive-landscape';
UPDATE workflows SET current_version_id = 'wv-newsletter-creator-1' WHERE id = 'wf-newsletter-creator';
UPDATE workflows SET current_version_id = 'wv-risk-assessment-1' WHERE id = 'wf-risk-assessment';

-- ── Input Definitions ──

-- Company Intelligence Brief inputs
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-ci-1', 'wv-company-intel-1', 'companyName', 'Company Name', 'The company you want to research', 'text', 'e.g., Stripe, Shopify, Datadog', 1, NULL, '{"minLength":2,"maxLength":200}', 0),
('inp-ci-2', 'wv-company-intel-1', 'website', 'Website URL', 'Company website for context (optional)', 'url', 'https://example.com', 0, NULL, NULL, 1),
('inp-ci-3', 'wv-company-intel-1', 'researchFocus', 'Research Focus', 'What aspects are most important to your analysis?', 'multi-select', NULL, 1, '[{"label":"Market Position","value":"market-position"},{"label":"Financial Health","value":"financial"},{"label":"Product Strategy","value":"product"},{"label":"Competitive Landscape","value":"competitive"},{"label":"Leadership & Culture","value":"leadership"},{"label":"Technology Stack","value":"technology"}]', NULL, 2),
('inp-ci-4', 'wv-company-intel-1', 'intendedUse', 'Intended Use', 'How will you use this research?', 'select', NULL, 1, '[{"label":"Partnership Evaluation","value":"partnership"},{"label":"Competitive Intelligence","value":"competitive"},{"label":"Investment Due Diligence","value":"investment"},{"label":"Sales Preparation","value":"sales"},{"label":"General Research","value":"general"}]', NULL, 3),
('inp-ci-5', 'wv-company-intel-1', 'reportDepth', 'Report Depth', 'Level of detail for the analysis', 'radio', NULL, 1, '[{"label":"Executive Summary","value":"summary"},{"label":"Standard Brief","value":"standard"},{"label":"Deep Analysis","value":"deep"}]', NULL, 4),
('inp-ci-6', 'wv-company-intel-1', 'geographicFocus', 'Geographic Focus', 'Primary geographic market of interest', 'select', NULL, 0, '[{"label":"Global","value":"global"},{"label":"North America","value":"north-america"},{"label":"Europe","value":"europe"},{"label":"Asia Pacific","value":"asia-pacific"},{"label":"Latin America","value":"latam"}]', NULL, 5);

-- Marketing Campaign Builder inputs
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-mc-1', 'wv-marketing-campaign-1', 'productService', 'Product or Service', 'What are you marketing?', 'textarea', 'Describe your product or service in 2-3 sentences...', 1, NULL, '{"minLength":10,"maxLength":1000}', 0),
('inp-mc-2', 'wv-marketing-campaign-1', 'audience', 'Target Audience', 'Who are you trying to reach?', 'textarea', 'e.g., SaaS founders, 25-45, US-based, $1M-$10M ARR...', 1, NULL, '{"minLength":10,"maxLength":500}', 1),
('inp-mc-3', 'wv-marketing-campaign-1', 'objective', 'Campaign Objective', 'Primary goal of this campaign', 'select', NULL, 1, '[{"label":"Brand Awareness","value":"awareness"},{"label":"Lead Generation","value":"leads"},{"label":"Product Launch","value":"launch"},{"label":"Customer Retention","value":"retention"},{"label":"Event Promotion","value":"event"}]', NULL, 2),
('inp-mc-4', 'wv-marketing-campaign-1', 'channels', 'Marketing Channels', 'Which channels should the campaign use?', 'multi-select', NULL, 1, '[{"label":"Email","value":"email"},{"label":"LinkedIn","value":"linkedin"},{"label":"X / Twitter","value":"twitter"},{"label":"Instagram","value":"instagram"},{"label":"Google Ads","value":"google-ads"},{"label":"Content Marketing","value":"content"},{"label":"Webinars","value":"webinars"},{"label":"PR","value":"pr"}]', NULL, 3),
('inp-mc-5', 'wv-marketing-campaign-1', 'budgetRange', 'Budget Range', 'Approximate campaign budget', 'select', NULL, 1, '[{"label":"Under $5,000","value":"under-5k"},{"label":"$5,000 - $25,000","value":"5k-25k"},{"label":"$25,000 - $100,000","value":"25k-100k"},{"label":"$100,000+","value":"100k-plus"}]', NULL, 4),
('inp-mc-6', 'wv-marketing-campaign-1', 'tone', 'Campaign Tone', 'Voice and style for messaging', 'tone', NULL, 1, NULL, NULL, 5),
('inp-mc-7', 'wv-marketing-campaign-1', 'duration', 'Campaign Duration', 'How long should this campaign run?', 'select', NULL, 1, '[{"label":"1 Week Sprint","value":"1-week"},{"label":"2 Weeks","value":"2-weeks"},{"label":"1 Month","value":"1-month"},{"label":"1 Quarter","value":"1-quarter"}]', NULL, 6);

-- Sales Outreach Generator inputs
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-so-1', 'wv-sales-outreach-1', 'company', 'Target Company', 'Company you are reaching out to', 'text', 'e.g., Acme Corp', 1, NULL, '{"minLength":2,"maxLength":200}', 0),
('inp-so-2', 'wv-sales-outreach-1', 'prospectRole', 'Prospect Role', 'Role or title of your target contact', 'text', 'e.g., VP of Engineering, Head of Procurement', 1, NULL, '{"minLength":2,"maxLength":200}', 1),
('inp-so-3', 'wv-sales-outreach-1', 'offer', 'Your Offer', 'What product or service are you selling?', 'textarea', 'Describe what you offer and its key value proposition...', 1, NULL, '{"minLength":10,"maxLength":1000}', 2),
('inp-so-4', 'wv-sales-outreach-1', 'painPoints', 'Pain Points', 'Key problems your prospect likely faces', 'tags', 'Add pain points...', 1, NULL, '{"maxItems":8}', 3),
('inp-so-5', 'wv-sales-outreach-1', 'desiredCta', 'Desired Call to Action', 'What do you want the prospect to do?', 'select', NULL, 1, '[{"label":"Book a Demo","value":"demo"},{"label":"Start Free Trial","value":"trial"},{"label":"Schedule a Call","value":"call"},{"label":"Visit Landing Page","value":"landing"},{"label":"Reply to Email","value":"reply"}]', NULL, 4),
('inp-so-6', 'wv-sales-outreach-1', 'tone', 'Outreach Tone', 'Communication style', 'tone', NULL, 1, NULL, NULL, 5),
('inp-so-7', 'wv-sales-outreach-1', 'channel', 'Primary Channel', 'Main outreach channel', 'radio', NULL, 1, '[{"label":"Email","value":"email"},{"label":"LinkedIn","value":"linkedin"},{"label":"Phone","value":"phone"},{"label":"Multi-channel","value":"multi"}]', NULL, 6);

-- Meeting Brief Generator inputs
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-mb-1', 'wv-meeting-brief-1', 'meetingPurpose', 'Meeting Purpose', 'What is this meeting about?', 'textarea', 'e.g., Q3 partnership review with Acme Corp...', 1, NULL, '{"minLength":10,"maxLength":500}', 0),
('inp-mb-2', 'wv-meeting-brief-1', 'attendees', 'Key Attendees', 'Who will be in the meeting?', 'textarea', 'List attendees with titles and organizations...', 1, NULL, '{"minLength":5,"maxLength":1000}', 1),
('inp-mb-3', 'wv-meeting-brief-1', 'organization', 'Organization', 'Which organization or company is this with?', 'text', 'e.g., Acme Corp', 1, NULL, NULL, 2),
('inp-mb-4', 'wv-meeting-brief-1', 'background', 'Background Context', 'Relevant history or context for this meeting', 'textarea', 'Any previous interactions, ongoing projects, or important context...', 0, NULL, '{"maxLength":2000}', 3),
('inp-mb-5', 'wv-meeting-brief-1', 'desiredOutcome', 'Desired Outcome', 'What do you want to achieve?', 'textarea', 'e.g., Secure commitment for Phase 2 partnership expansion...', 1, NULL, '{"minLength":10,"maxLength":500}', 4),
('inp-mb-6', 'wv-meeting-brief-1', 'concerns', 'Key Concerns', 'Any risks or sensitive topics?', 'tags', 'Add concerns...', 0, NULL, '{"maxItems":6}', 5);

-- Document Insight Extractor inputs
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-de-1', 'wv-document-extractor-1', 'documentContent', 'Document Content', 'Paste the document text or key excerpts', 'textarea', 'Paste the full document text or relevant sections here...', 1, NULL, '{"minLength":50,"maxLength":10000}', 0),
('inp-de-2', 'wv-document-extractor-1', 'documentType', 'Document Type', 'What kind of document is this?', 'select', NULL, 1, '[{"label":"Contract","value":"contract"},{"label":"Report","value":"report"},{"label":"Proposal","value":"proposal"},{"label":"Policy","value":"policy"},{"label":"Research Paper","value":"research"},{"label":"Meeting Notes","value":"meeting-notes"},{"label":"Other","value":"other"}]', NULL, 1),
('inp-de-3', 'wv-document-extractor-1', 'analysisGoal', 'Analysis Goal', 'What are you looking for in this document?', 'textarea', 'e.g., Identify key obligations, extract deadlines, find risk factors...', 1, NULL, '{"minLength":10,"maxLength":500}', 2),
('inp-de-4', 'wv-document-extractor-1', 'detailLevel', 'Detail Level', 'How thorough should the extraction be?', 'radio', NULL, 1, '[{"label":"Quick Scan","value":"quick"},{"label":"Standard Review","value":"standard"},{"label":"Deep Analysis","value":"deep"}]', NULL, 3),
('inp-de-5', 'wv-document-extractor-1', 'audience', 'Intended Audience', 'Who will read this analysis?', 'select', NULL, 0, '[{"label":"Executive Team","value":"executive"},{"label":"Legal Team","value":"legal"},{"label":"Operations","value":"operations"},{"label":"General","value":"general"}]', NULL, 4);

-- Remaining inputs seed definitions
INSERT OR IGNORE INTO workflow_input_definitions (id, version_id, field_key, label, description, type, placeholder, required, options, validation, display_order) VALUES
('inp-vc-1', 'wv-vendor-comparison-1', 'vendorNames', 'Vendor Names', 'List the vendors to compare', 'tags', 'Add vendor names...', 1, NULL, '{"maxItems":6}', 0),
('inp-vc-2', 'wv-vendor-comparison-1', 'criteria', 'Evaluation Criteria', 'What criteria matter most?', 'structured-criteria', NULL, 1, NULL, '{"maxItems":10}', 1),
('inp-vc-3', 'wv-vendor-comparison-1', 'requirements', 'Key Requirements', 'Must-have requirements for the selected vendor', 'textarea', 'List your non-negotiable requirements...', 1, NULL, '{"minLength":10,"maxLength":2000}', 2),
('inp-vc-4', 'wv-vendor-comparison-1', 'budget', 'Budget Range', 'Annual budget for this vendor category', 'select', NULL, 1, '[{"label":"Under $10,000","value":"under-10k"},{"label":"$10,000 - $50,000","value":"10k-50k"},{"label":"$50,000 - $200,000","value":"50k-200k"},{"label":"$200,000+","value":"200k-plus"}]', NULL, 3),
('inp-vc-5', 'wv-vendor-comparison-1', 'riskTolerance', 'Risk Tolerance', 'How risk-averse is your organization?', 'radio', NULL, 1, '[{"label":"Conservative","value":"conservative"},{"label":"Moderate","value":"moderate"},{"label":"Aggressive","value":"aggressive"}]', NULL, 4),

('inp-wa-1', 'wv-website-audit-1', 'websiteUrl', 'Website URL', 'The website to audit', 'url', 'https://example.com', 1, NULL, NULL, 0),
('inp-wa-2', 'wv-website-audit-1', 'businessType', 'Business Type', 'Type of business', 'text', 'e.g., B2B SaaS, E-commerce, Agency', 1, NULL, NULL, 1),
('inp-wa-3', 'wv-website-audit-1', 'audience', 'Target Audience', 'Who visits your website?', 'textarea', 'Describe your ideal website visitor...', 1, NULL, '{"minLength":10,"maxLength":500}', 2),
('inp-wa-4', 'wv-website-audit-1', 'conversionGoal', 'Conversion Goal', 'What should visitors do?', 'select', NULL, 1, '[{"label":"Sign Up","value":"signup"},{"label":"Purchase","value":"purchase"},{"label":"Book Demo","value":"demo"},{"label":"Contact Sales","value":"contact"},{"label":"Download Resource","value":"download"}]', NULL, 3),
('inp-wa-5', 'wv-website-audit-1', 'auditDepth', 'Audit Depth', NULL, 'radio', NULL, 1, '[{"label":"Quick Scan","value":"quick"},{"label":"Standard Audit","value":"standard"},{"label":"Deep Analysis","value":"deep"}]', NULL, 4),

('inp-cr-1', 'wv-customer-response-1', 'customerMessage', 'Customer Message', 'Paste the customer message or inquiry', 'textarea', 'Paste the customer''s message here...', 1, NULL, '{"minLength":10,"maxLength":5000}', 0),
('inp-cr-2', 'wv-customer-response-1', 'context', 'Context', 'Background context for this interaction', 'textarea', 'Any relevant history, account status, or previous interactions...', 0, NULL, '{"maxLength":2000}', 1),
('inp-cr-3', 'wv-customer-response-1', 'desiredResolution', 'Desired Resolution', 'What outcome are you aiming for?', 'textarea', 'e.g., Full refund, partial credit, product exchange...', 1, NULL, '{"minLength":5,"maxLength":500}', 2),
('inp-cr-4', 'wv-customer-response-1', 'tone', 'Response Tone', NULL, 'tone', NULL, 1, NULL, NULL, 3),
('inp-cr-5', 'wv-customer-response-1', 'escalationLevel', 'Escalation Level', NULL, 'select', NULL, 1, '[{"label":"Standard","value":"standard"},{"label":"Sensitive","value":"sensitive"},{"label":"Urgent","value":"urgent"},{"label":"Executive Escalation","value":"executive"}]', NULL, 4),

('inp-sc-1', 'wv-social-content-1', 'topic', 'Content Topic', 'What is this content about?', 'textarea', 'e.g., Launch of our new AI-powered analytics dashboard...', 1, NULL, '{"minLength":10,"maxLength":1000}', 0),
('inp-sc-2', 'wv-social-content-1', 'audience', 'Target Audience', 'Who should this content reach?', 'text', 'e.g., B2B tech leaders, startup founders', 1, NULL, NULL, 1),
('inp-sc-3', 'wv-social-content-1', 'brandVoice', 'Brand Voice', 'How should the content sound?', 'tone', NULL, 1, NULL, NULL, 2),
('inp-sc-4', 'wv-social-content-1', 'platforms', 'Target Platforms', 'Which platforms to create content for?', 'multi-select', NULL, 1, '[{"label":"LinkedIn","value":"linkedin"},{"label":"X / Twitter","value":"twitter"},{"label":"Instagram","value":"instagram"},{"label":"Facebook","value":"facebook"},{"label":"TikTok","value":"tiktok"}]', NULL, 3),
('inp-sc-5', 'wv-social-content-1', 'objective', 'Content Objective', NULL, 'select', NULL, 1, '[{"label":"Engagement","value":"engagement"},{"label":"Traffic","value":"traffic"},{"label":"Brand Awareness","value":"awareness"},{"label":"Lead Generation","value":"leads"},{"label":"Thought Leadership","value":"thought-leadership"}]', NULL, 4),
('inp-sc-6', 'wv-social-content-1', 'cta', 'Call to Action', 'What should people do after reading?', 'text', 'e.g., Visit our website, Sign up for early access', 0, NULL, NULL, 5),

('inp-da-1', 'wv-data-analysis-1', 'dataDescription', 'Dataset Description', 'Describe the dataset you want analyzed', 'textarea', 'e.g., 12 months of e-commerce sales data with 50,000 transactions...', 1, NULL, '{"minLength":20,"maxLength":5000}', 0),
('inp-da-2', 'wv-data-analysis-1', 'businessQuestion', 'Business Question', 'What question should this analysis answer?', 'textarea', 'e.g., Why did Q3 revenue decline 15% despite higher traffic?', 1, NULL, '{"minLength":10,"maxLength":500}', 1),
('inp-da-3', 'wv-data-analysis-1', 'keyMetrics', 'Key Metrics', 'Important metrics to focus on', 'tags', 'Add metrics...', 1, NULL, '{"maxItems":10}', 2),
('inp-da-4', 'wv-data-analysis-1', 'audience', 'Report Audience', NULL, 'select', NULL, 1, '[{"label":"Board / Investors","value":"board"},{"label":"Executive Team","value":"executive"},{"label":"Department Leads","value":"department"},{"label":"General Team","value":"team"}]', NULL, 3),
('inp-da-5', 'wv-data-analysis-1', 'depth', 'Analysis Depth', NULL, 'radio', NULL, 1, '[{"label":"Executive Overview","value":"overview"},{"label":"Standard Analysis","value":"standard"},{"label":"Deep Dive","value":"deep"}]', NULL, 4),

('inp-sp-1', 'wv-strategy-planner-1', 'initiative', 'Initiative Name', 'What initiative are you planning?', 'text', 'e.g., International market expansion into APAC', 1, NULL, '{"minLength":5,"maxLength":200}', 0),
('inp-sp-2', 'wv-strategy-planner-1', 'currentSituation', 'Current Situation', 'Where do things stand today?', 'textarea', 'Describe the current state, recent changes, and context...', 1, NULL, '{"minLength":20,"maxLength":2000}', 1),
('inp-sp-3', 'wv-strategy-planner-1', 'objective', 'Strategic Objective', 'What does success look like?', 'textarea', 'Define clear success criteria...', 1, NULL, '{"minLength":10,"maxLength":500}', 2),
('inp-sp-4', 'wv-strategy-planner-1', 'resources', 'Available Resources', 'Team size, budget, existing capabilities', 'textarea', 'e.g., Team of 8, $500K budget, existing APAC partnerships...', 1, NULL, '{"minLength":10,"maxLength":1000}', 3),
('inp-sp-5', 'wv-strategy-planner-1', 'constraints', 'Key Constraints', 'Limitations or blockers', 'tags', 'Add constraints...', 0, NULL, '{"maxItems":8}', 4),
('inp-sp-6', 'wv-strategy-planner-1', 'timeline', 'Target Timeline', NULL, 'select', NULL, 1, '[{"label":"30 Days","value":"30-days"},{"label":"60 Days","value":"60-days"},{"label":"90 Days","value":"90-days"},{"label":"6 Months","value":"6-months"},{"label":"1 Year","value":"1-year"}]', NULL, 5),

('inp-pa-1', 'wv-procurement-analyzer-1', 'spendCategory', 'Spend Category', 'Which category are you analyzing?', 'text', 'e.g., Cloud Infrastructure, Office Supplies, Professional Services', 1, NULL, NULL, 0),
('inp-pa-2', 'wv-procurement-analyzer-1', 'currentVendors', 'Current Vendors', 'List your current vendors in this category', 'tags', 'Add vendors...', 1, NULL, '{"maxItems":10}', 1),
('inp-pa-3', 'wv-procurement-analyzer-1', 'requirements', 'Business Requirements', 'What does your organization need?', 'textarea', 'Key requirements, SLAs, compliance needs...', 1, NULL, '{"minLength":10,"maxLength":2000}', 2),
('inp-pa-4', 'wv-procurement-analyzer-1', 'annualSpend', 'Annual Spend', 'Approximate annual spend in this category', 'currency', 'e.g., 250000', 1, NULL, '{"min":0,"max":100000000}', 3),
('inp-pa-5', 'wv-procurement-analyzer-1', 'painPoints', 'Current Pain Points', 'Issues with current vendor relationships', 'tags', 'Add pain points...', 1, NULL, '{"maxItems":8}', 4),
('inp-pa-6', 'wv-procurement-analyzer-1', 'contractStatus', 'Contract Status', NULL, 'select', NULL, 1, '[{"label":"Active - Renewing Soon","value":"renewing"},{"label":"Active - Mid-Term","value":"mid-term"},{"label":"Expired / Month-to-Month","value":"expired"},{"label":"New Procurement","value":"new"}]', NULL, 5),

('inp-cl-1', 'wv-competitive-landscape-1', 'companyName', 'Your Company', 'Your company name', 'text', 'e.g., Meridian', 1, NULL, NULL, 0),
('inp-cl-2', 'wv-competitive-landscape-1', 'industry', 'Industry', 'Your industry or market', 'text', 'e.g., AI-powered fintech infrastructure', 1, NULL, NULL, 1),
('inp-cl-3', 'wv-competitive-landscape-1', 'competitors', 'Known Competitors', 'List your known competitors', 'tags', 'Add competitors...', 1, NULL, '{"maxItems":10}', 2),
('inp-cl-4', 'wv-competitive-landscape-1', 'focusAreas', 'Analysis Focus', 'What aspects of competition matter most?', 'multi-select', NULL, 1, '[{"label":"Pricing","value":"pricing"},{"label":"Product Features","value":"features"},{"label":"Market Share","value":"market-share"},{"label":"Technology","value":"technology"},{"label":"Customer Base","value":"customers"},{"label":"Funding / Growth","value":"funding"}]', NULL, 3),

('inp-nc-1', 'wv-newsletter-creator-1', 'topic', 'Newsletter Topic', 'Main topic or theme', 'textarea', 'e.g., Monthly product updates and industry insights...', 1, NULL, '{"minLength":10,"maxLength":1000}', 0),
('inp-nc-2', 'wv-newsletter-creator-1', 'audience', 'Subscriber Audience', 'Who reads your newsletter?', 'text', 'e.g., SaaS founders, product managers', 1, NULL, NULL, 1),
('inp-nc-3', 'wv-newsletter-creator-1', 'keyMessages', 'Key Messages', 'What should readers take away?', 'tags', 'Add key messages...', 1, NULL, '{"maxItems":5}', 2),
('inp-nc-4', 'wv-newsletter-creator-1', 'tone', 'Newsletter Tone', NULL, 'tone', NULL, 1, NULL, NULL, 3),

('inp-ra-1', 'wv-risk-assessment-1', 'initiative', 'Initiative or Project', 'What are you assessing risks for?', 'textarea', 'e.g., Migration to new cloud provider across 50+ services...', 1, NULL, '{"minLength":10,"maxLength":1000}', 0),
('inp-ra-2', 'wv-risk-assessment-1', 'context', 'Context & Background', 'Relevant organizational context', 'textarea', 'Team size, timeline, dependencies, stakeholders...', 1, NULL, '{"minLength":10,"maxLength":2000}', 1),
('inp-ra-3', 'wv-risk-assessment-1', 'knownRisks', 'Known Concerns', 'Risks you are already aware of', 'tags', 'Add concerns...', 0, NULL, '{"maxItems":10}', 2),
('inp-ra-4', 'wv-risk-assessment-1', 'riskCategories', 'Risk Categories to Cover', NULL, 'multi-select', NULL, 1, '[{"label":"Technical","value":"technical"},{"label":"Financial","value":"financial"},{"label":"Operational","value":"operational"},{"label":"Regulatory","value":"regulatory"},{"label":"Reputational","value":"reputational"},{"label":"Strategic","value":"strategic"}]', NULL, 3);

-- ── Output Definitions ──

INSERT OR IGNORE INTO workflow_output_definitions (id, version_id, section_key, label, type, display_order) VALUES
('out-ci-1', 'wv-company-intel-1', 'overview', 'Company Overview', 'paragraph', 0),
('out-ci-2', 'wv-company-intel-1', 'marketPosition', 'Market Position', 'paragraph', 1),
('out-ci-3', 'wv-company-intel-1', 'businessModel', 'Business Model Analysis', 'paragraph', 2),
('out-ci-4', 'wv-company-intel-1', 'opportunities', 'Key Opportunities', 'list', 3),
('out-ci-5', 'wv-company-intel-1', 'risks', 'Key Risks', 'risks', 4),
('out-ci-6', 'wv-company-intel-1', 'competitive', 'Competitive Observations', 'list', 5),
('out-ci-7', 'wv-company-intel-1', 'nextSteps', 'Recommended Next Steps', 'action-items', 6),

('out-mc-1', 'wv-marketing-campaign-1', 'concept', 'Campaign Concept', 'paragraph', 0),
('out-mc-2', 'wv-marketing-campaign-1', 'messaging', 'Messaging Pillars', 'list', 1),
('out-mc-3', 'wv-marketing-campaign-1', 'channels', 'Channel Strategy', 'table', 2),
('out-mc-4', 'wv-marketing-campaign-1', 'content', 'Content Ideas', 'list', 3),
('out-mc-5', 'wv-marketing-campaign-1', 'timeline', 'Timeline', 'timeline', 4),
('out-mc-6', 'wv-marketing-campaign-1', 'kpis', 'KPI Framework', 'metrics', 5),
('out-mc-7', 'wv-marketing-campaign-1', 'checklist', 'Launch Checklist', 'action-items', 6),

('out-so-1', 'wv-sales-outreach-1', 'emailSequence', 'Email Sequence', 'content-draft', 0),
('out-so-2', 'wv-sales-outreach-1', 'linkedin', 'LinkedIn Message', 'content-draft', 1),
('out-so-3', 'wv-sales-outreach-1', 'callScript', 'Call Opening Script', 'content-draft', 2),
('out-so-4', 'wv-sales-outreach-1', 'objections', 'Objection Responses', 'table', 3),
('out-so-5', 'wv-sales-outreach-1', 'cadence', 'Follow-up Cadence', 'timeline', 4),

('out-mb-1', 'wv-meeting-brief-1', 'summary', 'Briefing Summary', 'paragraph', 0),
('out-mb-2', 'wv-meeting-brief-1', 'attendees', 'Attendee Context', 'table', 1),
('out-mb-3', 'wv-meeting-brief-1', 'talkingPoints', 'Talking Points', 'list', 2),
('out-mb-4', 'wv-meeting-brief-1', 'questions', 'Questions to Ask', 'list', 3),
('out-mb-5', 'wv-meeting-brief-1', 'risks', 'Potential Risks', 'risks', 4),
('out-mb-6', 'wv-meeting-brief-1', 'nextSteps', 'Desired Next Steps', 'action-items', 5),

('out-de-1', 'wv-document-extractor-1', 'summary', 'Executive Summary', 'paragraph', 0),
('out-de-2', 'wv-document-extractor-1', 'findings', 'Key Findings', 'list', 1),
('out-de-3', 'wv-document-extractor-1', 'dates', 'Important Dates', 'table', 2),
('out-de-4', 'wv-document-extractor-1', 'risks', 'Risks & Concerns', 'risks', 3),
('out-de-5', 'wv-document-extractor-1', 'obligations', 'Obligations', 'list', 4),
('out-de-6', 'wv-document-extractor-1', 'actionItems', 'Action Items', 'action-items', 5);

-- ── Workflow Capabilities ──

INSERT OR IGNORE INTO workflow_capabilities (workflow_id, capability_id) VALUES
('wf-company-intel', 'cap-research'),
('wf-company-intel', 'cap-strategy'),
('wf-marketing-campaign', 'cap-writing'),
('wf-marketing-campaign', 'cap-creative'),
('wf-marketing-campaign', 'cap-strategy'),
('wf-sales-outreach', 'cap-writing'),
('wf-sales-outreach', 'cap-communication'),
('wf-vendor-comparison', 'cap-evaluation'),
('wf-vendor-comparison', 'cap-research'),
('wf-document-extractor', 'cap-extraction'),
('wf-document-extractor', 'cap-data'),
('wf-website-audit', 'cap-evaluation'),
('wf-website-audit', 'cap-research'),
('wf-customer-response', 'cap-communication'),
('wf-customer-response', 'cap-writing'),
('wf-social-content', 'cap-writing'),
('wf-social-content', 'cap-creative'),
('wf-data-analysis', 'cap-data'),
('wf-data-analysis', 'cap-research'),
('wf-meeting-brief', 'cap-research'),
('wf-meeting-brief', 'cap-strategy'),
('wf-strategy-planner', 'cap-strategy'),
('wf-strategy-planner', 'cap-research'),
('wf-procurement-analyzer', 'cap-evaluation'),
('wf-procurement-analyzer', 'cap-strategy'),
('wf-competitive-landscape', 'cap-research'),
('wf-competitive-landscape', 'cap-strategy'),
('wf-newsletter-creator', 'cap-writing'),
('wf-newsletter-creator', 'cap-creative'),
('wf-risk-assessment', 'cap-evaluation'),
('wf-risk-assessment', 'cap-strategy');

-- ── Pre-insert Runs to fulfill reviews foreign keys constraints ──

INSERT OR IGNORE INTO workflow_runs (id, workflow_id, workflow_version_id, user_id, status, inputs, started_at, completed_at, duration_ms, model_provider, model_id, is_fallback, estimated_price, actual_price, created_at) VALUES
('run-demo-1', 'wf-company-intel', 'wv-company-intel-1', 'usr-demo-1', 'completed', '{"companyName":"Stripe"}', '2025-06-01T13:55:00Z', '2025-06-01T13:56:00Z', 45000, 'demo', 'demo-v1', 1, 4.99, 4.99, '2025-06-01T13:55:00Z'),
('run-demo-2', 'wf-document-extractor', 'wv-document-extractor-1', 'usr-demo-1', 'completed', '{"documentType":"contract"}', '2025-06-15T09:55:00Z', '2025-06-15T09:56:00Z', 40000, 'demo', 'demo-v1', 1, 0, 0, '2025-06-15T09:55:00Z'),
('run-demo-3', 'wf-meeting-brief', 'wv-meeting-brief-1', 'usr-demo-1', 'completed', '{"meetingPurpose":"Q3 Review"}', '2025-07-01T08:55:00Z', '2025-07-01T08:56:00Z', 30000, 'demo', 'demo-v1', 1, 0, 0, '2025-07-01T08:55:00Z');

-- ── Sample Reviews ──

INSERT OR IGNORE INTO reviews (id, workflow_id, user_id, run_id, rating, comment, helpful_count, created_at) VALUES
('rev-1', 'wf-company-intel', 'usr-demo-1', 'run-demo-1', 5, 'Incredibly thorough research brief. Saved me hours of manual research before a partnership meeting.', 12, '2025-06-01T14:00:00Z'),
('rev-2', 'wf-document-extractor', 'usr-demo-1', 'run-demo-2', 5, 'Extracted all the key obligations from a 40-page contract in seconds. The action items were spot on.', 8, '2025-06-15T10:00:00Z'),
('rev-3', 'wf-meeting-brief', 'usr-demo-1', 'run-demo-3', 4, 'Great talking points and attendee context. Would love more industry-specific insights in future versions.', 5, '2025-07-01T09:00:00Z');
