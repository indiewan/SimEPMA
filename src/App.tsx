import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { SimulationWatermarkBanner } from './components/common/SimulationWatermarkBanner';
import { PatientBanner } from './components/patient/PatientBanner';
import { EpmaHeaderToolbar } from './components/navigation/EpmaHeaderToolbar';
import { EpmaTabNav } from './components/navigation/EpmaTabNav';
import { InpatientRxView } from './components/inpatient/InpatientRxView';
import { AdministrationGridView } from './components/administration/AdministrationGridView';
import { MonitoringView } from './components/monitoring/MonitoringView';
import { ConflictLogView } from './components/conflicts/ConflictLogView';
import { DischargeRxView } from './components/discharge/DischargeRxView';
import { ShortTermLeaveView } from './components/leave/ShortTermLeaveView';
import { DiscontinuedRxView } from './components/discontinued/DiscontinuedRxView';
import { MedicinesReconciliationView } from './components/medsrec/MedicinesReconciliationView';
import { InstructorPasswordModal } from './components/modals/InstructorPasswordModal';

import { ChartDoseModal } from './components/administration/ChartDoseModal';
import { AddDrugModal } from './components/prescribing/AddDrugModal';
import { DrugClinicalInfoModal } from './components/modals/DrugClinicalInfoModal';
import { PatientNotesModal } from './components/modals/PatientNotesModal';
import { CaseObjectivesModal } from './components/modals/CaseObjectivesModal';
import { AdministrationRoundModal } from './components/modals/AdministrationRoundModal';
import { EpmaSystemGuideModal } from './components/education/EpmaSystemGuideModal';
import { ScenarioAuthoringModal } from './components/modals/ScenarioAuthoringModal';
import { InstructorPatientModal } from './components/modals/InstructorPatientModal';

import { Prescription } from './types/epma';

const EpmaSimulationApp: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    mode,
    simulatedDate,
    simulatedTime,
    showHelpGuide,
    setShowHelpGuide,
    showInstructorPatientModal,
    setShowInstructorPatientModal,
    instructorPatientModalTab
  } = useSimulation();

  // Modal states
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showObjectivesModal, setShowObjectivesModal] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);

  // Charting modal state
  const [chartingTarget, setChartingTarget] = useState<{
    prescription: Prescription;
    scheduledDate: string;
    scheduledTime: string;
  } | null>(null);

  const [selectedDrugForInfo, setSelectedDrugForInfo] = useState<Prescription | null>(null);

  const handleOpenChartModal = (
    rx: Prescription,
    scheduledDate: string = simulatedDate,
    scheduledTime: string = simulatedTime
  ) => {
    setChartingTarget({
      prescription: rx,
      scheduledDate,
      scheduledTime
    });
  };

  const handleOpenDrugInfo = (rx?: Prescription) => {
    if (rx) setSelectedDrugForInfo(rx);
    setShowDrugInfoModal(true);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-900 font-sans select-none simulation-bg-watermark text-slate-900">
      {/* 1. Non-Live Simulation Watermark & Mode Switcher Bar */}
      <SimulationWatermarkBanner />

      {/* 2. Patient Demographics, Weight & Allergy Banner (Screenshots 1-3 Replication) */}
      <PatientBanner
        onOpenNotes={() => setShowNotesModal(true)}
        onOpenObjectives={() => setShowObjectivesModal(true)}
      />

      {/* 3. EPMA Main Action Header Toolbar */}
      <EpmaHeaderToolbar
        activeTab={currentTab}
        onOpenAddDrug={() => setShowAddDrugModal(true)}
        onOpenAdminRound={() => setShowRoundModal(true)}
        onOpenDrugInfo={() => handleOpenDrugInfo()}
        onOpenObjectives={() => setShowObjectivesModal(true)}
        onOpenPatientNotes={() => setShowNotesModal(true)}
      />

      {/* 4. Clinical View Tab Navigation Bar */}
      <EpmaTabNav activeTab={currentTab} onTabChange={setCurrentTab} />

      {/* 5. Main Active Clinical Workspace View */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {currentTab === 'Inpatient Rx' ? (
          <InpatientRxView
            onOpenChartModal={handleOpenChartModal}
            onOpenDrugInfo={handleOpenDrugInfo}
            onOpenAddDrug={() => setShowAddDrugModal(true)}
          />
        ) : currentTab === 'Administration' ? (
          <AdministrationGridView onOpenChartModal={handleOpenChartModal} />
        ) : currentTab === 'Medicines Reconciliation' ? (
          <MedicinesReconciliationView />
        ) : currentTab === 'Discharge Rx' ? (
          <DischargeRxView />
        ) : currentTab === 'Short Term Leave Rx' ? (
          <ShortTermLeaveView />
        ) : currentTab === 'Discontinued Rx' ? (
          <DiscontinuedRxView />
        ) : currentTab === 'Monitoring & Assessment' ? (
          <MonitoringView />
        ) : currentTab === 'Conflict Log' ? (
          <ConflictLogView />
        ) : (
          <InpatientRxView
            onOpenChartModal={handleOpenChartModal}
            onOpenDrugInfo={handleOpenDrugInfo}
            onOpenAddDrug={() => setShowAddDrugModal(true)}
          />
        )}
      </main>

      {/* MODALS */}
      {/* Faculty / Instructor Password Modal */}
      <InstructorPasswordModal />

      {/* Scenario Authoring & Case Selector Modal */}
      <ScenarioAuthoringModal />

      {/* Instructor Patient Crafting Modal */}
      <InstructorPatientModal
        isOpen={showInstructorPatientModal}
        onClose={() => setShowInstructorPatientModal(false)}
        initialTab={instructorPatientModalTab}
      />

      {/* Chart Dose Modal (Screenshots 3 & 4 replication) */}
      {chartingTarget && (
        <ChartDoseModal
          prescription={chartingTarget.prescription}
          scheduledDate={chartingTarget.scheduledDate}
          scheduledTime={chartingTarget.scheduledTime}
          onClose={() => setChartingTarget(null)}
        />
      )}

      {/* Prescribing Add Drug Wizard Modal */}
      {showAddDrugModal && (
        <AddDrugModal onClose={() => setShowAddDrugModal(false)} />
      )}

      {/* BNF Drug Clinical Information Monograph Lookup */}
      {showDrugInfoModal && (
        <DrugClinicalInfoModal
          initialDrug={selectedDrugForInfo}
          onClose={() => {
            setShowDrugInfoModal(false);
            setSelectedDrugForInfo(null);
          }}
        />
      )}

      {/* Patient Progress Notes & Handover Log */}
      {showNotesModal && (
        <PatientNotesModal onClose={() => setShowNotesModal(false)} />
      )}

      {/* Scenario Objectives & Evaluation Modal */}
      {showObjectivesModal && (
        <CaseObjectivesModal onClose={() => setShowObjectivesModal(false)} />
      )}

      {/* Sequential Drug Round Modal */}
      {showRoundModal && (
        <AdministrationRoundModal
          onClose={() => setShowRoundModal(false)}
          onOpenSpecificChart={(rx, date, time) => {
            setShowRoundModal(false);
            handleOpenChartModal(rx, date, time);
          }}
        />
      )}

      {/* Educational EPMA Reference & Architecture Guide */}
      {showHelpGuide && (
        <EpmaSystemGuideModal onClose={() => setShowHelpGuide(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <SimulationProvider>
      <EpmaSimulationApp />
    </SimulationProvider>
  );
}

export default App;
