import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: number;
  isTyping?: boolean;
}

// ── Google Apps Script URL (your deployed web app) ───────────────────────────
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzyVtvCcAfkOj2I8vZTxsZKrSib_Wxnzzv0ZXvLhh0iC2SSqsNMb5-mMgKg-0CP9sdUXg/exec";

const WHATSAPP_NUMBER = "2348158484621";

// ── Knowledge Base ───────────────────────────────────────────────────────────
const knowledge: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response:
      "Hello! Welcome to DChoice Tutoring. 👋 I'm your AI assistant. I can help you with information about our courses, pricing, enrollment, and more. What would you like to know?",
  },
  {
    keywords: ["enroll", "register", "sign up", "join", "start", "how to join"],
    response:
      "Great that you're interested! 🎓 To enroll:\n\n1. Choose your plan on our website (scroll to the pricing section)\n2. Click 'Get Started' or 'Enroll Now'\n3. Fill in your details and complete payment via Flutterwave\n4. You'll get instant access to your dashboard!\n\nYou can also book a free consultation to discuss the best plan for you.",
  },
  {
    keywords: ["price", "pricing", "cost", "fee", "plan", "plans", "how much", "payment", "pay"],
    response:
      "We have three flexible plans:\n\n📘 **Starter Plan** — ₦50,000/month\n• 2 group sessions/week\n• Perfect for secondary school subjects\n\n📗 **JAMB Intensive** — ₦75,000/month 🔥 *Most Popular*\n• 5 sessions/week + full JAMB CBT simulator\n• 10,000+ practice questions\n\n📕 **Private 1-on-1** — ₦120,000/month\n• 3 private sessions/week with a dedicated tutor\n• Customized lesson plans\n\nWe accept cards, bank transfers, USSD, and installment payments (pay 50% now, 50% later)!",
  },
  {
    keywords: ["refund", "money back", "cancel", "cancellation", "guarantee"],
    response:
      "We offer a **full refund within 14 days** if you've attended fewer than 3 classes. We're confident in our service quality, but we want you to feel completely secure in your investment. 💯",
  },
  {
    keywords: ["tutor", "teacher", "qualified", "qualification", "experience"],
    response:
      "All our tutors are highly qualified:\n✅ Minimum B.Ed. or B.Sc. in their subject\n✅ At least 5 years of teaching experience\n✅ Many are former examiners and certified trainers\n✅ Verified academic credentials\n\nOur team includes specialists in JAMB, WAEC, NECO, IELTS, and SAT preparation.",
  },
  {
    keywords: ["jamb", "utme", "cbt", "past question", "practice"],
    response:
      "Our JAMB preparation includes:\n\n🎯 **JAMB Intensive Plan** — Our most popular option\n💻 **CBT Simulator** — Replicates the exact JAMB exam interface\n📝 **10,000+ practice questions** across all subjects\n⏱️ **Timed mock exams** under real exam conditions\n📊 **Instant scoring** with detailed explanations\n\nWe also sell UTME past question eBooks for 23 major Nigerian universities!",
  },
  {
    keywords: ["waec", "neco", "ssce", "secondary", "school certificate"],
    response:
      "We cover WAEC and NECO preparation with:\n📚 Live group classes for all subjects\n📖 Past question practice with solutions\n🎥 Recorded lessons you can replay anytime\n📄 Study materials and PDFs included\n\nWe also sell WAEC and NECO complete past question eBooks on our eBook store!",
  },
  {
    keywords: ["ielts", "sat", "international", "abroad", "overseas"],
    response:
      "We offer preparation for international exams:\n🌍 **IELTS** — Complete bundle with reading, writing, speaking & listening modules\n🇺🇸 **SAT** — Math & Verbal complete guide with practice tests\n\nBoth are available as premium eBooks on our store, and we also offer tutoring for these exams.",
  },
  {
    keywords: ["ebook", "ebooks", "past question", "study material", "download", "digital"],
    response:
      "📚 Visit our **eBook Store** to browse and purchase:\n\n• UTME past questions for 23 universities (₦1,500 each)\n• WAEC Complete Pack (₦3,000)\n• NECO Complete Pack (₦2,500)\n• JAMB Math & English guides\n• IELTS Bundle (₦5,000)\n• SAT Guide (₦4,500)\n• Master Bundle — All 23 schools (₦15,000)\n• Mega Bundle — Everything! (₦25,000)\n\nInstant download after payment verification!",
  },
  {
    keywords: ["bundle", "master bundle", "mega bundle", "discount", "save"],
    response:
      "🔥 **Bundle deals for maximum savings!**\n\n**Master Bundle** — ₦15,000 (save ₦19,500)\nAll 23 university UTME packs in one\n\n**Mega Bundle** — ₦25,000 (save ₦27,000)\nEverything: UTME + WAEC + NECO + JAMB + IELTS + SAT\n\nVisit our eBook Store to grab these deals!",
  },
  {
    keywords: ["class", "live", "online", "virtual", "session", "schedule", "when", "time"],
    response:
      "Our classes are **live and interactive** — no Zoom needed! Just log into your dashboard from any device.\n\n✅ Live classes with real-time interaction\n✅ Recorded lessons available 24/7\n✅ Works on smartphone, tablet, or computer\n✅ Group and private options available\n\nSessions are scheduled based on your chosen plan. You'll get a personalized timetable after enrollment.",
  },
  {
    keywords: ["parent", "track", "progress", "report", "dashboard", "monitor"],
    response:
      "Parents get full visibility! 👨‍👩‍👧‍👦\n\n📊 **Parent Dashboard** — View attendance, scores, assignments in real time\n📧 **Weekly Reports** — Sent every Sunday via email\n💬 **Direct Tutor Access** — Communicate with your child's tutor\n📈 **Progress Tracking** — See improvement over time\n\nYou'll get access as soon as your child is enrolled.",
  },
  {
    keywords: ["device", "phone", "computer", "laptop", "tablet", "android", "iphone", "require"],
    response:
      "You only need a **smartphone, tablet, or computer** with internet access. Our platform works on all devices and browsers. For the best experience, we recommend a laptop or tablet for live classes.",
  },
  {
    keywords: ["whatsapp", "contact", "support", "help", "human", "agent"],
    response:
      "Need to talk to a human? 👋\n\nYou can reach our support team directly on WhatsApp:\n📱 wa.me/2348158484621\n\nWe typically respond within minutes during business hours. You can also call us!",
  },
  {
    keywords: ["flutterwave", "paystack", "card", "bank transfer", "ussd", "qr", "payment method"],
    response:
      "We accept multiple payment methods through Flutterwave:\n💳 Debit/Credit Cards\n🏦 Bank Transfers\n📱 USSD Payments\n🔳 QR Code Payments\n\n**Installment plan available:** Pay 50% now and 50% after 15 days.\n\nAll payments are secured and encrypted.",
  },
  {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    response:
      "You're welcome! 😊 Is there anything else I can help you with? If not, feel free to start learning with us today. Visit our website to enroll or explore our eBook store!",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    response:
      "Thanks for chatting with DChoice Tutoring! 🎓 If you need anything else, I'm always here. Have a great day! 🌟",
  },
  {
    keywords: ["location", "address", "office", "where", "lagos"],
    response:
      "DChoice Tutoring operates primarily online, serving students across Nigeria and beyond! 🌍\n\nYou can reach us via:\n📱 WhatsApp: wa.me/2348158484621\n📧 Email: info@dchoice.com\n\nAll classes and consultations are conducted online for your convenience.",
  },
];

