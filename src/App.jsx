// Week 7: Migrating Your Interactive Portfolio to React
// This starter file guides you through migrating your Week 6 vanilla JavaScript portfolio to React

import { useEffect } from "react";
import "./App.css";

function App() {
  const skills = [
    {
      name: "React",
      icon: "⚛️",
      category: "Frontend Framework",
      skillPercentage: 90,
    },
    {
      name: "CSS3",
      icon: "🎨",
      category: "Styling",
      skillPercentage: 95,
    },
    {
      name: "Responsive Design",
      icon: "📱",
      category: "Design",
      skillPercentage: 88,
    },
    {
      name: "JavaScript",
      icon: "🚀",
      category: "Programming",
      skillPercentage: 85,
    },
    {
      name: "Figma",
      icon: "🎯",
      category: "Design Tools",
      skillPercentage: 80,
    },
    {
      name: "Node.js",
      icon: "🌐",
      category: "Backend",
      skillPercentage: 75,
    },
  ];

  // ============================================
  // PART 1: EVENT HANDLER FUNCTIONS
  // ============================================
  // TODO: Move your Week 6 event handler functions here
  // In Week 6, you had functions like:
  // - handleNavClick (for smooth scroll)
  // - filterProjects (for project filtering)
  // - handleFormSubmit (for form validation)
  //
  // HINT: These will be regular JavaScript functions defined inside App component
  // Example from Week 6:
  //   const filterProjects = (category) => {
  //     // Your filtering logic here
  //   }
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMobileMenuToggle = () => {
    document.querySelector(".nav-menu").classList.toggle("active");
    document.querySelector(".nav-toggle").classList.toggle("active");
  };

  const handleFilterClick = (e) => {
    const filterValue = e.currentTarget.getAttribute("data-filter");
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });

    // Update active button
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");
    const contactForm = e.currentTarget;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    let isValid = true;
    if (nameValue.length < 2) {
      showError(
        nameInput,
        nameValue.length === 0
          ? "Name is required"
          : "Name must be at least 2 characters",
      );
      isValid = false;
    } else {
      showSuccess(nameInput);
    }

    if (!isValidEmail(emailValue)) {
      showError(
        emailInput,
        emailValue.length === 0
          ? "Email is required"
          : "Please enter a valid email address",
      );
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    if (messageValue.length < 10) {
      showError(
        messageInput,
        messageValue.length === 0
          ? "Message is required"
          : "Message must be at least 10 characters",
      );
      isValid = false;
    } else {
      showSuccess(messageInput);
    }

    if (isValid) {
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent =
        "Thank you! Your message has been sent successfully.";
      contactForm.appendChild(successMessage);
      console.log("Form submitted with data:", {
        name: nameValue,
        email: emailValue,
        message: messageValue,
      });

      setTimeout(() => {
        contactForm.reset();
        successMessage.remove();
        [nameInput, emailInput, messageInput].forEach((input) =>
          input.classList.remove("success"),
        );
      }, 3000);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearError = (input) => {
    input.parentElement.querySelector(".error-message")?.remove();
    input.classList.remove("error");
  };

  const showError = (input, message) => {
    clearError(input);
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
    input.parentElement.appendChild(errorElement);
  };

  const showSuccess = (input) => {
    clearError(input);
    input.classList.add("success");
    input.classList.remove("error");
  };

  const handleInputValidation = (e) => {
    const input = e.currentTarget;
    const value = input.value.trim();

    if (input.id === "name") {
      if (value.length === 0) showError(input, "Name is required");
      else if (value.length < 2)
        showError(input, "Name must be at least 2 characters");
      else showSuccess(input);
    }

    if (input.id === "email") {
      if (value.length === 0) showError(input, "Email is required");
      else if (!isValidEmail(value))
        showError(input, "Please enter a valid email address");
      else showSuccess(input);
    }

    if (input.id === "message") {
      if (value.length === 0) showError(input, "Message is required");
      else if (value.length < 10)
        showError(input, "Message must be at least 10 characters");
      else showSuccess(input);
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document
          .querySelectorAll(".nav-link")
          .forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================
  // PART 2: JSX RETURN STATEMENT
  // ============================================
  // TODO: Copy your Week 6 HTML structure here
  // Remember to convert HTML to JSX:
  // - class → className
  // - onclick → onClick
  // - onsubmit → onSubmit
  // - for → htmlFor
  // - All event attributes use camelCase
  //
  // IMPORTANT: Put EVERYTHING in this one return statement!
  // This week we're building a MONOLITHIC component (one big component)
  // Week 8 will teach you how to break this into smaller pieces

  return (
    <div className="portfolio">
      <nav id="navbar">
        <a href="#home" className="nav-brand" onClick={handleNavClick}>
          <span>Henrik Zabel</span>
        </a>
        <ul className="nav-menu">
          <li>
            <a href="#home" className="nav-link" onClick={handleNavClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={handleNavClick}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={handleNavClick}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link" onClick={handleNavClick}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </a>
          </li>
        </ul>
        <div
          className="nav-toggle"
          onClick={handleMobileMenuToggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Henrik Zabel</h1>
          <p className="hero-subtitle">Frontend Developer & UI Designer</p>
          <p className="hero-tagline">
            Creating beautiful, responsive web experiences with modern
            technologies
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a passionate frontend developer with 3 years of experience
                creating engaging digital experiences. I specialize in React,
                modern CSS, and responsive design patterns that work beautifully
                across all devices.
              </p>
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">✉️</span>
                  <a href="mailto:contact@henrikzabel.com">
                    contact@henrikzabel.com
                  </a>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📱</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
            <div className="about-availability">
              <h3>Currently Available For:</h3>
              <div className="availability-tags">
                <span className="tag tag-available">Freelance</span>
                <span className="tag tag-available">Full-Time</span>
                <span className="tag tag-available">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <h3 className="skill-name">{skill.name}</h3>
                </div>
                <div className="skill-category">{skill.category}</div>
                <div className="skill-level">
                  <div
                    className="skill-progress"
                    style={{ "--skill-level": `${skill.skillPercentage}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">
                  {skill.skillPercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>

          <div className="filter-buttons">
            <button
              className="filter-btn active"
              data-filter="all"
              onClick={handleFilterClick}
            >
              All Projects
            </button>
            <button
              className="filter-btn"
              data-filter="frontend"
              onClick={handleFilterClick}
            >
              Frontend
            </button>
            <button
              className="filter-btn"
              data-filter="fullstack"
              onClick={handleFilterClick}
            >
              Full-Stack
            </button>
            <button
              className="filter-btn"
              data-filter="design"
              onClick={handleFilterClick}
            >
              Design
            </button>
            <button
              className="filter-btn"
              data-filter="webapp"
              onClick={handleFilterClick}
            >
              Web App
            </button>
          </div>

          <div className="projects-grid">
            <div className="project-card featured" data-category="fullstack">
              <div className="project-image">
                <img
                  src="https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App"
                  alt="E-Commerce Platform"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      {" "}
                      <span>💻</span> Code{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">E-Commerce Platform</h3>
                  <span className="project-category">Full-Stack</span>
                </div>
                <p className="project-description">
                  A modern e-commerce platform built with React and Node.js,
                  featuring shopping cart, payment integration, and admin
                  dashboard.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Node.js</span>
                  <span className="project-tag">MongoDB</span>
                  <span className="project-tag">Stripe</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="frontend">
              <div className="project-image">
                <img
                  src="https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App"
                  alt="Weather Dashboard"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      {" "}
                      <span>💻</span> Code{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Weather Dashboard</h3>
                  <span className="project-category">Frontend</span>
                </div>
                <p className="project-description">
                  Clean and intuitive weather dashboard with location search,
                  7-day forecast, and beautiful animations.
                </p>
                <div className="project-tags">
                  <span className="project-tag">JavaScript</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">API</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="webapp">
              <div className="project-image">
                <img
                  src="https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager"
                  alt="Task Management App"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      {" "}
                      <span>💻</span> Code{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Task Management App</h3>
                  <span className="project-category">Web App</span>
                </div>
                <p className="project-description">
                  Productivity app with drag-and-drop functionality, project
                  collaboration, and deadline tracking.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">TypeScript</span>
                  <span className="project-tag">Firebase</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="design">
              <div className="project-image">
                <img
                  src="https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site"
                  alt="Portfolio Website"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      {" "}
                      <span>💻</span> Code{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Creative Portfolio</h3>
                  <span className="project-category">Design</span>
                </div>
                <p className="project-description">
                  Responsive portfolio website for a graphic designer with
                  interactive galleries and smooth animations.
                </p>
                <div className="project-tags">
                  <span className="project-tag">HTML5</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">GSAP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>
              I'm always interested in hearing about new opportunities and
              projects. Feel free to reach out!
            </p>

            <form
              id="contact-form"
              className="contact-form"
              onSubmit={handleFormSubmit}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onInput={handleInputValidation}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onInput={handleInputValidation}
                    required
                  />
                  {/* <!-- TODO: Add error message element here --> */}
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    onInput={handleInputValidation}
                    required
                  ></textarea>
                  {/* <!-- TODO: Add error message element here --> */}
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2026 Henrik Zabel. All rights reserved.</p>
            <div className="social-links">
              <a href="https://github.com/henrikzabel" className="social-link">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/henrikzabel"
                className="social-link"
              >
                LinkedIn
              </a>
              <a href="https://x.com/zabelhenrik" className="social-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
