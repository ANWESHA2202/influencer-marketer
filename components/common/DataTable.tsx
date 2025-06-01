"use client";
import React, { useMemo, ReactNode, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import { Box, Chip, Menu, MenuItem, CircularProgress } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { snakeToTitle } from "../home/utils";
import { axiosWithAuth } from "@/lib/axios";
import useCreate from "@/hooks/useCreate";
import { URLMapping } from "@/lib/constants";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Custom theme configuration
const customTheme = themeQuartz.withParams({
  backgroundColor: "#ffffff",
  foregroundColor: "#1f2937",
  borderColor: "#e5e7eb",
  oddRowBackgroundColor: "#ffffff",
  rowHoverColor: "#f3f4f6",
  selectedRowBackgroundColor: "#dbeafe",
  spacing: 8,
  fontSize: 14,
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  borderRadius: 6,
  wrapperBorderRadius: 8,
  iconSize: 16,
});

// Generic interfaces
export interface TableColumn<T = any> {
  headerName: string;
  field: keyof T;
  headerTooltip?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  pinned?: "left" | "right";
  sortable?: boolean;
  filter?: boolean;
  resizable?: boolean;
  cellRenderer?: (params: any) => ReactNode;
  cellClass?: string;
  comparator?: (valueA: any, valueB: any) => number;
  hide?: boolean;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  onRowSelect?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  loading?: boolean;
  height?: string | number;
  pagination?: boolean;
  paginationPageSize?: number;
  rowSelection?: "single" | "multiple" | false;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableColumnResizing?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  loadingText?: string;
  emptyText?: string;
  className?: string;
  style?: React.CSSProperties;
  onGridReady?: (params: GridReadyEvent) => void;
  suppressRowClickSelection?: boolean;
  animateRows?: boolean;
  domLayout?: "normal" | "autoHeight" | "print";
}

// Common cell renderers
export const StatusRenderer = (
  params: any,
  onStatusChange?: (newStatus: string) => void
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const campaignId = params.data.id;
  const [status, setStatus] = useState(params.value);

  if (!status) return "-";

  const open = Boolean(anchorEl);

  const { create: changeStatus, isPending: changeStatusLoading } = useCreate(
    axiosWithAuth,
    `${URLMapping["campaigns"]}${campaignId}/status-update`,
    "withHeaders",
    {
      onSuccess: (data) => {
        setStatus((prev: "draft" | "active") =>
          prev === "draft" ? "active" : "draft"
        );
        handleClose();
      },
      onError: (error) => {
        console.error("Failed to create User:", error);
      },
    }
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusSelect = (newStatus: string) => {
    changeStatus({
      status: newStatus,
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
      case "published":
      case "live":
      case "success":
        return "success";
      case "draft":
      case "pending":
        return "default";
      case "paused":
      case "warning":
        return "warning";
      case "completed":
      case "finished":
      case "info":
        return "info";
      case "cancelled":
      case "failed":
      case "error":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Chip
        title={status}
        label={status?.charAt(0)?.toUpperCase() + status?.slice(1)}
        color={getStatusColor(status) as any}
        size="small"
        variant="filled"
        style={{
          paddingRight: isHovered ? "24px" : "12px",
          transition: "padding-right 0.2s ease",
        }}
      />
      {isHovered ? (
        <KeyboardArrowDown
          style={{
            position: "absolute",
            right: "4px",
            fontSize: "16px",
            color: "rgba(0, 0, 0, 0.6)",
            transition: "opacity 0.2s ease",
          }}
        />
      ) : changeStatusLoading ? (
        <CircularProgress size={16} />
      ) : null}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          style: {
            minWidth: "120px",
          },
        }}
      >
        <MenuItem
          onClick={() => handleStatusSelect("active")}
          style={{ fontSize: "14px" }}
        >
          Active
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusSelect("draft")}
          style={{ fontSize: "14px" }}
        >
          Draft
        </MenuItem>
      </Menu>
    </div>
  );
};

export const CurrencyRenderer = (params: any, currency: string = "₹") => {
  const value = params.value;
  if (value === null || value === undefined) return "-";

  return (
    <div
      title={`${currency} ${value?.toLocaleString() || 0}`}
      style={{
        fontWeight: 500,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {currency} {value?.toLocaleString() || 0}
    </div>
  );
};

export const DateRenderer = (
  params: any,
  format?: Intl.DateTimeFormatOptions
) => {
  const date = params.value;
  if (!date) return "-";

  try {
    const defaultFormat: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formatted = new Date(date).toLocaleDateString(
      "en-US",
      format || defaultFormat
    );
    return (
      <div
        title={formatted}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        {formatted}
      </div>
    );
  } catch {
    return "-";
  }
};

export const TextRenderer = (
  params: any,
  options?: {
    fontWeight?: number | string;
    color?: string;
    maxLength?: number;
  }
) => {
  const text = params.value;
  if (!text) return "-";

  const displayText =
    options?.maxLength && text.length > options.maxLength
      ? `${text.substring(0, options.maxLength)}...`
      : text;

  return (
    <div
      title={text}
      style={{
        fontWeight: options?.fontWeight || "normal",
        color: options?.color || "inherit",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {displayText}
    </div>
  );
};

export const BadgeRenderer = (
  params: any,
  options?: {
    backgroundColor?: string;
    textColor?: string;
    className?: string;
  }
) => {
  const value = params.value;
  if (!value) return "-";

  return (
    <div title={value}>
      <span
        className={
          options?.className ||
          "text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md"
        }
        style={{
          backgroundColor: options?.backgroundColor,
          color: options?.textColor,
        }}
      >
        {snakeToTitle(value)}
      </span>
    </div>
  );
};

export const NumberRenderer = (
  params: any,
  options?: {
    color?: string;
    fontWeight?: number | string;
    prefix?: string;
    suffix?: string;
  }
) => {
  const value = params.value;
  if (value === null || value === undefined) return "-";

  return (
    <div
      style={{
        fontWeight: options?.fontWeight || 600,
        color: options?.color || "#059669",
        fontSize: "14px",
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {options?.prefix || ""}
      {value || 0}
      {options?.suffix || ""}
    </div>
  );
};

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  onRowSelect,
  onRowDoubleClick,
  loading = false,
  height = "650px",
  pagination = true,
  paginationPageSize = 20,
  rowSelection = "multiple",
  enableSorting = true,
  enableFiltering = false,
  enableColumnResizing = true,
  rowHeight = 64,
  headerHeight = 56,
  loadingText = "Loading data...",
  emptyText = "No data found",
  className,
  style,
  onGridReady,
  suppressRowClickSelection = true,
  animateRows = true,
  domLayout = "normal",
}: DataTableProps<T>) => {
  // Convert columns to AG Grid column definitions
  const columnDefs: ColDef<T>[] = useMemo(
    () =>
      columns.map((col) => ({
        headerName: col.headerName,
        headerTooltip: col.headerTooltip || col.headerName,
        field: col.field as any,
        width: col.width,
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        flex: col.flex,
        pinned: col.pinned,
        sortable: col.sortable !== false ? enableSorting : false,
        filter: col.filter !== false ? enableFiltering : false,
        resizable: col.resizable !== false ? enableColumnResizing : false,
        cellRenderer: col.cellRenderer,
        cellClass: col.cellClass,
        comparator: col.comparator,
        hide: col.hide,
        cellStyle: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      })),
    [columns, enableSorting, enableFiltering, enableColumnResizing]
  );

  // Default column properties
  const defaultColDef: ColDef<T> = useMemo(
    () => ({
      resizable: enableColumnResizing,
      sortable: enableSorting,
      filter: enableFiltering,
      suppressSizeToFit: false,
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }),
    [enableSorting, enableFiltering, enableColumnResizing]
  );

  // Grid ready handler
  const handleGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    onGridReady?.(params);
  };

  // Row selection handlers
  const onRowClicked = (event: any) => {
    if (onRowSelect) {
      onRowSelect(event.data);
    }
  };

  const onRowDoubleClicked = (event: any) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(event.data);
    }
  };

  return (
    <Box
      sx={{ width: "100%", height: "100%" }}
      className={className}
      style={style}
    >
      <div
        style={
          {
            height: typeof height === "string" ? height : `${height}px`,
            width: "100%",
            "--ag-header-height": `${headerHeight}px`,
            "--ag-row-height": `${rowHeight}px`,
            "--ag-list-item-height": "32px",
            "--ag-font-weight": "500",
            "--ag-header-font-weight": "600",
            "--ag-cell-horizontal-padding": "16px",
            "--ag-header-cell-hover-background-color": "#f3f4f6",
            "--ag-header-cell-moving-background-color": "#e5e7eb",
            "--ag-pagination-panel-background-color": "#ffffff",
            "--ag-control-panel-background-color": "#ffffff",
            "--ag-side-bar-panel-background-color": "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid transparent",
          } as React.CSSProperties
        }
      >
        <AgGridReact
          theme={customTheme}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={handleGridReady}
          onRowClicked={onRowClicked}
          onRowDoubleClicked={onRowDoubleClicked}
          rowSelection={rowSelection || undefined}
          animateRows={animateRows}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          loading={loading}
          loadingOverlayComponent={() => (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <div style={{ marginBottom: "8px" }}>⏳</div>
              {loadingText}
            </div>
          )}
          noRowsOverlayComponent={() => (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <div style={{ marginBottom: "8px" }}>📋</div>
              {emptyText}
            </div>
          )}
          suppressRowClickSelection={suppressRowClickSelection}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          suppressCellFocus={true}
          enableCellTextSelection={true}
          domLayout={domLayout}
          suppressRowTransform={false}
        />
      </div>
    </Box>
  );
};

export default DataTable;
