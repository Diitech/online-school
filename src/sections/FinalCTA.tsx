import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import student from "../assets/images/students-celebration.png";

export default function FinalCTA() {
  return (
    <section className="relative content-layer bg-[#1A3C6E] py-[100px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Celebration Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <img
                src={student}
                alt="Students celebrating exam success with DChoice Tutoring"
                className="w-full rounded-2xl shadow-2xl"
              />
              {/* 5,000+ Badge overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-6 left-6 bg-[#C9921A] text-white px-6 py-4 rounded-xl shadow-xl"
              >
                <p className="font-display text-3xl font-bold">5,000+</p>
                <p className="font-body text-sm">Students Excelled</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-white leading-[1.2] mb-6">
              Join 5,000+ Students Excelling Across Nigeria
            </h2>
            <p className="font-body text-lg text-white/80 mb-10 max-w-xl mx-auto lg:mx-0">
              Your academic success story starts here. Enroll today and take the first step toward your dream score.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block bg-[#C9921A] text-[#1A3C6E] font-heading font-semibold text-base px-8 py-4 rounded-lg hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Enroll Now
              </a>
              <a
                href="https://wa.me/2348158484621"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading font-semibold text-base px-8 py-4 rounded-lg hover:bg-[#1da851] transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}