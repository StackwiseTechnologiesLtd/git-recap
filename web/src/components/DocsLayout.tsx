"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
}
function CommandIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10 9-3 3 3 3" /><path d="M14 15h4" /></svg>
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
}
function PanelLeftClose(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
}
function PanelLeftOpen(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></svg>
}
function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
}
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6" /></svg>
}

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "#install", title: "Getting Started", icon: BookIcon, section: "Introduction" },
    { href: "#usage", title: "Built-in Modules", icon: CommandIcon, section: "Introduction" },
    { href: "#timeframe", title: "Timeframe", icon: SettingsIcon, section: "Configuration" },
    { href: "#routing", title: "Routing", icon: SettingsIcon, section: "Configuration" },
    { href: "#options", title: "Options", icon: SettingsIcon, section: "Configuration" },
    { href: "#requirements", title: "Requirements", icon: SettingsIcon, section: "Reference" },
  ];

  const filteredNav = navItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNavSection = (sectionName: string) => {
    const items = filteredNav.filter(item => item.section === sectionName);
    if (items.length === 0) return null;

    return (
      <>
        {!isCollapsed && <div className="px-2 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider mt-4 whitespace-nowrap">{sectionName}</div>}
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-bg-elevated text-muted hover:text-fg transition-colors whitespace-nowrap ${isCollapsed ? 'justify-center w-10 h-10 mt-1' : ''}`}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </a>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 border-r border-line bg-bg-panel md:bg-bg-panel/30 flex-col h-full overflow-y-auto overflow-x-hidden transition-all duration-300 relative z-50 
          ${isMobileOpen ? 'fixed inset-y-0 left-0 w-[260px] flex pt-4 shadow-2xl' : 'hidden md:flex'} 
          ${isCollapsed ? 'md:w-16' : 'md:w-[260px]'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-line/50">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2.5 group min-w-0" onClick={() => setIsMobileOpen(false)}>
              <AnimatedLogo
                size={26}
                variant="nav"
                className="transition-transform duration-300 group-hover:scale-105 shrink-0"
              />
              <span className="font-semibold tracking-tight truncate group-hover:text-accent transition-colors">git-recap</span>
            </Link>
          )}
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileOpen(false);
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
            className={`p-1.5 rounded-md hover:bg-bg-elevated text-muted hover:text-fg transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="px-4 py-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg border border-line rounded-lg py-1.5 pl-9 pr-3 text-sm text-fg outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        )}

        <nav className={`flex-1 px-3 pb-6 flex flex-col gap-1 ${isCollapsed ? 'items-center mt-4' : ''}`}>
          {renderNavSection("Introduction")}
          {renderNavSection("Configuration")}
          {renderNavSection("Reference")}

          {filteredNav.length === 0 && !isCollapsed && (
            <div className="px-2 py-4 text-sm text-muted text-center">No results found.</div>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full flex flex-col relative min-w-0 bg-bg md:bg-transparent">
        {/* Mobile Header (Sticky) */}
        <header className="md:hidden flex items-center justify-between px-5 py-4 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5">
            <AnimatedLogo
              size={26}
              variant="nav"
              className="transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <span className="font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">git-recap</span>
          </Link>
          <div className="flex items-center gap-4">
            <SearchIcon className="w-5 h-5 text-muted" />
            <button onClick={() => setIsMobileOpen(true)} className="text-muted hover:text-fg transition-colors">
              <PanelLeftOpen className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Sub-Navbar */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden flex items-center justify-between px-5 pb-4 shrink-0 w-full hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2 text-muted">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-muted" />
            <span className="text-sm font-medium">Getting Started</span>
          </div>
        </button>

        {/* Content wrapper with rounded top on mobile */}
        <div className="flex-1 overflow-y-auto bg-bg-panel md:bg-transparent rounded-t-[1.5rem] md:rounded-none relative shadow-sm md:shadow-none border border-line md:border-none border-b-0">
          <div className="min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
