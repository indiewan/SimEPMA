const fs = require('fs');

const reg = [{label: 'ONCE a day at 08:00', times: ['08:00'], type: 'REGULAR'}];
const regNight = [{label: 'ONCE a day at 22:00', times: ['22:00'], type: 'REGULAR'}];
const bd = [{label: 'TWICE a day (08:00, 20:00)', times: ['08:00', '20:00'], type: 'REGULAR'}];
const tds = [{label: 'THREE times a day', times: ['08:00', '14:00', '20:00'], type: 'REGULAR'}];
const qds = [{label: 'FOUR times a day', times: ['08:00', '12:00', '18:00', '22:00'], type: 'REGULAR'}];
const prn = [{label: 'When required (PRN)', times: ['PRN'], type: 'PRN'}];
const stat = [{label: 'STAT Once Only', times: ['STAT'], type: 'STAT'}];

const bpReq = {type:'BLOOD_PRESSURE', label:'Systolic BP', unit:'mmHg', minNormal:90, warningText:'BP < 90. Risk of hypotension.', hardStop:false};
const hrReq = {type:'PULSE', label:'Heart Rate', unit:'bpm', minNormal:55, warningText:'HR < 55. Risk of bradycardia.', hardStop:false};

const makeDrug = (name, gen, chap, forms, str, routes, doses, freq, cd, alert, req, cautions, contra, allergy) => ({
  id: 'bnf-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  name, genericName: gen, bnfChapter: chap,
  standardFormulations: forms, standardStrengths: str, standardRoutes: routes,
  defaultDoses: doses, typicalFrequencies: freq,
  isControlledDrug: cd, isHighAlert: alert, preAdminRequirement: req,
  cautions, contraindications: contra, allergyGroup: allergy
});

