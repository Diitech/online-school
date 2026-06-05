import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348158484621"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full bg-[#2E7D32] pulse-animation" />
      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg hover:bg-[#256E29] transition-colors">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>
    </a>
  );
}
