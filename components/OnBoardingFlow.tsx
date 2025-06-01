import React, { useState } from "react";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormData {
  userType: "brand" | "creator" | "";
  fullName: string;
  phoneNumber: string;
  companyName: string;
  role: string;
}

interface Step {
  label: string;
  key: keyof FormData;
  placeholder?: string;
  optional?: boolean;
  type?: "text" | "select" | "phone";
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
    label: "Phone Number",
    key: "phoneNumber",
    type: "phone",
  },
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
    phoneNumber: "",
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
      {/* Custom styles for phone input to match Material-UI */}
      <style jsx global>{`
        .react-tel-input {
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        }

        .react-tel-input .form-control {
          width: 100%;
          height: 56px;
          padding: 16.5px 14px 16.5px 58px;
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 4px;
          font-size: 16px;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          background-color: transparent;
          transition: border-color 0.15s ease-in-out;
        }

        .react-tel-input .form-control:focus {
          border-color: #1976d2;
          border-width: 2px;
          outline: none;
        }

        .react-tel-input .flag-dropdown {
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 4px 0 0 4px;
          background-color: transparent;
          height: 56px;
        }

        .react-tel-input .flag-dropdown:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }

        .react-tel-input .flag-dropdown.open {
          background-color: rgba(0, 0, 0, 0.04);
        }

        .react-tel-input .selected-flag {
          padding: 0 8px;
          height: 54px;
        }

        .react-tel-input .country-list {
          border-radius: 4px;
          box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
            0px 8px 10px 1px rgba(0, 0, 0, 0.14),
            0px 3px 14px 2px rgba(0, 0, 0, 0.12);
        }
      `}</style>

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
        ) : currentStep.type === "phone" ? (
          <PhoneInput
            country={"in"}
            value={formData.phoneNumber}
            onChange={(phone) => handleChange(phone)}
            inputProps={{
              name: "phoneNumber",
              required: true,
            }}
            containerStyle={{
              width: "100%",
            }}
            inputStyle={{
              width: "100%",
            }}
          />
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
