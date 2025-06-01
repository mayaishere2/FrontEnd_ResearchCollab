import React, { useState, useEffect } from "react";
import "./ResearchPaper.css";

const pages = [
  {
    id: "whatIs",
    title: "What is a research paper?",
    content: (
      <>
        <p>
          A research paper is:
          <ul>
            <li>A formal piece of writing.</li>
            <li>
              Based on original research (your own experiments or analysis) or
              existing research (using other people’s work to build an argument
              or review a topic).
            </li>
            <li>A way to answer a question, prove a point, or explore an issue.</li>
          </ul>
        </p>
      </>
    ),
    cardLabel: "What is a research paper?",
  },
  {
    id: "typicalStructure",
    title: "Typical Structure",
    content: (
      <>
        <p>
          Title – The topic of your paper.
          <br />
          Abstract – A short summary of the whole paper (what was done, how, and
          what was found).
          <br />
          Introduction – Introduces the topic and explains why it’s important.
          It often includes a research question or hypothesis.
          <br />
          Literature Review –{" "}
          <span
            className="link"
            role="button"
            tabIndex={0}
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("openPopup", {
                  detail: "typicalStructure",
                })
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.dispatchEvent(
                  new CustomEvent("openPopup", {
                    detail: "typicalStructure",
                  })
                );
              }
            }}
          >
            click for more...
          </span>
        </p>
      </>
    ),
    cardLabel: "Typical Structure",
    popupContent: (
      <>
        <h2>Literature Review</h2>
        <p>
          An overview of existing research on your topic. This section identifies
          gaps in knowledge and shows how your study fits into the broader field.
          It critically analyses previous studies and theories, establishing the
          context and rationale for your research.
        </p>
        <h2>Methodology</h2>
        <p>
          Describes the methods you used to conduct your research, including
          participants, tools, procedures, and data analysis techniques. This
          section must be detailed enough to allow replication.
        </p>
        <h2>Results</h2>
        <p>
          Presents the findings of your research, often including tables, charts,
          and statistics. This section is objective and factual without
          interpretation.
        </p>
        <h2>Discussion</h2>
        <p>
          Interprets your results in the context of the research question and
          existing literature. Here you discuss implications, limitations, and
          possible future research.
        </p>
        <h2>Conclusion</h2>
        <p>
          Summarises the main findings and their significance. It may also suggest
          recommendations or practical applications.
        </p>
        <h2>References</h2>
        <p>
          A list of all sources cited in your paper, formatted according to a
          specific citation style (e.g., APA, MLA).
        </p>
        <h2>Appendices</h2>
        <p>
          (Optional) Supplementary material such as raw data, questionnaires, or
          additional figures.
        </p>
      </>
    ),
  },
  {
    id: "howWebsiteHelps",
    title: "How this website helps",
    content: (
      <>
        <p>
          This platform connects students with research teams and supervisors,
          making it easier to find and join research opportunities—just like
          LinkedIn, but for research.
          <br />
          You can:
          <ul>
            <li>
              Discover projects and connect with professors or{" "}
              <span
                className="link"
                role="button"
                tabIndex={0}
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("openPopup", {
                      detail: "howWebsiteHelps",
                    })
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.dispatchEvent(
                      new CustomEvent("openPopup", {
                        detail: "howWebsiteHelps",
                      })
                    );
                  }
                }}
              >
                click for more...
              </span>
            </li>
          </ul>
        </p>
      </>
    ),
    cardLabel: "How This Website Helps",
    popupContent: (
      <>
        <p>research supervisors working in your area of interest.</p>
        <p>Save research ideas you have and find supervisors to help you develop them.</p>
        <p>Use AI-powered recommendations to identify relevant labs and experts tailored to your research interests.</p>
        <p>
          Collaborate within research labs officially monitored and approved by the scientific hub
          administration, ensuring quality and legitimacy.
        </p>
        <p>Create and manage research projects, build project dashboards, and add participants like students and researchers to foster teamwork.</p>
        <p>
          Search for supervisors and labs using AI-enhanced search features that suggest connections based on your project queries and interests.
        </p>
      </>
    ),
  },
];

export default function ResearchPaperWithSidebar() {
  const [activePage, setActivePage] = useState(0);
  const [fade, setFade] = useState(true);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const openHandler = (e) => {
      setPopup(e.detail);
    };
    window.addEventListener("openPopup", openHandler);
    return () => {
      window.removeEventListener("openPopup", openHandler);
    };
  }, []);

  const closePopup = () => setPopup(null);

  const handleCardClick = (index) => {
    if (index === activePage) return;
    setFade(false);
    setTimeout(() => {
      setActivePage(index);
      setFade(true);
    }, 300);
  };

  return (
    <div className="page-container">
      <aside className="sidebar" aria-label="Sidebar navigation">
        <nav>
          <ul>
            <li tabIndex={0}>Home</li>
            <li tabIndex={0}>Research Papers</li>
            <li tabIndex={0}>Projects</li>
            <li tabIndex={0}>Contact</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="container">
          <div className={`content ${fade ? "fade-in" : "fade-out"}`}>
            <h1>{pages[activePage].title}</h1>
            <div className="content-text">{pages[activePage].content}</div>
            <button className="ask-btn">Ask a question</button>
          </div>
          <div className="card-row" role="tablist" aria-label="Page navigation cards">
            {pages.map((page, i) => (
              <div
                key={page.id}
                className={`card ${activePage === i ? "active" : ""} ${
                  i === 1 ? "middle-card" : ""
                }`}
                onClick={() => handleCardClick(i)}
                aria-selected={activePage === i}
                role="tab"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCardClick(i);
                }}
              >
                <strong>{page.cardLabel}</strong>
              </div>
            ))}
          </div>
        </div>
      </main>

      {popup && (
        <div
          className="modal-overlay"
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button className="modal-close" onClick={closePopup} aria-label="Close popup">
              &times;
            </button>
            <div className="modal-scroll">{pages.find(p => p.id === popup).popupContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
