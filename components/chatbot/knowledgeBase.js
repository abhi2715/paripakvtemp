/**
 * knowledgeBase.js — Paripakv Foundation Knowledge Base
 * 
 * Pre-extracted website content organized into searchable chunks.
 * Each chunk has a category, title, content, and keywords for TF-IDF matching.
 * This serves as the RAG knowledge source for the AI chatbot.
 */

// ─── Knowledge Chunks ───────────────────────────────────────────────────────────
// Each chunk represents a piece of website content the chatbot can reference.
import { testimonialsData } from '../../lib/testimonialsData';
import { blogsData } from '../../lib/blogsData';

const dynamicTestimonials = testimonialsData.map((t, idx) => ({
  id: `testimonial-${idx}`,
  category: 'Success Stories',
  title: `${t.role.includes('Parent') ? 'Parent' : 'Scholar'} Story: ${t.name}`,
  content: `${t.name}, a ${t.role}, shares their experience: "${t.quote}"`,
  keywords: [t.name.toLowerCase(), 'testimonial', 'story', 'scholar', 'success', 'impact', 'support', 'motivation', ...t.role.toLowerCase().split(' ')]
}));

const dynamicBlogs = blogsData.map((b) => ({
  id: `blog-${b.slug}`,
  category: 'Blogs',
  title: b.title,
  content: `Blog post titled "${b.title}": ${b.excerpt}`,
  keywords: ['blog', 'insight', 'article', 'news', 'update', 'latest', 'story', ...b.title.toLowerCase().split(' ').filter(w => w.length > 3)]
}));

