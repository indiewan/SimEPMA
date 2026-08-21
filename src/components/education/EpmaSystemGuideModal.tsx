import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  BookOpen,
  X,
  ShieldCheck,
  Pill,
  CheckSquare,
  AlertTriangle,
  Stethoscope,
  Activity,
  Layers,
  Sparkles,
  Lock,
  HelpCircle,
  Clock,
  Zap,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Target
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const EpmaSystemGuideModal: React.FC<Props> = ({ onClose }) => {
  const { helpGuideSection, setHelpGuideSection } = useSimulation();
  const [activeSection, setActiveSection] = useState<'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY'>(
    helpGuideSection || 'OVERVIEW'
  );

  useEffect(() => {
    if (helpGuideSection) {
      setActiveSection(helpGuideSection);
    }
  }, [helpGuideSection]);

  const handleTabChange = (section: 'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY') => {
    setActiveSection(section);
    setHelpGuideSection(section);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 overflow-y-auto backdrop-blur-xs">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-800 text-amber-300">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-wide text-white flex items-center gap-2">
                <span>EPMA Clinical Reference Manual & Simulator Guide</span>
                <span className="text-[10px] font-bold bg-teal-900 border border-teal-700 text-teal-200 px-2 py-0.5 rounded-full uppercase">
                  NHS Standards
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                UK NHS Electronic Prescribing & Medicines Administration workflows, CDS logic, and simulator instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-4 pt-2 gap-1.5 text-xs font-bold overflow-x-auto shrink-0">
          <button
            onClick={() => handleTabChange('HELP')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'HELP'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5 text-teal-700" />
            <span>Simulator Quick-Start Guide</span>
          </button>
          <button
            onClick={() => handleTabChange('OVERVIEW')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'OVERVIEW'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>1. What is EPMA?</span>
          </button>
          <button
            onClick={() => handleTabChange('PRESCRIBING')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'PRESCRIBING'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>2. Prescribing & CDS</span>
          </button>
          <button
            onClick={() => handleTabChange('ADMINISTRATION')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'ADMINISTRATION'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>3. eMAR & Drug Rounds</span>
          </button>
          <button
            onClick={() => handleTabChange('CODES')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'CODES'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>4. Non-Admin Codes</span>
          </button>
          <button
            onClick={() => handleTabChange('PHARMACY')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'PHARMACY'
                ? 'bg-white text-teal-800 border-t-2 border-teal-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>5. Pharmacy & Safety</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs text-slate-800 leading-relaxed space-y-4">
          {activeSection === 'HELP' && (
            <div className="space-y-4">
              <div className="rounded-lg bg-teal-50 border border-teal-200 p-3.5">
                <h4 className="text-sm font-bold text-teal-950 flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-teal-700" />
                  <span>Welcome to the EPMA Simulation & Training Environment</span>
                </h4>
                <p className="text-teal-900 text-[11px] leading-relaxed">
                  This simulation accurately replicates UK NHS electronic prescribing and medicines administration systems (such as Cerner Millennium, Epic Willow, and EMIS Web ePMA). Below is a guide to interacting with all simulated workflows:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 1. Administering Doses */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-700 text-white text-[10px]">1</div>
                    <span>How to Administer or Omit a Dose (eMAR)</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    <li>Switch to the <strong>Inpatient Rx</strong> or <strong>Administration</strong> tab.</li>
                    <li>On the grid, click any scheduled dose cell (e.g. <span className="bg-slate-200 font-mono px-1 rounded">08:00</span> or <span className="bg-slate-200 font-mono px-1 rounded">12:00</span>) or use <strong>ADMINISTRATION ROUND</strong>.</li>
                    <li>Choose <strong className="text-emerald-700">Given / Administered</strong> or select an NHS <strong>Omission Reason Code</strong> (e.g. Refused, Fasting/NBM, Withheld for Clinical Reasons).</li>
                    <li>For <strong>Controlled Drugs</strong> (e.g. Morphine), check the Dual Nurse signature fields.</li>
                  </ul>
                </div>

                {/* 2. Prescribing New Drugs */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-700 text-white text-[10px]">2</div>
                    <span>Prescribing & Formulary Search</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    <li>Click the green <strong>ADD DRUG</strong> button on the header toolbar.</li>
                    <li>Search the BNF drug database by brand or generic name (e.g. Amoxicillin, Ramipril, Salbutamol).</li>
                    <li>Select order type: <strong>Regular</strong>, <strong>PRN</strong>, <strong>STAT / Once Only</strong>, or <strong>Continuous IV</strong>.</li>
                    <li>Clinical Decision Support (CDS) will automatically screen for patient allergies and renal/hepatic cautions.</li>
                  </ul>
                </div>

                {/* 3. Clinical Roles & Time */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-700 text-white text-[10px]">3</div>
                    <span>Simulation Clock & Clinical Roles</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    <li><strong>Switch Roles:</strong> Toggle between <em>Nurse</em> (eMAR & administration), <em>Doctor</em> (prescribing & orders), and <em>Pharmacist</em> (screening & reconciliation).</li>
                    <li><strong>Fast-Forward Rounds:</strong> Click the quick round buttons (<span className="bg-slate-200 font-mono px-1 rounded">08:00</span>, <span className="bg-slate-200 font-mono px-1 rounded">12:00</span>, <span className="bg-slate-200 font-mono px-1 rounded">18:00</span>, <span className="bg-slate-200 font-mono px-1 rounded">22:00</span>) in the top watermark banner to jump simulation time.</li>
                  </ul>
                </div>

                {/* 4. Specialized Rx Tabs */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-700 text-white text-[10px]">4</div>
                    <span>Discharge TTOs, Meds Rec & Leave Rx</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    <li><strong>Meds Rec:</strong> Reconcile pre-admission community medicines against inpatient orders.</li>
                    <li><strong>Discharge Rx (TTO):</strong> Convert inpatient charts to take-home packs with GP instructions and 1-click summary generation.</li>
                    <li><strong>Short Term Leave:</strong> Authorize temporary patient leave and prepare leave medication supplies.</li>
                    <li><strong>Discontinued:</strong> Review full clinical rationale logs for stopped or amended prescriptions.</li>
                  </ul>
                </div>
              </div>

              {/* Scenarios & Objectives */}
              <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 p-3 flex items-start gap-3">
                <Target className="h-5 w-5 text-indigo-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-bold text-indigo-950 text-xs">Scenarios, Authoring & Competency Tracking</h5>
                  <p className="text-[11px] text-indigo-900">
                    Click <strong>Objectives</strong> to track required student competencies and real-time safety scores. Faculty members can click <strong>Author & Cases</strong> or enter <strong>Instructor Mode</strong> to create custom clinical scenarios or import scenario JSON templates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'OVERVIEW' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-teal-900 border-b pb-1">
                Executive Overview: The Evolution of Hospital Drug Charts
              </h4>
              <p>
                In the UK National Health Service (NHS) and international healthcare systems, <strong>EPMA (Electronic Prescribing and Medicines Administration)</strong> replaces legacy paper Kardex drug charts with an integrated digital workflow.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg bg-teal-50 border border-teal-200 p-3">
                  <strong className="text-teal-950 block font-bold mb-1">Key Clinical Benefits</strong>
                  <ul className="list-disc pl-4 space-y-1 text-teal-900 text-[11px]">
                    <li>Eliminates illegible handwriting and incomplete prescription orders.</li>
                    <li>Automated Clinical Decision Support (CDS) catches allergy contraindications instantly.</li>
                    <li>Enforces cumulative dosage caps (e.g. Paracetamol max 4000mg/24h).</li>
                    <li>Provides a real-time, tamper-evident audit trail of all administered and omitted doses.</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <strong className="text-amber-950 block font-bold mb-1">Why Simulation Training is Essential</strong>
                  <ul className="list-disc pl-4 space-y-1 text-amber-900 text-[11px]">
                    <li>Medication administration errors historically account for up to 30% of hospital clinical incidents.</li>
                    <li>Allows junior doctors and nursing students to experience high-stakes scenarios (sepsis, anaphylaxis, controlled drug dual-witnessing) in a safe, non-live environment.</li>
                    <li>Clearly watermarked simulation environments prevent confusion with live clinical EHR systems.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'PRESCRIBING' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-teal-900 border-b pb-1">
                The Prescriber Workflow (Doctors & Clinical Prescribers)
              </h4>
              <p>
                When a doctor creates an order in EPMA, the system guides them through standardized BNF formulary items and validates clinical safety rules:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 font-bold block">1. Order Classification Types:</strong>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 mt-1 space-y-0.5">
                    <li><strong>Regular Inpatient Rx:</strong> Scheduled for recurrent administration during ward rounds (e.g. 08:00, 12:00, 18:00, 22:00).</li>
                    <li><strong>PRN (Pro Re Nata / As Required):</strong> Given on demand with minimum hourly interval and 24h max dose limits (e.g. analgesia, anti-emetics).</li>
                    <li><strong>STAT / Once Only:</strong> Emergency or pre-procedure single doses (e.g. IV Paracetamol, antibiotic loading dose).</li>
                    <li><strong>Continuous IV Infusions:</strong> Fluids or rate-controlled infusions (e.g. 0.9% Saline over 8 hours).</li>
                    <li><strong>Discharge TTO (To Take Out):</strong> Take-home medications with quantity and pharmacy counseling.</li>
                  </ul>
                </div>

                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <strong className="text-slate-900 font-bold block">2. Clinical Decision Support (CDS) Checks:</strong>
                  <p className="text-[11px] text-slate-700 mt-1">
                    If a doctor prescribes Amoxicillin to a patient with a recorded Penicillin allergy, the system interrupts with a <strong>High Contraindication Warning</strong>. Overriding requires a documented clinical rationale which is audited.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ADMINISTRATION' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-teal-900 border-b pb-1">
                The Nursing Administration Workflow & eMAR
              </h4>
              <p>
                Nurses conduct scheduled medication rounds using the electronic Medication Administration Record (eMAR) grid.
              </p>

              <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 space-y-2 text-[11px] text-teal-950">
                <strong className="block text-xs font-bold">The Five Rights of Medication Administration:</strong>
                <ol className="list-decimal pl-4 space-y-1">
                  <li><strong>Right Patient:</strong> Verify name, DOB, and hospital number against the patient wristband.</li>
                  <li><strong>Right Drug:</strong> Match packaging with the EPMA order name and formulation.</li>
                  <li><strong>Right Dose:</strong> Verify strength and calculated volume or tablet quantity.</li>
                  <li><strong>Right Route:</strong> Ensure correct delivery method (Oral, IV, Nebulised, Rectal, SC).</li>
                  <li><strong>Right Time:</strong> Administer within the 60-minute round window (or strict ±15 min for time-critical drugs like Parkinson's / Insulin).</li>
                </ol>
              </div>

              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-950">
                <strong className="font-bold flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-red-700" />
                  Schedule 2 & 3 Controlled Drugs (CD) Protocol:
                </strong>
                <p className="text-[11px] mt-1">
                  Controlled drugs (e.g. Morphine, Oxycodone, Fentanyl) legally mandate an <strong>independent second-nurse check</strong>. Both nurses must physically verify the stock balance in the CD register, dosage calculation, and dual sign-off with username and password in the EPMA interface.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'CODES' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-teal-900 border-b pb-1">
                Standard NHS Non-Administration Reason Codes
              </h4>
              <p>
                If a scheduled dose is not given, the nurse MUST record an explicit non-administration code so the medical team knows why the patient missed their medication:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">01 Patient Refused:</strong> Patient exercised choice to decline dose.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">02 Drug Unavailable:</strong> Not in ward stock; triggers urgent pharmacy order.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">03 Patient Nil By Mouth (NBM):</strong> Fasting for surgery or procedure.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">04 Patient Off Ward:</strong> At radiology, theatre, or physical therapy.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">05 Omitted For Clinical Reasons:</strong> Low BP for antihypertensives, high INR, etc.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">06 Patient Asleep:</strong> Non-critical dose deferred to preserve rest.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">07 Unable To Swallow:</strong> Requires dysphagia review / liquid form.
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900">09 Cannula Absent / Not Patent:</strong> IV line failed; re-cannulation required.
                </div>
              </div>
            </div>
          )}

          {activeSection === 'PHARMACY' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-teal-900 border-b pb-1">
                Clinical Pharmacy Screening & Medicines Reconciliation
              </h4>
              <p>
                Clinical pharmacists play a vital safety firewall role in EPMA:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-700">
                <li><strong>Medicines Reconciliation (MedRec):</strong> Confirming admission medications against GP records within 24 hours of hospital admission.</li>
                <li><strong>Pharmacy Endorsement:</strong> Pharmacists review each order for renal dosing, interactions, therapeutic drug monitoring (TDM trough levels for Gentamicin/Vancomycin), and mark as "Screened".</li>
                <li><strong>Clarification Requests:</strong> Flagging orders back to junior prescribers if clarification or formulation changes are needed.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Designed for NHS Simulation Centres & University Clinical Skills Laboratories
          </span>
          <button
            onClick={onClose}
            className="rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-1.5 text-xs transition-colors cursor-pointer ml-auto"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
