import fs from 'fs';

const currentFile = fs.readFileSync('src/data/bnfFormulary.ts', 'utf8');

// The array starts at `export const BNF_FORMULARY: DrugFormularyItem[] = [`
// and ends at `];\n\nexport function checkPrescribingConflicts`

const prefix = currentFile.split('export const BNF_FORMULARY: DrugFormularyItem[] = [')[0];
const suffix = '];\n\nexport function checkPrescribingConflicts' + currentFile.split('];\n\nexport function checkPrescribingConflicts')[1];

const newDrugs = `
  {
    id: 'bnf-amoxicillin',
    name: 'AMOXICILLIN',
    genericName: 'Amoxicillin trihydrate',
    bnfChapter: '5.1.1.1 Penicillins',
    standardFormulations: ['500 mg Capsules', '250 mg in 5mL Oral Suspension', '500 mg Injection Powder'],
    standardStrengths: ['500 mg', '250 mg/5mL', '1 g'],
    standardRoutes: ['Oral', 'IntraVENOUS'],
    defaultDoses: ['500 mg', '1000 mg', '250 mg'],
    typicalFrequencies: [
      { label: 'THREE times a day at 08:00, 14:00 and 22:00', times: ['08:00', '14:00', '22:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    allergyGroup: 'PENICILLIN',
    cautions: ['Risk of severe allergic anaphylaxis in penicillin allergy'],
    contraindications: ['Known Penicillin allergy']
  },
  {
    id: 'bnf-bisoprolol',
    name: 'BISOPROLOL',
    genericName: 'Bisoprolol fumarate',
    bnfChapter: '2.4 Beta-adrenoceptor blocking drugs',
    standardFormulations: ['1.25 mg Tablets', '2.5 mg Tablets', '5 mg Tablets', '10 mg Tablets'],
    standardStrengths: ['1.25 mg', '2.5 mg', '5 mg', '10 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['2.5 mg', '5 mg', '1.25 mg', '10 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    preAdminRequirement: {
      type: 'PULSE',
      label: 'Heart Rate (Pulse Rate)',
      unit: 'bpm',
      minNormal: 55,
      warningText: 'Heart rate < 55 bpm. Risk of symptomatic bradycardia or AV block.',
      hardStop: false
    },
    cautions: ['Can mask hypoglycaemia symptoms (tachycardia) in diabetics'],
    contraindications: ['Severe asthma / acute bronchospasm', 'Severe bradycardia (<50 bpm)']
  },
  {
    id: 'bnf-citalopram',
    name: 'CITALOPRAM',
    genericName: 'Citalopram hydrobromide',
    bnfChapter: '4.3.3 Selective serotonin reuptake inhibitors',
    standardFormulations: ['10 mg Tablets', '20 mg Tablets', '40 mg Tablets'],
    standardStrengths: ['10 mg', '20 mg', '40 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['20 mg', '10 mg', '40 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Dose-dependent QT prolongation: max 20mg in elderly'],
    contraindications: ['Congenital long QT syndrome']
  },
  {
    id: 'bnf-diazepam',
    name: 'DIAZEPAM',
    genericName: 'Diazepam',
    bnfChapter: '4.1.2 Anxiolytics & Benzodiazepines',
    standardFormulations: ['2 mg Tablets', '5 mg Tablets', '10 mg/2mL Injection', '5 mg Rectal Tubes'],
    standardStrengths: ['2 mg', '5 mg', '10 mg'],
    standardRoutes: ['Oral', 'IntraVENOUS', 'Rectal'],
    defaultDoses: ['2 mg', '5 mg', '10 mg'],
    typicalFrequencies: [
      { label: 'THREE times a day (08:00, 14:00, 20:00)', times: ['08:00', '14:00', '20:00'], type: 'REGULAR' },
      { label: 'When required (PRN) for severe anxiety/spasm', times: ['PRN'], type: 'PRN' },
      { label: 'STAT Once Only for status epilepticus', times: ['STAT'], type: 'STAT' }
    ],
    isControlledDrug: true,
    isHighAlert: false,
    cautions: ['Risk of severe dependency, tolerance, and withdrawal seizures with courses > 2-4 weeks'],
    contraindications: ['Severe respiratory depression', 'Myasthenia gravis']
  },
  {
    id: 'bnf-enoxaparin',
    name: 'ENOXAPARIN (CLEXANE)',
    genericName: 'Enoxaparin sodium',
    bnfChapter: '2.8.1 Low molecular weight heparins',
    standardFormulations: ['20 mg/0.2mL Syringe', '40 mg/0.4mL Syringe', '60 mg/0.6mL Syringe'],
    standardStrengths: ['20 mg', '40 mg', '60 mg', '1.5 mg/kg'],
    standardRoutes: ['Subcutaneous'],
    defaultDoses: ['40 mg SC (VTE Prophylaxis)', '20 mg SC (renal adjustment eGFR < 30)', '1.5 mg/kg SC once daily (Treatment)'],
    typicalFrequencies: [
      { label: 'ONCE a day in evening at 18:00 (VTE Prophylaxis)', times: ['18:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: true,
    cautions: ['Reduce dose by 50% if eGFR < 30 mL/min'],
    contraindications: ['Active major haemorrhage', 'Heparin-induced thrombocytopenia']
  },
  {
    id: 'bnf-furosemide',
    name: 'FUROSEMIDE',
    genericName: 'Furosemide',
    bnfChapter: '2.2.2 Loop diuretics',
    standardFormulations: ['20 mg Tablets', '40 mg Tablets', '20 mg/2mL Injection'],
    standardStrengths: ['20 mg', '40 mg', '80 mg'],
    standardRoutes: ['Oral', 'IntraVENOUS', 'Subcutaneous'],
    defaultDoses: ['40 mg', '20 mg', '80 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' },
      { label: 'TWICE a day in morning and lunchtime (08:00, 12:00)', times: ['08:00', '12:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Give morning and midday; avoid late evening doses to prevent nocturia', 'Monitor serum potassium'],
    contraindications: ['Severe hypokalaemia', 'Anuric renal failure']
  },
  {
    id: 'bnf-gliclazide',
    name: 'GLICLAZIDE',
    genericName: 'Gliclazide',
    bnfChapter: '6.1.2.1 Sulfonylureas',
    standardFormulations: ['40 mg Tablets', '80 mg Tablets', '30 mg M/R Tablets'],
    standardStrengths: ['40 mg', '80 mg', '30 mg M/R'],
    standardRoutes: ['Oral'],
    defaultDoses: ['40 mg', '80 mg', '30 mg M/R'],
    typicalFrequencies: [
      { label: 'ONCE a day with breakfast at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    preAdminRequirement: {
      type: 'BLOOD_GLUCOSE',
      label: 'Blood Glucose (CBG)',
      unit: 'mmol/L',
      minNormal: 4.0,
      warningText: 'CBG < 4.0 mmol/L. Risk of severe prolonged hypoglycaemia. Treat hypo and hold dose until meal consumed.',
      hardStop: false
    },
    cautions: ['High risk of hypoglycaemia: patient must eat carbohydrates immediately following dose'],
    contraindications: ['Severe renal impairment', 'Type 1 Diabetes']
  },
  {
    id: 'bnf-haloperidol',
    name: 'HALOPERIDOL',
    genericName: 'Haloperidol',
    bnfChapter: '4.2.1 Typical antipsychotics',
    standardFormulations: ['500 mcg Tablets', '1.5 mg Tablets', '5 mg Tablets', '5 mg/1mL Injection'],
    standardStrengths: ['500 mcg', '1.5 mg', '5 mg'],
    standardRoutes: ['Oral', 'IntraMUSCULAR', 'Subcutaneous'],
    defaultDoses: ['500 mcg', '1.5 mg', '5 mg'],
    typicalFrequencies: [
      { label: 'When required (PRN) for acute hyperactive delirium (max 5mg/24h)', times: ['PRN'], type: 'PRN' }
    ],
    isControlledDrug: false,
    isHighAlert: true,
    cautions: ['Check baseline ECG for QT prolongation before starting'],
    contraindications: ['Parkinson disease and Lewy Body dementia', 'QT prolongation']
  },
  {
    id: 'bnf-ibuprofen',
    name: 'IBUPROFEN',
    genericName: 'Ibuprofen',
    bnfChapter: '4.7.1 Non-steroidal anti-inflammatory drugs',
    standardFormulations: ['200 mg Tablets', '400 mg Tablets', '100 mg/5mL Suspension'],
    standardStrengths: ['200 mg', '400 mg', '600 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['400 mg', '200 mg'],
    typicalFrequencies: [
      { label: 'THREE times a day with food (08:00, 14:00, 20:00)', times: ['08:00', '14:00', '20:00'], type: 'REGULAR' },
      { label: 'When required (PRN) with food (max 1200mg/24h)', times: ['PRN'], type: 'PRN' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    allergyGroup: 'NSAID',
    cautions: ['Take with or immediately after food', 'High risk of acute kidney injury (AKI) when combined with ACEi and Diuretic (Triple Whammy)'],
    contraindications: ['Active gastrointestinal bleeding / peptic ulcer', 'Severe heart failure', 'Aspirin/NSAID-induced asthma']
  },
  {
    id: 'bnf-ketamine',
    name: 'KETAMINE',
    genericName: 'Ketamine',
    bnfChapter: '15.1.1 Intravenous anaesthetics',
    standardFormulations: ['10 mg/mL Injection', '50 mg/mL Injection'],
    standardStrengths: ['10 mg/mL', '50 mg/mL'],
    standardRoutes: ['IntraVENOUS', 'IntraMUSCULAR'],
    defaultDoses: ['0.5 mg/kg IV (analgesia)', '1-2 mg/kg IV (induction of anaesthesia)'],
    typicalFrequencies: [
      { label: 'STAT Once Only for procedural sedation/analgesia', times: ['STAT'], type: 'STAT' }
    ],
    isControlledDrug: true,
    isHighAlert: true,
    cautions: ['Requires advanced airway management skills available', 'Emergence delirium (can be mitigated with midazolam)'],
    contraindications: ['Hypertension where rise in BP is hazardous (e.g. aortic dissection)']
  },
  {
    id: 'bnf-lansoprazole',
    name: 'LANSOPRAZOLE',
    genericName: 'Lansoprazole',
    bnfChapter: '1.3.5 Proton pump inhibitors',
    standardFormulations: ['15 mg Orodispersible', '30 mg Orodispersible', '15 mg Capsules', '30 mg Capsules'],
    standardStrengths: ['15 mg', '30 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['30 mg', '15 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Preferred PPI when co-prescribed with Clopidogrel (minimal CYP2C19 inhibition compared to Omeprazole)'],
    contraindications: ['Hypersensitivity to lansoprazole']
  },
  {
    id: 'bnf-morphine',
    name: 'MORPHINE SULFATE',
    genericName: 'Morphine sulfate',
    bnfChapter: '4.7.2 Opioid analgesics',
    standardFormulations: [
      '10 mg/5mL Oral Solution (Oramorph)',
      '10 mg Tablets (MST Continus)',
      '10 mg/1mL Injection (Controlled Drug)',
      '30 mg Prolonged-release Tablets'
    ],
    standardStrengths: ['10 mg/5mL', '10 mg/1mL', '10 mg PR', '30 mg PR'],
    standardRoutes: ['Oral', 'Subcutaneous', 'IntraVENOUS', 'Intramuscular'],
    defaultDoses: ['5 mg (2.5 mL Oramorph)', '10 mg (5 mL Oramorph)', '2.5 mg SC', '5 mg SC'],
    typicalFrequencies: [
      { label: 'When required (PRN) every 2-4 hours for breakthrough pain', times: ['PRN'], type: 'PRN' },
      { label: 'TWICE a day at 08:00 and 20:00 (For PR Tablets only)', times: ['08:00', '20:00'], type: 'REGULAR' }
    ],
    isControlledDrug: true,
    isHighAlert: true,
    preAdminRequirement: {
      type: 'RESP_RATE',
      label: 'Respiratory Rate',
      unit: 'breaths/min',
      minNormal: 10,
      warningText: 'Respiratory Rate < 10 breaths/min. Opioid-induced respiratory depression. Withhold dose and prepare Naloxone.',
      hardStop: true
    },
    allergyGroup: 'OPIOID',
    cautions: ['Co-prescribe laxative (e.g., Senna) and PRN anti-emetic', 'Renal impairment: active metabolites accumulate'],
    contraindications: ['Acute respiratory depression', 'Paralytic ileus', 'Raised intracranial pressure']
  },
  {
    id: 'bnf-naloxone',
    name: 'NALOXONE',
    genericName: 'Naloxone hydrochloride',
    bnfChapter: '4.7.2 Opioid antagonists',
    standardFormulations: ['400 mcg/1mL Injection', '1.8 mg/0.1mL Nasal Spray'],
    standardStrengths: ['400 mcg/mL'],
    standardRoutes: ['IntraVENOUS', 'IntraMUSCULAR', 'Subcutaneous'],
    defaultDoses: ['400 mcg (adult overdose)', '100-200 mcg (titrated)'],
    typicalFrequencies: [
      { label: 'STAT Once Only emergency reversal', times: ['STAT'], type: 'STAT' }
    ],
    isControlledDrug: false,
    isHighAlert: true,
    cautions: ['Half-life of Naloxone is shorter than most opioids; patient must be monitored for recurrence of coma/respiratory arrest'],
    contraindications: ['Known hypersensitivity']
  },
  {
    id: 'bnf-omeprazole',
    name: 'OMEPRAZOLE',
    genericName: 'Omeprazole',
    bnfChapter: '1.3.5 Proton pump inhibitors',
    standardFormulations: ['10 mg Capsules', '20 mg Capsules', '40 mg Capsules', '40 mg Infusion'],
    standardStrengths: ['10 mg', '20 mg', '40 mg'],
    standardRoutes: ['Oral', 'IntraVENOUS Infusion'],
    defaultDoses: ['20 mg', '40 mg', '10 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day at 08:00', times: ['08:00'], type: 'REGULAR' },
      { label: 'TWICE a day at 08:00 and 20:00', times: ['08:00', '20:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['May mask symptoms of gastric malignancy', 'Increased risk of C. difficile and hypomagnesaemia with prolonged use'],
    contraindications: ['Hypersensitivity']
  },
  {
    id: 'bnf-paracetamol',
    name: 'PARACETAMOL',
    genericName: 'Paracetamol',
    bnfChapter: '4.7.1 Non-opioid analgesics',
    standardFormulations: ['500 mg Tablets', '1 g/100mL Solution for Infusion', '120 mg/5mL Suspension'],
    standardStrengths: ['500 mg', '1 g/100mL'],
    standardRoutes: ['Oral', 'IntraVENOUS', 'Rectal'],
    defaultDoses: ['1 g (1000 mg)', '500 mg', '15 mg/kg IV (<50kg)'],
    typicalFrequencies: [
      { label: 'FOUR times a day regular (08:00, 12:00, 18:00, 22:00)', times: ['08:00', '12:00', '18:00', '22:00'], type: 'REGULAR' },
      { label: 'When required (PRN) min 4h interval', times: ['PRN'], type: 'PRN' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Weight-adjusted dosing mandatory for patients < 50kg (max 60mg/kg/day or 3g/24h IV)'],
    contraindications: ['Severe active hepatic impairment']
  },
  {
    id: 'bnf-quetiapine',
    name: 'QUETIAPINE',
    genericName: 'Quetiapine',
    bnfChapter: '4.2.1 Atypical antipsychotics',
    standardFormulations: ['25 mg Tablets', '100 mg Tablets', '200 mg Tablets', '50 mg M/R Tablets'],
    standardStrengths: ['25 mg', '50 mg', '100 mg', '200 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['25 mg', '50 mg', '150 mg', '300 mg M/R'],
    typicalFrequencies: [
      { label: 'TWICE a day (08:00, 20:00)', times: ['08:00', '20:00'], type: 'REGULAR' },
      { label: 'ONCE a day at bedtime (M/R formulation)', times: ['22:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['High risk of metabolic syndrome and weight gain', 'Sedation and postural hypotension'],
    contraindications: ['Concurrent use with strong CYP3A4 inhibitors (e.g. clarithromycin)']
  },
  {
    id: 'bnf-ramipril',
    name: 'RAMIPRIL',
    genericName: 'Ramipril',
    bnfChapter: '2.5.5.1 ACE inhibitors',
    standardFormulations: ['1.25 mg Capsules', '2.5 mg Capsules', '5 mg Capsules', '10 mg Capsules'],
    standardStrengths: ['1.25 mg', '2.5 mg', '5 mg', '10 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['2.5 mg', '1.25 mg', '5 mg', '10 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    preAdminRequirement: {
      type: 'BLOOD_PRESSURE',
      label: 'Systolic BP',
      unit: 'mmHg',
      minNormal: 95,
      warningText: 'Systolic BP < 95 mmHg. Caution: Risk of first-dose profound hypotension.',
      hardStop: false
    },
    cautions: ['Monitor U&Es and eGFR', 'Dry cough in up to 15% of patients'],
    contraindications: ['History of ACE inhibitor angioedema', 'Bilateral renal artery stenosis']
  },
  {
    id: 'bnf-salbutamol',
    name: 'SALBUTAMOL',
    genericName: 'Salbutamol sulfate',
    bnfChapter: '3.1.1.1 Short-acting beta2 agonists',
    standardFormulations: ['100 mcg/actuation Inhaler', '2.5 mg/2.5mL Nebuliser Liquid', '5 mg/2.5mL Nebuliser Liquid'],
    standardStrengths: ['100 mcg/dose', '2.5 mg/2.5mL', '5 mg/2.5mL'],
    standardRoutes: ['Inhalation', 'Nebulisation'],
    defaultDoses: ['2 puffs (200 mcg)', '2.5 mg Nebulised', '5 mg Nebulised'],
    typicalFrequencies: [
      { label: 'When required (PRN) for wheeze', times: ['PRN'], type: 'PRN' },
      { label: 'FOUR times a day regular (08:00, 12:00, 18:00, 22:00)', times: ['08:00', '12:00', '18:00', '22:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['High doses cause tremor, tachycardia, and hypokalaemia'],
    contraindications: ['Hypersensitivity']
  },
  {
    id: 'bnf-tiotropium',
    name: 'TIOTROPIUM (SPIRIVA)',
    genericName: 'Tiotropium bromide',
    bnfChapter: '3.1.2 Long-acting muscarinic antagonists',
    standardFormulations: ['2.5 mcg/actuation Respimat', '18 mcg Inhalation Powder Capsules'],
    standardStrengths: ['2.5 mcg/dose', '18 mcg'],
    standardRoutes: ['Inhalation'],
    defaultDoses: ['2 puffs (5 mcg) once daily', '1 capsule (18 mcg) once daily'],
    typicalFrequencies: [
      { label: 'ONCE a day in morning at 08:00', times: ['08:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Do NOT swallow powder capsules: must be inhaled via HandiHaler', 'Caution in narrow-angle glaucoma'],
    contraindications: ['Hypersensitivity']
  },
  {
    id: 'bnf-ursodeoxycholic',
    name: 'URSODEOXYCHOLIC ACID',
    genericName: 'Ursodeoxycholic acid',
    bnfChapter: '1.9.1 Biliary therapeutics',
    standardFormulations: ['150 mg Tablets', '250 mg Capsules', '300 mg Tablets', '250 mg/5mL Suspension'],
    standardStrengths: ['150 mg', '250 mg', '300 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['250 mg', '300 mg', '150 mg'],
    typicalFrequencies: [
      { label: 'TWICE a day with meals (08:00, 18:00)', times: ['08:00', '18:00'], type: 'REGULAR' },
      { label: 'ONCE a day at bedtime', times: ['22:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Monitor liver function every 4 weeks for first 3 months of primary biliary cholangitis treatment'],
    contraindications: ['Acute cholecystitis', 'Biliary obstruction']
  },
  {
    id: 'bnf-vancomycin',
    name: 'VANCOMYCIN',
    genericName: 'Vancomycin hydrochloride',
    bnfChapter: '5.1.7 Glycopeptide antibacterials',
    standardFormulations: ['500 mg Powder for Infusion', '1 g Powder for Infusion', '125 mg Capsules (Oral)'],
    standardStrengths: ['1 g', '500 mg', '125 mg (Oral)'],
    standardRoutes: ['IntraVENOUS Infusion', 'Oral (for C. diff only)'],
    defaultDoses: ['1 g IV', '1.5 g IV', '125 mg Oral'],
    typicalFrequencies: [
      { label: 'TWICE a day every 12 hours (08:00, 20:00)', times: ['08:00', '20:00'], type: 'REGULAR' },
      { label: 'FOUR times a day Oral for C. diff (06:00, 12:00, 18:00, 22:00)', times: ['06:00', '12:00', '18:00', '22:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: true,
    preAdminRequirement: {
      type: 'RENAL_TDM',
      label: 'Pre-Dose Trough Vancomycin Level',
      unit: 'mg/L',
      maxNormal: 20.0,
      warningText: 'Vancomycin trough > 20 mg/L. High risk of nephrotoxicity. Withhold dose and adjust interval.',
      hardStop: false
    },
    cautions: ['Infuse IV slowly over at least 60-120 mins to prevent Red Man Syndrome', 'TDM trough level mandatory before 3rd or 4th dose'],
    contraindications: ['Known glycopeptide hypersensitivity']
  },
  {
    id: 'bnf-warfarin',
    name: 'WARFARIN',
    genericName: 'Warfarin sodium',
    bnfChapter: '2.8.2 Oral anticoagulants (Vitamin K antagonists)',
    standardFormulations: ['0.5 mg Tablets (White)', '1 mg Tablets (Brown)', '3 mg Tablets (Blue)', '5 mg Tablets (Pink)'],
    standardStrengths: ['1 mg', '3 mg', '5 mg', '0.5 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['Variable dose as per yellow book', '1 mg', '3 mg', '5 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day in evening at 18:00 (consistent daily timing)', times: ['18:00'], type: 'REGULAR' }
    ],
    isControlledDrug: false,
    isHighAlert: true,
    preAdminRequirement: {
      type: 'INR',
      label: 'International Normalised Ratio (INR)',
      unit: 'INR',
      maxNormal: 4.5,
      warningText: 'INR > 4.5. High risk of major spontaneous hemorrhage. Withhold dose.',
      hardStop: false
    },
    cautions: ['CRITICAL: Check most recent INR before administering', 'Extensive drug and dietary interactions'],
    contraindications: ['Active bleeding', 'Pregnancy (1st trimester)']
  },
  {
    id: 'bnf-xylometazoline',
    name: 'XYLOMETAZOLINE',
    genericName: 'Xylometazoline hydrochloride',
    bnfChapter: '12.2.2 Topical nasal decongestants',
    standardFormulations: ['0.1% Nasal Spray', '0.1% Nasal Drops', '0.05% Nasal Drops (Paediatric)'],
    standardStrengths: ['0.1%', '0.05%'],
    standardRoutes: ['Intranasal'],
    defaultDoses: ['1 spray per nostril', '1-2 drops per nostril'],
    typicalFrequencies: [
      { label: 'When required (PRN) up to 3 times a day (max 7 days)', times: ['PRN'], type: 'PRN' }
    ],
    isControlledDrug: false,
    isHighAlert: false,
    cautions: ['Do not use for more than 7 consecutive days due to risk of rebound nasal congestion (rhinitis medicamentosa)'],
    contraindications: ['Recent trans-sphenoidal neurosurgery']
  },
  {
    id: 'bnf-zopiclone',
    name: 'ZOPICLONE',
    genericName: 'Zopiclone',
    bnfChapter: '4.1.1 Hypnotics (Z-drugs)',
    standardFormulations: ['3.75 mg Tablets', '7.5 mg Tablets'],
    standardStrengths: ['3.75 mg', '7.5 mg'],
    standardRoutes: ['Oral'],
    defaultDoses: ['3.75 mg (elderly)', '7.5 mg'],
    typicalFrequencies: [
      { label: 'ONCE a day at bedtime at 22:00', times: ['22:00'], type: 'REGULAR' },
      { label: 'When required (PRN) at night for insomnia', times: ['PRN'], type: 'PRN' }
    ],
    isControlledDrug: true,
    isHighAlert: false,
    cautions: ['Limit course to max 2-4 weeks', 'Bitter taste on waking', 'Fall risk in elderly'],
    contraindications: ['Severe respiratory depression', 'Myasthenia gravis']
  }
`;

fs.writeFileSync('src/data/bnfFormulary.ts', prefix + `export const BNF_FORMULARY: DrugFormularyItem[] = [${newDrugs}${suffix}`);
console.log("Updated BNF_FORMULARY");
