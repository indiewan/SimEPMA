import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { HomeMedicationItem } from '../../types/epma';
import {
  FileCheck2,
  PlusCircle,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Building,
  UserCheck,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export const MedicinesReconciliationView: React.FC = () => {
  const {
    homeMedications,
    updateHomeMedicationStatus,
    addHomeMedication,
    prescriptions,
    addPrescription,
    patient,
    role,
    setBannerMessage
  } = useSimulation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [drugName, setDrugName] = useState('');
  const [dose, setDose] = useState('');
  const [route, setRoute] = useState('Oral');
  const [frequency, setFrequency] = useState('ONCE a day in the morning');
  const [source, setSource] = useState<HomeMedicationItem['source']>('GP Summary Record');
  const [notes, setNotes] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;

    addHomeMedication({
      drugName: drugName.trim().toUpperCase(),
      dose: dose.trim() || '1 dose',
      route,
      frequency,
      source,
      status: 'UNRECONCILED',
      reconciliationNotes: notes.trim()
    });

    setShowAddModal(false);
    setDrugName('');
    setDose('');
    setNotes('');
  };

  const handlePrescribeAsInpatient = (item: HomeMedicationItem) => {
    addPrescription({
      drugName: item.drugName,
      dose: item.dose,
      route: item.route,
      frequency: item.frequency,
      rxType: 'REGULAR',
      directions: `Continued from pre-admission medication history (${item.source})`
    });
    updateHomeMedicationStatus(item.id, 'CONTINUED_INPATIENT', `Charted as inpatient regular prescription.`);
    setBannerMessage({
      type: 'success',
      text: `Prescribed ${item.drugName} to inpatient chart from pre-admission history.`
    });
  };

  const unreconciledCount = homeMedications.filter(m => m.status === 'UNRECONCILED').length;

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-3 sm:p-4 space-y-3">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white p-3 rounded-lg shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-sky-800 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              Medicines Reconciliation (Admission Meds Rec)
            </span>
            <span className="text-xs font-bold text-slate-600">
              NICE Guideline NG5 Compliance Status: {unreconciledCount === 0 ? '✓ Complete' : `⏳ ${unreconciledCount} Pending`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare pre-admission medications from GP Summary & Community Pharmacy with inpatient prescriptions to eliminate admission errors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-add-homemed"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded bg-sky-700 hover:bg-sky-800 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Pre-Admission Medication</span>
          </button>
        </div>
      </div>

      {/* NICE Guideline Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Building className="h-4 w-4 text-sky-700" />
            <span>1. Information Sources</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            Minimum of two independent sources verified (GP Summary Record & Patient's Own Drugs green bag).
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <FileCheck2 className="h-4 w-4 text-emerald-700" />
            <span>2. Intentional Changes Documented</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            Any withheld or dose-altered pre-admission medicines have documented clinical reasons.
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <ShieldCheck className="h-4 w-4 text-teal-700" />
            <span>3. 24-Hour Sign-Off</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            Medicines reconciliation completed and formally signed off within 24 hours of hospital admission.
          </p>
        </div>
      </div>

      {/* Pre-Admission Medications List */}
      <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          <div className="col-span-4">Pre-Admission Medication</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-2">Reconciliation Status</div>
          <div className="col-span-3">Clinical Decision / Notes</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-slate-200 text-xs">
          {homeMedications.map((item) => (
            <div key={item.id} className="grid grid-cols-12 px-3 py-3 items-center hover:bg-slate-50">
              {/* Med details */}
              <div className="col-span-4 pr-2">
                <strong className="text-slate-900 font-bold">{item.drugName}</strong>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {item.dose} • {item.route} • <strong className="text-slate-800">{item.frequency}</strong>
                </div>
              </div>

              {/* Source */}
              <div className="col-span-2 text-[11px] text-slate-700">
                <span className="inline-block rounded bg-slate-100 border border-slate-300 px-2 py-0.5 font-semibold">
                  {item.source}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    item.status === 'CONTINUED_INPATIENT'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : item.status === 'WITHHELD'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : item.status === 'DISCONTINUED'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {item.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Notes */}
              <div className="col-span-3 pr-2 text-[11px] text-slate-600">
                <p className="bg-slate-50 p-1.5 rounded border border-slate-200 leading-snug">
                  {item.reconciliationNotes || 'No notes specified'}
                </p>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-end gap-1">
                {item.status !== 'CONTINUED_INPATIENT' && (
                  <button
                    onClick={() => handlePrescribeAsInpatient(item)}
                    title="Prescribe as regular inpatient order"
                    className="flex items-center gap-1 rounded bg-sky-700 hover:bg-sky-800 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    <span>Prescribe</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Pre-admission Med Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-sky-700" />
              Add Pre-Admission Medication History Item
            </h3>

            <form onSubmit={handleAddSubmit} className="mt-3 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Drug Name & Formulation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BISOPROLOL Tablets 2.5mg"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Dose</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2.5 mg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Route</label>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                  >
                    <option value="Oral">Oral</option>
                    <option value="Inhaled">Inhaled</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Transdermal">Transdermal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Frequency</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Verification Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as any)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                >
                  <option value="GP Summary Record">GP Summary Record</option>
                  <option value="Patient Recall">Patient Recall / Family Interview</option>
                  <option value="Community Pharmacy PMR">Community Pharmacy PMR</option>
                  <option value="Patients Own Drugs (PODs)">Patients Own Drugs (PODs Green Bag)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Clinical Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Patient confirms taking compliance daily with morning cup of tea."
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-700 hover:bg-sky-800 text-white font-bold px-4 py-1.5 cursor-pointer shadow-xs"
                >
                  Save to Pre-Admission List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
