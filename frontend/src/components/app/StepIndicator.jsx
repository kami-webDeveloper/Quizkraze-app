import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const green = "#22C55E";
const gray = "#e0e0e0";
const darkGray = "#9e9e9e";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
    borderColor: gray,
    transition: "border-color 300ms ease",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: green,
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: green,
  },

  "@media (prefers-color-scheme: dark)": {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#4b5563",
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
      borderColor: green,
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
      borderColor: green,
    },
  },
}));

const StepIconRoot = styled("div")(({ ownerState }) => ({
  color: darkGray,
  display: "flex",
  height: 22,
  alignItems: "center",
  transition: "color 300ms ease",

  "& .StepIcon-completedIcon": {
    color: green,
    zIndex: 1,
    fontSize: 18,
    opacity: 0,
    transform: "scale(0.8)",
    transition: "all 300ms ease",
  },
  "& .StepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    transition: "background-color 300ms ease",
  },

  ...(ownerState.active && {
    color: green,
  }),
  ...(ownerState.completed && {
    "& .StepIcon-completedIcon": {
      opacity: 1,
      transform: "scale(1)",
    },
    color: green,
  }),

  "@media (prefers-color-scheme: dark)": {
    color: "#9ca3af",
    ...(ownerState.active && {
      color: green,
    }),
    ...(ownerState.completed && {
      "& .StepIcon-completedIcon": {
        opacity: 1,
        transform: "scale(1)",
      },
      color: green,
    }),
  },
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <StepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <Check className="StepIcon-completedIcon" />
      ) : (
        <div className="StepIcon-circle" />
      )}
    </StepIconRoot>
  );
}

const steps = ["Quiz Details", "Add Questions", "Review & Submit"];

export default function StepIndicator({ step }) {
  return (
    <Stack sx={{ width: "100%", mb: 6 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step - 1}
        connector={<CustomConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              sx={{
                "& .MuiStepLabel-label": {
                  fontWeight: 600,
                  color: "#d1d5db",
                  "@media (prefers-color-scheme: dark)": {
                    color: "#d1d5db", // gray-300
                  },
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "#2563eb", // blue-600 (or whatever you want for active step)
                  "@media (prefers-color-scheme: dark)": {
                    color: "#3b82f6", // blue-500 for dark mode active label
                  },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
