import React, { useState } from "react";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CampaignInfluencer } from "./CampaignInfluencerTable";

interface Props {
  influencers: CampaignInfluencer[];
  onClose: () => void;
  open: boolean;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const ComparisonModal: React.FC<Props> = ({ influencers, onClose, open }) => {
  const [chartType, setChartType] = useState<"bar" | "radar">("bar");

  const chartData = influencers.map((inf, idx) => ({
    name: `Influencer ${idx + 1}`,
    Offered: inf.offered_rate,
    Negotiated: inf.negotiated_rate,
    Final: inf.final_rate,
    Deliverables: inf.deliverables_total,
    Completed: inf.deliverables_completed,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Compare Negotiations</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" mb={1}>
            Chart Type
          </Typography>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
            size="small"
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="radar">Radar Chart</MenuItem>
          </Select>
        </Box>

        <Box width="100%" height={400}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Offered" fill="#8884d8" />
                <Bar dataKey="Negotiated" fill="#82ca9d" />
                <Bar dataKey="Final" fill="#ffc658" />
                <Bar dataKey="Deliverables" fill="#ff7f50" />
                <Bar dataKey="Completed" fill="#4ade80" />
              </BarChart>
            ) : (
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Tooltip />
                <Legend />
                <Radar
                  name="Offered"
                  dataKey="Offered"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Negotiated"
                  dataKey="Negotiated"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Final"
                  dataKey="Final"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Deliverables"
                  dataKey="Deliverables"
                  stroke="#ff7f50"
                  fill="#ff7f50"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Completed"
                  dataKey="Completed"
                  stroke="#4ade80"
                  fill="#4ade80"
                  fillOpacity={0.6}
                />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </Box>
    </Modal>
  );
};

export default ComparisonModal;
