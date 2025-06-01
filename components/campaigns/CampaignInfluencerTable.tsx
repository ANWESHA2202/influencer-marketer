"use client";

import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "../common/DataTable";
import { Button, IconButton } from "@mui/material";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import { useFetchData } from "@/hooks";
import { axiosWithAuth } from "@/lib/axios";
import { URLMapping } from "@/lib/constants";
import ChatDrawer from "./ChatDrawer";

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
  summary: string;
  aiMatch: number;
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
    summary: "Agent chat summary Note",
    aiMatch: 70,
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
    summary: "Agent Summary Note",
    aiMatch: 80,
  },
];

interface CampaignCreatorTableProps {
  creatorsConnected: CampaignInfluencer[];
  onCreatorSelected?: (i: CampaignInfluencer) => void;
  onPaymentInitiated?: () => void;
  loading?: boolean;
}

const CampaignInfluencerTable: React.FC<CampaignCreatorTableProps> = ({
  creatorsConnected,
  onCreatorSelected,
  loading,
  onPaymentInitiated,
}) => {
  const [chatUrl, setChatUrl] = useState("");
  const [openChatDrawer, setOpenChatDrawer] = useState(false);
  const [chatData, setChatData] = useState([]);

  const {
    data: chatDatafetched,
    isLoading: loadingChat,
    refetch: fetchChat,
    error: chatError,
  } = useFetchData(axiosWithAuth, chatUrl, "withHeaders", {
    enabled: false,
    select: (data) => {
      return data;
    },
    onSuccess: (data) => {
      console.log("chat fetch", data);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleClick = (creatorId: any, campaignId: any) => {
    const dynamicUrl = `/campaigns/creator/${creatorId}/campaign/${campaignId}/chat`;
    setChatUrl(dynamicUrl);

    setTimeout(async () => {
      try {
        const { data } = await fetchChat(); // ✅ Works correctly now
        if (data.data.messages) {
          setChatData(data.data.messages);
        } else {
          setChatData([]);
        }
        setOpenChatDrawer(true);
      } catch (error) {
        // console.error("Error fetching chat:", error);
        setChatData([]);
      }
    }, 0);
  };

  const columns: TableColumn[] = useMemo(
    () => [
      {
        headerName: "Creator",
        field: "creator_id",
        flex: 1,
        cellRenderer: (params: any) => {
          return <>{params.value}</>;
        },
      },
      {
        headerName: "AI Match",
        field: "aiMatch",
        flex: 1,
        cellRenderer: (params: any) => {
          const rate = params.value;
          const level = rate > 80 ? "High" : "Medium";
          const color = level === "High" ? "#3b82f6" : "#60a5fa";
          return (
            <span style={{ color: color, fontWeight: "500" }}>🔥 {rate} %</span>
          );
        },
      },
      {
        headerName: "Offered Rate",
        field: "offered_rate",
        flex: 1,
      },
      {
        headerName: "Negotiated Rate",
        field: "negotiated_rate",
        flex: 1,
      },
      {
        headerName: "Total Deliverables",
        field: "deliverables_total",
        flex: 1,
      },
      {
        headerName: "Completed",
        field: "deliverables_completed",
        flex: 1,
      },
      {
        headerName: "Final Rate",
        field: "final_rate",
        flex: 1,
        cellRenderer: (params: any) => {
          const value = parseFloat(params.value);
          return <>{value}</>;
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

      {
        headerName: "Agent Summary",
        field: "summary",
        flex: 1,
        cellRenderer: (params: any) => {
          return <></>;
        },
      },

      {
        headerName: "Contract Status",
        field: "contract_status",
        flex: 1,
        cellRenderer: (params: any) => {
          return <Button variant="text">Send</Button>;
        },
      },

      {
        headerName: "Chat",
        field: "",
        flex: 1,
        cellRenderer: (params: any) => {
          return (
            <IconButton
              onClick={() =>
                handleClick(params.data.creator_id, params.data.campaign_id)
              }
            >
              <SourceRoundedIcon />
            </IconButton>
          );
        },
      },

      {
        headerName: "Payment",
        field: "payment_status",
        flex: 1,
        cellRenderer: (params: any) => {
          return (
            <Button variant="contained" onClick={onPaymentInitiated}>
              Pay
            </Button>
          );
        },
      },
    ],
    []
  );

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
      <ChatDrawer
        open={openChatDrawer}
        setOpen={setOpenChatDrawer}
        chatData={chatData}
      />
    </div>
  );
};

export default CampaignInfluencerTable;
