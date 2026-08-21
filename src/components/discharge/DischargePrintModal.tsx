import React, { useRef } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DischargeMedicationItem } from '../../types/epma';
import {
  Printer,
  FileText,
  X,
  ShieldAlert,
  Hospital,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Props {
  dischargeItems: DischargeMedicationItem[];
  onClose: () => void;
}

export const DischargePrintModal: React.FC<Props> = ({ dischargeItems, onClose }) => {
  const { patient, simulatedDate, simulatedTime, role } = useSimulation();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const approvedCount = dischargeItems.filter(i => i.status === 'PHARMACY_APPROVED').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 overflow-y-auto backdrop-blur-xs">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[94vh] overflow-hidden">
        {/* Top Modal Controls (Hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-800 text-teal-200">
              <Printer className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Discharge Prescription Document (TTO Copy)</span>
                <span className="text-[10px] bg-amber-500/20 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                  SIMULATION ONLY
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Official NHS Trust electronic discharge notification (eDN) & pharmacy dispensing manifest
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print Document / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200/50 flex-1">
          <div
            ref={printRef}
            id="printable-discharge-prescription"
            className="relative mx-auto max-w-3xl bg-white p-6 sm:p-8 rounded-lg shadow-md border border-slate-300 text-slate-900 font-sans print:shadow-none print:border-none print:p-0 print:m-0"
          >
            {/* Prominent Diagonal Watermark for Simulation Safety */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
              <span className="text-6xl sm:text-7xl font-black text-rose-500/10 -rotate-45 tracking-widest uppercase text-center border-4 border-rose-500/10 p-6 rounded-3xl">
                TRAINING SIMULATION ONLY
                <br />
                <span className="text-2xl sm:text-3xl text-rose-500/10">NOT FOR CLINICAL DISPENSING</span>
              </span>
            </div>

            {/* Top Red Safety Banner */}
            <div className="mb-4 rounded border-2 border-rose-600 bg-rose-50 p-2.5 text-center text-rose-900">
              <div className="flex items-center justify-center gap-1.5 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                <span>NHS SIMULATION CENTRE — EDUCATIONAL ARTIFACT ONLY — DO NOT DISPENSE</span>
              </div>
            </div>

            {/* Document Trust Header */}
            <div className="flex flex-wrap items-start justify-between border-b-2 border-slate-900 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-teal-800 text-white font-black text-base px-2 py-0.5 rounded">
                    NHS
                  </div>
                  <h1 className="text-lg font-black tracking-tight text-slate-900">
                    ST THOMAS & GUY'S SIMULATION TRUST
                  </h1>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Electronic Prescribing and Medicines Administration (EPMA) Service
                </p>
                <p className="text-xs font-semibold text-teal-800">
                  Electronic Discharge Notification (eDN) / TTO Take-Home Prescription
                </p>
              </div>

              <div className="text-right text-xs space-y-0.5">
                <p className="font-mono text-slate-700">
                  <strong>Date:</strong> {simulatedDate} at {simulatedTime}
                </p>
                <p className="font-mono text-slate-700">
                  <strong>Doc ID:</strong> EDN-{patient.hospitalNumber || '849204'}
                </p>
                <p className="text-slate-500 text-[11px]">EPMA System v4.2</p>
              </div>
            </div>

            {/* Patient & Admission Demographics */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">
                  {patient.lastName}, {patient.firstName} ({patient.title || 'Patient'})
                </div>
                <div>
                  <span className="text-slate-500">NHS Number:</span>{' '}
                  <span className="font-mono font-bold text-slate-800">{patient.nhsNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500">Hospital Number:</span>{' '}
                  <span className="font-mono font-bold text-slate-800">{patient.hospitalNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500">Date of Birth:</span>{' '}
                  <span className="font-bold text-slate-800">
                    {patient.dob} ({patient.age} yrs, {patient.gender})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Weight & Height:</span>{' '}
                  <span className="font-semibold text-slate-800">
                    {patient.weightKg} kg | {patient.heightCm} cm
                  </span>
                </div>
              </div>

              <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-3">
                <div>
                  <span className="text-slate-500">Consultant:</span>{' '}
                  <span className="font-semibold text-slate-800">{patient.consultant}</span>
                </div>
                <div>
                  <span className="text-slate-500">Location:</span>{' '}
                  <span className="font-semibold text-slate-800">
                    {patient.ward} — Bed {patient.bed}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Admission Diagnosis:</span>{' '}
                  <span className="font-semibold text-slate-900">{patient.admissionDiagnosis}</span>
                </div>
                <div>
                  <span className="text-slate-500">Admission Date:</span>{' '}
                  <span className="font-semibold text-slate-800">{patient.admissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500">Discharge Date:</span>{' '}
                  <span className="font-bold text-teal-800">{simulatedDate} (Estimated)</span>
                </div>
              </div>
            </div>

            {/* Allergies & Sensitivities (High Visibility) */}
            <div className="mt-3 rounded border border-rose-300 bg-rose-50/60 p-2.5 text-xs text-rose-950">
              <span className="font-bold uppercase tracking-wider text-rose-900 mr-2 flex-inline items-center gap-1">
                ⚠️ Allergies & Adverse Drug Reactions:
              </span>
              {patient.allergies && patient.allergies.length > 0 ? (
                patient.allergies.map((a, idx) => (
                  <span key={idx} className="font-bold text-rose-800 mr-3">
                    {a.allergen} ({a.reaction}, Severity: {a.severity})
                  </span>
                ))
              ) : (
                <span className="font-semibold text-slate-700">No Known Drug Allergies (NKDA)</span>
              )}
            </div>

            {/* Discharge Medications Section */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Prescribed Discharge Medications (TTO Medicines)
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Total Items: {dischargeItems.length} | Pharmacy Verified: {approvedCount}
                </span>
              </div>

              {dischargeItems.length === 0 ? (
                <p className="py-4 text-center text-xs text-slate-500 italic">
                  No medications have been populated or authorized for discharge in this simulation. Click "Import Active Inpatient Rx" to populate.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                        <th className="p-2 border-r border-slate-200">Medication & Form</th>
                        <th className="p-2 border-r border-slate-200">Dose & Route</th>
                        <th className="p-2 border-r border-slate-200">Frequency & Directions</th>
                        <th className="p-2 border-r border-slate-200">Supply / Duration</th>
                        <th className="p-2 border-r border-slate-200">Clinical Action</th>
                        <th className="p-2">GP Follow-up</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      {dischargeItems.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="p-2 border-r border-slate-200 font-bold text-slate-900">
                            <div>{item.drugName}</div>
                            {item.isHighAlert && (
                              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 uppercase mr-1">
                                High Alert
                              </span>
                            )}
                            {item.isControlledDrug && (
                              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-rose-100 text-rose-900 border border-rose-300 uppercase">
                                CD
                              </span>
                            )}
                          </td>
                          <td className="p-2 border-r border-slate-200 font-semibold">
                            {item.dose} ({item.route})
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <div className="font-semibold text-slate-800">{item.frequency}</div>
                            <div className="text-[10px] text-slate-500 italic mt-0.5">{item.directions}</div>
                          </td>
                          <td className="p-2 border-r border-slate-200 font-medium">
                            <div className="font-bold text-teal-900">{item.supplyDays} Days</div>
                            <div className="text-[10px] text-slate-500">{item.quantityText}</div>
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <span
                              className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                item.action === 'CONTINUE'
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : item.action === 'NEW_MEDICATION'
                                  ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                  : item.action === 'DOSE_CHANGED'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-red-50 text-red-800 border border-red-200'
                              }`}
                            >
                              {item.action.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="p-2 text-[10px] text-slate-700">
                            {item.gpActionRequired}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Authorizations & Signatures Block */}
            <div className="mt-6 border-t-2 border-slate-300 pt-3 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-700 text-[11px] mb-2">
                Electronic Prescribing Signatures & Regulatory Verification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Medical Sign-off */}
                <div className="rounded border border-slate-200 p-2.5 bg-white">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Medical Prescriber Authorization</div>
                  <div className="font-bold text-slate-900 mt-1">
                    Dr. Sarah Connor (GMC: 7482910)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Status: <span className="font-bold text-teal-700">Prescription Authorized</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Signed Timestamp: {simulatedDate} {simulatedTime} (EPMA Electronic Token)
                  </div>
                </div>

                {/* Pharmacy Sign-off */}
                <div className="rounded border border-slate-200 p-2.5 bg-white">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Clinical Pharmacist Verification</div>
                  <div className="font-bold text-slate-900 mt-1">
                    Pharm. Eleanor Vance (GPhC: 2083941)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Clinical Check: <span className="font-bold text-teal-700">{approvedCount > 0 ? 'Verified & Authorized for Dispensing' : 'Pending Pharmacy Review'}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Pharmacy Check Timestamp: {simulatedDate} {simulatedTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Warning */}
            <div className="mt-6 border-t border-slate-200 pt-2 text-center text-[10px] text-slate-500 space-y-0.5">
              <p className="font-bold text-rose-700 uppercase">
                *** THIS IS AN EDUCATIONAL SIMULATION ARTIFACT PRODUCED BY THE NHS EPMA SIMULATOR ***
              </p>
              <p>
                Confidential Medical Document — For use exclusively within accredited NHS simulation training facilities.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="no-print bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Tip: In the print dialog, choose <strong>"Save as PDF"</strong> to generate a portable PDF copy.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
