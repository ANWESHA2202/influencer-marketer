import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";

interface Step {
  label: string;
  key: keyof UserData;
  placeholder: string;
  optional?: boolean;
}

interface UserData {
  fullName: string;
  companyName: string;
  role: string;
}

interface BrandInfoStepFormProps {
  handleSubmitForm: (data: UserData) => Promise<void>;
  isSaving: boolean;
}

const steps: Step[] = [
  { label: "Full Name", key: "fullName", placeholder: "Enter your full name" },
  {
    label: "Company Name",
    key: "companyName",
    placeholder: "Enter your company name",
    optional: true,
  },
  { label: "Role", key: "role", placeholder: "Enter your role" },
];

const BrandInfoStepForm: React.FC<BrandInfoStepFormProps> = ({
  handleSubmitForm,
  isSaving,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    companyName: "",
    role: "",
  });

  const currentStep = steps[stepIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [currentStep.key]: e.target.value });
  };

  const next = async () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      console.log("Form submitted:", formData);
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
    <div className="w-full  h-fit max-w-md mx-auto  rounded-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-4">{currentStep.label}</h2>

      <div className="transition-opacity duration-300 ease-in-out opacity-100">
        <TextField
          fullWidth
          variant="outlined"
          placeholder={currentStep.placeholder}
          value={formData[currentStep.key]}
          onChange={handleChange}
        />
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

export default BrandInfoStepForm;
