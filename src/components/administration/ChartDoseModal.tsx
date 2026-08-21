import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Prescription, NON_ADMIN_REASONS } from '../../types/epma';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Lock,
  UserCheck,
  Calendar,
  FileText,
  Info,
  Activity,
  Heart,
  Droplet,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';

interface Props {
  prescription: Prescription;
  scheduledDate: string;
  scheduledTime: string;
  onClose: () => void;
  onGoToNext?: () => void;
}

export const ChartDoseModal: React.FC<Props> = ({
  prescription,
  scheduledDate,
  scheduledTime,
  onClose,
  onGoToNext
}) => {
  const { chartAdministration, patient, simulatedDate, simulatedTime } = useSimulation();

  const [activeSubTab, setActiveSubTab] = useState<'Administration' | 'Drug Notes' | 'Order Notes'>('Administration');
  const [isWardStock, setIsWardStock] = useState<boolean>(!prescription.isNonStock);
  const [nonAdminCode, setNonAdminCode] = useState<string>('');
  const [doseAdministered, setDoseAdministered] = useState<string>(prescription.dose);
  const [adminDate, setAdminDate] = useState<string>(scheduledDate || simulatedDate);
  const [adminTime, setAdminTime] = useState<string>(simulatedTime);
  const [witnessUsername, setWitnessUsername] = useState<string>('');
  const [witnessPassword, setWitnessPassword] = useState<string>('');
  const [witnessOverride, setWitnessOverride] = useState<boolean>(false);
  const [clinicalNotes, setClinicalNotes] = useState<string>('');

  // Clinical Rigor: Pre-Administration Parameter State
  const preAdminReq = prescription.preAdminRequirement;
  const [preAdminValue, setPreAdminValue] = useState<string>('');
  const [preAdminOverrideReason, setPreAdminOverrideReason] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const isControlledDrug = prescription.isControlledDrug;

  // PRN Interval Safety Calculation
  const prnIntervalHours = prescription.prnMinIntervalHours || 4;
  const lastAdmin = prescription.lastAdministration;
  let prnIntervalBreach = false;
  let prnElapsedHours = 999;
  let prnMinutesRemaining = 0;

  if (prescription.rxType === 'PRN' && lastAdmin) {
    // Calculate elapsed time from last admin to current simulation time
    const lastDateTime = new Date(`${lastAdmin.date}T${lastAdmin.time}:00`);
    const currentDateTime = new Date(`${simulatedDate}T${simulatedTime}:00`);
    const diffMs = currentDateTime.getTime() - lastDateTime.getTime();
    prnElapsedHours = diffMs / (1000 * 60 * 60);

    if (prnElapsedHours < prnIntervalHours) {
      prnIntervalBreach = true;
      prnMinutesRemaining = Math.ceil((prnIntervalHours - prnElapsedHours) * 60);
    }
  }

  // Pre-administration check validation
  const numValue = parseFloat(preAdminValue);
  let isParamOutOfRange = false;
  let paramWarning = '';

  if (preAdminReq && preAdminValue.trim() !== '' && !isNaN(numValue)) {
    if (preAdminReq.minNormal !== undefined && numValue < preAdminReq.minNormal) {
      isParamOutOfRange = true;
      paramWarning = preAdminReq.warningText || `Recorded value (${numValue} ${preAdminReq.unit}) is below safe threshold of ${preAdminReq.minNormal} ${preAdminReq.unit}.`;
    } else if (preAdminReq.maxNormal !== undefined && numValue > preAdminReq.maxNormal) {
      isParamOutOfRange = true;
      paramWarning = preAdminReq.warningText || `Recorded value (${numValue} ${preAdminReq.unit}) exceeds safe threshold of ${preAdminReq.maxNormal} ${preAdminReq.unit}.`;
    }
  }

  const handleChartDose = (andNext: boolean = false, isWitnessOverride: boolean = false) => {
    setValidationError(null);

    // If non-admin reason is selected, chart as OMITTED (always allowed safely)
    if (nonAdminCode) {
      const reasonObj = NON_ADMIN_REASONS.find(r => r.code === nonAdminCode);
      chartAdministration({
        prescriptionId: prescription.id,
        scheduledDate: scheduledDate || simulatedDate,
        scheduledTime: scheduledTime || '08:00',
        status: 'OMITTED',
        isWardStock,
        nonAdminCode,
        nonAdminReasonText: reasonObj?.label,
        notes: clinicalNotes
      });
      if (andNext && onGoToNext) {
        onGoToNext();
      } else {
        onClose();
      }
      return;
    }

    // 1. Enforce PRN interval safety
    if (prescription.rxType === 'PRN' && prnIntervalBreach && !clinicalNotes.toLowerCase().includes('override') && !clinicalNotes.toLowerCase().includes('senior')) {
      setValidationError(
        `PRN SAFETY LOCK: Minimum dosing interval is ${prnIntervalHours} hours. Only ${prnElapsedHours.toFixed(1)} hours have elapsed since last dose (${lastAdmin?.time}). Please wait ${prnMinutesRemaining} more minutes or document senior prescriber authorization in Clinical Notes.`
      );
      return;
    }

    // 2. Enforce Pre-Administration Clinical Check
    if (preAdminReq) {
      if (!preAdminValue.trim()) {
        setValidationError(`MANDATORY CLINICAL CHECK: You must enter a pre-administration ${preAdminReq.label} before charting this medication.`);
        return;
      }

      if (isParamOutOfRange) {
        if (preAdminReq.hardStop) {
          setValidationError(`CRITICAL SAFETY HARD-STOP: ${paramWarning} Administration is contraindicated. You must record an Omission or contact the doctor.`);
          return;
        } else if (!preAdminOverrideReason.trim()) {
          setValidationError(`CLINICAL WARNING: ${paramWarning} You must provide a Clinical Justification for giving this dose despite abnormal vitals.`);
          return;
        }
      }
    }

    // 3. Validate controlled drug witness
    if (isControlledDrug && !witnessUsername.trim() && !isWitnessOverride) {
      setValidationError('Controlled Drug requires 2nd Nurse Witness sign-off or Witness Override.');
      return;
    }

    chartAdministration({
      prescriptionId: prescription.id,
      scheduledDate: scheduledDate || simulatedDate,
      scheduledTime: scheduledTime || '08:00',
      status: 'ADMINISTERED',
      doseAdministered,
      isWardStock,
      witnessUsername: witnessUsername.trim() || undefined,
      witnessOverride: isWitnessOverride,
      preAdminRecordedValue: preAdminValue ? preAdminValue.trim() : undefined,
      preAdminRecordedUnit: preAdminReq?.unit,
      preAdminCheckType: preAdminReq?.type,
      preAdminOverrideReason: preAdminOverrideReason ? preAdminOverrideReason.trim() : undefined,
      notes: clinicalNotes
    });

    if (andNext && onGoToNext) {
      onGoToNext();
    } else {
      onClose();
    }
  };

  const handleDefer = (andNext: boolean = false) => {
    chartAdministration({
      prescriptionId: prescription.id,
      scheduledDate: scheduledDate || simulatedDate,
      scheduledTime: scheduledTime || '08:00',
      status: 'DEFERRED',
      isWardStock,
      notes: `Dose deferred by nurse at ${simulatedTime}. Rationale: ${clinicalNotes || 'Patient temporarily unavailable'}`
    });

    if (andNext && onGoToNext) {
      onGoToNext();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[95vh] overflow-hidden animate-fadeIn">
        {/* Top Header Strip with Patient Mini Demographics */}
        <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-wide uppercase">
              {patient.lastName}, {patient.firstName}
            </span>
            <span className="text-slate-300 text-xs">
              Born: <strong className="text-white">{patient.dob}</strong> ({patient.age} y)
            </span>
            <span className="text-slate-300 text-xs">
              Gender: <strong className="text-white">{patient.gender}</strong>
            </span>
            <span className="text-slate-300 text-xs">
              Ward: <strong className="text-white">{patient.ward}</strong>
            </span>
            <span className="text-slate-300 text-xs hidden sm:inline">
              Weight: <strong className="text-white">{patient.weightKg} kg</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Header: Clinical Drug Info, Help, Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-1.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('Drug Notes')}
              className={`px-3 py-1 font-bold rounded cursor-pointer ${
                activeSubTab === 'Drug Notes' ? 'bg-white text-teal-800 border border-slate-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drug Notes
            </button>
            <button
              onClick={() => setActiveSubTab('Administration')}
              className={`px-3 py-1 font-bold rounded cursor-pointer ${
                activeSubTab === 'Administration' ? 'bg-white text-teal-800 border border-slate-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administration
            </button>
            <button
              onClick={() => setActiveSubTab('Order Notes')}
              className={`px-3 py-1 font-bold rounded cursor-pointer ${
                activeSubTab === 'Order Notes' ? 'bg-white text-teal-800 border border-slate-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Order Notes
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-600 font-semibold text-[11px]">
            <span className="cursor-pointer hover:underline text-teal-700">CLINICAL DRUG INFORMATION</span>
            <span>•</span>
            <span className="cursor-pointer hover:underline text-teal-700">HELP</span>
          </div>
        </div>

        {/* Validation Error Banner if triggered */}
        {validationError && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 flex items-start gap-2.5 text-xs text-red-900 animate-fadeIn">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <strong className="font-bold">Safety Validation Failed:</strong> {validationError}
            </div>
            <button onClick={() => setValidationError(null)} className="text-red-500 hover:text-red-800 font-bold ml-2">
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Drug Title Card & Mini Grid */}
          <div className="rounded border border-slate-300 bg-slate-50/80 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 text-white px-3 py-1 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-teal-600 px-1.5 py-0.2 text-[10px] uppercase font-mono">
                  {prescription.rxType}
                </span>
                {prescription.isNonStock && (
                  <span className="rounded bg-slate-500 px-1.5 py-0.2 text-[10px] uppercase font-mono">
                    NON STOCK
                  </span>
                )}
                {isControlledDrug && (
                  <span className="rounded bg-red-600 px-1.5 py-0.2 text-[10px] uppercase font-mono">
                    CONTROLLED DRUG (SCHEDULE 2)
                  </span>
                )}
                {prescription.isTimeCritical && (
                  <span className="rounded bg-purple-600 px-1.5 py-0.2 text-[10px] uppercase font-mono animate-pulse">
                    TIME CRITICAL
                  </span>
                )}
                <span className="text-sm font-black">{prescription.drugName}</span>
              </div>
              <span className="text-slate-300 font-mono text-[11px]">
                Target Slot: {scheduledDate} at {scheduledTime}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 text-xs">
              <div><span className="text-slate-500">Dose:</span> <strong className="text-slate-900">{prescription.dose}</strong></div>
              <div><span className="text-slate-500">Route:</span> <strong className="text-slate-900">{prescription.route}</strong></div>
              <div><span className="text-slate-500">Frequency:</span> <strong className="text-slate-900">{prescription.frequency}</strong></div>
            </div>

            {prescription.directions && (
              <div className="border-t border-slate-200 px-3 py-1.5 text-xs text-slate-700 bg-white">
                <span className="text-slate-500 font-medium">Directions:</span> {prescription.directions}
              </div>
            )}
          </div>

          {/* PRN Interval Warning Notice if within lockout window */}
          {prescription.rxType === 'PRN' && lastAdmin && (
            <div className={`rounded p-3 text-xs border flex items-start gap-3 ${
              prnIntervalBreach ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Clock className={`h-4 w-4 mt-0.5 shrink-0 ${prnIntervalBreach ? 'text-amber-600 animate-pulse' : 'text-slate-500'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    PRN Dosing Protocol: Minimum {prnIntervalHours} hours interval (Max: {prescription.prnMaxDailyDose || '4000mg/24h'})
                  </span>
                  <span className="font-mono text-[11px]">
                    Last Dose: {lastAdmin.date} {lastAdmin.time} ({lastAdmin.dose})
                  </span>
                </div>
                {prnIntervalBreach ? (
                  <p className="mt-1 text-amber-900 font-medium">
                    ⚠️ <strong>Dose Interval Lock:</strong> Only {prnElapsedHours.toFixed(1)} hours elapsed. Administration is premature by {prnMinutesRemaining} minutes.
                  </p>
                ) : (
                  <p className="mt-1 text-emerald-800 font-medium">
                    ✓ Interval cleared ({prnElapsedHours.toFixed(1)} hours since previous administration). Safe to chart if clinically indicated.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Pre-Administration Mandatory Clinical Parameters Card */}
          {preAdminReq && (
            <div className="rounded border-2 border-teal-600 bg-teal-50/50 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-teal-200 pb-1.5">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-teal-700" />
                  <h4 className="text-xs font-black text-teal-950 uppercase tracking-wide">
                    Mandatory Pre-Administration Parameter Check
                  </h4>
                </div>
                <span className="text-[10px] font-bold bg-teal-700 text-white px-2 py-0.5 rounded">
                  REQUIRED BY BNF PROTOCOL
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    {preAdminReq.label} ({preAdminReq.unit})
                  </label>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Enter bedside measurement before administering. (e.g. Current patient baseline: {
                      preAdminReq.type === 'PULSE' ? `${patient.vitals.heartRate} bpm` :
                      preAdminReq.type === 'BLOOD_PRESSURE' ? `${patient.vitals.bp} mmHg` :
                      preAdminReq.type === 'BLOOD_GLUCOSE' ? '6.4 mmol/L' :
                      'Current chart value'
                    })
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="input-pre-admin-val"
                    type="number"
                    step="any"
                    placeholder={`Enter ${preAdminReq.unit}`}
                    value={preAdminValue}
                    onChange={(e) => {
                      setPreAdminValue(e.target.value);
                      setValidationError(null);
                    }}
                    className={`w-full rounded border px-3 py-1.5 text-xs font-bold font-mono focus:outline-none ${
                      isParamOutOfRange ? 'border-red-500 bg-red-50 text-red-900' : 'border-teal-400 bg-white text-slate-900 focus:border-teal-700'
                    }`}
                  />
                  <span className="font-bold text-xs text-slate-700 whitespace-nowrap">
                    {preAdminReq.unit}
                  </span>
                </div>
              </div>

              {/* Parameter Warning Alert */}
              {isParamOutOfRange && (
                <div className="rounded bg-red-100/90 border border-red-300 p-2.5 text-xs text-red-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <ShieldAlert className="h-4 w-4 text-red-700 shrink-0" />
                    <span>Abnormal Clinical Value Detected: {paramWarning}</span>
                  </div>
                  {!preAdminReq.hardStop && (
                    <div className="mt-1">
                      <label className="block text-[11px] font-bold text-red-900">
                        Prescriber / Senior Nurse Override Rationale (Mandatory):
                      </label>
                      <input
                        id="input-preadmin-override"
                        type="text"
                        placeholder="e.g. Confirmed with Dr. Davies, patient asymptomatic, dose authorized"
                        value={preAdminOverrideReason}
                        onChange={(e) => setPreAdminOverrideReason(e.target.value)}
                        className="mt-1 w-full rounded border border-red-400 bg-white px-2 py-1 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Form Split: Drug Info, Non Administration, Witnessing, Administration Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Drug Info & Ward Stock */}
            <div className="rounded border border-slate-300 bg-white p-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 uppercase tracking-wide">
                Drug Information
              </h4>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  id="chk-ward-stock"
                  type="checkbox"
                  checked={isWardStock}
                  onChange={(e) => setIsWardStock(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>Ward Stock Available</span>
              </label>

              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                <p><strong>Formulation:</strong> {prescription.formulation}</p>
                <p className="mt-1"><strong>Strength:</strong> {prescription.strength}</p>
                {prescription.isHighAlert && (
                  <p className="mt-1 text-amber-800 font-semibold">⚠️ High Alert Medicine: Verify patient wristband & allergy status.</p>
                )}
              </div>
            </div>

            {/* Column 2: Non-Administration & Witnessing */}
            <div className="rounded border border-slate-300 bg-white p-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 uppercase tracking-wide">
                Non Administration
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Select reason if not administered
                </label>
                {/* Standard NHS Reason Codes Dropdown */}
                <select
                  id="select-non-admin-reason"
                  value={nonAdminCode}
                  onChange={(e) => setNonAdminCode(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 bg-white focus:border-teal-600 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Administering Normally --</option>
                  {NON_ADMIN_REASONS.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Witnessing Box (for Controlled Drugs) */}
              <div className="border-t border-slate-200 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-red-600" />
                    Witnessing - Administration
                  </h5>
                  {isControlledDrug && (
                    <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-bold">
                      Mandatory (CD)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-600">Witness Username</label>
                    <input
                      id="input-witness-username"
                      type="text"
                      placeholder="e.g. SN J. Davies"
                      value={witnessUsername}
                      onChange={(e) => setWitnessUsername(e.target.value)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs focus:border-teal-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600">Witness Password</label>
                    <input
                      id="input-witness-password"
                      type="password"
                      placeholder="••••"
                      value={witnessPassword}
                      onChange={(e) => setWitnessPassword(e.target.value)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs focus:border-teal-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Administration Details & Timing */}
            <div className="rounded border border-slate-300 bg-white p-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 uppercase tracking-wide">
                Administration Details
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700">Dose administered</label>
                <input
                  id="input-dose-administered"
                  type="text"
                  value={doseAdministered}
                  onChange={(e) => setDoseAdministered(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-600">Date administered</label>
                  <input
                    type="date"
                    value={adminDate}
                    onChange={(e) => setAdminDate(e.target.value)}
                    className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600">Time (24hr)</label>
                  <input
                    type="time"
                    value={adminTime}
                    onChange={(e) => setAdminTime(e.target.value)}
                    className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-600">Clinical Notes / Comments</label>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Optional administration notes..."
                  rows={2}
                  className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="border-t border-slate-300 bg-slate-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleDefer(true)}
              className="rounded bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-2 text-xs transition-colors shadow-sm cursor-pointer"
            >
              Defer & Go to Next
            </button>

            <button
              id="btn-chart-go-next"
              type="button"
              onClick={() => handleChartDose(true, false)}
              className="rounded bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-2 text-xs transition-colors shadow-sm cursor-pointer"
            >
              Chart Dose & Go to Next
            </button>

            <button
              type="button"
              onClick={() => handleChartDose(false, true)}
              className="rounded bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-2 text-xs transition-colors shadow-sm cursor-pointer"
            >
              Chart Dose & Witness Override
            </button>

            <button
              id="btn-chart-dose-confirm"
              type="button"
              onClick={() => handleChartDose(false, false)}
              className="rounded bg-teal-700 hover:bg-teal-800 text-white font-black px-5 py-2 text-xs tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Chart Dose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
