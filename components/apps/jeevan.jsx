import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutJeevanUGowda extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about jeevan" src="/themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="jeevan' education" src="/themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="jeevan' skills" src="/themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="jeevan' projects" src="/themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="jeevan's resume" src="/themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
                <div className='my-0.5 w-28 md:w-full h-8 px-2 md:px-2.5 flex' >
                    <iframe src="https://github.com/sponsors/jeevanu345/button" title="Sponsor Jeevan.U.Gowda" width={"100%"} height={"100%"} ></iframe>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutJeevanUGowda;

export const displayAboutJeevanUGowda = () => {
    return <AboutJeevanUGowda />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="/images/logos/bitmoji.png" alt="Jeevan.U.Gowda Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Jeevan.U.Gowda</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Software Engineer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">Software Development Engineer Intern</span> at <u className=' cursor-pointer '> <a href="https://www.brillio.com/" target={"_blank"} rel="noreferrer">Brillio</a> </u>, working on AI platforms. Hit me up at <a className='text-underline' href='mailto:jeevanu345@gmail.com'><u>jeevanu345@gmail.com</u></a>!</li>
                <li className=" mt-3 list-building"> Responsible, organized, and hardworking individual passionate about technology, innovation, and problem-solving.</li>
                <li className=" mt-3 list-time"> My Soft Skills include Communication, Critical Thinking, and Analytical Problem Solving.</li>
                <li className=" mt-3 list-star"> Languages: English (Fluent), Hindi (Fluent), Kannada (Native).</li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        B.M.S College of Engineering, VTU – Bengaluru
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Aug 2022 - Jun 2026</div>
                    <div className=" text-sm md:text-base">Bachelor of Engineering in Information Science & Engineering</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Cumulative GPA: 8.4/10.0</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        12th Grade (Karnataka State Board)
                    </div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Score: 90%</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        10th Grade (CBSE Board)
                    </div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Score: 90%</div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">AI/ML, Full Stack Development, and DevOps!</strong></div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 mt-4 text-sm md:text-base">
                <div className="mt-2 text-gray-200"><strong>Languages:</strong> C++, Python, C, Java, JavaScript, HTML/CSS</div>
                <div className="mt-2 text-gray-200"><strong>Frameworks & Tools:</strong> React.js, Node.js, Express.js, LangChain, Tailwind CSS, MySQL, MongoDB, Jupyter Notebook, Framer Motion</div>
                <div className="mt-2 text-gray-200"><strong>AI/ML:</strong> RAG Pipelines, Knowledge Graphs, Vector Databases (Chroma, FAISS), LLM Integration, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn</div>
                <div className="mt-2 text-gray-200"><strong>Cloud/DevOps:</strong> AWS (EC2, S3, IAM), Docker, Kubernetes, Linux, Networking basics (DNS, HTTP, TCP/IP)</div>
            </div>
        </>
    )
}

function Projects() {
        const project_list = [
        {
            name: "RaftKV: Distributed Key-Value Store",
            date: "2024",
            link: "https://github.com/jeevanu345/raftkv",
            description: [
                "A Raft-replicated key-value store, written in Rust, with a Redis-compatible (RESP2/RESP3) wire protocol and gRPC peer-to-peer transport."
            ],
            domains: ["rust", "distributed-systems"]
        },
        {
            name: "SWE-bench Code Repair Agent",
            date: "2024",
            link: "https://github.com/jeevanu345/Code-Repair-Agent-with-Execution-Grounded-RL-on-SWE-Bench",
            description: [
                "Code-Repair Agent with Execution-Grounded RL on SWE-Bench.",
                "Trains an LLM agent to resolve real GitHub issues from SWE-bench Lite/Verified using GRPO."
            ],
            domains: ["python", "AI_ML", "docker"]
        },
        {
            name: "NCERT RAG Bot: AI-Powered NCERT Tutor",
            date: "2024",
            link: "https://github.com/jeevanu345/NCERT-RAG-Bot",
            description: [
                "Built an intelligent AI tutor using a RAG pipeline for conversational Q&A from NCERT Class 10 PDFs with local LLM integration, smart text chunking, vector search, and memory-based context retention."
            ],
            domains: ["python", "langchain", "AI_ML"]
        },
        {
            name: "CalorieFit",
            date: "2024",
            link: "https://github.com/jeevanu345/CalorieFit",
            description: [
                "A comprehensive full-stack calorie tracking and nutrition management application built with Node.js, Express, and PostgreSQL."
            ],
            domains: ["node.js", "postgresql"]
        },
        {
            name: "MacOS Automation Tool",
            date: "2024",
            link: "https://github.com/jeevanu345/MacOS-Automation-tool-",
            description: [
                "A powerful Automator-based application that runs on a schedule to handle repetitive file tasks automatically."
            ],
            domains: ["macos", "automation"]
        },
        {
            name: "ML-based Stock Price Predictor",
            date: "2024",
            link: "https://github.com/jeevanu345/ML-based-Stock-Price-Predictor",
            description: [
                "A machine learning-powered web application for forecasting stock prices over the next 10 days using Streamlit and scikit-learn."
            ],
            domains: ["python", "AI_ML"]
        },
        {
            name: "Music Recommendation Chatbot",
            date: "2024",
            link: "https://github.com/jeevanu345/Music--Recommendation-using-chatbot",
            description: [
                "An intelligent music recommendation system powered by AI that provides personalized song suggestions through a conversational chatbot interface."
            ],
            domains: ["python", "AI_ML"]
        },
        {
            name: "Instant Canteen: Smart Campus Food Ordering",
            date: "2023",
            link: "https://github.com/jeevanu345/Canteen-Management-Application",
            description: [
                "Built a full-stack web app streamlining campus canteen operations — enabling students to pre-order meals and make instant UPI-based QR payments."
            ],
            domains: ["react.js", "typescript", "tailwindcss"]
        },
        {
            name: "TapCart: NFC-Based Smart Retail System",
            date: "2023",
            link: "https://github.com/jeevanu345/TapCart",
            description: [
                "Designed an IoT-integrated retail platform enabling 'tap-to-shop' purchases and real-time inventory sync across devices.",
                "Research Paper: Proposed secure NFC-based merchant payment architecture for contactless transactions without extra hardware."
            ],
            domains: ["react-native", "node.js", "iot"]
        },
        {
            name: "COVID-19 Genome Mutation Visualization Tool",
            date: "2022",
            link: "https://github.com/jeevanu345/Covid-19-Genome-Mutation-Analysis",
            description: [
                "Built a visualization tool to compare genome sequences of COVID-19 variants and visualize protein structure mutations via ChimeraX."
            ],
            domains: ["python", "matplotlib", "biopython"]
        }
    ];

    const tag_colors = {
        "python": "green-400",
        "langchain": "purple-500",
        "AI_ML": "blue-500",
        "react.js": "blue-300",
        "typescript": "blue-400",
        "tailwindcss": "green-300",
        "react-native": "purple-400",
        "node.js": "green-500",
        "iot": "gray-400",
        "matplotlib": "red-400",
        "biopython": "yellow-500",
        "rust": "orange-500",
        "distributed-systems": "blue-600",
        "docker": "blue-400",
        "postgresql": "blue-400",
        "macos": "gray-500",
        "automation": "purple-500"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <iframe src="https://github.com/sponsors/jeevanu345/card" title="Sponsor Jeevan.U.Gowda" className='my-4 w-5/6 md:w-3/4' ></iframe>

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=jeevanu345&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="/files/jeevan-u-gowda.pdf" title="Jeevan.U.Gowda resume" frameBorder="0"></iframe>
    )
}