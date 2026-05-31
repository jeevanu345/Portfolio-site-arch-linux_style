import React, { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import Markdown from 'markdown-to-jsx';
import { RefreshCw, Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const LOCAL_HISTORY_KEY = 'sequoia-history';
export const LOCAL_SESSION_KEY = 'session-id-sequoia';

// Provide styled inline components since shadcn/ui is not available
function Button({ onClick, disabled, variant, size, title, className, children }) {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
    const variantStyle = variant === 'ghost' ? "hover:bg-gray-700/50 hover:text-white text-gray-300" : "bg-ub-orange text-white hover:bg-ub-orange/90";
    const sizeStyle = size === 'sm' ? "h-6 px-2" : size === 'icon' ? "h-9 w-9" : "h-9 px-4 py-2";
    
    return (
        <button onClick={onClick} disabled={disabled} title={title} className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className || ''}`}>
            {children}
        </button>
    );
}

function Input({ value, onChange, onKeyDown, placeholder, disabled, className }) {
    return (
        <input 
            type="text" 
            value={value} 
            onChange={onChange} 
            onKeyDown={onKeyDown} 
            placeholder={placeholder} 
            disabled={disabled}
            className={`flex h-9 w-full rounded-md border border-gray-600 bg-[#2d2d30] px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ub-orange disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder-gray-400 ${className || ''}`}
        />
    );
}

function Badge({ variant, className, onClick, children }) {
    return (
        <span onClick={onClick} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className || ''}`}>
            {children}
        </span>
    );
}

function Avatar({ title, url, width, height }) {
    return (
        <div className={`relative flex shrink-0 overflow-hidden rounded-full ${width} ${height} bg-gray-800 border border-gray-600`}>
            {url ? <img src={url} alt={title} className="aspect-square h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center font-bold text-white uppercase">{title?.[0]}</span>}
        </div>
    );
}

const SAMPLE_QUESTIONS = [
  'Can you share a recommendation from someone who has worked with Jeevan?',
  "What is Jeevan's education background?",
  'What are some examples of problems Jeevan has solved in past roles?',
  'Can you list some projects and frameworks Jeevan has worked on?',
  "What's Jeevan's biggest professional achievement?",
  'How does Jeevan approach problem-solving in his projects?',
  'What programming languages and technologies is Jeevan most passionate about?',
  "Can you tell me about Jeevan's leadership style and team collaboration?",
  'What unique skills or expertise does Jeevan bring to a team?',
  'How does Jeevan stay updated with the latest technology trends?',
  "What's the most challenging project Jeevan has worked on?",
  "Can you describe Jeevan's work philosophy and values?",
  'What industries or domains has Jeevan gained experience in?',
  'How does Jeevan balance technical excellence with business requirements?',
];

export function SequoiaAI() {
  const [isServerUp, setIsServerUp] = useState(false);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const historyRef = useRef(null);

  const RATE_LIMIT_MS = 3000;

  const getRandomQuestions = () => {
    const shuffled = [...SAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const clearChatHistory = () => {
    setHistory([]);
    setSelectedQuestions(getRandomQuestions());
  };

  const canMakeRequest = () => {
    const now = Date.now();
    return (now - lastRequestTime) >= RATE_LIMIT_MS;
  };

  useEffect(() => {
    if (lastRequestTime === 0) return;
    const updateCooldown = () => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      const remaining = Math.max(0, RATE_LIMIT_MS - timeSinceLastRequest);
      setCooldownRemaining(remaining);
      if (remaining > 0) setTimeout(updateCooldown, 100);
    };
    updateCooldown();
  }, [lastRequestTime]);

  useEffect(() => {
    const handleClearHistory = () => clearChatHistory();
    window.addEventListener('clearSequoiaHistory', handleClearHistory);
    return () => window.removeEventListener('clearSequoiaHistory', handleClearHistory);
  }, []);

  useEffect(() => {
    setIsServerUp(true);
    const oldHistory = JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || '[]');
    setHistory(oldHistory);

    let oldSessionId = localStorage.getItem(LOCAL_SESSION_KEY) || uuidv4();
    localStorage.setItem(LOCAL_SESSION_KEY, oldSessionId);
    setSessionId(oldSessionId);

    setSelectedQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    if (history.length > 0) {
      localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
    }
  }, [history]);

  const systemPrompt = `You are SEQUOIA AI, a personal assistant integrated into Jeevan U Gowda's portfolio website. You are highly knowledgeable about Jeevan's background, skills, and projects. 
Answer questions in a friendly, helpful, and concise manner.

Information about Jeevan:
- Name: Jeevan U Gowda
- Current Role: Software Development Engineer Intern at Brillio, Bengaluru (Mar 2026 - Present)
- Education: B.M.S College of Engineering, VTU – Bengaluru (B.E in Information Science & Engineering, Aug 2022 - Jun 2026, GPA: 8.4/10.0). Coursework: DSA, OOPs, DBMS, OS, Networks, SE, ML.
- Technical Skills:
  - Languages: C++, Python, C, Java, JavaScript, Rust, HTML/CSS
  - Frameworks & Tools: React.js, Node.js, Express.js, LangChain, Tailwind CSS, MySQL, MongoDB, Jupyter Notebook, Framer Motion
  - AI/ML: RAG Pipelines, Knowledge Graphs, Vector Databases (Chroma, FAISS), LLM Integration, GRPO/RL, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn
  - Cloud/DevOps: AWS (EC2, S3, IAM), Docker, Kubernetes, Terraform, Linux, Networking basics (DNS, HTTP, TCP/IP)
- Projects: 
  1. RaftKV: Raft-Replicated Key-Value Store (Rust, gRPC, RESP2/3, sled, Docker, Kubernetes)
  2. Code-Repair Agent with Execution-Grounded RL on SWE-Bench (Python, TRL, vLLM, Docker, Ray, PostgreSQL, Redis)
  3. NCERT RAG Bot: AI-Powered NCERT Tutor (Python, Streamlit, Ollama, Chroma, LangChain, FAISS)
  4. Instant Canteen: Smart Campus Food Ordering & Payment System (React, TypeScript, Tailwind, Vite, Supabase)
  5. TapCart: NFC-Based Smart Retail System (React Native, Node.js, IoT)
  6. COVID-19 Genome Mutation Visualization Tool (Python, Biopython, ChimeraX, Matplotlib)
- Research Papers: TapCart: NFC-Based Payment Interface (Apr 2025)
- Soft Skills: Communication, Critical Thinking, Analytical Problem Solving. Fluent in English, Hindi, and Native in Kannada.
- Extracurriculars: Vocalist, Guitarist, Football
- Contact: Email jeevanu345@gmail.com, Phone +91 6362724307, GitHub/LinkedIn: jeevanu345.

Act as Jeevan's representative. Use this info to answer queries accurately. If asked a generic question, just answer it normally.`;

  const fetchResponse = async (newQuery) => {
    const formattedMessages = history.map(h => ({
      role: h.from === 'user' ? 'user' : 'assistant',
      content: h.message,
    }));
    formattedMessages.push({ role: 'user', content: newQuery });
    const apiMessages = [{ role: 'system', content: systemPrompt }, ...formattedMessages];

    try {
      const response = await fetch('/api/nvidia/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-70b-instruct',
          messages: apiMessages,
          max_tokens: 500
        })
      });

      if (!response.ok) return '';
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const pushQueryToHistory = (from, newQuery) => {
    setHistory(old => [...old, { from, message: newQuery, timestamp: Date.now() }]);
  };

  const submitQuery = async (newQuery) => {
    if (queryProcessing || !isServerUp) return;

    if (!canMakeRequest()) {
      const remainingSeconds = Math.ceil(cooldownRemaining / 1000);
      toast.warning(`Please wait ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} before sending another message`);
      return;
    }

    setLastRequestTime(Date.now());
    pushQueryToHistory('user', newQuery);
    setQueryProcessing(true);
    
    // ReactGA.event({ category: 'Button.Click', action: 'Sequoia Query submit', label: newQuery });

    const response = await fetchResponse(newQuery);
    setQueryProcessing(false);
    pushQueryToHistory('sequoia', !response ? 'Sorry, I am not feeling well today, please come back later.' : response);
    setSelectedQuestions(getRandomQuestions());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query !== '') {
      submitQuery(query);
      setQuery('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-sans relative">
      <Toaster position="bottom-right" theme="dark" />
      <div className="border-b border-gray-700 p-2 py-3 flex items-center justify-between flex-shrink-0 bg-ub-gedit-dark">
        <div className="flex items-center gap-3 ml-2">
          <Avatar title="sequoia" url="/themes/Yaru/apps/sequoia.svg" width="w-8" height="h-8" />
          <div>
            <h1 className="font-semibold text-white tracking-wide">SEQUOIA</h1>
            <p className={`text-xs font-medium ${isServerUp ? 'text-green-400' : 'text-red-400'}`}>
              {isServerUp ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-ub-cool-grey">
        <div ref={historyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((message, index) =>
                message.from === 'user' ? (
                  <UserMessage key={index} message={message.message} />
                ) : (
                  <SequoiaMessage key={index} message={message.message} />
                )
              )}
              {queryProcessing && <SequoiaMessage message="Thinking..." isTyping={true} />}
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md px-4">
                {isServerUp ? (
                  <>
                    <div className="text-3xl text-white font-bold mb-4">Hey I'm SEQUOIA!</div>
                    <p className="text-gray-300">I'm here to help you get to know Jeevan better. Ask me anything about his work, projects, or experience!</p>
                  </>
                ) : (
                  <div className="text-gray-400">Sorry, server is down. Please come back later 😔</div>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedQuestions.length > 0 && (
          <div className="flex justify-between gap-2 mb-2 mt-2 px-4">
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {selectedQuestions.map((question, index) => (
                <SampleQuery key={index} question={question} callBackFun={submitQuery} disabled={queryProcessing || !isServerUp || cooldownRemaining > 0} />
              ))}
            </div>
            <Button onClick={() => setSelectedQuestions(getRandomQuestions())} variant="ghost" size="sm" title="Refresh questions">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="py-3 px-4 flex-shrink-0 bg-ub-gedit-dark border-t border-gray-700">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Jeevan..."
              disabled={queryProcessing || !isServerUp || cooldownRemaining > 0}
            />
            <Button onClick={() => { submitQuery(query); setQuery(''); }} disabled={query === '' || queryProcessing || !isServerUp || cooldownRemaining > 0} size="icon" title="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3 max-w-[85%]">
        <div className="bg-ub-orange text-white rounded-2xl rounded-br-sm px-4 py-2 shadow-sm">
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </div>
        <Avatar title="user" url="/themes/Yaru/system/user-home.png" width="w-8" height="h-8" />
      </div>
    </div>
  );
}

function SequoiaMessage({ message, isTyping = false }) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[85%]">
        <Avatar title="sequoia" url="/themes/Yaru/apps/sequoia.svg" width="w-8" height="h-8" />
        <div className="bg-[#2d2d30] text-gray-200 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
          {isTyping ? (
            <div className="flex items-center gap-1 py-1 h-5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <div className="text-sm prose prose-invert max-w-none">
              <Markdown options={{ overrides: { a: { props: { target: '_blank', rel: 'noopener noreferrer' } } } }}>
                {message}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SampleQuery({ question, callBackFun, disabled = false }) {
  return (
    <Badge
      className={`bg-ub-gedit-dark hover:bg-ub-orange hover:text-white hover:border-ub-orange text-gray-300 border-gray-600 duration-300 transition-colors py-1.5 px-3 whitespace-nowrap ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => { if (!disabled) callBackFun(question); }}
    >
      {question}
    </Badge>
  );
}

export const displaySequoia = () => {
    return <SequoiaAI />;
}
