import React, { useState, useEffect } from 'react';

const TimeTracker = ({ setEntries, entries }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const [projects, setProjects] = useState([""]);
  const [startTime, setStartTime] = useState(null);

  const startTimer = () => {
    setIsActive(true);
    setStartTime(new Date());
  };

  const stopTimer = () => {
    setIsActive(false);
    const endTime = new Date();

    const entry = {
      time,
      date: new Date().toLocaleString(),
      description: taskDescription,
      project: selectedProject,
      billable: isBillable,
      startTime,
      endTime,
    };

    setEntries((prevEntries) => [...prevEntries, entry]);

    setTime(0);
    setTaskDescription('');
    setSelectedProject('');
    setIsBillable(false);
    setStartTime(null);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins < 10 ? '0' + mins : mins}m ${secs < 10 ? '0' + secs : secs}s`;
  };

  const handleProjectChange = (e) => {
    const value = e.target.value;
    if (value === "create") {
      const newProject = prompt("Enter the new project name:");
      if (newProject) {
        setProjects([...projects, newProject]);
        setSelectedProject(newProject);
      }
    } else {
      setSelectedProject(value);
    }
  };

  const toggleBillable = () => {
    setIsBillable(!isBillable);
  };

  const deleteEntry = (index) => {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <div className="time-tracker">
      <div className="input-group">
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe your task"
        />
      </div>
      <div className="input-group">
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="">Select a Project</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>{project}</option>
          ))}
          <option value="create">+ Create New Project</option>
        </select>
      </div>
      <div className="input-group">
        <span style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={toggleBillable}>
          {isBillable ? "💲" : "❌"}
        </span>
      </div>
      <div className="timer">
        <span>{formatTime(time)}</span>
      </div>
      <div className="controls">
        {!isActive ? (
          <button onClick={startTimer} style={{ backgroundColor: 'green', color: 'white' }}>Start</button>
        ) : (
          <button onClick={stopTimer} style={{ backgroundColor: 'red', color: 'white' }}>Stop</button>
        )}
      </div>

      <h3>Tracked Entries</h3>
      <table>
        <thead>
          <tr>
            <th>Task Description</th>
            <th>Project</th>
            <th>Billable</th>
            <th>Time Spent</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.description}</td>
              <td>{entry.project}</td>
              <td>{entry.billable ? '💲' : '❌'}</td>
              <td>{formatTime(entry.time)}</td>
              <td>
                <button 
                  onClick={() => deleteEntry(index)} 
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTracker;
