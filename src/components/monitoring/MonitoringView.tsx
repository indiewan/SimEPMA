import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Activity,
  Heart,
  Droplet,
  Thermometer,
  Wind,
  Plus,
  RefreshCw,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const MonitoringView: React.FC = () => {
  const { patient, updatePatient, simulatedTime } = useSimulation();

  const [bp, setBp] = useState(patient.vitals?.bp || '120/80');
  const [hr, setHr] = useState(patient.vitals?.heartRate.toString() || '76');
  const [rr, setRr] = useState(patient.vitals?.respRate.toString() || '18');
  const [temp, setTemp] = useState(patient.vitals?.temp.toString() || '37.0');
  const [spO2, setSpO2] = useState(patient.vitals?.oxygenSat.toString() || '98');
  const [o2Delivery, setO2Delivery] = useState(patient.vitals?.oxygenDelivery || 'Room air');

  // Simple NEWS2 calculation
  const calculateNews2 = () => {
    let score = 0;
    const heartRate = parseInt(hr) || 75;
    const respRate = parseInt(rr) || 16;
    const sat = parseInt(spO2) || 98;
    const temperature = parseFloat(temp) || 37.0;

    if (respRate <= 8 || respRate >= 25) score += 3;
    else if (respRate >= 21) score += 2;
    else if (respRate >= 9 && respRate <= 11) score += 1;

    if (sat <= 91) score += 3;
    else if (sat <= 93) score += 2;
    else if (sat <= 95) score += 1;

    if (o2Delivery !== 'Room air') score += 2;

    if (heartRate <= 40 || heartRate >= 131) score += 3;
    else if (heartRate >= 111) score += 2;
    else if (heartRate <= 50 || heartRate >= 91) score += 1;

    if (temperature <= 35.0) score += 3;
    else if (temperature >= 39.1) score += 2;
    else if (temperature <= 36.0 || temperature >= 38.1) score += 1;

    return score;
  };

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    const news2 = calculateNews2();
    updatePatient({
      vitals: {
        bp,
        heartRate: parseInt(hr) || 75,
        respRate: parseInt(rr) || 16,
        temp: parseFloat(temp) || 37.0,
        oxygenSat: parseInt(spO2) || 98,
        oxygenDelivery: o2Delivery,
        news2Score: news2,
        lastUpdated: `Today at ${simulatedTime}`
      }
    });
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-700" />
            Patient Clinical Monitoring, Vital Signs & Renal Assessment
          </h2>
          <p className="text-xs text-slate-500">
            Real-time physiologic observations directly linked to medication safety and dosing nomograms.
          </p>
        </div>
      </div>

      {/* Grid of Clinical Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Panel 1: NEWS2 & Vitals Summary */}
        <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              National Early Warning Score (NEWS2)
            </h3>
            <span
              className={`rounded-full px-2 py-0.5 font-bold text-xs font-mono ${
                (patient.vitals?.news2Score || 0) >= 5
                  ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                  : (patient.vitals?.news2Score || 0) >= 3
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              Score: {patient.vitals?.news2Score || 0}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Blood Pressure</span>
              <strong className="text-sm text-slate-900 font-mono">{patient.vitals?.bp || '120/80'}</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Heart Rate</span>
              <strong className="text-sm text-slate-900 font-mono">{patient.vitals?.heartRate || 75} bpm</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Respiratory Rate</span>
              <strong className="text-sm text-slate-900 font-mono">{patient.vitals?.respRate || 16} /min</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Oxygen Saturation</span>
              <strong className="text-sm text-slate-900 font-mono">{patient.vitals?.oxygenSat || 98}% ({patient.vitals?.oxygenDelivery})</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Temperature</span>
              <strong className="text-sm text-slate-900 font-mono">{patient.vitals?.temp || 37.0}°C</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Last Logged</span>
              <span className="text-[11px] text-slate-700 font-mono">{patient.vitals?.lastUpdated || 'Initial'}</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Renal & Pharmacokinetic Dosing Parameters */}
        <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-2">
            Renal & Pharmacokinetic Dosing Parameters
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-600 font-medium">Estimated GFR (eGFR):</span>
              <strong className={`font-mono text-sm ${patient.eGFR < 30 ? 'text-red-700 font-bold' : 'text-slate-900'}`}>
                {patient.eGFR} mL/min/1.73m²
              </strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-600 font-medium">Serum Creatinine:</span>
              <strong className="font-mono text-sm text-slate-900">{patient.creatinine} µmol/L</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-600 font-medium">Body Surface Area (BSA):</span>
              <strong className="font-mono text-sm text-slate-900">{patient.bodySurfaceArea} m²</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-600 font-medium">Actual Weight:</span>
              <strong className="font-mono text-sm text-slate-900">{patient.weightKg} kg</strong>
            </div>
          </div>

          {patient.eGFR < 30 && (
            <div className="rounded bg-red-50 border border-red-200 p-2 text-xs text-red-900">
              ⚠️ <strong>Severe Renal Impairment (CKD Stage 4/5):</strong> Check BNF dose reductions for Gentamicin, Enoxaparin, Digoxin, and Direct Oral Anticoagulants.
            </div>
          )}
        </div>

        {/* Panel 3: Log New Vitals Form */}
        <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-2">
            Record New Observations
          </h3>

          <form onSubmit={handleSaveVitals} className="mt-3 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600">BP (mmHg)</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={hr}
                  onChange={(e) => setHr(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600">Resp Rate (/min)</label>
                <input
                  type="number"
                  value={rr}
                  onChange={(e) => setRr(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600">Temp (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600">SpO2 (%)</label>
                <input
                  type="number"
                  value={spO2}
                  onChange={(e) => setSpO2(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600">O2 Delivery</label>
                <select
                  value={o2Delivery}
                  onChange={(e) => setO2Delivery(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                >
                  <option value="Room air">Room air</option>
                  <option value="2L Nasal Cannula">2L Nasal Cannula</option>
                  <option value="4L Nasal Cannula">4L Nasal Cannula</option>
                  <option value="28% Venturi Mask">28% Venturi Mask</option>
                  <option value="15L Non-rebreathe Mask">15L Non-rebreathe Mask</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded bg-teal-700 hover:bg-teal-800 text-white font-bold py-1.5 text-xs shadow-xs cursor-pointer"
            >
              Update Observation Chart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
