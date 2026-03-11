import { Image } from "@unpic/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonialsDemo = () => {
  const [active, setActive] = useState(testimonials[0]);
  const handleprev = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(testimonials[prevIndex]);
  };
  const handlenext = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(testimonials[nextIndex]);
  };
  const isActive = (index: number) => {
    return testimonials[index] === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                className="absolute inset-0 origin-bottom"
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotateY: randomRotateY(),
                }}
                key={active.name}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <Image
                  alt={testimonial.name}
                  className="h-full w-full rounded-3xl object-cover object-center"
                  draggable={false}
                  height={400}
                  src={testimonial.src}
                  width={400}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div>
          <div className="flex flex-col justify-between py-4">
            <motion.div
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              initial={{
                y: 20,
                opacity: 0,
              }}
              key={active.name}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="font-bold text-2xl text-black dark:text-white">{active.name}</h3>
              <p className="text-gray-500 text-sm dark:text-neutral-500">{active.designation}</p>
              <motion.p className="mt-8 text-gray-500 text-lg dark:text-neutral-300">
                {active.quote.split(" ").map((word, index) => (
                  <motion.span
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    className="inline-block"
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    key={index}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
          <div className="flex gap-6 pt-5">
            <Button className="h-8 rounded" onClick={handleprev}>
              <ArrowLeft />
            </Button>
            <Button className="h-8 rounded" onClick={handlenext}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedTestimonialsDemo;

const testimonials = [
  {
    quote:
      "Spectrum UI is a game-changer! Its components are so well-designed and customizable that it made our app look polished and professional in no time.",
    name: "Ananya Gupta",
    designation: "Frontend Engineer, NovaTech",
    src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb",
  },

  {
    quote:
      "I love the simplicity and minimalism of Spectrum UI. The components are intuitive and fit seamlessly into our existing projects.",
    name: "Sophia Allen",
    designation: "UI/UX Designer, Creatify",
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    quote:
      "As a junior developer, Spectrum UI has been a lifesaver. The documentation is straightforward, and the components work flawlessly with Tailwind CSS.",
    name: "Ethan Rodriguez",
    designation: "Software Engineer, CodeWorks",
    src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    quote: "The integration with Shadcn made it super easy to customize the components. Spectrum UI is now a must-have in our tech stack.",
    name: "Priya Sharma",
    designation: "Full Stack Developer, Innovate Labs",
    src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb",
  },
];
