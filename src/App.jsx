import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code, Database, Globe, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Canvas Particle Animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 - dist / 500})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // GSAP Animations
    // Hero Section Animation
    gsap.fromTo(
      heroRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    // About Section Animation
    gsap.fromTo(
      aboutRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
      }
    );

    // Skills Section Animation
    gsap.fromTo(
      skillsRef.current.querySelectorAll('.skill-card'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Projects Section Animation
    gsap.fromTo(
      projectsRef.current.querySelectorAll('.project-card'),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Contact Section Animation
    gsap.fromTo(
      contactRef.current.querySelectorAll('.contact-form > *'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    { name: 'Python', icon: <Code className="w-6 h-6" /> },
    { name: 'Django', icon: <Globe className="w-6 h-6" /> },
    { name: 'Django ORM', icon: <Database className="w-6 h-6" /> },
    { name: 'SQL', icon: <Database className="w-6 h-6" /> },
    { name: 'DRF', icon: <Code className="w-6 h-6" /> },
    { name: 'JavaScript', icon: <Code className="w-6 h-6" /> },
    { name: 'React', icon: <Globe className="w-6 h-6" /> },
    { name: 'Redux', icon: <Code className="w-6 h-6" /> },
    { name: 'HTML/CSS', icon: <Globe className="w-6 h-6" /> },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with Django backend and React frontend. Features include user authentication, product catalog, shopping cart, and payment integration.',
      tech: ['Django', 'DRF', 'React', 'Redux', 'PostgreSQL'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Task Management System',
      description:
        'Collaborative task management application with real-time updates. Built with Django channels for WebSocket support and React for dynamic UI.',
      tech: ['Django', 'Django Channels', 'React', 'Redux', 'SQLite'],
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono relative overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-green-400 glitch" data-text="RF">
              &lt;/&gt;
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`hover:text-green-300 transition-colors capitalize ${
                    activeSection === item ? 'text-green-300' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-green-500/20">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-3 hover:bg-green-500/10 capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="text-center z-10">
          <div className="mb-6 text-green-500 text-sm tracking-widest animate-pulse">
            &lt;HELLO_WORLD /&gt;
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">RINSHA</span>{' '}
            <span className="text-green-400">FEBIN</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Python Full Stack Developer
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <a
              href="https://github.com/rinshafebin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-green-500 rounded-lg hover:bg-green-500/20 transition-all transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/rinsha-febinkk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-green-500 rounded-lg hover:bg-green-500/20 transition-all transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:rinshafebinkk12@gmail.com"
              className="p-3 border border-green-500 rounded-lg hover:bg-green-500/20 transition-all transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
          >
            View My Work
          </button>
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="text-green-500">&lt;</span>About Me
            <span className="text-green-500"> /&gt;</span>
          </h2>
          <div className="bg-black/50 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-lg leading-relaxed mb-6 text-green-200">
              I'm a passionate Python Full Stack Developer with expertise in building scalable web applications.
              I specialize in Django for backend development and React for creating dynamic, responsive user interfaces.
            </p>
            <p className="text-lg leading-relaxed text-green-200">
              With a strong foundation in both frontend and backend technologies, I bring ideas to life through
              clean code, efficient databases, and intuitive user experiences. I've successfully completed 2 major
              projects and continue to expand my skills in modern web development.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-green-500">&lt;</span>Skills
            <span className="text-green-500"> /&gt;</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="skill-card group relative bg-gradient-to-br from-black to-gray-900 border border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/40"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 text-green-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-center font-bold text-green-300">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-green-500">&lt;</span>Projects
            <span className="text-green-500"> /&gt;</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="project-card bg-black/50 border border-green-500/30 rounded-lg p-8 hover:border-green-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20"
              >
                <div className={`w-full h-48 bg-gradient-to-br ${project.color} rounded-lg mb-6 flex items-center justify-center`}>
                  <Code className="w-20 h-20 text-white/80" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-green-300">{project.title}</h3>
                <p className="text-green-200 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-green-500">&lt;</span>Contact
            <span className="text-green-500"> /&gt;</span>
          </h2>
          <div className="contact-form bg-black/50 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-green-300">Name</label>
                <input
                  type="text"
                  className="w-full bg-black border border-green-500/50 rounded-lg px-4 py-3 text-green-400 focus:outline-none focus:border-green-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-2 text-green-300">Email</label>
                <input
                  type="email"
                  className="w-full bg-black border border-green-500/50 rounded-lg px-4 py-3 text-green-400 focus:outline-none focus:border-green-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-green-300">Message</label>
                <textarea
                  rows="4"
                  className="w-full bg-black border border-green-500/50 rounded-lg px-4 py-3 text-green-400 focus:outline-none focus:border-green-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-8 text-center">
        <p className="text-green-300">&copy; 2025 Rinsha Febin. All rights reserved.</p>
        <p className="text-green-500/60 mt-2 text-sm">&lt;Built with React & ❤️ /&gt;</p>
      </footer>

      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .glitch {
          position: relative;
          animation: glitch 2s linear infinite alternate;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00ff;
          clip: rect(0, 900px, 0, 0);
          animation: glitch 3s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          clip: rect(0, 900px, 0, 0);
          animation: glitch 2s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;