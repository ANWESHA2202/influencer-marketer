"use client";

import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "../common/DataTable";

export interface CampaignInfluencer {
  campaign_id: number;
  creator_id: number;
  offered_rate: number;
  negotiated_rate: number;
  final_rate: number;
  deliverables_total: number;
  deliverables_completed: number;
  status: "invited" | "accepted" | "completed" | string; // extend as needed
  invited_at: string; // ISO date string
  accepted_at: string;
  completed_at: string;
  id: number;
}

const creatordata: CampaignInfluencer[] = [
  {
    campaign_id: 1,
    creator_id: 101,
    offered_rate: 500,
    deliverables_total: 2,
    id: 1,
    negotiated_rate: 700,
    final_rate: 850,
    status: "invited",
    invited_at: "2025-05-31T21:40:20.596Z",
    accepted_at: "2025-06-01T12:00:00.000Z",
    completed_at: "2025-06-02T14:00:00.000Z",
    deliverables_completed: 1,
  },
  {
    campaign_id: 1,
    creator_id: 102,
    offered_rate: 600,
    deliverables_total: 3,
    id: 2,
    negotiated_rate: 800,
    final_rate: 900,
    status: "accepted",
    invited_at: "2025-05-31T21:40:20.596Z",
    accepted_at: "2025-06-01T14:00:00.000Z",
    completed_at: "2025-06-03T16:00:00.000Z",
    deliverables_completed: 3,
  },
];

const CampaignInfluencerTable = ({ campaignId }: { campaignId: string }) => {
  const [creatorsConnected, setCreatorsConnected] = useState(creatordata);
  const [loading, setLoading] = useState(false);

  const columns: TableColumn<CampaignInfluencer>[] = useMemo(
    () => [
      {
        headerName: "Creator ID",
        field: "creator_id",
        flex: 1,
        cellRenderer: (params: any) => {
          console.log(params);
          return <>dj</>;
        },
      },
      {
        headerName: "AI Match",
        field: "negotiated_rate",
        flex: 1,
        cellRenderer: (params: any) => {
          const rate = params.value;
          const level = rate > 800 ? "High" : "Medium";
          const color = level === "High" ? "#3b82f6" : "#60a5fa";
          return (
            <span style={{ color: color, fontWeight: "500" }}>🔥 {level}</span>
          );
        },
      },
      {
        headerName: "Est. Cost",
        field: "offered_rate",
        flex: 1,
      },
      {
        headerName: "Est. Views",
        field: "deliverables_total",
        flex: 1,
      },
      {
        headerName: "Followers",
        field: "deliverables_completed",
        flex: 1,
      },
      {
        headerName: "Engagement",
        field: "final_rate",
        flex: 1,
        cellRenderer: (params: any) => {
          const value = parseFloat(params.value);
          let emoji = "💚";
          if (value > 1000) emoji = "💚";
          else if (value > 500) emoji = "💛";
          else emoji = "❤️";
          return `${emoji} ${value.toFixed(0)}`;
        },
      },
      {
        headerName: "Status",
        field: "status",
        flex: 1,
        cellRenderer: (params: any) => {
          const status = params.value;
          let color = "";
          if (status === "invited") color = "#d1fae5";
          else if (status === "accepted") color = "#e5e7eb";
          else color = "#fef9c3";

          return (
            <span
              style={{
                background: color,
                padding: "4px 8px",
                borderRadius: "12px",
                fontWeight: 500,
              }}
            >
              {status}
            </span>
          );
        },
      },
    ],
    []
  );

  const onCreatorSelected = () => {};

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <DataTable<CampaignInfluencer>
        data={creatorsConnected}
        columns={columns}
        onRowSelect={onCreatorSelected}
        loading={loading}
        height="650px"
        pagination={true}
        paginationPageSize={20}
        rowSelection="multiple"
        enableSorting={true}
        enableFiltering={false}
        enableColumnResizing={true}
        rowHeight={64}
        headerHeight={56}
        loadingText="Loading Creators Data..."
        emptyText="No Creators Connected"
        suppressRowClickSelection={true}
        animateRows={true}
      />
    </div>
  );
};

export default CampaignInfluencerTable;
