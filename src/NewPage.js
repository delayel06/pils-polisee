import React, { useEffect} from 'react';

import BackgroundWrapper from './BackgroundWrapper'; // Assuming this is a custom component


const styles = `
  body {
    min-height: 400px;
    display: flex;
    flex-direction: column;
  }

  .status-container {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #e5e7eb;
  }

  .dark .status-container {
    border-bottom: 1px solid #374151;
  }

  #status-text {
    font-size: 1.1rem;
    font-weight: 500;
  }

  #upload-button {
    margin: 20px auto;
    padding: 10px 24px;
    background-color: #4F46E5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  #upload-button:hover {
    background-color: #4338CA;
    transform: translateY(-1px);
  }

  .dark #upload-button {
    background-color: #6366F1;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    flex-grow: 1;
  }

  .empty-state-icon {
    font-size: 3rem;
    color: #D1D5DB;
    margin-bottom: 16px;
  }

  .empty-state-text {
    color: #6B7280;
    font-size: 1rem;
    margin-bottom: 24px;
    max-width: 300px;
    line-height: 1.5;
  }

  .dark .empty-state-icon {
    color: #4B5563;
  }

  .dark .empty-state-text {
    color: #9CA3AF;
  }
`;

const NewPage = () => {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const initializeDarkMode = () => {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      document.body.classList.toggle('dark', isDarkMode);
    };

    const main = async () => {
      const apiKey = 'saleputes';
      const websiteName = 'example'; // Replace with actual logic to get website name

      try {
        const response = await fetch(
          `https://patient-bush-a521.delayel06.workers.dev/web/${websiteName}`,
          { headers: { 'apikey': apiKey } }
        );

        if (response.ok) {
          const data = await response.json();
          updateStatus(true, websiteName);
          displayScore(data.final_score ?? 0);
          updatePopup(data);
          addAlternativeBtn(websiteName);
        } else {
          updateStatus(false, websiteName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        updateStatus(false, websiteName);
      }
    };

    const updateStatus = (isAllowed, websiteName) => {
      const statusText = document.getElementById('status-text');
      const uploadButton = document.getElementById('upload-button');
      const infoContainer = document.getElementById('info-container');

      statusText.textContent = isAllowed ? websiteName : 'Not In Database';
      statusText.style.color = isAllowed ? '#10b981' : '#ef4444';
      uploadButton.style.display = isAllowed ? 'none' : 'flex';

      if (!isAllowed) {
        infoContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-file-alt empty-state-icon"></i>
            <p class="empty-state-text">
              This website's privacy policy hasn't been analyzed yet. 
              Help the community by submitting it for analysis!
            </p>
          </div>
        `;
        uploadButton.innerHTML = `
          <i class="fas fa-upload"></i>
          Submit Privacy Policy
        `;
      }
    };

    const displayScore = (score) => {
      const scoreContainer = document.getElementById('score-container');
      let color;
      if (score <= 25) color = '#ef4444';
      else if (score <= 50) color = '#f97316';
      else if (score <= 75) color = '#eab308';
      else color = '#10b981';

      scoreContainer.innerHTML = `
        <div class="score-label">Trust Score</div>
        <div>
          <span class="score-value" style="color: ${color}">${score}</span>
          <span class="score-max">/100</span>
        </div>
      `;
    };

    const updatePopup = (data) => {
      const infoContainer = document.getElementById('info-container');
      infoContainer.innerHTML = '';

      const groupedInfo = data.information.reduce((acc, info) => {
        if (!acc[info.severity_tag]) {
          acc[info.severity_tag] = [];
        }
        acc[info.severity_tag].push(info);
        return acc;
      }, {});

      const severityOrder = ['Red', 'Orange', 'Yellow', 'Green'];

      severityOrder.forEach(severity => {
        if (groupedInfo[severity]) {
          const infos = groupedInfo[severity];
          const severityDiv = document.createElement('div');
          severityDiv.className = `severity-group ${severity.toLowerCase()}`;

          const title = severity === 'Red' ? 'High Risk' : 
            severity === 'Orange' ? 'Moderate Risk' :
            severity === 'Yellow' ? 'Low Risk' : 
            'Good Practices';

          severityDiv.innerHTML = `
            <div class="severity-header">
              <i class="fas fa-${getSeverityIcon(severity)}"></i>
              <h3 class="severity-title">${title}</h3>
            </div>
            <ul class="severity-list">
              ${infos.map(info => `<li>${info.title}</li>`).join('')}
            </ul>
          `;
          infoContainer.appendChild(severityDiv);
        }
      });
    };

    const getSeverityIcon = (severity) => {
      switch (severity.toLowerCase()) {
        case 'red': return 'exclamation-circle';
        case 'orange': return 'exclamation';
        case 'yellow': return 'exclamation-triangle';
        case 'green': return 'check-circle';
        default: return 'info-circle';
      }
    };

    const addAlternativeBtn = (websiteName) => {
      const existingButton = document.querySelector('.google-search-button');
      if (existingButton) {
        existingButton.remove();
      }

      const searchButton = document.createElement('button');
      searchButton.className = 'google-search-button';
      searchButton.innerHTML = `
        <i class="fa-solid fa-arrow-right"></i>
        See alternatives to ${websiteName} 
      `;

      searchButton.addEventListener('click', () => {
        const searchUrl = `https://alternativeto.net/software/${encodeURIComponent(websiteName)}`;
        window.open(searchUrl, '_blank');
      });

      const scoreContainer = document.getElementById('score-container');
      scoreContainer.parentNode.insertBefore(searchButton, scoreContainer);
    };

    document.addEventListener('DOMContentLoaded', () => {
      initializeDarkMode();
      main();
    });

    return () => {
      document.removeEventListener('DOMContentLoaded', main);
    };
  }, []);

  return (
    <BackgroundWrapper>
      <div className="status-container">
        <i id="status-icon" className="fas"></i>
        <span id="status-text"></span>
      </div>
      <div id="info-container"></div>
      <button id="upload-button"></button>
      <div id="score-container"></div>
    </BackgroundWrapper>
  );
};

export default NewPage;