const STATIC_KNOWLEDGE_BASE = [
  // ── About ──
  {
    id: 'about-mission',
    category: 'About',
    title: 'Paripakv Foundation Mission',
    content: `Paripakv Foundation is a Section 8 company set up with the exclusive objective of providing quality education to underprivileged students via various targeted intervention programs. Using its own custom-built programs, it partners with other agencies in the field of education to transform the quality of education being provided to students, empowering them to realise their true potential in life.`,
    keywords: ['paripakv', 'foundation', 'mission', 'about', 'section 8', 'education', 'underprivileged', 'students', 'quality', 'who', 'what', 'organization', 'ngo']
  },
  {
    id: 'about-founders-background',
    category: 'About',
    title: 'Founder Background & Transparency',
    content: `Paripakv has been founded and is run by professionals from top-notch institutions like IIM, IIT and BIT, on the fundamentals of ensuring the highest levels of transparency. Its founding principle is 100% use of donor funds towards the specific program, ensuring maximum benefit for every rupee funded. All people associated with Paripakv share a common passion towards empowerment via education.`,
    keywords: ['founders', 'transparency', 'iim', 'iit', 'bit', 'donor', 'funds', '100%', 'professionals', 'trust', 'money', 'rupee']
  },

  // ── Founders ──
  {
    id: 'founder-pooja',
    category: 'Founders',
    title: 'Co-Founder: Pooja Sharma',
    content: `Pooja Sharma is a Co-Founder of Paripakv Foundation. She is a seasoned technology leader with over 25 years of experience in the banking industry. She holds an MBA from the Indian Institute of Management Bangalore, specializing in Finance and International Business. She is deeply committed to paying it forward and actively champions initiatives in education and women’s empowerment.`,
    keywords: ['pooja', 'sharma', 'founder', 'co-founder', 'iim', 'bangalore', 'banking', 'technology', 'women', 'empowerment', 'gurgaon', 'who founded']
  },
  {
    id: 'founder-harmendra',
    category: 'Founders',
    title: 'Co-Founder: Harmendra Gandhi',
    content: `Harmendra Gandhi is a Co-Founder of Paripakv Foundation. He is an IIT Kanpur and IIM Bangalore graduate who has worked in areas of finance and portfolio management for the past 25 years. He has also been deeply involved in NGOs in the education sector, specially in fund raising and governance.`,
    keywords: ['harmendra', 'gandhi', 'founder', 'co-founder', 'iit', 'kanpur', 'iim', 'bangalore', 'finance', 'portfolio', 'fundraising', 'governance', 'who founded']
  },

  // ── Programmes Overview ──
  {
    id: 'programmes-overview',
    category: 'Programmes',
    title: 'Our Programmes Overview',
    content: `Paripakv Foundation runs two main programmes: 1) SAMAJH — Training and mentoring middle school teachers in core subjects to build a strong conceptual foundation for students. 2) NIRMALA BRIGHT SCHOLAR — Mentorship and financial support for exceptionally bright underprivileged youth pursuing higher education. Both programmes are designed to create lasting impact through education.`,
    keywords: ['programmes', 'programs', 'samajh', 'nirmala', 'bright', 'scholar', 'what do you do', 'initiatives', 'projects', 'work']
  },

  // ── Samajh Programme ──
  {
    id: 'samajh-about',
    category: 'Samajh',
    title: 'Samajh Programme Details',
    content: `Samajh is an endeavour to augment the quality and capacity of local educational initiatives by providing dedicated teachers with quality training and mentoring in core subjects. Operating in a partnership model with schools at the middle school level, Samajh bridges the gap between traditional rote learning and conceptual understanding. The name "Samajh" itself means understanding — focusing on deep comprehension as against rote exam-focused learning.`,
    keywords: ['samajh', 'teacher', 'training', 'mentoring', 'middle school', 'conceptual', 'understanding', 'rote', 'learning', 'education', 'programme']
  },
  {
    id: 'samajh-teachers',
    category: 'Samajh',
    title: 'Samajh Teachers & Methodology',
    content: `Samajh teachers are young adults who are passionate and willing to be molded into exceptional educators. They demonstrate social commitment besides being experts in their subject areas. The combination brings together the technology competence of the youth with the traditional education experience of the mentors. Key features include: Quality Teachers mentored by expert advisors, Partnership Model working with local initiatives, Deep Understanding focus as against rote learning, and an Expert Panel of experienced educators who continuously mentor teachers.`,
    keywords: ['samajh', 'teachers', 'young', 'passionate', 'mentor', 'expert', 'panel', 'methodology', 'partnership', 'quality']
  },

  // ── Nirmala Bright Scholar ──
  {
    id: 'nirmala-about',
    category: 'Nirmala Bright Scholar',
    title: 'Nirmala Bright Scholar Programme',
    content: `The Nirmala Bright Scholar program is a holistic initiative that combines financial assistance with dedicated mentorship from industry professionals to empower bright, deserving students to reach their full potential. Each scholar is carefully matched with a mentor based on their career aspirations, creating a personalised roadmap for success in their chosen field.`,
    keywords: ['nirmala', 'bright', 'scholar', 'scholarship', 'financial', 'assistance', 'mentorship', 'students', 'career', 'higher education']
  },
  {
    id: 'nirmala-benefits',
    category: 'Nirmala Bright Scholar',
    title: 'Nirmala Bright Scholar Benefits',
    content: `The Nirmala Bright Scholar programme provides: 1) Financial scholarship covering academic expenses including internet, books, stationery, and coaching fees. 2) One-on-one mentorship from professionals from IIM, IIT and top industry leaders. 3) Career counselling and life skills sessions every month with assigned mentor. 4) Aptitude-based selection ensuring maximum impact for every rupee donated.`,
    keywords: ['nirmala', 'benefits', 'scholarship', 'financial', 'mentorship', 'career', 'counselling', 'coaching', 'books', 'internet', 'fees', 'aptitude', 'selection', 'how does it work']
  },

  // ── Get Involved ──
  {
    id: 'volunteer',
    category: 'Get Involved',
    title: 'Volunteering with Paripakv',
    content: `Paripakv Foundation invites you to make a difference in the lives of children in need of care and protection by contributing your time and talent to volunteering. Individuals from different backgrounds, skills and experiences can volunteer for various programmes, projects and campaigns. To volunteer, email paripakvfoundation@gmail.com with the subject "Volunteering Enquiry".`,
    keywords: ['volunteer', 'volunteering', 'help', 'contribute', 'time', 'talent', 'join', 'how can i help', 'get involved', 'participate']
  },
  {
    id: 'donate',
    category: 'Get Involved',
    title: 'Donating to Paripakv',
    content: `Your donation, no matter how small, will make a big difference. All donations to Paripakv Foundation are 50% Tax Exempt under section 80G of IT Act, 1961. Paripakv follows a 100% pass-through model — every rupee of your donation goes directly toward the program. No amount is used for overheads. To donate, email paripakvfoundation@gmail.com with the subject "Donation Enquiry".`,
    keywords: ['donate', 'donation', 'money', 'contribute', 'funds', 'tax', '80g', 'exempt', 'rupee', 'financial', 'support', 'give', 'help financially', 'how to donate']
  },
  {
    id: 'mentor',
    category: 'Get Involved',
    title: 'Becoming a Mentor',
    content: `Become a mentor under the Nirmala Bright Scholar program. Share your professional expertise with a bright, deserving student. A few hours per month can transform a young life and build a future leader. Paripakv matches mentors based on career streams and student aspirations. To become a mentor, email paripakvfoundation@gmail.com with the subject "Mentorship Enquiry".`,
    keywords: ['mentor', 'mentorship', 'teach', 'guide', 'professional', 'expertise', 'career', 'how to mentor', 'become mentor']
  },

  // ── Contact ──
  {
    id: 'contact-info',
    category: 'Contact',
    title: 'Contact Information',
    content: `You can reach Paripakv Foundation by email at paripakvfoundation@gmail.com. Their headquarters is in India with Pan-India Programs across multiple states. They respond within 24 hours. Whether you want to donate, volunteer, apply for a scholarship, or simply learn more about their work — they are here for you. You can also find them on LinkedIn at linkedin.com/in/paripakv-foundation-753653410.`,
    keywords: ['contact', 'email', 'reach', 'phone', 'address', 'location', 'headquarters', 'india', 'how to contact', 'get in touch', 'talk to', 'call']
  },

  // ── FAQs (auto-generated from content) ──
  {
    id: 'faq-what-is-paripakv',
    category: 'FAQ',
    title: 'What is Paripakv Foundation?',
    content: `Paripakv Foundation is a Section 8 (non-profit) company focused exclusively on providing quality education to underprivileged students. Founded by IIM and IIT alumni, it runs two major programmes — Samajh (teacher training) and Nirmala Bright Scholar (scholarships and mentorship). The foundation operates on a 100% pass-through model, meaning every rupee donated goes directly to the programme.`,
    keywords: ['what is', 'paripakv', 'about', 'explain', 'tell me', 'who are you', 'introduction']
  },
  {
    id: 'faq-how-to-donate',
    category: 'FAQ',
    title: 'How can I donate?',
    content: `To donate to Paripakv Foundation, you can email them at paripakvfoundation@gmail.com with the subject "Donation Enquiry". All donations are 50% tax exempt under Section 80G of the Income Tax Act, 1961. Every rupee goes directly to the programme — Paripakv follows a 100% pass-through model with zero overheads from donations.`,
    keywords: ['how', 'donate', 'donation', 'give', 'money', 'contribute', 'tax benefit', '80g']
  },
  {
    id: 'faq-how-to-volunteer',
    category: 'FAQ',
    title: 'How can I volunteer?',
    content: `You can volunteer with Paripakv Foundation regardless of your background, skills, or experience. They have openings across various programmes, projects, and campaigns. Simply email paripakvfoundation@gmail.com with the subject "Volunteering Enquiry" and the team will get back to you within 24 hours.`,
    keywords: ['how', 'volunteer', 'join', 'help', 'participate', 'contribute time']
  },
  {
    id: 'faq-tax-benefit',
    category: 'FAQ',
    title: 'Are donations tax exempt?',
    content: `Yes! All donations to Paripakv Foundation are 50% Tax Exempt under Section 80G of the Income Tax Act, 1961. This means you can claim a tax deduction for 50% of the donated amount when filing your income tax return.`,
    keywords: ['tax', 'exempt', '80g', 'deduction', 'benefit', 'income tax', 'claim']
  },
  {
    id: 'faq-apply-scholarship',
    category: 'FAQ',
    title: 'How to apply for a scholarship?',
    content: `To apply for the Nirmala Bright Scholar scholarship, you can email paripakvfoundation@gmail.com with the subject "Nirmala Bright Scholar Enquiry". The selection is aptitude-based, ensuring that the most bright and deserving students receive support. The scholarship covers academic expenses including internet, books, stationery, and coaching fees, along with one-on-one mentorship.`,
    keywords: ['apply', 'scholarship', 'nirmala', 'student', 'application', 'how to apply', 'eligible', 'eligibility']
  },
  {
    id: 'faq-impact',
    category: 'FAQ',
    title: 'What impact has Paripakv made?',
    content: `Paripakv Foundation has transformed the lives of multiple students through its programmes. Scholars like Yashashwini (Commerce), Shakthi (BBA), Megha (Engineering), and parents like Umapathy have shared how the Nirmala Bright Scholar programme provided them with financial assistance, mentorship, and confidence to pursue their dreams. Through Samajh, multiple middle school teachers have been trained to deliver conceptual education rather than rote learning.`,
    keywords: ['impact', 'results', 'success', 'stories', 'achievements', 'difference', 'how many', 'students helped']
  },

  // ── Gallery ──
  {
    id: 'gallery-overview',
    category: 'Gallery',
    title: 'Impact Gallery',
    content: `Paripakv Foundation's "Impact in Action" gallery showcases their work across categories: Street Education, Health & Safety, Community Building, Quality Learning, Skill Development, and Empowering Youth. The gallery provides visual evidence of the foundation's on-ground work and its impact on communities across India.`,
    keywords: ['gallery', 'photos', 'images', 'pictures', 'impact', 'action', 'visual', 'see', 'show']
  }
];

