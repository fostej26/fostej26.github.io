import React from "react";
import "./App.css";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {Link} from "react-scroll";
import { BrowserRouter, HashRouter } from "react-router-dom";

function App() {
  
  const [text] = useTypewriter({
    words: [
      "I am a software developer.",
      "I study mechatronics engineering at McMaster University.",
      "I am an intern at L3Harris Technologies.",
      "I love learning new things.",
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 35,
    delaySpeed: 3000,
  });

  

  return (
    <HashRouter>
    <main>
      <div id="nav" className="w-full fixed top-0 left-0 z-10">
        <div className="p-4 flex justify-between items-center">
          <div className="flex justify-between w-1/6">
            <Link to="name" spy={true} smooth={true} duration={500} offset={-100} className="text-2xl font-bold cursor-pointer">
              <span
                id="gradient-text"
                className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-orange-500"
              >
                &lt;JF&gt;
              </span>
            </Link>
            <a
              href="https://www.linkedin.com/in/jacobnfoster/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("./assets/linkedin.png")}
                className="w-6 h-6 mx-6 my-2"
              />
            </a>

            <a
              href="https://github.com/fostej26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("./assets/github-logo-5F384D0265-seeklogo.com.png")}
                className="w-6 h-6 mx-6 my-2"
              />
            </a>

            <a
              href="/JACOBFOSTER_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("./assets/document.png")}
                className="w-6 h-6 mx-6 my-2"
                alt="Document Icon"
              />
            </a>

            <a href="mailto:fostej26@mcmaster.ca">
              <img
                src={require("./assets/mail.png")}
                className="w-6 h-6 mx-6 my-2"
              />
            </a>
          </div>

          <div className="flex justify-end">
            <Link to="about" spy={true} smooth={true} duration={500} offset={-100} className="mx-4 cursor-pointer">
              About
            </Link>
            <Link to="experience" spy={true} smooth={true} duration={500} offset={-50} className="mx-4 cursor-pointer">
              Experience
            </Link>
            <Link to="projects" spy={true} smooth={true} duration={500} offset={-50} className="mx-4 cursor-pointer">
              Projects
            </Link>
            <a href="mailto:fostej26@mcmaster.ca" className="mx-4">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div
        id="hero"
        className="flex flex-col items-center justify-center"
      >
        <h1 id="name" className="text-8xl font-bold text-left my-12 w-10/12">
          Hi, I'm{" "}
          <span
            id="gradient-text"
            className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-orange-500"
          >
            &lt;Jacob Foster&gt;
          </span>
        </h1>
        <h3 id="typewriter" className="text-5xl font-medium text-left whitespace-nowrap w-10/12">
          <span>{text}</span>
          <span>
            <Cursor />
          </span>
        </h3>
      </div>
      
      <div className="flex flex-col w-full justify-center items-center">
        <motion.div
          animate={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          whileHover={{
            opacity: 0.3,
          }}
        >
          <Link to="about" spy={true} smooth={true} duration={500} offset={-100} className="text-2xl font-bold cursor-pointer">
          <div
            id="mouse-scroll-div"
            className="relative my-40 w-fit flex flex-col justify-center items-center p-20"
          >
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 mb-5"
              id="mouse"
            >
              <motion.div
                animate={{
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-black mb-1 absolute"
              />
            </div>
            <p className="text-xl font-medium">
              Scroll down to learn more about me.
            </p>
          </div></Link>
        </motion.div>
      </div>
      <div className="w-full">
        <section>
          <div className="flex flex-col" id="about">
            <div className="flex flex-col items-center">
              <h2 className="text-6xl font-bold pb-6 w-10/12">About Me:</h2>
              <hr className="border-2 border-neutral-300 w-10/12"></hr>
              <p className="text-2xl text-left mt-4 w-10/12 ">
                <br/>
                Hi I'm Jacob!
                <br/><br/>
                 I just finished my second year of mechatronics
                engineering at McMaster University in Hamilton, ON and am taking
                a break from my studies to pursue a co-op position at L3Harris
                Technologies as a manufacturing software development intern.
                Through my school and work experiences, I have discovered a
                passion for finding solutions to engaging problems in all facets
                of engineering.
                <br />
                <br />
                I'm currently taking this time to focus on developing new skills
                surrounding my interests in software development, robotics, and
                performance engineering. I plan to continue to create
                captivating projects and develop my skills before I return to
                school to finish my degree, and I'm excited to see where my
                journey takes me.
                <br />
                <br />
                When I'm not working on projects or studying, you can find me at
                the gym, on the field playing soccer, or playing the guitar.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col mt-20">
            <div id="experience" className="flex flex-col items-center ">
              <h2 className="text-6xl mb-10 font-bold w-10/12">Experience:</h2>
              <hr className="border-2 border-neutral-300 w-10/12"></hr>
              
              <div
                className="grid grid-cols-2 grid-rows-1 gap-4 mt-4 w-10/12"
                id="experience-container"
              >
                
                <div className="p-10 pl-0 pt-0 pb-10 w-full border-2 border-neutral-300 rounded-lg">
                  <a
                    href="https://www.l3harris.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("./assets/L3Harris_Technologies-Logo.png")}
                      className="w-60 h-40"
                      alt="L3Harris Technologies Logo"
                    />
                  </a>
                  <h3 className="text-xl font-medium pt-0 pl-10">
                    Manufacturing Engineering  Co-op: May 2024 - August 2024
                  </h3>
                  <br />
                  <ul className="pl-20">
                    <li className="list-disc">
                      Developed an internal web application to monitor and display
                      software and firmware module activity.
                      Implemented for a team of 100+ technicians to use, 
                      reducing manual labor from 15min to 1min per unit.
                    </li>
                    <br />
                    <li className="list-disc">
                      Automated several test processes to retrieve, analyze, and
                      store calibration values from products saving $10,000+ in
                      prevented non-conformance errors.
                    </li>
                    <br />
                    <li className="list-disc">
                      Implemented a tooling management system for a
                      lab of 100+ manufacturing technicians using housing
                      assemblies designed in SOLIDWORKS.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col mt-20 w-full">
              <div id="projects" className="flex flex-col items-center">
              <h2 className="text-6xl mb-10 font-bold w-10/12">Projects:</h2>
              <hr className="border-2 border-neutral-300 w-10/12"></hr>
              <div
                className="grid grid-cols-3 grid-rows-2 gap-4 mt-4 w-10/12"
                id="projects-grid"
              >
                <div className="w-full border-2 border-neutral-300 rounded-lg p-10 ">
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/fostej26/onTime/tree/main"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/onTime.jpg")}
                        className="w-48 h-48 rounded-lg"
                        alt="onTime app graphic"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    onTime
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    A python program that provides users with an SMS containing
                    the optimal time of departure for events logged in their
                    Google Calendar based on the current weather conditions and
                    traffic data.
                  </p>
                </div>

                <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/fostej26/Sumobot2024"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/sumo.PNG")}
                        className="w-48 h-48 rounded-lg"
                        alt="onTime app graphic"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    Spinnick SumoBot
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    An automated robot designed to compete in the annual SumoBot
                    competition at McMaster University. Perceives the
                    environment using ultrasonic and color sensors and was
                    loaded with attack and evade algorithms. Group Champions
                    2024.
                  </p>
                </div>

                <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/fostej26/onTime/tree/main"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/allergypal.jpg")}
                        className="w-48 h-48 rounded-lg"
                        alt="team photo from sumobot competition"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    AllergyPal
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    A web application that allows users input a list of food
                    sensitivities and take photos of meals they are unsure
                    about. Using a machine learning model, the app will detect
                    the dish and cross-reference the ingredients with the user's
                    sensitivities.
                  </p>
                </div>

                <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/fostej26/fostej26.github.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/website.PNG")}
                        className="w-48 h-48 rounded-lg"
                        alt="onTime app graphic"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    Portfolio Website
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    A react.js website used to display my resume, projects, and
                    contact information.
                  </p>
                </div>

                <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/fostej26/2MP3-Assignment-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/matrix.jpg")}
                        className="w-48 h-48 rounded-lg"
                        alt="onTime app graphic"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    Sparce Matrix Solver
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    Wrote a C program to read a text file containing a
                    compressed a n by n sparse matrix, expand the matrix, and
                    find the solution to the matrix to the e-16th degree
                    accuracy.
                  </p>
                </div>

                <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
                  <div className="flex justify-center">
                    <a
                      href="https://devpost.com/software/unified-engineering-challenge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require("./assets/carport.png")}
                        className="w-48 h-48 rounded-lg"
                        alt="team photo from sumobot competition"
                      />
                    </a>
                  </div>
                  <h3 className="text-center text-xl font-semibold mt-4">
                    Freestanding Solar Carport
                  </h3>
                  <p className="text-md font-normal mt-2 text-center">
                    Designed a freestanding solar carport to be installed in a
                    residential area. The carport was designed to be modular and
                    scalable to fit the needs of the customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      

      <footer id="footer">
          <div className="p-36 flex flex-col justify-between items-center">
            <div className="flex justify-between flex-col">
              </div>
              <div className="flex">
              <a
                href="https://www.linkedin.com/in/jacobnfoster/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("./assets/linkedin.png")}
                  className="w-8 h-8 mx-8 my-2"
                />
              </a>

              <a
                href="https://github.com/fostej26"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("./assets/github-logo-5F384D0265-seeklogo.com.png")}
                  className="w-8 h-8 mx-8 my-2"
                />
              </a>

              <a
                href="/Jacob_Foster_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("./assets/document.png")}
                  className="w-8 h-8 mx-8 my-2"
                  alt="Document Icon"
                />
              </a>

              <a href="mailto:fostej26@mcmaster.ca">
                <img
                  src={require("./assets/mail.png")}
                  className="w-8 h-8 mx-8 my-2"
                />
              </a>
            </div>
            <div className="flex flex-cols">
                <p className="text-center text-lg font-medium mt-8">
                  Built from scratch using React.js and TailwindCSS
                </p>
            </div>
            <div className="flex flex-cols">
                <p className="text-center text-lg font-medium mt-8">
                  Copyright &copy; Jacob Foster 2024
                </p>
            </div>
          </div>

      </footer>
      
    </main>
    </HashRouter>
    
  );
  
}

export default App;