import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  PlusCircle,
  ListOrdered,
  History,
  Layers,
  BookOpen,
  FileText,
  HelpCircle,
  Zap,
  ShieldCheck,
  Target
} from 'lucide-react';

interface Props {
  activeTab: string;
  onOpenAddDrug: () => void;
  onOpenDrugInfo: () => void;
  onOpenPatientNotes: () => void;
  onOpenObjectives: () => void;
  onOpenAdminRound: () => void;
}

export const EpmaHeaderToolbar: React.FC<Props> = ({
  activeTab,
  onOpenAddDrug,
  onOpenDrugInfo,
  onOpenPatientNotes,
  onOpenObjectives,
  onOpenAdminRound
}) => {
  const {
    role,
    setShowHelpGuide,
    openHelpGuide,
    currentScenario,
    setShowScenarioModal,
    setCurrentTab,
    setBannerMessage
  } = useSimulation();

  return (
    <div className="flex flex-wrap items-center justify-between border-b border-slate-300 bg-slate-100 px-3 py-1.5 text-xs text-slate-800">
      {/* Left Action Buttons */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {activeTab === 'Administration' ? (
          <>
            <button
              id="btn-admin-round"
              onClick={onOpenAdminRound}
              className="flex items-center gap-1 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-2.5 py-1 transition-colors shadow-sm cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              ADMINISTRATION ROUND
            </button>
            <button
              id="btn-quick-chart"
              onClick={onOpenAdminRound}
              className="flex items-center gap-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
            >
              QUICK CHART
            </button>
            <button
              id="btn-charting-override"
              onClick={onOpenAddDrug}
              className="flex items-center gap-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="h-3 w-3 text-teal-700" />
              ADD DRUG
            </button>
          </>
        ) : (
          <>
            <button
              id="btn-add-drug"
              onClick={onOpenAddDrug}
              className="flex items-center gap-1 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-2.5 py-1 transition-colors shadow-sm cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              ADD DRUG
            </button>
            <button
              id="btn-all-orders"
              onClick={() => setCurrentTab('Inpatient Rx')}
              className="rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
              title="View all active inpatient orders"
            >
              ALL ORDERS
            </button>
            <button
              id="btn-previous-care"
              onClick={() => setCurrentTab('Medicines Reconciliation')}
              className="hidden md:inline-block rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
              title="Open Medicines Reconciliation to review pre-admission GP care episode"
            >
              PREVIOUS CARE EPISODE
            </button>
            <button
              id="btn-bulk-change"
              onClick={() => {
                setBannerMessage({
                  type: 'info',
                  text: 'Bulk Change: Select orders in the Inpatient Rx list to perform batch dose adjustments, rescheduling, or reviews.'
                });
              }}
              className="hidden lg:inline-block rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
              title="Perform batch prescription actions"
            >
              BULK CHANGE
            </button>
          </>
        )}

        <button
          id="btn-drug-info"
          onClick={onOpenDrugInfo}
          className="flex items-center gap-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
        >
          <BookOpen className="h-3 w-3 text-teal-700" />
          DRUG CLINICAL INFORMATION (BNF)
        </button>

        <button
          id="btn-patient-notes"
          onClick={onOpenPatientNotes}
          className="flex items-center gap-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
        >
          <FileText className="h-3 w-3 text-slate-600" />
          PATIENT NOTES
        </button>
      </div>

      {/* Right Educational / Scenario Actions */}
      <div className="flex items-center gap-2 mt-1 sm:mt-0">
        <button
          id="btn-scenarios-authoring"
          onClick={() => setShowScenarioModal(true)}
          className="flex items-center gap-1.5 rounded bg-teal-800 hover:bg-teal-900 text-white font-bold px-2.5 py-1 transition-colors shadow-xs cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-400" />
          <span>Scenarios & Authoring</span>
        </button>

        <button
          id="btn-objectives-toggle"
          onClick={onOpenObjectives}
          className="flex items-center gap-1 rounded bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold px-2 py-1 transition-colors cursor-pointer"
        >
          <Target className="h-3.5 w-3.5 text-indigo-600" />
          <span>Objectives</span>
        </button>

        <button
          id="btn-toolbar-help"
          onClick={() => openHelpGuide('HELP')}
          className="flex items-center gap-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
        >
          <HelpCircle className="h-3.5 w-3.5 text-teal-700" />
          HELP
        </button>
      </div>
    </div>
  );
};
