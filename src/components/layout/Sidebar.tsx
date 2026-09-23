import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3Icon, BellIcon, CarFrontIcon, ChevronLeftIcon, ChevronRightIcon, CctvIcon, FileWarningIcon, LayoutDashboardIcon, LogOutIcon, MonitorPlayIcon, SettingsIcon, BoxIcon } from "lucide-react";
import { useOperations } from "../../contexts/OperationsContext";
interface NavItem {
  to: string;
  label: string;
  icon: BoxIcon;
}
const primaryNav: NavItem[] = [{
  to: "/",
  label: "Dashboard",
  icon: LayoutDashboardIcon
}, {
  to: "/live-monitoring",
  label: "Live Monitoring",
  icon: MonitorPlayIcon
}, {
  to: "/traffic-analytics",
  label: "Traffic Analytics",
  icon: BarChart3Icon
}, {
  to: "/vehicle-tracking",
  label: "Vehicle Tracking",
  icon: CarFrontIcon
}, {
  to: "/violations",
  label: "Violations",
  icon: FileWarningIcon
}, {
  to: "/alerts",
  label: "Alerts",
  icon: BellIcon
}, {
  to: "/cameras",
  label: "Cameras",
  icon: CctvIcon
}];
const secondaryNav: NavItem[] = [{
  to: "/settings",
  label: "Settings",
  icon: SettingsIcon
}, {
  to: "/signed-out",
  label: "Logout",
  icon: LogOutIcon
}];
interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onNavigate: () => void;
}
export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onNavigate
}: SidebarProps) {
  const {
    openAlertCount
  } = useOperations();
  const renderItem = (item: NavItem) => <li key={item.to}>
      <NavLink to={item.to} end={item.to === "/"} onClick={onNavigate} title={collapsed ? item.label : undefined} className={({
      isActive
    }) => `relative flex h-11 items-center gap-3 rounded-md px-3 text-[0.9375rem] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? "bg-primary-light font-semibold text-primary before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-r before:bg-primary" : "font-medium text-navy hover:bg-[#EEF3F9]"} ${collapsed ? "lg:justify-center lg:px-0" : ""}`}>
        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className={`truncate ${collapsed ? "lg:sr-only" : ""}`}>{item.label}</span>
        {item.to === "/alerts" && openAlertCount > 0 && <span className={`tabular ml-auto rounded bg-danger-bg px-1.5 text-xs font-semibold text-danger-ink ${collapsed ? "lg:hidden" : ""}`} aria-label={`${openAlertCount} active`}>
            {openAlertCount}
          </span>}
      </NavLink>
    </li>;
  return <nav aria-label="Main navigation" className={`${mobileOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 top-16 z-40 w-64 flex-col border-r border-line bg-canvas lg:static lg:flex ${collapsed ? "lg:w-[4.5rem]" : "lg:w-60"} shrink-0`}>
      <ul className="flex flex-col gap-1 p-3 pt-4">{primaryNav.map(renderItem)}</ul>
      <div className="mx-4 border-t border-line" />
      <ul className="flex flex-col gap-1 p-3">{secondaryNav.map(renderItem)}</ul>
      <div className="mt-auto hidden border-t border-line p-3 lg:block">
        <button type="button" onClick={onToggleCollapse} className={`flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm text-muted transition-colors duration-150 hover:bg-[#EEF3F9] hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${collapsed ? "justify-center px-0" : ""}`} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
        {!collapsed && <p className="mt-2 px-3 text-xs text-muted">Version 1.0.0</p>}
      </div>
    </nav>;
}