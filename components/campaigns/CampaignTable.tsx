"use client";
import React, { useMemo } from "react";
import DataTable, {
  TableColumn,
  StatusRenderer,
  CurrencyRenderer,
  DateRenderer,
  TextRenderer,
  BadgeRenderer,
  NumberRenderer,
} from "../common/DataTable";

// Campaign interface based on the provided data structure
interface Campaign {
  id: string;
  title: string;
  description: string;
  campaign_type: string;
  budget: number;
  start_date: string;
  end_date: string;
  target_audience: Record<string, any>;
  content_requirements: Record<string, any>;
  deliverables: Record<string, any>;
  status: "draft" | "active" | "paused" | "completed" | "cancelled";
  created_at: string;
  influencers_reached: number;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  onCampaignSelect?: (campaign: Campaign) => void;
  loading?: boolean;
}

const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onCampaignSelect,
  loading = false,
}) => {
  // Column definitions using the reusable table structure
  const columns: TableColumn<Campaign>[] = useMemo(
    () => [
      {
        headerName: "Title",
        headerTooltip: "Campaign Title",
        field: "title",
        pinned: "left",
        flex: 1,
        minWidth: 180,
        maxWidth: 280,
        cellRenderer: (params: any) =>
          TextRenderer(params, { fontWeight: 500 }),
      },
      {
        headerName: "Description",
        field: "description",
        headerTooltip: "Campaign Description",
        flex: 1,
        minWidth: 200,
        maxWidth: 320,
        cellRenderer: (params: any) => TextRenderer(params, { maxLength: 50 }),
      },
      {
        headerName: "Type",
        field: "campaign_type",
        headerTooltip: "Campaign Type",
        width: 140,
        minWidth: 120,
        cellRenderer: (params: any) => BadgeRenderer(params),
      },
      {
        headerName: "Budget",
        field: "budget",
        headerTooltip: "Campaign Budget",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => CurrencyRenderer(params, "₹"),
        comparator: (valueA: number, valueB: number) => valueA - valueB,
      },
      {
        headerName: "Start Date",
        field: "start_date",
        headerTooltip: "Campaign Start Date",
        width: 130,
        minWidth: 110,
        cellRenderer: DateRenderer,
      },
      {
        headerName: "End Date",
        field: "end_date",
        headerTooltip: "Campaign End Date",
        width: 130,
        minWidth: 110,
        cellRenderer: DateRenderer,
      },
      {
        headerName: "Status",
        field: "status",
        headerTooltip: "Campaign Status",
        width: 120,
        minWidth: 100,
        cellRenderer: StatusRenderer,
      },
      {
        headerName: "Influencers",
        field: "influencers_reached",
        headerTooltip: "Number of Influencers Reached",
        width: 110,
        minWidth: 90,
        cellRenderer: (params: any) =>
          NumberRenderer(params, {
            color: "#059669",
            fontWeight: 600,
          }),
      },
      {
        headerName: "Created",
        field: "created_at",
        headerTooltip: "Date Created",
        width: 130,
        minWidth: 110,
        cellRenderer: DateRenderer,
      },
    ],
    []
  );

  return (
    <DataTable<Campaign>
      data={campaigns}
      columns={columns}
      onRowSelect={onCampaignSelect}
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
      loadingText="Loading campaigns..."
      emptyText="No campaigns found"
      suppressRowClickSelection={true}
      animateRows={true}
    />
  );
};

export default CampaignTable;