const newDrugs = [
  // Cardio & Vasc
  makeDrug('AMIODARONE', 'Amiodarone', '2.3.2 Antiarrhythmics', ['200mg Tab', '300mg/10mL IV'], ['200mg', '300mg'], ['Oral', 'IV'], ['200mg'], tds, false, true, hrReq, ['Pulmonary toxicity', 'Thyroid dysfunction'], ['Sinus bradycardia']),
  makeDrug('ATENOLOL', 'Atenolol', '2.4 Beta-blockers', ['25mg Tab', '50mg Tab'], ['25mg', '50mg'], ['Oral'], ['50mg'], reg, false, false, hrReq, ['Masks hypoglycaemia'], ['Asthma']),
  makeDrug('CANDESARTAN', 'Candesartan', '2.5.5.2 ARBs', ['4mg Tab', '8mg Tab'], ['4mg', '8mg'], ['Oral'], ['8mg'], reg, false, false, bpReq, ['Hyperkalaemia'], ['Pregnancy']),
  makeDrug('CLONIDINE', 'Clonidine', '2.5.2 Centrally acting antihypertensives', ['25mcg Tab'], ['25mcg'], ['Oral', 'IV'], ['25mcg', '50mcg'], bd, false, true, bpReq, ['Rebound hypertension on withdrawal'], []),
  makeDrug('DILTIAZEM', 'Diltiazem', '2.6.2 Calcium-channel blockers', ['60mg Tab', '120mg M/R'], ['60mg', '120mg'], ['Oral'], ['60mg'], tds, false, false, bpReq, ['Heart block'], ['Severe bradycardia']),
  makeDrug('DOXAZOSIN', 'Doxazosin', '2.5.4 Alpha-blockers', ['1mg Tab', '2mg Tab'], ['1mg', '2mg'], ['Oral'], ['1mg', '2mg'], reg, false, false, bpReq, ['Postural hypotension'], []),
  makeDrug('FLECAINIDE', 'Flecainide', '2.3.2 Antiarrhythmics', ['50mg Tab', '100mg Tab'], ['50mg', '100mg'], ['Oral'], ['50mg', '100mg'], bd, false, true, hrReq, ['Proarrhythmic'], ['Structural heart disease']),
  makeDrug('INDAPAMIDE', 'Indapamide', '2.2.1 Thiazide-like diuretics', ['2.5mg Tab'], ['2.5mg'], ['Oral'], ['2.5mg'], reg, false, false, bpReq, ['Hypokalaemia'], ['Severe hepatic impairment']),
  makeDrug('ISOSORBIDE MONONITRATE', 'Isosorbide Mononitrate', '2.6.1 Nitrates', ['10mg Tab', '60mg M/R'], ['10mg', '60mg'], ['Oral'], ['60mg'], reg, false, false, bpReq, ['Tolerance (needs nitrate-free period)'], ['Severe hypotension']),
  makeDrug('LABETALOL', 'Labetalol', '2.4 Beta-blockers', ['100mg Tab', '200mg Tab', '50mg/10mL IV'], ['100mg', '200mg', '50mg/10mL'], ['Oral', 'IV'], ['100mg', '200mg'], bd, false, false, hrReq, ['Postural hypotension'], ['Asthma']),
  makeDrug('LOSARTAN', 'Losartan', '2.5.5.2 ARBs', ['50mg Tab', '100mg Tab'], ['50mg', '100mg'], ['Oral'], ['50mg'], reg, false, false, bpReq, ['Hyperkalaemia'], ['Pregnancy']),
  makeDrug('TICAGRELOR', 'Ticagrelor', '2.9 Antiplatelets', ['90mg Tab'], ['90mg'], ['Oral'], ['90mg'], bd, false, false, undefined, ['Dyspnoea'], ['Active bleeding']),
  makeDrug('VERAPAMIL', 'Verapamil', '2.6.2 Calcium-channel blockers', ['40mg Tab', '80mg Tab'], ['40mg', '80mg'], ['Oral'], ['40mg', '80mg'], tds, false, false, hrReq, ['Heart failure exacerbation'], ['Concomitant beta-blocker use']),

  // Antimicrobials
  makeDrug('ACICLOVIR', 'Aciclovir', '5.3.2.1 Antivirals', ['200mg Tab', '400mg Tab', '250mg IV'], ['200mg', '400mg', '250mg'], ['Oral', 'IV'], ['400mg'], tds, false, false, undefined, ['Ensure adequate hydration (IV)'], []),
  makeDrug('CEFTRIAXONE', 'Ceftriaxone', '5.1.2 Cephalosporins', ['1g IV', '2g IV'], ['1g', '2g'], ['IV'], ['2g'], reg, false, true, undefined, ['Biliary sludge'], ['Cephalosporin allergy']),
  makeDrug('CLARITHROMYCIN', 'Clarithromycin', '5.1.5 Macrolides', ['250mg Tab', '500mg Tab'], ['250mg', '500mg'], ['Oral', 'IV'], ['500mg'], bd, false, false, undefined, ['Strong CYP3A4 inhibitor', 'QT prolongation'], ['Long QT syndrome'], 'MACROLIDE'),
  makeDrug('CIPROFLOXACIN', 'Ciprofloxacin', '5.1.12 Quinolones', ['250mg Tab', '500mg Tab', '400mg IV'], ['250mg', '500mg'], ['Oral', 'IV'], ['500mg'], bd, false, false, undefined, ['Tendon rupture risk', 'Lower seizure threshold'], ['History of tendon disorders']),
  makeDrug('FLUCONAZOLE', 'Fluconazole', '5.2.1 Antifungals', ['50mg Cap', '150mg Cap'], ['50mg', '150mg'], ['Oral', 'IV'], ['50mg'], reg, false, false, undefined, ['Liver toxicity'], []),
  makeDrug('MEROPENEM', 'Meropenem', '5.1.2 Carbapenems', ['500mg IV', '1g IV'], ['500mg', '1g'], ['IV'], ['1g'], tds, false, true, undefined, ['Lowers seizure threshold'], ['Penicillin anaphylaxis (cross-reactivity)']),
  makeDrug('TAZOCIN (PIP-TAZ)', 'Piperacillin/Tazobactam', '5.1.1 Penicillins', ['4.5g IV'], ['4.5g'], ['IV'], ['4.5g'], tds, false, true, undefined, ['Broad spectrum'], ['Penicillin allergy'], 'PENICILLIN'),

  // Neuro & Psych
  makeDrug('AMITRIPTYLINE', 'Amitriptyline', '4.3.1 Tricyclic antidepressants', ['10mg Tab', '25mg Tab'], ['10mg', '25mg'], ['Oral'], ['10mg', '25mg'], regNight, false, false, undefined, ['Anticholinergic side effects'], ['Recent MI']),
  makeDrug('ARIPIPRAZOLE', 'Aripiprazole', '4.2.1 Antipsychotics', ['5mg Tab', '10mg Tab'], ['5mg', '10mg'], ['Oral'], ['10mg'], reg, false, false, undefined, ['Akathisia'], []),
  makeDrug('CARBAMAZEPINE', 'Carbamazepine', '4.8.1 Antiepileptics', ['100mg Tab', '200mg Tab'], ['100mg', '200mg'], ['Oral'], ['200mg'], bd, false, true, undefined, ['Agranulocytosis', 'Autoinducer'], ['AV conduction abnormalities']),
  makeDrug('CLOZAPINE', 'Clozapine', '4.2.1 Antipsychotics', ['25mg Tab', '100mg Tab'], ['25mg', '100mg'], ['Oral'], ['100mg'], bd, false, true, undefined, ['Strict blood monitoring required (agranulocytosis)'], ['Severe cardiac disease']),
  makeDrug('DULOXETINE', 'Duloxetine', '4.3.4 SNRIs', ['30mg Cap', '60mg Cap'], ['30mg', '60mg'], ['Oral'], ['60mg'], reg, false, false, undefined, ['Hepatotoxicity'], ['Severe hepatic impairment']),
  makeDrug('LAMOTRIGINE', 'Lamotrigine', '4.8.1 Antiepileptics', ['25mg Tab', '50mg Tab'], ['25mg', '50mg'], ['Oral'], ['25mg', '50mg'], bd, false, true, undefined, ['Stevens-Johnson syndrome (escalate dose slowly)'], []),
  makeDrug('LEVETIRACETAM', 'Levetiracetam', '4.8.1 Antiepileptics', ['250mg Tab', '500mg Tab'], ['250mg', '500mg'], ['Oral', 'IV'], ['500mg'], bd, false, false, undefined, ['Mood changes/irritability'], []),
  makeDrug('LITHIUM', 'Lithium', '4.2.3 Mood stabilisers', ['200mg Tab', '400mg Tab'], ['200mg', '400mg'], ['Oral'], ['400mg'], regNight, false, true, undefined, ['Narrow therapeutic index (monitor levels)'], ['Severe renal impairment']),
  makeDrug('MIDAZOLAM', 'Midazolam', '15.1.4 Benzodiazepines', ['10mg/2mL IV', '10mg Buccal'], ['10mg/2mL', '10mg Buccal'], ['IV', 'Buccal'], ['2.5mg', '5mg', '10mg Buccal'], prn, true, true, undefined, ['Respiratory depression'], ['Severe respiratory failure']),
  makeDrug('MIRTAZAPINE', 'Mirtazapine', '4.3.4 Antidepressants', ['15mg Tab', '30mg Tab'], ['15mg', '30mg'], ['Oral'], ['15mg', '30mg'], regNight, false, false, undefined, ['Increased appetite and weight gain', 'Sedation'], []),
  makeDrug('PHENYTOIN', 'Phenytoin', '4.8.1 Antiepileptics', ['100mg Cap'], ['100mg'], ['Oral', 'IV'], ['100mg'], bd, false, true, undefined, ['Non-linear pharmacokinetics (monitor levels)'], ['Porphyria']),
  makeDrug('PREGABALIN', 'Pregabalin', '4.8.1 Antiepileptics', ['50mg Cap', '75mg Cap', '150mg Cap'], ['50mg', '75mg', '150mg'], ['Oral'], ['75mg', '150mg'], bd, true, false, undefined, ['Dependency risk', 'Sedation'], []),
  makeDrug('SODIUM VALPROATE', 'Sodium Valproate', '4.8.1 Antiepileptics', ['200mg Tab', '500mg Tab'], ['200mg', '500mg'], ['Oral', 'IV'], ['500mg'], bd, false, true, undefined, ['Highly teratogenic', 'Hepatotoxicity'], ['Pregnancy/women of childbearing potential', 'Liver disease']),
  makeDrug('VENLAFAXINE', 'Venlafaxine', '4.3.4 SNRIs', ['37.5mg Tab', '75mg Tab'], ['37.5mg', '75mg'], ['Oral'], ['75mg'], bd, false, false, undefined, ['Hypertension at higher doses'], ['High risk of arrhythmias']),

  // Analgesia
  makeDrug('METHADONE', 'Methadone', '4.10.3 Opioid dependence', ['5mg Tab', '1mg/1mL Oral Sol'], ['5mg', '1mg/1mL'], ['Oral'], ['10mg', '20mg'], reg, true, true, undefined, ['Long half-life (accumulation)', 'QT prolongation'], ['Respiratory depression'], 'OPIOID'),
  makeDrug('TAPENTADOL', 'Tapentadol', '4.7.2 Opioids', ['50mg Tab', '100mg M/R'], ['50mg', '100mg'], ['Oral'], ['50mg'], bd, true, true, undefined, ['Lowers seizure threshold'], ['Respiratory depression'], 'OPIOID'),

  // GI & Endocrine & Others
  makeDrug('ALLOPURINOL', 'Allopurinol', '10.1.4 Gout', ['100mg Tab', '300mg Tab'], ['100mg', '300mg'], ['Oral'], ['100mg'], reg, false, false, undefined, ['Skin reactions (DRESS syndrome)'], ['Acute gout attack (do not initiate)']),
  makeDrug('AZATHIOPRINE', 'Azathioprine', '8.2.1 Immunosuppressants', ['25mg Tab', '50mg Tab'], ['25mg', '50mg'], ['Oral'], ['50mg'], reg, false, true, undefined, ['Bone marrow suppression (monitor FBC)'], ['Severe infection']),
  makeDrug('BUDESONIDE', 'Budesonide', '3.2 Corticosteroids', ['200mcg Inhaler', '400mcg Inhaler'], ['200mcg', '400mcg'], ['Inhaled'], ['200mcg', '400mcg'], bd, false, false, undefined, ['Oral candidiasis (rinse mouth)'], []),
  makeDrug('CARBIMAZOLE', 'Carbimazole', '6.2.2 Antithyroid', ['5mg Tab', '20mg Tab'], ['5mg', '20mg'], ['Oral'], ['20mg'], reg, false, true, undefined, ['Neutropenia / Agranulocytosis (warn to report sore throat)'], ['Severe hepatic impairment']),
  makeDrug('COLCHICINE', 'Colchicine', '10.1.4 Gout', ['500mcg Tab'], ['500mcg'], ['Oral'], ['500mcg'], bd, false, true, undefined, ['Highly toxic in overdose', 'GI toxicity'], ['Severe renal impairment']),
  makeDrug('DAPAGLIFLOZIN', 'Dapagliflozin', '6.1.2.3 SGLT2i', ['10mg Tab'], ['10mg'], ['Oral'], ['10mg'], reg, false, false, undefined, ['Fournier gangrene', 'Euglycaemic DKA'], []),
  makeDrug('FERROUS FUMARATE', 'Ferrous Fumarate', '9.1.1 Iron', ['210mg Tab'], ['210mg'], ['Oral'], ['210mg'], tds, false, false, undefined, ['GI upset', 'Black stools'], ['Iron overload']),
  makeDrug('FOLIC ACID', 'Folic Acid', '9.1.2 Megaloblastic anaemia', ['5mg Tab'], ['5mg'], ['Oral'], ['5mg'], reg, false, false, undefined, ['Never give alone in undiagnosed B12 deficiency (subacute combined degeneration of cord)'], []),
  makeDrug('FORMOTEROL', 'Formoterol', '3.1.1.2 LABA', ['12mcg Inhaler'], ['12mcg'], ['Inhaled'], ['12mcg'], bd, false, false, undefined, ['Tremor', 'Palpitations'], []),
  makeDrug('HYOSCINE BUTYLBROMIDE', 'Hyoscine Butylbromide (Buscopan)', '1.2 Antispasmodics', ['10mg Tab', '20mg/1mL IV'], ['10mg', '20mg/1mL'], ['Oral', 'IV'], ['10mg', '20mg'], qds, false, false, undefined, ['Anticholinergic effects (dry mouth, blurred vision)'], ['Glaucoma', 'Myasthenia gravis']),
  makeDrug('LACTULOSE', 'Lactulose', '1.8.3 Osmotic laxatives', ['3.1g/5mL Oral Sol'], ['3.1g/5mL'], ['Oral'], ['15mL'], bd, false, false, undefined, ['Flatulence', 'Cramps'], ['Galactosaemia', 'Obstruction']),
  makeDrug('LINAGLIPTIN', 'Linagliptin', '6.1.2.3 DPP-4 inhibitors', ['5mg Tab'], ['5mg'], ['Oral'], ['5mg'], reg, false, false, undefined, ['Pancreatitis risk'], []),
  makeDrug('MEBEVERINE', 'Mebeverine', '1.2 Antispasmodics', ['135mg Tab', '200mg M/R Cap'], ['135mg', '200mg'], ['Oral'], ['135mg'], tds, false, false, undefined, ['Take 20 mins before meals'], ['Paralytic ileus']),
  makeDrug('MESALAZINE', 'Mesalazine', '1.5.1 Aminosalicylates', ['400mg Tab', '800mg Tab'], ['400mg', '800mg'], ['Oral', 'Rectal'], ['800mg'], tds, false, false, undefined, ['Nephrotoxicity (monitor U&Es)'], ['Aspirin hypersensitivity']),
  makeDrug('METHOTREXATE', 'Methotrexate', '10.1.3 DMARDs', ['2.5mg Tab', '10mg Tab'], ['2.5mg', '10mg'], ['Oral', 'SC'], ['15mg ONCE WEEKLY'], [{label: 'ONCE a week (Specify Day)', times: ['08:00'], type: 'REGULAR'}], false, true, undefined, ['FATAL ERROR RISK: Must be dosed WEEKLY, never daily', 'Folic acid rescue needed'], ['Pregnancy', 'Severe infection']),
  makeDrug('MONTELUKAST', 'Montelukast', '3.3.2 Leukotriene receptor antagonists', ['10mg Tab'], ['10mg'], ['Oral'], ['10mg'], regNight, false, false, undefined, ['Neuropsychiatric reactions (nightmares, aggression)'], []),
  makeDrug('PHOSPHATE ENEMA', 'Phosphate Enema', '1.8.3 Laxatives', ['128mL Enema'], ['128mL'], ['Rectal'], ['1 Enema'], stat, false, false, undefined, ['Risk of electrolyte imbalance (hyperphosphataemia, hypocalcaemia)'], ['Renal impairment', 'Inflammatory bowel disease']),
  makeDrug('PIOGLITAZONE', 'Pioglitazone', '6.1.2.3 Thiazolidinediones', ['15mg Tab', '30mg Tab'], ['15mg', '30mg'], ['Oral'], ['15mg', '30mg'], reg, false, false, undefined, ['Heart failure risk', 'Bladder cancer risk'], ['Heart failure', 'Active bladder cancer']),
  makeDrug('PROPYLTHIOURACIL', 'Propylthiouracil', '6.2.2 Antithyroid', ['50mg Tab'], ['50mg'], ['Oral'], ['50mg'], bd, false, true, undefined, ['Hepatotoxicity (monitor LFTs)'], ['Severe hepatic impairment']),
  makeDrug('SITAGLIPTIN', 'Sitagliptin', '6.1.2.3 DPP-4 inhibitors', ['100mg Tab'], ['100mg'], ['Oral'], ['100mg'], reg, false, false, undefined, ['Pancreatitis risk'], []),
  makeDrug('THEOPHYLLINE', 'Theophylline', '3.1.3 Xanthines', ['200mg M/R', '300mg M/R'], ['200mg', '300mg'], ['Oral'], ['200mg', '300mg'], bd, false, true, undefined, ['Narrow therapeutic index (monitor levels)', 'Interacts with smoking'], ['Porphyria'])
];

const bnfPath = 'src/data/bnfFormulary.ts';
let content = fs.readFileSync(bnfPath, 'utf8');

// The array ends at:
// ];
//
// export function findBNFDrug(nameOrId: string): DrugFormularyItem | undefined {

const searchStr = '];\n\nexport function findBNFDrug';
if (content.includes(searchStr)) {
  const replacement = ',\n' + newDrugs.map(d => '  ' + JSON.stringify(d)).join(',\n') + '\n' + searchStr;
  content = content.replace(searchStr, replacement);
  fs.writeFileSync(bnfPath, content);
  console.log('Added ' + newDrugs.length + ' drugs.');
} else {
  console.error('Could not find injection point');
}
