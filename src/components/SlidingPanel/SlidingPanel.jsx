import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import steps from '../instructions'
import './SlidingPanel.css'
import { Card } from '@mui/material'

const cardStyle = {
  padding: '1rem',
  marginBottom: '1rem'
}

const SlidingPanel = ({ show, toggleDrawer }) => {
  return (
    <Drawer
      anchor="right"
      onClose={toggleDrawer}
      open={show}
      sx={{
        zIndex: 0,
        width: '33vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '35vw',
          boxSizing: 'border-box',
          paddingTop: '64px'
        }
      }}
    >
      <div>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Room Control</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {steps.roomControl.map((step, i) => (
                <ListItem key={i}>
                  <ListItemText primary={step.action} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion> */}

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Drag and Drop</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {steps.dragAndDrop.map((step, i) => (
                <ListItem key={i}>
                  <ListItemText primary={step.action} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Create a Schedule</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {steps.vse.map((step, i) => (
                <ListItem key={i}>
                  <ListItemText primary={step.action} />
                </ListItem>
              ))}
              {steps.pactPlanner.map((step, i) => (
                <ListItem key={i}>
                  <ListItemText primary={step.action} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Setup Intake Group:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {steps.intakeSetup.map((step, i) => (
                <ListItem key={i}>
                  <ListItemText primary={step.action} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <div className="sliding-panel-algo">
          <Card variant="outlined" sx={cardStyle}>
            The default sorting algorithm is intended to create balanced groups
            first and minimize busy times second. Drag and drop can be used to
            adjust the schedule to better fit the needs of the clinic and to
            further minimize busy times.
          </Card>
          <Card variant="outlined" sx={cardStyle}>
            The font-size slider and print options are set up for standard
            printer paper which is best depicted with a maximized browser
            window.
          </Card>
        </div>
      </div>
    </Drawer>
  )
}

export default SlidingPanel
