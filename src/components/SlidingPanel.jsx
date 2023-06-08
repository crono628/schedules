import steps from './instructions'

const SlidingPanel = ({ show, togglePanel }) => {
  return (
    <div className={`sliding-panel ${show ? 'open' : ''}`}>
      <button onClick={togglePanel} className="sliding-btn">
        Hide Instructions
      </button>
      <div className="panel-title">To Create a Schedule:</div>
      <div className="panel-content">
        <ol>
          {steps.vse.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
          {steps.pactPlanner.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
        </ol>
      </div>
      <div className="panel-title">To Setup your Intake Group:</div>
      <div className="panel-content">
        <ol>
          {steps.intakeSetup.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default SlidingPanel