const KNOWLEDGE_BASE = [...STATIC_KNOWLEDGE_BASE, ...dynamicTestimonials, ...dynamicBlogs];


// ─── TF-IDF Search Engine ────────────────────────────────────────────────────────
// Lightweight client-side text search to find the most relevant knowledge chunks
// for a given user query. No external dependencies needed.

/**
 * Tokenizes text into lowercase words, removing common stop words.
 */
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and',
  'or', 'if', 'while', 'about', 'up', 'it', 'its', 'i', 'me', 'my',
  'we', 'our', 'you', 'your', 'he', 'she', 'they', 'them', 'this', 'that',
  'these', 'those', 'am', 'which', 'what', 'whom', 'also'
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * Computes a relevance score between a query and a knowledge chunk.
 * Uses a combination of keyword matching, content TF-IDF, and title boosting.
 * 
 * @param {string} query - The user's question
 * @param {object} chunk - A knowledge base chunk
 * @returns {number} - Relevance score (higher = more relevant)
 */
function computeRelevance(query, chunk) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  let score = 0;

  // 1. Keyword matching (highest weight — curated keywords are precise)
  const keywordSet = new Set(chunk.keywords);
  for (const token of queryTokens) {
    if (keywordSet.has(token)) {
      score += 3.0;
    }
    // Partial match for longer keywords
    for (const keyword of chunk.keywords) {
      if (keyword.length > 3 && keyword.includes(token)) {
        score += 1.5;
      }
      if (token.length > 3 && token.includes(keyword)) {
        score += 1.0;
      }
    }
  }

  // 2. Title matching (medium weight — indicates topic relevance)
  const titleTokens = tokenize(chunk.title);
  for (const token of queryTokens) {
    if (titleTokens.includes(token)) {
      score += 2.0;
    }
  }

  // 3. Content matching (lower weight — broader context)
  const contentTokens = tokenize(chunk.content);
  const contentSet = new Set(contentTokens);
  for (const token of queryTokens) {
    if (contentSet.has(token)) {
      score += 1.0;
    }
  }

  // 4. Category matching (bonus for category-level match)
  const categoryTokens = tokenize(chunk.category);
  for (const token of queryTokens) {
    if (categoryTokens.includes(token)) {
      score += 1.5;
    }
  }

  // Normalize by query length to avoid bias toward longer queries
  return score / queryTokens.length;
}