// ── Helper Functions ─────────────────────────────────────────────────────────
function findResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const item of knowledge) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return item.response;
      }
    }
  }
  // Default fallback
  return (
    "I'm not sure I understand that yet. 🤔 Could you rephrase your question? I can help with:\n\n" +
    "• Course plans & pricing\n• Enrolling & payment\n• JAMB / WAEC / NECO prep\n• eBook store questions\n• Tutor qualifications\n• Refund policy\n\nOr you can chat with a human on WhatsApp:\nwa.me/" +
    WHATSAPP_NUMBER
  );
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isUnresolved(conversation: Message[]): boolean {
  if (conversation.length < 2) return false;
  const lastBotMsg = [...conversation].reverse().find((m) => m.role === "bot");
  return lastBotMsg?.text.includes("I'm not sure I understand") ?? false;
}

// ── Log to Google Sheets ─────────────────────────────────────────────────────
async function logToSheets(data: Record<string, unknown>) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: "ai-chatbot",
        ...data,
      }),
    });
  } catch {
    // silent fail
  }
}

// ── ChatBot Component ────────────────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "welcome",
      role: "bot",
      text: "👋 Hi! Welcome to DChoice Tutoring. I'm your AI assistant. Ask me anything about our courses, pricing, eBooks, enrollment, or anything else!",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => generateId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatLoaded = useRef(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !chatLoaded.current) {
      chatLoaded.current = true;
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Log session start once
  useEffect(() => {
    if (isOpen) {
      logToSheets({
        event: "session_start",
        sessionId,
      });
    }
  }, [isOpen, sessionId]);

  function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Log user message
    logToSheets({
      event: "user_message",
      sessionId,
      message: text,
    });

    // Simulate AI typing delay (300-800ms based on response length)
    const response = findResponse(text);
    const delay = Math.min(300 + response.length * 2, 2000);

    setTimeout(() => {
      const botMsg: Message = {
        id: generateId(),
        role: "bot",
        text: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // If unresolved, log for human follow-up
      if (response.includes("I'm not sure I understand")) {
        logToSheets({
          event: "unresolved",
          sessionId,
          userMessage: text,
          conversation: messages
            .concat([userMsg, botMsg])
            .map((m) => `[${m.role}] ${m.text}`)
            .join("\n"),
        });
      }
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleEscalate() {
    const conversationText = messages
      .map((m) => `[${m.role === "bot" ? "AI" : "User"}] ${m.text}`)
      .join("%0A%0A");

    logToSheets({
      event: "escalated_to_human",
      sessionId,
      conversation: messages
        .map((m) => `[${m.role}] ${m.text}`)
        .join("\n"),
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20DChoice%20Tutoring!%20I%20need%20help%20with%20a%20question%20the%20AI%20couldn't%20answer.%0A%0A${conversationText}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open chat"
        >
          <div className="absolute inset-0 rounded-full bg-[#2E7D32] pulse-animation" />
          <div className="relative w-14 h-14 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg hover:bg-[#256E29] transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-[10px] font-bold">AI</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-50 sm:hidden"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[380px] h-[560px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1A3C6E] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C9921A] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#1A3C6E]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm">DChoice AI</h3>
                    <p className="text-[10px] text-white/60">Online • Instant replies</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-1 ${
                          msg.role === "bot"
                            ? "bg-[#C9921A]/20"
                            : "bg-[#1A3C6E]/20"
                        }`}
                      >
                        {msg.role === "bot" ? (
                          <Bot className="w-4 h-4 text-[#C9921A]" />
                        ) : (
                          <User className="w-4 h-4 text-[#1A3C6E]" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-[#1A3C6E] text-white rounded-tr-sm"
                            : "bg-white border border-gray-200 text-[#1A1A2E] rounded-tl-sm shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-1 bg-[#C9921A]/20">
                        <Bot className="w-4 h-4 text-[#C9921A]" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Escalate to human */}
                {isUnresolved(messages) && !isTyping && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleEscalate}
                      className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366] text-[#1A1A2E] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#25D366]/20 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      Chat with a human on WhatsApp
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick reply suggestions (only show on first message) */}
              {messages.length === 1 && !isTyping && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {["Pricing & Plans", "How to Enroll", "JAMB Prep", "eBooks"].map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setInput(suggestion);
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="flex-shrink-0 text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-[#C9921A]/10 hover:border-[#C9921A]/30 text-[#1A1A2E] transition-all"
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    disabled={isTyping}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#1A1A2E] placeholder-gray-400 outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-xl bg-[#C9921A] flex items-center justify-center hover:bg-[#b07d16] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-1.5">
                  Powered by DChoice AI • <button onClick={handleEscalate} className="underline hover:text-[#25D366]">Chat with human</button>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
