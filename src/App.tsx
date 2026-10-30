import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  NavTab,
} from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { NewResearchView } from './components/NewResearchView';
import { SourceLibraryView } from './components/SourceLibraryView';
import { GapAnalysisView } from './components/GapAnalysisView';
import { ConflictsView } from './components/ConflictsView';
import { ChecklistView } from './components/ChecklistView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { SourceInspectModal } from './components/SourceInspectModal';
import { ExportModal } from './components/ExportModal';
import { PrintReportView } from './components/PrintReportView';
import { SimulationBanner } from './components/Badges';
import {
  NORTHBRIDGE_ANALYSIS_RESULT,
  NORTHBRIDGE_SOURCES,
} from './data/sampleData';
import {
  AnalysisResult,
  ChecklistItem,
  Priority,
  ResearchSession,
  Source,
} from './types';

const STORAGE_KEY_SESSIONS = 'infophantom_sessions_v1';
const STORAGE_KEY_CURRENT = 'infophantom_current_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Active analysis result
  const [result, setResult] = useState<AnalysisResult>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY_CURRENT) ||
        localStorage.getItem('digital_dark_spot_current_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
    return NORTHBRIDGE_ANALYSIS_RESULT;
  });

  // Active sources
  const [sources, setSources] = useState<Source[]>(() => {
    return NORTHBRIDGE_SOURCES;
  });

  // Sessions history
  const [sessions, setSessions] = useState<ResearchSession[]>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY_SESSIONS) ||
        localStorage.getItem('digital_dark_spot_sessions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load sessions from localStorage:', e);
    }
    // Initial demo session
    return [
      {
        id: 'session-northbridge-demo',
        title: 'Northbridge Student Support Award Verification',
        question:
          'What should I verify before applying for the Northbridge Student Support Award?',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sources: NORTHBRIDGE_SOURCES,
        result: NORTHBRIDGE_ANALYSIS_RESULT,
        isSimulatedDemo: true,
      },
    ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [inspectingSource, setInspectingSource] = useState<Source | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(result));
    } catch (e) {
      console.warn('Failed to save current state to localStorage:', e);
    }
  }, [result]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to save sessions to localStorage:', e);
    }
  }, [sessions]);

  // Load Northbridge Demo
  const handleLoadDemo = () => {
    setResult(NORTHBRIDGE_ANALYSIS_RESULT);
    setSources(NORTHBRIDGE_SOURCES);
    setCurrentTab('dashboard');
  };

  // Run AI Analysis
  const handleAnalyze = async (question: string, inputSources: Source[]) => {
    setIsLoading(true);
    setSources(inputSources);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          sources: inputSources,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis server returned error code ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);

      // Save into sessions history
      const newSession: ResearchSession = {
        id: `session-${Date.now()}`,
        title: question.slice(0, 80),
        question,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sources: inputSources,
        result: data,
        isSimulatedDemo: Boolean(data.isSimulatedDemo),
      };

      setSessions((prev) => [newSession, ...prev]);
      setCurrentTab('gap-analysis');
    } catch (err: any) {
      console.error('Failed to run AI analysis:', err);
      // Fallback: alert in UI or update result
      alert(
        `Analysis notification: ${err.message || 'Error occurred'}. Loading baseline forensic verification template.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Checklist item toggle
  const handleToggleChecklistItem = (itemId: string) => {
    setResult((prev) => {
      const updatedChecklist = prev.verificationChecklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      return { ...prev, verificationChecklist: updatedChecklist };
    });
  };

  // Add item to checklist
  const handleAddChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem: ChecklistItem = {
      ...item,
      id: `chk-${Date.now()}`,
    };
    setResult((prev) => ({
      ...prev,
      verificationChecklist: [newItem, ...prev.verificationChecklist],
    }));
  };

  // Delete checklist item
  const handleDeleteChecklistItem = (itemId: string) => {
    setResult((prev) => ({
      ...prev,
      verificationChecklist: prev.verificationChecklist.filter(
        (i) => i.id !== itemId
      ),
    }));
  };

  // Update checklist notes
  const handleUpdateChecklistNotes = (itemId: string, notes: string) => {
    setResult((prev) => ({
      ...prev,
      verificationChecklist: prev.verificationChecklist.map((item) =>
        item.id === itemId ? { ...item, notes } : item
      ),
    }));
  };

  // Open a past session from history
  const handleOpenSession = (session: ResearchSession) => {
    if (session.result) {
      setResult(session.result);
    }
    setSources(session.sources);
    setCurrentTab('dashboard');
  };

  // Delete past session
  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (confirm('Are you sure you want to clear your analysis history?')) {
      setSessions([]);
    }
  };

  // Inspect source by title from finding card
  const handleOpenSourceByName = (sourceTitle: string) => {
    const found = sources.find((s) =>
      s.title.toLowerCase().includes(sourceTitle.toLowerCase())
    );
    if (found) {
      setInspectingSource(found);
    } else {
      setCurrentTab('source-library');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Simulation Notice Banner */}
      {result?.isSimulatedDemo && <SimulationBanner />}

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          result={result}
          historyCount={sessions.length}
          onLoadDemo={handleLoadDemo}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <Header
            onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
            onNewResearch={() => setCurrentTab('new-research')}
            onLoadDemo={handleLoadDemo}
            onExport={() => setIsExportModalOpen(true)}
            result={result}
            isSimulatedDemo={result?.isSimulatedDemo}
          />

          {/* Active Tab View */}
          <main className="flex-1 pb-16">
            {currentTab === 'dashboard' && (
              <DashboardView
                result={result}
                sessions={sessions}
                onStartNew={() => setCurrentTab('new-research')}
                onLoadDemo={handleLoadDemo}
                onSelectTab={setCurrentTab}
                onOpenSession={handleOpenSession}
              />
            )}

            {currentTab === 'new-research' && (
              <NewResearchView
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                onLoadDemo={handleLoadDemo}
                onInspectSource={(source) => setInspectingSource(source)}
              />
            )}

            {currentTab === 'source-library' && (
              <SourceLibraryView
                sources={sources}
                onInspectSource={(source) => setInspectingSource(source)}
                onStartNew={() => setCurrentTab('new-research')}
              />
            )}

            {currentTab === 'gap-analysis' && (
              <GapAnalysisView
                gaps={result.informationGaps}
                onAddToChecklist={(task, priority, category) =>
                  handleAddChecklistItem({
                    task,
                    priority,
                    category,
                    sourceReference: 'Identified Dark Spot',
                    verificationAction:
                      'Contact official department to obtain written retention bylaws.',
                    completed: false,
                  })
                }
                onOpenSourceByName={handleOpenSourceByName}
              />
            )}

            {currentTab === 'conflicts' && (
              <ConflictsView
                conflicts={result.conflicts}
                outdatedInfo={result.outdatedInformation}
                onOpenSourceByName={handleOpenSourceByName}
              />
            )}

            {currentTab === 'checklist' && (
              <ChecklistView
                items={result.verificationChecklist}
                onToggleItem={handleToggleChecklistItem}
                onAddItem={handleAddChecklistItem}
                onDeleteItem={handleDeleteChecklistItem}
                onUpdateNotes={handleUpdateChecklistNotes}
              />
            )}

            {currentTab === 'history' && (
              <HistoryView
                sessions={sessions}
                onOpenSession={handleOpenSession}
                onDeleteSession={handleDeleteSession}
                onClearAll={handleClearAllHistory}
                onStartNew={() => setCurrentTab('new-research')}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView onResetDemo={handleLoadDemo} />
            )}
          </main>
        </div>
      </div>

      {/* Inspect Source Modal */}
      <SourceInspectModal
        source={inspectingSource}
        onClose={() => setInspectingSource(null)}
      />

      {/* Export Report Modal */}
      {isExportModalOpen && (
        <ExportModal
          result={result}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {/* Dedicated Print View (Hidden in normal screen, visible on print) */}
      <PrintReportView result={result} />
    </div>
  );
}
