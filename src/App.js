import React from 'react';
import './App.css';
import { motion } from "framer-motion"
import {Typewriter} from 'react-simple-typewriter';
import {useTypewriter, Cursor} from 'react-simple-typewriter'; 

function App() {

  const [text] = useTypewriter({
    words: ['I am a software developer.', 'I study mechatronics engineering at McMaster University.', 'I am an intern at L3Harris Technologies.', 'I love learning new things.'],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 35,
    delaySpeed: 3000,
  });

  return (
    <main>
      <div className='h-screen bg-cover bg-center'>
      <div id = "nav" className="w-full fixed top-0 left-0 z-10">
        <div className="p-4 flex justify-between items-center">
        
          <div className='flex justify-between w-1/6'>
            <a href="#" className="text-2xl font-bold">
              <span id = "gradient-text" className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-orange-500">&lt;JF&gt;
              </span>
            </a>
            <a href='https://www.linkedin.com/in/jacobnfoster/' target="_blank" rel="noopener noreferrer">
              <img src = {require("./assets/linkedin.png")} className = "w-6 h-6 mx-6 my-2"/>
            </a>

            <a href='https://github.com/fostej26'target="_blank" rel="noopener noreferrer">
              <img src = {require("./assets/github-logo-5F384D0265-seeklogo.com.png")} className = "w-6 h-6 mx-6 my-2"/>
            </a>

            <a href="/Jacob_Foster_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <img src={require("./assets/document.png")} className="w-6 h-6 mx-6 my-2" alt="Document Icon" />
            </a>  

            <a href='mailto:fostej26@mcmaster.ca'>
              <img src = {require("./assets/mail.png")} className = "w-6 h-6 mx-6 my-2"/>
            </a>
          </div>


          <div className="flex justify-end">
            <a href="#about" className="mx-4">About</a>
            <a href="#projects" className="mx-4">Projects</a>
            <a href="#contact" className="mx-4">Contact</a>
          </div>
        </div>
      </div>
      <div id = "hero" className="flex flex-col items-left items-start p-24 pt-32">
        <h1 id = "name" className="text-8xl font-bold text-left m-12">
          Hi, I'm <span id = "gradient-text" className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-orange-500">&lt;Jacob Foster&gt;</span>
        </h1>
        <h3 id = "typewriter" className="text-5xl font-medium text-left mx-14">
            <span>
                {text}
            </span>
            <span>
             <Cursor />
            </span>
        </h3>
      </div>
        <div className='flex flex-col w-full justify-center items-center'>
        <motion.div
          animate={{
            opacity: 0,
          }}
          transition={{
            duration: .5,
          }}
          whileHover={{
            opacity: 0.3,
          }}>
      <div id = "mouse-scroll-div" className="relative my-40 w-fit flex flex-col justify-center items-center p-20">

          
          <div
            className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 mb-5" id = "mouse">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType:  "loop",
              }}
              className="w-3 h-3 rounded-full bg-black mb-1"/>
          </div>
          <p className='text-xl font-medium'>Scroll down to learn more about me.</p>


          



      </div></motion.div>
        </div>
      <div>
        <section>
          <div className='flex container' id="about">
            <div className='w-1/12'></div>
            <div className="flex flex-col container w-11/12 justify-around">
              <h2 className="text-6xl font-bold pb-6 ">About Me:</h2>
              <hr className='border-2 border-neutral-300 w-full'></hr>
              <p className="text-2xl text-left mt-4 w-10/12 ">
                Hi I'm Jacob. I just finished my second year of mechatronics engineering at McMaster University in Hamilton, ON and am taking a break from my studies to
                pursue a co-op position at L3Harris Technologies as a manufacturing software development intern. Through my school and work experiences, I have discovered
                a passion for finding solutions to engaging problems in all facets of engineering. 
                <br/><br/>
                I'm currently taking this time to focus on developing new skills surrounding my interests in software development, robotics, and performance engineering. I plan
                to continue to create captivating projects and develop my skills before I return to school to finish my degree, and I'm excited to see where my journey takes me.
                <br/><br/>
                When I'm not working on projects or studying, you can find me at the gym, on the field playing soccer, or snowboarding on the slopes.
                </p>
            </div>
          </div>
          
        </section>
        <section>
        <div className='flex container mt-20'>
  <div className='w-1/12'></div>
  <div id="experience" className="flex flex-col items-left w-full">
    <h2 className="text-6xl mb-10 font-bold">Experience:</h2>
    <hr className='border-2 border-neutral-300 w-full'></hr>
    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-4" id="experience-container">
    <div className="p-10 pl-0 pt-0 pb-10 w-full border-2 border-neutral-300 rounded-lg">
        <a href="https://www.l3harris.com/">
          <img src={require("./assets/L3Harris_Technologies-Logo.png")} className="w-60 h-40" alt="L3Harris Technologies Logo" />
        </a>
        <h3 className="text-xl font-medium pt-0 pl-10">Manufacturing Software Developer Co-op: May 2024 - Current</h3><br />
        <ul className='pl-20'>
          <li className='list-disc'>
            Developed an internal web application to compare the software and firmware builds of a product to ensure
            all modules are active. Implemented for a team of 100+ technicians to use, reducing manual labor from 15min to 1min 
            per unit.
          </li>
          <br />
          <li className='list-disc'>
            Automated several test processes to retrieve, analyze, and store calibration values from products saving $10,000+ in
            prevented non-conforming products.
          </li>
          <br />
          <li className='list-disc'>
            Implemented an improved tooling management system for a lab of 100+ manufacturing technicians using housing
            assemblies designed in SOLIDWORKS.
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</section>