/**
 * Searches the knowledge base for the most relevant chunks.
 * Returns the top N chunks sorted by relevance score.
 * 
 * @param {string} query - The user's question
 * @param {number} topN - Number of chunks to return (default: 3)
 * @returns {Array<{chunk: object, score: number}>} - Ranked results
 */
export function searchKnowledgeBase(query, topN = 3) {
  if (!query || query.trim().length === 0) return [];

  const results = KNOWLEDGE_BASE.map(chunk => ({
    chunk,
    score: computeRelevance(query, chunk)
  }))
    .filter(r => r.score > 0.5) // Minimum relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return results;
}

/**
 * Gets a formatted context string from knowledge base results.
 * This is injected into the AI prompt as reference material.
 * 
 * @param {string} query - The user's question
 * @returns {string} - Formatted context for the AI prompt
 */
export function getContextForQuery(query) {
  const results = searchKnowledgeBase(query, 3);
  
  if (results.length === 0) {
    return 'No specific information found in the knowledge base for this query. Use your general knowledge about the NGO based on the system prompt.';
  }

  return results
    .map((r, i) => `[Source ${i + 1}: ${r.chunk.category} — ${r.chunk.title}]\n${r.chunk.content}`)
    .join('\n\n');
}

/**
 * Returns all knowledge base entries for a specific category.
 * Useful for category-based browsing in the chatbot.
 */
export function getByCategory(category) {
  return KNOWLEDGE_BASE.filter(chunk => 
    chunk.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Returns the full knowledge base summary for the system prompt.
 * This gives the AI a high-level overview of available information.
 */
export function getKnowledgeSummary() {
  const categories = [...new Set(KNOWLEDGE_BASE.map(c => c.category))];
  return categories.map(cat => {
    const chunks = KNOWLEDGE_BASE.filter(c => c.category === cat);
    return `- ${cat}: ${chunks.map(c => c.title).join(', ')}`;
  }).join('\n');
}

export default KNOWLEDGE_BASE;
