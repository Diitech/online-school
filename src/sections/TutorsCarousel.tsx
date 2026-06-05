import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';

const tutors = [
  {
    name: 'Mr. Chukwuemeka Obi',
    qualification: 'M.Sc. Physics, UNN',
    subjects: ['Physics', 'JAMB'],
    experience: '9 yrs',
    rating: 4.9,
    students: 312,
    image: '/images/tutor-1.jpg',
  },
  {
    name: 'Mrs. Adaeze Nwosu',
    qualification: 'B.Ed. English, UNILAG',
    subjects: ['English', 'IELTS'],
    experience: '7 yrs',
    rating: 4.8,
    students: 278,
    image: '/images/tutor-2.jpg',
  },
  {
    name: 'Mr. Bola Adeyemi',
    qualification: 'M.Sc. Mathematics, OAU',
    subjects: ['Mathematics', 'SAT'],
    experience: '11 yrs',
    rating: 5.0,
    students: 456,
    image: '/images/tutor-3.jpg',
  },
  {
    name: 'Miss Ngozi Eze',
    qualification: 'B.Sc. Chemistry, UNIBEN',
    subjects: ['Chemistry', 'WAEC'],
    experience: '5 yrs',
    rating: 4.7,
    students: 198,
    image: '/images/tutor-4.jpg',
  },
  {
    name: 'Mr. Emeka Afolabi',
    qualification: 'M.Ed. Economics, ABU',
    subjects: ['Economics', 'Social Studies'],
    experience: '8 yrs',
    rating: 4.8,
    students: 267,
    image: '/images/tutor-5.jpg',
  },
  {
    name: 'Mrs. Fatima Suleiman',
    qualification: 'IELTS Certified Trainer',
    subjects: ['IELTS', 'TOEFL'],
    experience: '6 yrs',
    rating: 4.9,
    students: 189,
    image: '/images/tutor-6.jpg',
  },
  {
    name: 'Mr. Tunde Fashola',
    qualification: 'B.Sc. Biology, LASU',
    subjects: ['Biology', 'WAEC', 'JAMB'],
    experience: '10 yrs',
    rating: 4.8,
    students: 342,
    image: '/images/tutor-7.jpg',
  },
];

function openWhatsApp(tutorName: string) {
  const message = encodeURIComponent('Hi, I would like to book a session with ' + tutorName);
  window.open('https://wa.me/2348158484621?text=' + message, '_blank');
}

export default function TutorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.scrollWidth / tutors.length;
    carouselRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : tutors.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < tutors.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id="tutors" className="relative content-layer bg-white py-[100px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
            Learn from Nigeria's Best Tutors
          </h2>
          <p className="font-body text-lg text-[#1A1A2E]/70 mt-4 max-w-2xl mx-auto">
            Our tutors are certified professionals with years of experience and proven track records.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F5F7FA] transition-colors -ml-2 md:-ml-5"
          >
            <ChevronLeft className="w-5 h-5 text-[#1A3C6E]" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F5F7FA] transition-colors -mr-2 md:-mr-5"
          >
            <ChevronRight className="w-5 h-5 text-[#1A3C6E]" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tutors.map((tutor, index) => (
              <motion.div
                key={tutor.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[280px] sm:min-w-[300px] bg-[#F5F7FA] rounded-2xl p-6 snap-center flex-shrink-0"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <h3 className="font-heading text-base font-semibold text-[#1A1A2E] text-center mb-1">
                  {tutor.name}
                </h3>
                <p className="font-body text-sm text-[#1A1A2E]/60 text-center mb-3">
                  {tutor.qualification}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-[#C9921A] text-white text-xs font-heading font-medium rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#C9921A] text-[#C9921A]" />
                    <span className="font-body text-sm font-medium text-[#1A1A2E]">
                      {tutor.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#1A3C6E]" />
                    <span className="font-body text-sm text-[#1A1A2E]/70">
                      {tutor.students} students
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openWhatsApp(tutor.name)}
                  className="w-full py-2.5 border-2 border-[#1A3C6E] text-[#1A3C6E] font-heading font-semibold text-sm rounded-lg hover:bg-[#1A3C6E] hover:text-white transition-all"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {tutors.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#C9921A] w-6'
                    : 'bg-[#1A3C6E]/20 hover:bg-[#1A3C6E]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}