<section>
  <div className='flex container mt-20'>
    <div className='w-1/12'></div>
    <div id="experience" className="flex flex-col items-start w-full">
      <h2 className="text-6xl mb-10 font-bold">Projects:</h2>
      <hr className='border-2 border-neutral-300 w-full'></hr>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-4" id="projects-grid">

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/onTime/tree/main">
              <img src={require("./assets/onTime.jpg")} className="w-48 h-48 rounded-lg" alt="onTime app graphic" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>onTime</h3>
          <p className='text-md font-normal mt-2 text-center'>
            A python program that provides users with an SMS containing the optimal time of departure for events logged
            in their Google Calendar based on the current weather conditions and traffic data.
          </p>
        </div>

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/onTime/tree/main">
              <img src={require("./assets/sumo.PNG")} className="w-48 h-48 rounded-lg" alt="onTime app graphic" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>Spinnick SumoBot</h3>
          <p className='text-md font-normal mt-2 text-center'>
            An automated robot designed to compete in the annual SumoBot competition at McMaster University. Perceives the environment using
            ultrasonic and color sensors and was loaded with attack and evade algorithms. Group Champions 2024.
          </p>
        </div>

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/onTime/tree/main">
              <img src={require("./assets/allergypal.jpg")} className="w-48 h-48 rounded-lg" alt="team photo from sumobot competition" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>AllergyPal</h3>
          <p className='text-md font-normal mt-2 text-center'>
            A web application that allows users input a list of food sensitivities and take photos of meals they are unsure about. Using
            a machine learning model, the app will detect the dish and cross-reference the ingredients with the user's sensitivities.
          </p>
        </div>

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/fostej26.github.io">
              <img src={require("./assets/website.PNG")} className="w-48 h-48 rounded-lg" alt="onTime app graphic" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>Portfolio Website</h3>
          <p className='text-md font-normal mt-2 text-center pt-10'>
            A react.js website used to display my resume, projects, and contact information.
          </p>
        </div>

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/onTime/tree/main">
              <img src={require("./assets/matrix.jpg")} className="w-48 h-48 rounded-lg" alt="onTime app graphic" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>Sparce Matrix Solver</h3>
          <p className='text-md font-normal mt-2 text-center'>
            blah vlah blah do tmos.
          </p>
        </div>

        <div className="w-full border-2 border-neutral-300 rounded-lg p-10">
          <div className='flex justify-center'>
            <a href="https://github.com/fostej26/onTime/tree/main">
              <img src={require("./assets/allergypal.jpg")} className="w-48 h-48 rounded-lg" alt="team photo from sumobot competition" />
            </a>
          </div>
          <h3 className='text-center text-xl font-semibold mt-4'>AllergyPal</h3>
          <p className='text-md font-normal mt-2 text-center'>
            dont even know whats gonna go here
          </p>
        </div>

      </div>
    </div>
  </div>
</section>









      </div>
      </div>

    </main>
  );
}

export default App;
