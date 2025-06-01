import React, { useState } from "react";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";

interface FormData {
  userType: "brand" | "creator" | "";
  fullName: string;
  companyName: string;
  role: string;
}

interface Step {
  label: string;
  key: keyof FormData;
  placeholder?: string;
  optional?: boolean;
  type?: "text" | "select";
}

interface BrandInfoStepFormProps {
  isSaving: boolean;
  handleSubmitForm: (data: FormData) => Promise<void>;
}

const steps: Step[] = [
  {
    label: "Are you signing up as a Brand or Creator?",
    key: "userType",
    type: "select",
  },
  { label: "Full Name", key: "fullName", placeholder: "Enter your full name" },
  {
    label: "Company Name",
    key: "companyName",
    placeholder: "Enter your company name",
    optional: true,
  },
  { label: "Role", key: "role", placeholder: "Enter your role" },
];

const OnBoardingFlow: React.FC<BrandInfoStepFormProps> = ({
  handleSubmitForm,
  isSaving,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    fullName: "",
    companyName: "",
    role: "",
  });

  const currentStep = steps[stepIndex];

  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const next = async () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      await handleSubmitForm(formData);
    }
  };

  const back = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const skip = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-4">{currentStep.label}</h2>

      <div className="transition-opacity duration-300 ease-in-out opacity-100">
        {currentStep.type === "select" ? (
          <ToggleButtonGroup
            color="primary"
            value={formData.userType}
            exclusive
            onChange={(_, value) => value && handleChange(value)}
            fullWidth
          >
            <ToggleButton value="brand">Brand</ToggleButton>
            <ToggleButton value="creator">Creator</ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            placeholder={currentStep.placeholder}
            value={formData[currentStep.key] as string}
            onChange={handleInputChange}
          />
        )}
      </div>

      <div className="flex justify-end mt-6 gap-2">
        {/* <Button variant="outlined" disabled={stepIndex === 0} onClick={back}>
          Back
        </Button> */}

        {currentStep.optional && (
          <Button variant="text" onClick={skip}>
            Skip
          </Button>
        )}

        <Button variant="contained" onClick={next}>
          {stepIndex === steps.length - 1 ? (
            isSaving ? (
              <CircularProgress sx={{ color: "#fff" }} size={"1.2em"} />
            ) : (
              "Submit"
            )
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnBoardingFlow;
