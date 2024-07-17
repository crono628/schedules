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

const SlidingPanel = ({ show }) => {
  return (
    <Drawer
      anchor="right"
      open={show}
      sx={{
        zIndex: 0,
        width: '33vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '33vw',
          boxSizing: 'border-box',
          paddingTop: '64px'
        }
      }}
    >
      <div>
        <Accordion>
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
        </Accordion>

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
      </div>
    </Drawer>
  )
}

export default SlidingPanel
