import Accordion from '../Accordion/Accordion'
import steps from '../instructions'
import './SlidingPanel.css'

const SlidingPanel = ({ show }) => {
  return (
    <div className={`sliding-panel ${show ? 'open' : ''}`}>
      <Accordion title="Create a Schedule">
        <ol>
          {steps.vse.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
          {steps.pactPlanner.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
        </ol>
      </Accordion>

      <Accordion title="Setup Intake Group:">
        <ol>
          {steps.intakeSetup.map((step, i) => (
            <li key={i}>{step.action}</li>
          ))}
        </ol>
      </Accordion>
    </div>
  )
}

export default SlidingPanel
