"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  // smooth scroll logic
  const scrollToSection = (id: string) => {
    const container = document.querySelector(`.${styles.mainContent}`) as HTMLElement | null;
    const target = document.getElementById(id);
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetTopRelative = targetRect.top - containerRect.top + container.scrollTop;
    const containerHeight = container.clientHeight;
    const targetHeight = targetRect.height;
    const baseOffset = Math.max(0, targetTopRelative - containerHeight / 2 + targetHeight / 2);
    const nudge = id === "skills" ? 115 : id === "contact" ? 55 : 0;
    const offset = Math.max(0, baseOffset - nudge);
    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  // card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // project cards
  const cards = [
    {
      title: "R.A.G System",
      subtitle: "AI-powered research assistant",
      description:
        "An AI-powered RAG system that retrieves relevant information and generates context-aware responses through a seamless FastAPI integration.",
      tech: ["Python", "FastAPI", "Langchain", "Ollama"],
      features: ["Context retrieval", "Citations & sources", "Conversational Q&A"],
      image: "ragsystem.png",
      repo: "https://github.com/Welpguyyy/R.A.G-System",
    },
    {
      title: "Amenity",
      subtitle: "A bible app for everyone",
      description:
        "A Bible app where users read daily, post anonymously, and grow a plant that withers if they miss a day.",
      tech: ["Next.js", "Typescript", "Vercel", "Supabase"],
      image: "amenity.png",
      repo: "https://github.com/Welpguyyy/amenity-proj",
    },
    {
      title: "Schedully",
      subtitle: "Schedule appointments with ease",
      description:
        "Schedully is an appointment system built for clinics, helping staff manage patient schedules, view appointments, and streamline daily operations.",
      tech: ["C#", "Winforms", "Msaccess"],
      image: "schedully.png",
      repo: "https://github.com/Welpguyyy/Schedully-Final-Project",
    },
  ];

  // form state
  const [active, setActive] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Error sending message.");
    }
  };

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>JE</div>
        <ul className={styles.navLinks}>
          <li>
            <button className={styles.navLinkBtn} onClick={() => scrollToSection("about")}>
              About
            </button>
          </li>
          <li>
            <button className={styles.navLinkBtn} onClick={() => scrollToSection("projects")}>
              Projects
            </button>
          </li>
          <li>
            <button className={styles.navLinkBtn} onClick={() => scrollToSection("skills")}>
              Skills
            </button>
          </li>
          <li>
            <button className={styles.navLinkBtn} onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </li>
        </ul>
        <div className={styles.profileCircle}></div>
      </nav>

      {/* Scrollable main content */}
      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.status}>Available for opportunities</div>
          <h1 className={styles.heroTitle}>
            Hi, I'm <span className={styles.name}>Joram Entice</span>
          </h1>
          <p className={styles.heroSubtitle}>
            I craft exceptional digital experiences that blend innovative design with robust
            engineering. Specializing in building accessible, high-performance web applications.
          </p>
          <div className={styles.buttons}>
            <a href="/resume.pdf" className={styles.secondaryBtn}>
              Download Resume
            </a>
          </div>
          <div className={styles.icons}>
            <a href="https://www.facebook.com/zhient.ntc" target="_blank" rel="noopener noreferrer">
              <Image src="/facebook-boxed-svgrepo-com.svg" alt="Facebook" width={28} height={28} />
            </a>
            <a href="https://github.com/Welpguyyy" target="_blank" rel="noopener noreferrer">
              <Image src="/github-svgrepo-com.svg" alt="GitHub" width={28} height={28} />
            </a>
            <a href="mailto:zhient123@gmail.com">
              <Image
                src="/mail_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt="Mail"
                width={28}
                height={28}
              />
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className={styles.about} id="about">
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h4 className={styles.sectionLabel}>ABOUT ME</h4>
              <h2 className={styles.sectionTitle}>Building the future, one line at a time</h2>
              <p>
                I’m an aspiring backend developer with hands-on experience building over 10+
                projects throughout my academic journey. I’m passionate about creating efficient,
                scalable, and secure systems that power great digital experiences.
              </p>
              <p>
                I’m currently pursuing my degree in Computer Engineering and continuously learning
                modern backend technologies, frameworks, and best practices. My goal is to become a
                well-rounded developer capable of building reliable backend systems that make an
                impact.
              </p>
              <p>
                When I’m not coding, I enjoy exploring new tools, improving my problem-solving
                skills, and collaborating with others on projects that help me grow as a developer.
              </p>
            </div>
            <div className={styles.aboutStats}>
              <div className={styles.statCard}>
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div className={styles.statCard}>
                <h3>2+</h3>
                <p>Years of learning Experience</p>
              </div>
              <div className={styles.statCard}>
                <p>Always Open to Collaborations</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className={styles.projects} id="projects">
          <h4 className={styles.sectionLabel}>FEATURED Projects</h4>
          <h2 className={styles.sectionTitle}>Projects that built my backend skills.</h2>
          <p className={styles.sectionSubtitle}>
            As a student developer, I’ve worked on several projects that helped me apply and
            strengthen my backend skills. Each project reflects my growth in building functional
            systems, whether working independently or as part of a team.
          </p>

          <div className={styles.deckRow}>
            <button
              className={styles.controlBtn}
              aria-label="Previous project"
              onClick={() => setActive((active - 1 + cards.length) % cards.length)}
            >
              ‹
            </button>

            <div className={styles.deck}>
              {cards.map((card, i) => {
                const leftIndex = (active - 1 + cards.length) % cards.length;
                const rightIndex = (active + 1) % cards.length;
                let posClass = "";
                if (i === active) posClass = styles.center;
                else if (i === leftIndex) posClass = styles.left;
                else if (i === rightIndex) posClass = styles.right;
                const isActive = i === active;

                return (
                  <div
                    key={i}
                    className={`${styles.flipCard} ${posClass}`}
                    tabIndex={isActive ? 0 : -1}
                    role={isActive ? "button" : undefined}
                    aria-hidden={!isActive}
                    aria-label={isActive ? `Project card: ${card.title}` : undefined}
                  >
                    <div className={styles.flipInner}>
                      <div className={styles.flipFront}>
                        <div className={styles.projectImage}>
                          {card.image && (
                            <Image
                              src={`/${card.image}`}
                              alt={`${card.title} screenshot`}
                              width={520}
                              height={300}
                            />
                          )}
                        </div>
                        <div className={styles.projectInfo}>
                          <h3>{card.title}</h3>
                          <p>{card.subtitle}</p>
                        </div>
                      </div>
                      <div className={styles.flipBack}>
                        <div className={styles.backContent}>
                          <div className={styles.backDescription}>
                            <p>{card.description}</p>
                          </div>
                          <div className={styles.backTech}>
                            <div className={styles.techStack}>
                              {card.tech.map((t) => (
                                <span key={t}>{t}</span>
                              ))}
                            </div>
                            {card.repo && (
                              <div style={{ marginTop: 8 }}>
                                <a
                                  href={card.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.repoBtn}
                                >
                                  View Repo
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className={styles.controlBtn}
              aria-label="Next project"
              onClick={() => setActive((active + 1) % cards.length)}
            >
              ›
            </button>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className={styles["skills-section"]} id="skills">
          <div className={styles["skills-container"]}>
            <div className={styles["skills-header"]}>
              <p className={styles["skills-subtitle"]}>Skills & Expertise</p>
              <h2 className={styles["skills-title"]}>What I bring to the table</h2>
              <p className={styles["skills-desc"]}>
                A comprehensive skill set built through years of hands-on experience and continuous
                learning.
              </p>
            </div>

            <div className={styles["skills-grid"]}>
              {[
                {
                  title: "Frontend Development",
                  skills: [
                    { name: "Next.js", level: "Advanced" },
                    { name: "TypeScript", level: "Advanced" },
                    { name: "CSS", level: "Intermediate" },
                    { name: "HTML", level: "Intermediate" },
                    { name: "Python", level: "Intermediate" },
                  ],
                },
                {
                  title: "Backend Development",
                  skills: [
                    { name: "PostgreSQL", level: "Beginner" },
                    { name: "Supabase", level: "Advanced" },
                    { name: "FastAPI", level: "Beginner" },
                    { name: "Node.js", level: "Intermediate" },
                    { name: "Postman", level: "Intermediate" },
                  ],
                },
                {
                  title: "Tools & Technologies",
                  skills: [
                    { name: "Github", level: "Expert" },
                    { name: "Git", level: "Expert" },
                    { name: "Figma", level: "Intermediate" },
                    { name: "VScode", level: "Expert" },
                    { name: "ngrok", level: "Intermediate" },
                    { name: "Vercel", level: "Advanced" },
                  ],
                },
                {
                  title: "Soft Skills",
                  skills: [
                    { name: "Team Leadership", level: "Advanced" },
                    { name: "Communication", level: "Expert" },
                    { name: "Problem Solving", level: "Expert" },
                    { name: "Agile/Scrum", level: "Advanced" },
                  ],
                },
              ].map((category, i) => (
                <motion.div
                  key={category.title}
                  className={styles["skill-card"]}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <h3 className={styles["skill-card-title"]}>{category.title}</h3>
                  <ul className={styles["skill-list"]}>
                    {category.skills.map((skill) => (
                      <li key={skill.name} className={styles["skill-item"]}>
                        <span>{skill.name}</span>
                        <span className={styles["skill-badge"]}>{skill.level}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className={styles.section} id="contact">
          <h3 className={styles.contactSubtitle}>Get In Touch</h3>
          <h2 className={styles.title}>Let's work together</h2>
          <p className={styles.description}>
            Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message
            and I'll get back to you as soon as possible.
          </p>

          <div className={styles.contactCards}>
            <div className={styles.card}>
              <i className={`fas fa-envelope ${styles.icon}`}></i>
              <h4>Email</h4>
              <p>zhient123@gmail.com</p>
            </div>

            <div className={styles.card}>
              <i className={`fas fa-phone ${styles.icon}`}></i>
              <h4>Phone</h4>
              <p>0969 210 7780</p>
            </div>

            <div className={styles.card}>
              <i className={`fas fa-map-marker-alt ${styles.icon}`}></i>
              <h4>Location</h4>
              <p>Cebu City</p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="youremail@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label>Message</label>
            <textarea
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>

            <button type="submit" className={styles.button}>
              Send Message
            </button>

            {status && <p className={styles.status}>{status}</p>}
          </form>

          <footer className={styles.footer}>© 2025 Joram Entice. All rights reserved.</footer>
        </section>
      </main>
    </div>
  );
}
