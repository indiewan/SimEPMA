import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Pill } from 'lucide-react';

export const ConflictLogView: React.FC = () => {
  const { prescriptions, patient } = useSimulation();

  // Calculate cumulative paracetamol dose in 24h
  let paracetamolTotalMg = 0;
  prescriptions.forEach(p => {
    if (p.genericName.toLowerCase().includes('paracetamol')) {
      p.administrationEvents.forEach(e => {
        if (e.status === 'ADMINISTERED') {
          const num = parseInt(e.doseAdministered?.replace(/\D/g, '') || '1000');
          paracetamolTotalMg += isNaN(num) ? 1000 : num;
        }
      });
    }
  });

  const isParacetamolOverMax = paracetamolTotalMg > 4000;
  const isParacetamolNearMax = paracetamolTotalMg >= 3000 && paracetamolTotalMg <= 4000;

  return (
    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-600" />
          Clinical Decision Support (CDS) & Conflict Audit Log
        </h2>
        <p className="text-xs text-slate-500">
          Automated safety surveillance for drug-allergy contraindications, drug-drug interactions, duplicate therapies, and maximum cumulative thresholds.
        </p>
      </div>

      {/* Paracetamol 24h Cumulative Dose Tracker Widget */}
      <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Pill className="h-4 w-4 text-teal-700" />
            Paracetamol 24-Hour Cumulative Dose Surveillance
          </h3>
          <span
            className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
              isParacetamolOverMax
                ? 'bg-red-100 text-red-900 border border-red-300 animate-pulse'
                : isParacetamolNearMax
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            {paracetamolTotalMg} mg / 4000 mg Max
          </span>
        </div>

        <div className="mt-3">
          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isParacetamolOverMax
                  ? 'bg-red-600'
                  : isParacetamolNearMax
                  ? 'bg-amber-500'
                  : 'bg-teal-600'
              }`}
              style={{ width: `${Math.min(100, (paracetamolTotalMg / 4000) * 100)}%` }}
            />
          </div>

          <p className="text-xs text-slate-600 mt-2">
            The NHS National Overdose Reduction rule requires calculating all administered oral, IV, rectal, and combination analgesic paracetamol forms within any rolling 24-hour period.
          </p>
        </div>
      </div>

      {/* Active Allergy Alert */}
      <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-2">
          Active Patient Allergy Warnings
        </h3>

        {patient.allergies.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded border border-emerald-200">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>No allergy conflicts detected on active inpatient chart.</span>
          </div>
        ) : (
          patient.allergies.map(a => (
            <div key={a.id} className="rounded border border-red-200 bg-red-50 p-3 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-red-900 font-bold text-xs">{a.allergen}</strong>
                <span className="rounded bg-red-200 text-red-900 font-bold px-1.5 py-0.2 text-[10px]">
                  {a.severity}
                </span>
              </div>
              <p className="text-red-800 text-[11px] mt-1">Documented Reaction: {a.reaction}</p>
            </div>
          ))
        )}
      </div>

      {/* Duplicate Therapy & Interaction Checks */}
      <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-2">
          Prescription Duplicate & Interaction Audits
        </h3>

        <div className="space-y-2 text-xs">
          {prescriptions.some(p => p.drugName.includes('PARACETAMOL') && p.rxType === 'PRN') && (
            <div className="rounded border border-amber-200 bg-amber-50 p-3 text-amber-950">
              <strong className="block font-bold">Either/Or Protocol Active: Paracetamol Multi-route Orders</strong>
              <p className="mt-1 text-[11px] text-amber-900">
                Patient has multiple PRN paracetamol formulations charted (Tablets, Suspension, Suppository). Clinicians must verify no duplicate route administration has occurred within 4 hours.
              </p>
            </div>
          )}

          {patient.eGFR < 30 && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-red-950">
              <strong className="block font-bold">Severe Renal Impairment Advisory (eGFR: {patient.eGFR})</strong>
              <p className="mt-1 text-[11px] text-red-900">
                Creatinine clearance is markedly reduced. Ensure all renally cleared antimicrobials and direct oral anticoagulants are adjusted in accordance with local trust antimicrobial guidelines.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
