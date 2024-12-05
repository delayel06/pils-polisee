import React, { useEffect, useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper"; // Assuming this is a custom wrapper component
import LoadingScreen from "./LoadingScreen"; // Import LoadingScreen component

const styles = {
  pageContainer: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem 2rem",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  websiteName: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#1d4ed8",
    marginBottom: "1rem",
  },
  scoreSection: {
    textAlign: "center",
    margin: "1rem 0",
  },
  trustScore: (score) => ({
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: score >= 75 ? "#10b981" : "#f97316",
  }),
  severitySection: (severity) => ({
    margin: "2rem 0",
    padding: "1rem",
    borderLeft: "5px solid",
    borderRadius: "5px",
    background: {
      Red: "#fee2e2",
      Orange: "#ffedd5",
      Yellow: "#fef9c3",
      Green: "#d1fae5",
    }[severity],
    borderColor: {
      Red: "#ef4444",
      Orange: "#f97316",
      Yellow: "#facc15",
      Green: "#10b981",
    }[severity],
  }),
  severityTitle: {
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
  },
  severityList: {
    listStyleType: "none",
    paddingLeft: "1rem",
  },
  severityItem: {
    marginBottom: "0.5rem",
    lineHeight: "1.5",
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: "20%",
  },
  errorContainer: {
    textAlign: "center",
    marginTop: "20%",
  },
  messageText: {
    fontSize: "1.5rem",
    color: "#555",
  },
};

const NewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY; 
      const websiteName = window.location.pathname.split("/").pop(); // Dynamic website name

      try {
        const response = await fetch(
          `https://patient-bush-a521.delayel06.workers.dev/web/${websiteName}`,
          { headers: { apikey: apiKey } }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteData();
  }, []);

  if (loading) {
    return <LoadingScreen setLoading={setLoading} />;
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.messageText}>Error fetching data. Please try again later.</h2>
      </div>
    );
  }

  const { website_name, information, final_score } = data;

  const groupedInfo = information.reduce((acc, info) => {
    if (!acc[info.severity_tag]) {
      acc[info.severity_tag] = [];
    }
    acc[info.severity_tag].push(info);
    return acc;
  }, {});

  const severityOrder = ["Red", "Orange", "Yellow", "Green"];
  const severityTitles = {
    Red: "High Risk",
    Orange: "Moderate Risk",
    Yellow: "Low Risk",
    Green: "Good Practices",
  };

  return (
    <BackgroundWrapper>
      <div style={styles.pageContainer}>
        <h1 style={styles.websiteName}>{website_name}</h1>
        <div style={styles.scoreSection}>
          <h2 style={styles.trustScore(final_score)}>
            Trust Score: {final_score}/100
          </h2>
        </div>
        {severityOrder.map((severity) =>
          groupedInfo[severity] ? (
            <div key={severity} style={styles.severitySection(severity)}>
              <h3 style={styles.severityTitle}>{severityTitles[severity]}</h3>
              <ul style={styles.severityList}>
                {groupedInfo[severity].map((info, index) => (
                  <li key={index} style={styles.severityItem}>
                    <strong>{info.title}:</strong> {info.details}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default NewPage;
