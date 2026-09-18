import resume from "./assets/Jacob-Foster-Resume.pdf";

export const links = {
  linkedin: "https://www.linkedin.com/in/jacobnfoster/",
  github: "https://github.com/fostej26",
  resume,
  email: "mailto:fostej26@mcmaster.ca",
};

export const typewriterWords = [
  "I am a software developer.",
  "I study mechatronics engineering.",
  "I love creating new things.",
];

export const about = [
  "Hi I'm Jacob!",
  "I just started my fifth and final year of mechatronics engineering at McMaster University, and have also recently finished a PEY internship as a Video Decoding Software Engineer at AMD. I've also previously worked as a Manufacturing Automation Intern at L3Harris Technologies. Through my school and work experiences, I have discovered a passion for finding solutions to engaging problems in all facets of engineering.",
  "I'm currently focusing on developing new skills surrounding my interests in software development, robotics, and performance engineering. I plan to continue to create captivating projects and develop my skills, and I'm excited to see where my journey takes me.",
  "Outside of school, I love soccer (Arsenal FC), hiking and the outdoors, golf, and ice hockey.",
];

export const experience = [
  {
    id: "amd",
    company: "AMD",
    url: "https://www.amd.com/",
    role: "Video Decoding Software Engineer Co-op",
    dates: "May 2025 - August 2026",
    bullets: [
      "Engineered software for compressing and decoding MJPEG video streams via DCT-based decoding, enabling hardware acceleration for next-generation Windows GPU, APU, and console drivers across D3D11/12 decode paths.",
      "Built a bitstream parser that walks JPEG marker structure, detects chroma subsampling, and reformats frames into DXVA-compliant picture parameters and Huffman/quantization tables; enabling the team to validate hardware decoding for product bring-up.",
      "Designed and built a Python web app that automates the end-to-end firmware submission pipeline, unifying six previously manual stages and reducing submission time by 2.3x. The tool orchestrates remote Linux test machines over SSH, drives Perforce and Git from a single interface, auto-generates and cross-links pull requests across three downstream repositories, and integrates an AI coding agent to resolve merge conflicts. Deployed to a team of 30+ developers.",
      "Resolved a scheduler defect where all video decode jobs were incorrectly dispatched to the encoding engine; implemented codec-aware engine routing to direct workloads to the dedicated decode engine, with AV1 exempt and single-engine APU configurations handled separately, leveraging GPU decode affinity to defer engine assignment until hardware capabilities were known at runtime.",
      "Diagnosed and resolved defects in Windows GPU/APU driver software and implemented features across the full driver stack, from kernel-level to user-level abstractions.",
    ],
  },
  {
    id: "l3harris",
    company: "L3Harris Technologies",
    url: "https://www.l3harris.com/",
    role: "Manufacturing Engineering Co-op",
    dates: "May 2024 - August 2024",
    bullets: [
      "Developed an internal windows application to monitor and display software and firmware module activity. Implemented for a team of 100+ technicians to use, reducing manual labour from 15min per unit to 1min per unit.",
      "Automated several test processes using C# to retrieve, analyze, and store calibration values from products saving $100,000+ in prevented non-conformance errors.",
      "Implemented a tooling management system for a lab of 100+ manufacturing technicians using housing assemblies designed in SOLIDWORKS.",
    ],
  },
  {
    id: "solarcar",
    company: "McMaster Solar Car",
    url: "https://www.mcmastersolarcar.com/",
    role: "Algorithms Developer",
    dates: "October 2024 - December 2025",
    bullets: [
      "Create and display kinematic simulations using linear ODE solving methods.",
      "Modularize and create documentation for algorithms used in race strategies codebase.",
    ],
  },
];

export const projects = [
  {
    id: "allergypal",
    title: "AllergyPal",
    url: "https://github.com/fostej26/AllergyPal",
    linkLabel: "github",
    description:
      "A web application that allows users input a list of food sensitivities and take photos of meals that pose a dietary risk. Using a machine learning model, the app detects the dish and cross-references the ingredients with the user's sensitivities.",
  },
  {
    id: "ontime",
    title: "onTime",
    url: "https://github.com/fostej26/onTime/tree/main",
    linkLabel: "github",
    description:
      "A python program that provides users with an SMS containing the optimal time of departure for events logged in their Google Calendar based on the current weather conditions and traffic data.",
  },
  {
    id: "sumobot",
    title: "Spinnick SumoBot",
    url: "https://github.com/fostej26/Sumobot2024",
    linkLabel: "github",
    description:
      "An automated robot designed to compete in the annual SumoBot competition at McMaster University. Perceives the environment using ultrasonic and colour sensors and was loaded with attack and evade algorithms. Group Champions 2024.",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    url: "https://github.com/fostej26/fostej26.github.io",
    linkLabel: "github",
    description:
      "A react.js website used to display my resume, projects, and contact information.",
  },
  {
    id: "matrix",
    title: "Sparse Matrix Solver",
    url: "https://github.com/fostej26/2MP3-Assignment-3",
    linkLabel: "github",
    description:
      "Wrote a C program to read a text file containing a compressed a n by n sparse matrix, expand the matrix, and find the solution to the matrix to the e-16th degree accuracy.",
  },
  {
    id: "carport",
    title: "Freestanding Solar Carport",
    url: "https://devpost.com/software/unified-engineering-challenge",
    linkLabel: "devpost",
    description:
      "Designed a freestanding solar carport to be installed in a residential area. The carport was designed to be modular and scalable to fit the needs of the customer.",
  },
];
