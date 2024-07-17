const steps = {
  vse: [
    {
      action: 'Open VSE'
    },
    {
      action: 'Click "Daily Appointment List" on the left'
    },
    {
      action:
        'Click the dropdown for "Select Clinic List" and choose your list containing the entire firm'
    },
    {
      action:
        'Sort the list by clinic by clicking the triangle arrow in the "Clinic" column'
    }
  ],
  pactPlanner: [
    {
      action:
        'Open PACT Planner. It is recommended to have VSE and PACT Planner open side by side when creating the schedule'
    },
    {
      action: 'Choose the firm you are setting up'
    },
    {
      action:
        'Choose the first team to setup that is listed on VSE in the "Clinic" column'
    },
    {
      action:
        'Check off the boxes for appointments; appointments are listed under "Appt Time" column in VSE'
    },
    {
      action: 'Click submit'
    },
    {
      action:
        "Scroll down VSE to show the next team to choose listed in the 'Clinic' column"
    },
    {
      action:
        'Repeat steps 7 through 10 until all teams are input to PACT Planner'
    },
    {
      action: 'Choose the desired number of rooms'
    }
  ],
  intakeSetup: [
    {
      action: 'Open VSE'
    },
    {
      action: 'Click "Clinic List Management" on the left'
    },
    {
      action:
        'Click "Edit" for your assigned group. If you do not have a list named after your assigned group (ex. – Group 1), click "Create New Clinic List" and name it to match your group'
    },
    {
      action:
        'At the bottom, choose the clinics from the left list that match your group and add them to the list on the right. Only teams that match your group should be listed on the right.'
    },
    {
      action: 'Click "Save List" or "Create List"'
    },
    {
      action: 'Click "Daily Workflow List" on the left'
    },
    {
      action:
        'Click the dropdown for "Select Clinic List" and choose your group'
    }
  ],
  roomControl: [
    {
      action:
        'Click the plus or minus button to increase or decrease the number of rooms'
    },
    {
      action:
        'If the number of rooms is greater than 1 and the number of appointments is greater than 2, the drag and drop feature will be enabled'
    },
    {
      action:
        'The default sorting algorithm may unintentionally create busy times. Drag and drop can be used to adjust the schedule to better fit the needs of the clinic'
    }
  ],
  dragAndDrop: [
    {
      action: 'Disabling drag and drop will reset any changes made using it.'
    },
    {
      action:
        'Clicking submit or changing the number of rooms will also disable drag and drop, which will need to be reenabled to continue using it.'
    },
    {
      action:
        "It's best to use drag and drop once the number of rooms is decided and all clinics have been entered."
    }
  ]
}

export default steps
