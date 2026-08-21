import { DrugFormularyItem } from '../types/epma';

export const BNF_FORMULARY: DrugFormularyItem[] = [
  {
    "id": "bnf-amlodipine",
    "name": "AMLODIPINE",
    "genericName": "Amlodipine",
    "bnfChapter": "2.6.2 Calcium-channel blockers",
    "standardFormulations": [
      "5mg Tab",
      "10mg Tab"
    ],
    "standardStrengths": [
      "5mg",
      "10mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "5mg",
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Ankle oedema"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-amoxicillin",
    "name": "AMOXICILLIN",
    "genericName": "Amoxicillin",
    "bnfChapter": "5.1.1 Penicillins",
    "standardFormulations": [
      "500mg Cap",
      "250mg/5mL Susp"
    ],
    "standardStrengths": [
      "500mg",
      "250mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "500mg",
      "1g"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Rash"
    ],
    "contraindications": [
      "Penicillin allergy"
    ],
    "allergyGroup": "PENICILLIN"
  },
  {
    "id": "bnf-apixaban",
    "name": "APIXABAN",
    "genericName": "Apixaban",
    "bnfChapter": "2.8.2 DOACs",
    "standardFormulations": [
      "2.5mg Tab",
      "5mg Tab"
    ],
    "standardStrengths": [
      "2.5mg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "5mg",
      "2.5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Bleeding risk"
    ],
    "contraindications": [
      "Active bleeding"
    ]
  },
  {
    "id": "bnf-aspirin",
    "name": "ASPIRIN",
    "genericName": "Aspirin",
    "bnfChapter": "2.9 Antiplatelets",
    "standardFormulations": [
      "75mg Tab",
      "300mg Tab"
    ],
    "standardStrengths": [
      "75mg",
      "300mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "75mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "GI bleed"
    ],
    "contraindications": [
      "Active ulcer"
    ],
    "allergyGroup": "NSAID"
  },
  {
    "id": "bnf-atorvastatin",
    "name": "ATORVASTATIN",
    "genericName": "Atorvastatin",
    "bnfChapter": "2.12 Statins",
    "standardFormulations": [
      "20mg Tab",
      "40mg Tab",
      "80mg Tab"
    ],
    "standardStrengths": [
      "20mg",
      "40mg",
      "80mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "20mg",
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Myopathy"
    ],
    "contraindications": [
      "Active liver disease"
    ]
  },
  {
    "id": "bnf-adrenaline-1-1000",
    "name": "ADRENALINE 1:1000",
    "genericName": "Adrenaline",
    "bnfChapter": "3.4.3 Anaphylaxis",
    "standardFormulations": [
      "500mcg/0.5mL IM"
    ],
    "standardStrengths": [
      "500mcg"
    ],
    "standardRoutes": [
      "IM"
    ],
    "defaultDoses": [
      "500mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "STAT Once Only",
        "times": [
          "STAT"
        ],
        "type": "STAT"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Tachycardia"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-bisoprolol",
    "name": "BISOPROLOL",
    "genericName": "Bisoprolol",
    "bnfChapter": "2.4 Beta-blockers",
    "standardFormulations": [
      "1.25mg Tab",
      "2.5mg Tab",
      "5mg Tab"
    ],
    "standardStrengths": [
      "1.25mg",
      "2.5mg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "2.5mg",
      "5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "PULSE",
      "label": "Heart Rate",
      "unit": "bpm",
      "minNormal": 55,
      "warningText": "HR < 55. Risk of bradycardia.",
      "hardStop": false
    },
    "cautions": [
      "Masks hypo"
    ],
    "contraindications": [
      "Asthma"
    ]
  },
  {
    "id": "bnf-bumetanide",
    "name": "BUMETANIDE",
    "genericName": "Bumetanide",
    "bnfChapter": "2.2.2 Loop diuretics",
    "standardFormulations": [
      "1mg Tab",
      "5mg Tab"
    ],
    "standardStrengths": [
      "1mg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "1mg",
      "2mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Hypokalaemia"
    ],
    "contraindications": [
      "Anuria"
    ]
  },
  {
    "id": "bnf-beclometasone",
    "name": "BECLOMETASONE",
    "genericName": "Beclometasone",
    "bnfChapter": "3.2 Inhaled steroids",
    "standardFormulations": [
      "100mcg Inhaler",
      "200mcg Inhaler"
    ],
    "standardStrengths": [
      "100mcg",
      "200mcg"
    ],
    "standardRoutes": [
      "Inhaled"
    ],
    "defaultDoses": [
      "200mcg",
      "400mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Oral thrush"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-buprenorphine-patch",
    "name": "BUPRENORPHINE PATCH",
    "genericName": "Buprenorphine",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "5mcg/hr Patch",
      "10mcg/hr Patch"
    ],
    "standardStrengths": [
      "5mcg/hr",
      "10mcg/hr"
    ],
    "standardRoutes": [
      "Transdermal"
    ],
    "defaultDoses": [
      "5mcg/hr"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "Remove old patch"
    ],
    "contraindications": [
      "Opioid naive"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-citalopram",
    "name": "CITALOPRAM",
    "genericName": "Citalopram",
    "bnfChapter": "4.3.3 SSRIs",
    "standardFormulations": [
      "10mg Tab",
      "20mg Tab"
    ],
    "standardStrengths": [
      "10mg",
      "20mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "20mg",
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "QT prolongation"
    ],
    "contraindications": [
      "Long QT"
    ]
  },
  {
    "id": "bnf-clopidogrel",
    "name": "CLOPIDOGREL",
    "genericName": "Clopidogrel",
    "bnfChapter": "2.9 Antiplatelets",
    "standardFormulations": [
      "75mg Tab"
    ],
    "standardStrengths": [
      "75mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "75mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Bleeding risk"
    ],
    "contraindications": [
      "Active bleeding"
    ]
  },
  {
    "id": "bnf-codeine",
    "name": "CODEINE",
    "genericName": "Codeine",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "15mg Tab",
      "30mg Tab"
    ],
    "standardStrengths": [
      "15mg",
      "30mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "30mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "Constipation"
    ],
    "contraindications": [
      "Respiratory depression"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-co-amoxiclav",
    "name": "CO-AMOXICLAV",
    "genericName": "Co-amoxiclav",
    "bnfChapter": "5.1.1 Penicillins",
    "standardFormulations": [
      "625mg Tab",
      "1.2g IV"
    ],
    "standardStrengths": [
      "625mg",
      "1.2g"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "625mg",
      "1.2g"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Cholestatic jaundice"
    ],
    "contraindications": [
      "Penicillin allergy"
    ],
    "allergyGroup": "PENICILLIN"
  },
  {
    "id": "bnf-cyclizine",
    "name": "CYCLIZINE",
    "genericName": "Cyclizine",
    "bnfChapter": "1.6.1 Antihistamines",
    "standardFormulations": [
      "50mg Tab",
      "50mg IV"
    ],
    "standardStrengths": [
      "50mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "50mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Urinary retention"
    ],
    "contraindications": [
      "Severe heart failure"
    ]
  },
  {
    "id": "bnf-diazepam",
    "name": "DIAZEPAM",
    "genericName": "Diazepam",
    "bnfChapter": "4.1.2 Benzodiazepines",
    "standardFormulations": [
      "2mg Tab",
      "5mg Tab",
      "10mg PR"
    ],
    "standardStrengths": [
      "2mg",
      "5mg",
      "10mg"
    ],
    "standardRoutes": [
      "Oral",
      "Rectal",
      "IV"
    ],
    "defaultDoses": [
      "5mg",
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": false,
    "cautions": [
      "Sedation"
    ],
    "contraindications": [
      "Respiratory depression"
    ]
  },
  {
    "id": "bnf-digoxin",
    "name": "DIGOXIN",
    "genericName": "Digoxin",
    "bnfChapter": "2.1.1 Cardiac glycosides",
    "standardFormulations": [
      "62.5mcg Tab",
      "125mcg Tab"
    ],
    "standardStrengths": [
      "62.5mcg",
      "125mcg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "125mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "PULSE",
      "label": "Heart Rate",
      "unit": "bpm",
      "minNormal": 55,
      "warningText": "HR < 55. Risk of bradycardia.",
      "hardStop": false
    },
    "cautions": [
      "Toxicity in hypokalaemia"
    ],
    "contraindications": [
      "Heart block"
    ]
  },
  {
    "id": "bnf-doxycycline",
    "name": "DOXYCYCLINE",
    "genericName": "Doxycycline",
    "bnfChapter": "5.1.3 Tetracyclines",
    "standardFormulations": [
      "100mg Cap"
    ],
    "standardStrengths": [
      "100mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "100mg",
      "200mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Oesophagitis - sit upright"
    ],
    "contraindications": [
      "Pregnancy"
    ]
  },
  {
    "id": "bnf-dexamethasone",
    "name": "DEXAMETHASONE",
    "genericName": "Dexamethasone",
    "bnfChapter": "6.3.2 Corticosteroids",
    "standardFormulations": [
      "2mg Tab",
      "4mg Tab",
      "6mg IV"
    ],
    "standardStrengths": [
      "2mg",
      "4mg",
      "6mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "4mg",
      "6mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Hyperglycaemia"
    ],
    "contraindications": [
      "Systemic infection"
    ]
  },
  {
    "id": "bnf-enoxaparin",
    "name": "ENOXAPARIN",
    "genericName": "Enoxaparin",
    "bnfChapter": "2.8.1 LMWH",
    "standardFormulations": [
      "20mg SC",
      "40mg SC",
      "80mg SC"
    ],
    "standardStrengths": [
      "40mg",
      "80mg"
    ],
    "standardRoutes": [
      "SC"
    ],
    "defaultDoses": [
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Reduce dose in CKD"
    ],
    "contraindications": [
      "Bleeding"
    ]
  },
  {
    "id": "bnf-empagliflozin",
    "name": "EMPAGLIFLOZIN",
    "genericName": "Empagliflozin",
    "bnfChapter": "6.1.2.3 SGLT2i",
    "standardFormulations": [
      "10mg Tab",
      "25mg Tab"
    ],
    "standardStrengths": [
      "10mg",
      "25mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Euglycaemic DKA risk"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-erythromycin",
    "name": "ERYTHROMYCIN",
    "genericName": "Erythromycin",
    "bnfChapter": "5.1.5 Macrolides",
    "standardFormulations": [
      "250mg Tab",
      "500mg Tab"
    ],
    "standardStrengths": [
      "250mg",
      "500mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "500mg"
    ],
    "typicalFrequencies": [
      {
        "label": "FOUR times a day",
        "times": [
          "08:00",
          "12:00",
          "18:00",
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "CYP3A4 inhibitor"
    ],
    "contraindications": [
      "QT prolongation"
    ],
    "allergyGroup": "MACROLIDE"
  },
  {
    "id": "bnf-esomeprazole",
    "name": "ESOMEPRAZOLE",
    "genericName": "Esomeprazole",
    "bnfChapter": "1.3.5 PPIs",
    "standardFormulations": [
      "20mg Cap",
      "40mg Cap"
    ],
    "standardStrengths": [
      "20mg",
      "40mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Masks gastric cancer"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-furosemide",
    "name": "FUROSEMIDE",
    "genericName": "Furosemide",
    "bnfChapter": "2.2.2 Loop diuretics",
    "standardFormulations": [
      "20mg Tab",
      "40mg Tab",
      "40mg IV"
    ],
    "standardStrengths": [
      "20mg",
      "40mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "40mg",
      "80mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Hypokalaemia"
    ],
    "contraindications": [
      "Anuria"
    ]
  },
  {
    "id": "bnf-flucloxacillin",
    "name": "FLUCLOXACILLIN",
    "genericName": "Flucloxacillin",
    "bnfChapter": "5.1.1 Penicillins",
    "standardFormulations": [
      "500mg Cap",
      "1g IV"
    ],
    "standardStrengths": [
      "500mg",
      "1g"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "500mg",
      "1g"
    ],
    "typicalFrequencies": [
      {
        "label": "FOUR times a day",
        "times": [
          "08:00",
          "12:00",
          "18:00",
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Take on empty stomach"
    ],
    "contraindications": [
      "Penicillin allergy"
    ],
    "allergyGroup": "PENICILLIN"
  },
  {
    "id": "bnf-fluoxetine",
    "name": "FLUOXETINE",
    "genericName": "Fluoxetine",
    "bnfChapter": "4.3.3 SSRIs",
    "standardFormulations": [
      "20mg Cap",
      "40mg Cap"
    ],
    "standardStrengths": [
      "20mg",
      "40mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "20mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Insomnia"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-fentanyl-patch",
    "name": "FENTANYL PATCH",
    "genericName": "Fentanyl",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "12mcg/hr Patch",
      "25mcg/hr Patch"
    ],
    "standardStrengths": [
      "12mcg",
      "25mcg"
    ],
    "standardRoutes": [
      "Transdermal"
    ],
    "defaultDoses": [
      "12mcg/hr"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "Remove old patch"
    ],
    "contraindications": [
      "Opioid naive"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-gliclazide",
    "name": "GLICLAZIDE",
    "genericName": "Gliclazide",
    "bnfChapter": "6.1.2.1 Sulfonylureas",
    "standardFormulations": [
      "40mg Tab",
      "80mg Tab"
    ],
    "standardStrengths": [
      "40mg",
      "80mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "40mg",
      "80mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_GLUCOSE",
      "label": "CBG",
      "unit": "mmol/L",
      "minNormal": 4,
      "warningText": "CBG < 4.0. Treat hypo.",
      "hardStop": true
    },
    "cautions": [
      "Hypoglycaemia risk"
    ],
    "contraindications": [
      "Type 1 Diabetes"
    ]
  },
  {
    "id": "bnf-gentamicin",
    "name": "GENTAMICIN",
    "genericName": "Gentamicin",
    "bnfChapter": "5.1.4 Aminoglycosides",
    "standardFormulations": [
      "80mg/2mL IV",
      "5mg/kg IV"
    ],
    "standardStrengths": [
      "80mg",
      "5mg/kg"
    ],
    "standardRoutes": [
      "IV"
    ],
    "defaultDoses": [
      "5mg/kg"
    ],
    "typicalFrequencies": [
      {
        "label": "STAT Once Only",
        "times": [
          "STAT"
        ],
        "type": "STAT"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RENAL_TDM",
      "label": "Trough Level",
      "unit": "mg/L",
      "maxNormal": 20,
      "warningText": "Toxic level. Withhold.",
      "hardStop": false
    },
    "cautions": [
      "Ototoxicity",
      "Nephrotoxicity"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-gabapentin",
    "name": "GABAPENTIN",
    "genericName": "Gabapentin",
    "bnfChapter": "4.8.1 Antiepileptics",
    "standardFormulations": [
      "100mg Cap",
      "300mg Cap"
    ],
    "standardStrengths": [
      "100mg",
      "300mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "300mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Sedation"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-glyceryl-trinitrate",
    "name": "GLYCERYL TRINITRATE",
    "genericName": "GTN",
    "bnfChapter": "2.6.1 Nitrates",
    "standardFormulations": [
      "400mcg Spray"
    ],
    "standardStrengths": [
      "400mcg"
    ],
    "standardRoutes": [
      "Sublingual"
    ],
    "defaultDoses": [
      "2 sprays"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Headache",
      "Hypotension"
    ],
    "contraindications": [
      "Sildenafil use"
    ]
  },
  {
    "id": "bnf-haloperidol",
    "name": "HALOPERIDOL",
    "genericName": "Haloperidol",
    "bnfChapter": "4.2.1 Antipsychotics",
    "standardFormulations": [
      "500mcg Tab",
      "5mg IM"
    ],
    "standardStrengths": [
      "500mcg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral",
      "IM"
    ],
    "defaultDoses": [
      "500mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "QT prolongation"
    ],
    "contraindications": [
      "Parkinson disease"
    ]
  },
  {
    "id": "bnf-hydrocortisone",
    "name": "HYDROCORTISONE",
    "genericName": "Hydrocortisone",
    "bnfChapter": "6.3.2 Corticosteroids",
    "standardFormulations": [
      "10mg Tab",
      "100mg IV"
    ],
    "standardStrengths": [
      "10mg",
      "100mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "10mg",
      "100mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Sick day rules"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-heparin--unfractionated-",
    "name": "HEPARIN (UNFRACTIONATED)",
    "genericName": "Heparin",
    "bnfChapter": "2.8.1 Anticoagulants",
    "standardFormulations": [
      "5000 units SC"
    ],
    "standardStrengths": [
      "5000 units"
    ],
    "standardRoutes": [
      "SC",
      "IV"
    ],
    "defaultDoses": [
      "5000 units"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "HIT risk"
    ],
    "contraindications": [
      "Active bleeding"
    ]
  },
  {
    "id": "bnf-ibuprofen",
    "name": "IBUPROFEN",
    "genericName": "Ibuprofen",
    "bnfChapter": "4.7.1 NSAIDs",
    "standardFormulations": [
      "200mg Tab",
      "400mg Tab"
    ],
    "standardStrengths": [
      "200mg",
      "400mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "400mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Take with food",
      "AKI risk"
    ],
    "contraindications": [
      "Peptic ulcer"
    ],
    "allergyGroup": "NSAID"
  },
  {
    "id": "bnf-ipratropium",
    "name": "IPRATROPIUM",
    "genericName": "Ipratropium",
    "bnfChapter": "3.1.2 Antimuscarinics",
    "standardFormulations": [
      "500mcg Nebules"
    ],
    "standardStrengths": [
      "500mcg"
    ],
    "standardRoutes": [
      "Nebulised"
    ],
    "defaultDoses": [
      "500mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "FOUR times a day",
        "times": [
          "08:00",
          "12:00",
          "18:00",
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Glaucoma risk"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-insulin-lispro",
    "name": "INSULIN LISPRO",
    "genericName": "Insulin Lispro (Humalog)",
    "bnfChapter": "6.1.1 Insulins",
    "standardFormulations": [
      "100 units/mL Pen"
    ],
    "standardStrengths": [
      "100 units/mL"
    ],
    "standardRoutes": [
      "SC"
    ],
    "defaultDoses": [
      "6 units"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "BLOOD_GLUCOSE",
      "label": "CBG",
      "unit": "mmol/L",
      "minNormal": 4,
      "warningText": "CBG < 4.0. Treat hypo.",
      "hardStop": true
    },
    "cautions": [
      "Time critical with meals"
    ],
    "contraindications": [
      "Hypoglycaemia"
    ]
  },
  {
    "id": "bnf-ketamine",
    "name": "KETAMINE",
    "genericName": "Ketamine",
    "bnfChapter": "15.1.1 Anaesthetics",
    "standardFormulations": [
      "50mg/mL IV"
    ],
    "standardStrengths": [
      "50mg/mL"
    ],
    "standardRoutes": [
      "IV",
      "IM"
    ],
    "defaultDoses": [
      "0.5mg/kg"
    ],
    "typicalFrequencies": [
      {
        "label": "STAT Once Only",
        "times": [
          "STAT"
        ],
        "type": "STAT"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "cautions": [
      "Emergence delirium"
    ],
    "contraindications": [
      "Raised ICP"
    ]
  },
  {
    "id": "bnf-ketorolac",
    "name": "KETOROLAC",
    "genericName": "Ketorolac",
    "bnfChapter": "4.7.1 NSAIDs",
    "standardFormulations": [
      "30mg IV/IM"
    ],
    "standardStrengths": [
      "30mg"
    ],
    "standardRoutes": [
      "IV",
      "IM"
    ],
    "defaultDoses": [
      "30mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Max 2 days use"
    ],
    "contraindications": [
      "Renal impairment"
    ],
    "allergyGroup": "NSAID"
  },
  {
    "id": "bnf-lansoprazole",
    "name": "LANSOPRAZOLE",
    "genericName": "Lansoprazole",
    "bnfChapter": "1.3.5 PPIs",
    "standardFormulations": [
      "15mg Cap",
      "30mg Cap"
    ],
    "standardStrengths": [
      "15mg",
      "30mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "30mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Safe with Clopidogrel"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-levothyroxine",
    "name": "LEVOTHYROXINE",
    "genericName": "Levothyroxine",
    "bnfChapter": "6.2.1 Thyroid hormones",
    "standardFormulations": [
      "25mcg Tab",
      "50mcg Tab",
      "100mcg Tab"
    ],
    "standardStrengths": [
      "25mcg",
      "50mcg",
      "100mcg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "100mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Empty stomach"
    ],
    "contraindications": [
      "Thyrotoxicosis"
    ]
  },
  {
    "id": "bnf-lorazepam",
    "name": "LORAZEPAM",
    "genericName": "Lorazepam",
    "bnfChapter": "4.1.2 Benzodiazepines",
    "standardFormulations": [
      "1mg Tab",
      "4mg IV"
    ],
    "standardStrengths": [
      "1mg",
      "4mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "1mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "cautions": [
      "Status epilepticus"
    ],
    "contraindications": [
      "Respiratory depression"
    ]
  },
  {
    "id": "bnf-loperamide",
    "name": "LOPERAMIDE",
    "genericName": "Loperamide",
    "bnfChapter": "1.7.2 Antimotility",
    "standardFormulations": [
      "2mg Cap"
    ],
    "standardStrengths": [
      "2mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "2mg",
      "4mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Cardiac arrhythmias in OD"
    ],
    "contraindications": [
      "Active colitis"
    ]
  },
  {
    "id": "bnf-metformin",
    "name": "METFORMIN",
    "genericName": "Metformin",
    "bnfChapter": "6.1.2.2 Biguanides",
    "standardFormulations": [
      "500mg Tab",
      "1g Tab"
    ],
    "standardStrengths": [
      "500mg",
      "1g"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "500mg",
      "1g"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Withhold in AKI"
    ],
    "contraindications": [
      "eGFR < 30"
    ]
  },
  {
    "id": "bnf-morphine-sulfate",
    "name": "MORPHINE SULFATE",
    "genericName": "Morphine",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "10mg/5mL Liquid",
      "10mg IV"
    ],
    "standardStrengths": [
      "10mg",
      "10mg/5mL"
    ],
    "standardRoutes": [
      "Oral",
      "IV",
      "SC"
    ],
    "defaultDoses": [
      "5mg",
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "Constipation"
    ],
    "contraindications": [
      "Respiratory depression"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-macrogol--movicol-",
    "name": "MACROGOL (MOVICOL)",
    "genericName": "Macrogol",
    "bnfChapter": "1.8.4 Laxatives",
    "standardFormulations": [
      "13.8g Sachet"
    ],
    "standardStrengths": [
      "1 Sachet"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "1 Sachet",
      "2 Sachets"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Hydration"
    ],
    "contraindications": [
      "Obstruction"
    ]
  },
  {
    "id": "bnf-metoclopramide",
    "name": "METOCLOPRAMIDE",
    "genericName": "Metoclopramide",
    "bnfChapter": "1.6.4 Antiemetics",
    "standardFormulations": [
      "10mg Tab",
      "10mg IV"
    ],
    "standardStrengths": [
      "10mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "EPSE risk"
    ],
    "contraindications": [
      "Parkinson disease"
    ]
  },
  {
    "id": "bnf-naproxen",
    "name": "NAPROXEN",
    "genericName": "Naproxen",
    "bnfChapter": "4.7.1 NSAIDs",
    "standardFormulations": [
      "250mg Tab",
      "500mg Tab"
    ],
    "standardStrengths": [
      "250mg",
      "500mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "500mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Lowest CV risk NSAID"
    ],
    "contraindications": [
      "Peptic ulcer"
    ],
    "allergyGroup": "NSAID"
  },
  {
    "id": "bnf-naloxone",
    "name": "NALOXONE",
    "genericName": "Naloxone",
    "bnfChapter": "4.7.2 Opioid antagonists",
    "standardFormulations": [
      "400mcg IV"
    ],
    "standardStrengths": [
      "400mcg"
    ],
    "standardRoutes": [
      "IV",
      "IM"
    ],
    "defaultDoses": [
      "400mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "STAT Once Only",
        "times": [
          "STAT"
        ],
        "type": "STAT"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Short half life"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-nitrofurantoin",
    "name": "NITROFURANTOIN",
    "genericName": "Nitrofurantoin",
    "bnfChapter": "5.1.13 Antibacterials",
    "standardFormulations": [
      "50mg Cap",
      "100mg M/R"
    ],
    "standardStrengths": [
      "50mg",
      "100mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "100mg",
      "50mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Ineffective in renal failure"
    ],
    "contraindications": [
      "eGFR < 45"
    ]
  },
  {
    "id": "bnf-nifedipine",
    "name": "NIFEDIPINE",
    "genericName": "Nifedipine",
    "bnfChapter": "2.6.2 Calcium-channel blockers",
    "standardFormulations": [
      "5mg Cap",
      "30mg M/R Tab"
    ],
    "standardStrengths": [
      "5mg",
      "30mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "30mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Flushing"
    ],
    "contraindications": [
      "Cardiogenic shock"
    ]
  },
  {
    "id": "bnf-omeprazole",
    "name": "OMEPRAZOLE",
    "genericName": "Omeprazole",
    "bnfChapter": "1.3.5 PPIs",
    "standardFormulations": [
      "20mg Cap",
      "40mg Cap"
    ],
    "standardStrengths": [
      "20mg",
      "40mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "20mg",
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Masks gastric cancer"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-ondansetron",
    "name": "ONDANSETRON",
    "genericName": "Ondansetron",
    "bnfChapter": "1.6.2 Antiemetics",
    "standardFormulations": [
      "4mg Tab",
      "4mg IV"
    ],
    "standardStrengths": [
      "4mg",
      "8mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "4mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "QT prolongation"
    ],
    "contraindications": [
      "Long QT syndrome"
    ]
  },
  {
    "id": "bnf-oxycodone",
    "name": "OXYCODONE",
    "genericName": "Oxycodone",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "5mg Cap",
      "10mg M/R"
    ],
    "standardStrengths": [
      "5mg",
      "10mg"
    ],
    "standardRoutes": [
      "Oral",
      "SC"
    ],
    "defaultDoses": [
      "5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "2x potent as morphine"
    ],
    "contraindications": [
      "Resp depression"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-olanzapine",
    "name": "OLANZAPINE",
    "genericName": "Olanzapine",
    "bnfChapter": "4.2.1 Antipsychotics",
    "standardFormulations": [
      "5mg Tab",
      "10mg Tab"
    ],
    "standardStrengths": [
      "5mg",
      "10mg"
    ],
    "standardRoutes": [
      "Oral",
      "IM"
    ],
    "defaultDoses": [
      "5mg",
      "10mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Weight gain"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-paracetamol",
    "name": "PARACETAMOL",
    "genericName": "Paracetamol",
    "bnfChapter": "4.7.1 Analgesics",
    "standardFormulations": [
      "500mg Tab",
      "1g IV"
    ],
    "standardStrengths": [
      "500mg",
      "1g"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "1g"
    ],
    "typicalFrequencies": [
      {
        "label": "FOUR times a day",
        "times": [
          "08:00",
          "12:00",
          "18:00",
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Max 4g/day"
    ],
    "contraindications": [
      "Liver failure"
    ]
  },
  {
    "id": "bnf-pantoprazole",
    "name": "PANTOPRAZOLE",
    "genericName": "Pantoprazole",
    "bnfChapter": "1.3.5 PPIs",
    "standardFormulations": [
      "40mg Tab",
      "40mg IV"
    ],
    "standardStrengths": [
      "40mg"
    ],
    "standardRoutes": [
      "Oral",
      "IV"
    ],
    "defaultDoses": [
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Reconstitute in Saline"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-prednisolone",
    "name": "PREDNISOLONE",
    "genericName": "Prednisolone",
    "bnfChapter": "6.3.2 Corticosteroids",
    "standardFormulations": [
      "5mg Tab",
      "20mg Tab"
    ],
    "standardStrengths": [
      "5mg",
      "20mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Take in morning"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-piperacillin-tazobactam",
    "name": "PIPERACILLIN/TAZOBACTAM",
    "genericName": "Tazocin",
    "bnfChapter": "5.1.1 Penicillins",
    "standardFormulations": [
      "4.5g IV"
    ],
    "standardStrengths": [
      "4.5g"
    ],
    "standardRoutes": [
      "IV"
    ],
    "defaultDoses": [
      "4.5g"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Broad spectrum"
    ],
    "contraindications": [
      "Penicillin allergy"
    ],
    "allergyGroup": "PENICILLIN"
  },
  {
    "id": "bnf-quetiapine",
    "name": "QUETIAPINE",
    "genericName": "Quetiapine",
    "bnfChapter": "4.2.1 Antipsychotics",
    "standardFormulations": [
      "25mg Tab",
      "100mg Tab"
    ],
    "standardStrengths": [
      "25mg",
      "100mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "25mg",
      "100mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Sedation"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-quinine",
    "name": "QUININE",
    "genericName": "Quinine Sulfate",
    "bnfChapter": "5.4.1 Antimalarials",
    "standardFormulations": [
      "300mg Tab"
    ],
    "standardStrengths": [
      "300mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "300mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Tinnitus"
    ],
    "contraindications": [
      "Optic neuritis"
    ]
  },
  {
    "id": "bnf-ramipril",
    "name": "RAMIPRIL",
    "genericName": "Ramipril",
    "bnfChapter": "2.5.5.1 ACEi",
    "standardFormulations": [
      "2.5mg Cap",
      "5mg Cap"
    ],
    "standardStrengths": [
      "2.5mg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "2.5mg",
      "5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Dry cough"
    ],
    "contraindications": [
      "Angioedema"
    ]
  },
  {
    "id": "bnf-rivaroxaban",
    "name": "RIVAROXABAN",
    "genericName": "Rivaroxaban",
    "bnfChapter": "2.8.2 DOACs",
    "standardFormulations": [
      "15mg Tab",
      "20mg Tab"
    ],
    "standardStrengths": [
      "15mg",
      "20mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "20mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Take with food"
    ],
    "contraindications": [
      "Active bleeding"
    ]
  },
  {
    "id": "bnf-risperidone",
    "name": "RISPERIDONE",
    "genericName": "Risperidone",
    "bnfChapter": "4.2.1 Antipsychotics",
    "standardFormulations": [
      "1mg Tab",
      "2mg Tab"
    ],
    "standardStrengths": [
      "1mg",
      "2mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "1mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Hyperprolactinaemia"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-salbutamol",
    "name": "SALBUTAMOL",
    "genericName": "Salbutamol",
    "bnfChapter": "3.1.1 SABA",
    "standardFormulations": [
      "100mcg Inhaler",
      "2.5mg Nebules"
    ],
    "standardStrengths": [
      "100mcg",
      "2.5mg"
    ],
    "standardRoutes": [
      "Inhaled",
      "Nebulised"
    ],
    "defaultDoses": [
      "2 puffs",
      "2.5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Tremor"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-senna",
    "name": "SENNA",
    "genericName": "Senna",
    "bnfChapter": "1.8.1 Laxatives",
    "standardFormulations": [
      "7.5mg Tab"
    ],
    "standardStrengths": [
      "7.5mg",
      "15mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "15mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Abdominal cramps"
    ],
    "contraindications": [
      "Obstruction"
    ]
  },
  {
    "id": "bnf-sertraline",
    "name": "SERTRALINE",
    "genericName": "Sertraline",
    "bnfChapter": "4.3.3 SSRIs",
    "standardFormulations": [
      "50mg Tab",
      "100mg Tab"
    ],
    "standardStrengths": [
      "50mg",
      "100mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "50mg",
      "100mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "GI bleed risk"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-spironolactone",
    "name": "SPIRONOLACTONE",
    "genericName": "Spironolactone",
    "bnfChapter": "2.2.3 Diuretics",
    "standardFormulations": [
      "25mg Tab",
      "50mg Tab"
    ],
    "standardStrengths": [
      "25mg",
      "50mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "25mg",
      "50mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Hyperkalaemia"
    ],
    "contraindications": [
      "K > 5.0"
    ]
  },
  {
    "id": "bnf-simvastatin",
    "name": "SIMVASTATIN",
    "genericName": "Simvastatin",
    "bnfChapter": "2.12 Statins",
    "standardFormulations": [
      "20mg Tab",
      "40mg Tab"
    ],
    "standardStrengths": [
      "20mg",
      "40mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "40mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Myopathy",
      "Macrolide interaction"
    ],
    "contraindications": [
      "Liver disease"
    ]
  },
  {
    "id": "bnf-tiotropium",
    "name": "TIOTROPIUM",
    "genericName": "Tiotropium",
    "bnfChapter": "3.1.2 LAMA",
    "standardFormulations": [
      "18mcg Cap (Inhaled)"
    ],
    "standardStrengths": [
      "18mcg"
    ],
    "standardRoutes": [
      "Inhaled"
    ],
    "defaultDoses": [
      "18mcg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Do not swallow capsule"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-tramadol",
    "name": "TRAMADOL",
    "genericName": "Tramadol",
    "bnfChapter": "4.7.2 Opioids",
    "standardFormulations": [
      "50mg Cap"
    ],
    "standardStrengths": [
      "50mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "50mg",
      "100mg"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RESP_RATE",
      "label": "Resp Rate",
      "unit": "breaths/min",
      "minNormal": 10,
      "warningText": "RR < 10. Risk of respiratory depression.",
      "hardStop": true
    },
    "cautions": [
      "Lowers seizure threshold"
    ],
    "contraindications": [
      "Uncontrolled epilepsy"
    ],
    "allergyGroup": "OPIOID"
  },
  {
    "id": "bnf-trimethoprim",
    "name": "TRIMETHOPRIM",
    "genericName": "Trimethoprim",
    "bnfChapter": "5.1.8 Antibacterials",
    "standardFormulations": [
      "200mg Tab"
    ],
    "standardStrengths": [
      "200mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "200mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Raises potassium"
    ],
    "contraindications": [
      "Pregnancy 1st trimester"
    ]
  },
  {
    "id": "bnf-tazocin",
    "name": "TAZOCIN",
    "genericName": "Tazocin (Pip/Taz)",
    "bnfChapter": "5.1.1 Penicillins",
    "standardFormulations": [
      "4.5g IV"
    ],
    "standardStrengths": [
      "4.5g"
    ],
    "standardRoutes": [
      "IV"
    ],
    "defaultDoses": [
      "4.5g"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "cautions": [
      "Broad spectrum"
    ],
    "contraindications": [
      "Penicillin allergy"
    ],
    "allergyGroup": "PENICILLIN"
  },
  {
    "id": "bnf-ursodeoxycholic-acid",
    "name": "URSODEOXYCHOLIC ACID",
    "genericName": "Ursodeoxycholic Acid",
    "bnfChapter": "1.9.1 Biliary",
    "standardFormulations": [
      "250mg Cap",
      "500mg Tab"
    ],
    "standardStrengths": [
      "250mg",
      "500mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "250mg",
      "500mg"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Monitor LFTs"
    ],
    "contraindications": [
      "Acute cholecystitis"
    ]
  },
  {
    "id": "bnf-vancomycin",
    "name": "VANCOMYCIN",
    "genericName": "Vancomycin",
    "bnfChapter": "5.1.7 Glycopeptides",
    "standardFormulations": [
      "1g IV",
      "125mg Cap"
    ],
    "standardStrengths": [
      "1g",
      "125mg"
    ],
    "standardRoutes": [
      "IV",
      "Oral"
    ],
    "defaultDoses": [
      "1g IV",
      "125mg Oral"
    ],
    "typicalFrequencies": [
      {
        "label": "TWICE a day (08:00, 20:00)",
        "times": [
          "08:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "RENAL_TDM",
      "label": "Trough Level",
      "unit": "mg/L",
      "maxNormal": 20,
      "warningText": "Toxic level. Withhold.",
      "hardStop": false
    },
    "cautions": [
      "Red man syndrome (infuse slowly)"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-valsartan",
    "name": "VALSARTAN",
    "genericName": "Valsartan",
    "bnfChapter": "2.5.5.2 ARBs",
    "standardFormulations": [
      "40mg Tab",
      "80mg Tab"
    ],
    "standardStrengths": [
      "40mg",
      "80mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "40mg",
      "80mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 08:00",
        "times": [
          "08:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "preAdminRequirement": {
      "type": "BLOOD_PRESSURE",
      "label": "Systolic BP",
      "unit": "mmHg",
      "minNormal": 90,
      "warningText": "BP < 90. Risk of hypotension.",
      "hardStop": false
    },
    "cautions": [
      "Hyperkalaemia"
    ],
    "contraindications": [
      "Pregnancy"
    ]
  },
  {
    "id": "bnf-warfarin",
    "name": "WARFARIN",
    "genericName": "Warfarin",
    "bnfChapter": "2.8.2 Anticoagulants",
    "standardFormulations": [
      "1mg Tab",
      "3mg Tab",
      "5mg Tab"
    ],
    "standardStrengths": [
      "1mg",
      "3mg",
      "5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "Variable"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": true,
    "preAdminRequirement": {
      "type": "INR",
      "label": "INR",
      "unit": "Ratio",
      "maxNormal": 4.5,
      "warningText": "INR > 4.5. Bleeding risk.",
      "hardStop": false
    },
    "cautions": [
      "Check INR"
    ],
    "contraindications": [
      "Active bleeding"
    ]
  },
  {
    "id": "bnf-xylometazoline",
    "name": "XYLOMETAZOLINE",
    "genericName": "Xylometazoline",
    "bnfChapter": "12.2.2 Decongestants",
    "standardFormulations": [
      "0.1% Nasal Spray"
    ],
    "standardStrengths": [
      "0.1%"
    ],
    "standardRoutes": [
      "Intranasal"
    ],
    "defaultDoses": [
      "1 spray"
    ],
    "typicalFrequencies": [
      {
        "label": "When required (PRN)",
        "times": [
          "PRN"
        ],
        "type": "PRN"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Rebound congestion (>7 days)"
    ],
    "contraindications": []
  },
  {
    "id": "bnf-zopiclone",
    "name": "ZOPICLONE",
    "genericName": "Zopiclone",
    "bnfChapter": "4.1.1 Hypnotics",
    "standardFormulations": [
      "3.75mg Tab",
      "7.5mg Tab"
    ],
    "standardStrengths": [
      "3.75mg",
      "7.5mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "7.5mg"
    ],
    "typicalFrequencies": [
      {
        "label": "ONCE a day at 22:00",
        "times": [
          "22:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": true,
    "isHighAlert": false,
    "cautions": [
      "Bitter taste",
      "Max 4 weeks"
    ],
    "contraindications": [
      "Respiratory depression"
    ]
  },
  {
    "id": "bnf-zinc-sulfate",
    "name": "ZINC SULFATE",
    "genericName": "Zinc Sulfate",
    "bnfChapter": "9.5.4 Minerals",
    "standardFormulations": [
      "220mg Cap (50mg Zinc)"
    ],
    "standardStrengths": [
      "220mg"
    ],
    "standardRoutes": [
      "Oral"
    ],
    "defaultDoses": [
      "220mg"
    ],
    "typicalFrequencies": [
      {
        "label": "THREE times a day",
        "times": [
          "08:00",
          "14:00",
          "20:00"
        ],
        "type": "REGULAR"
      }
    ],
    "isControlledDrug": false,
    "isHighAlert": false,
    "cautions": [
      "Take with food"
    ],
    "contraindications": []
  }
,
  {"id":"bnf-amiodarone","name":"AMIODARONE","genericName":"Amiodarone","bnfChapter":"2.3.2 Antiarrhythmics","standardFormulations":["200mg Tab","300mg/10mL IV"],"standardStrengths":["200mg","300mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["200mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Pulmonary toxicity","Thyroid dysfunction"],"contraindications":["Sinus bradycardia"]},
  {"id":"bnf-atenolol","name":"ATENOLOL","genericName":"Atenolol","bnfChapter":"2.4 Beta-blockers","standardFormulations":["25mg Tab","50mg Tab"],"standardStrengths":["25mg","50mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Masks hypoglycaemia"],"contraindications":["Asthma"]},
  {"id":"bnf-candesartan","name":"CANDESARTAN","genericName":"Candesartan","bnfChapter":"2.5.5.2 ARBs","standardFormulations":["4mg Tab","8mg Tab"],"standardStrengths":["4mg","8mg"],"standardRoutes":["Oral"],"defaultDoses":["8mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Hyperkalaemia"],"contraindications":["Pregnancy"]},
  {"id":"bnf-clonidine","name":"CLONIDINE","genericName":"Clonidine","bnfChapter":"2.5.2 Centrally acting antihypertensives","standardFormulations":["25mcg Tab"],"standardStrengths":["25mcg"],"standardRoutes":["Oral","IV"],"defaultDoses":["25mcg","50mcg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Rebound hypertension on withdrawal"],"contraindications":[]},
  {"id":"bnf-diltiazem","name":"DILTIAZEM","genericName":"Diltiazem","bnfChapter":"2.6.2 Calcium-channel blockers","standardFormulations":["60mg Tab","120mg M/R"],"standardStrengths":["60mg","120mg"],"standardRoutes":["Oral"],"defaultDoses":["60mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Heart block"],"contraindications":["Severe bradycardia"]},
  {"id":"bnf-doxazosin","name":"DOXAZOSIN","genericName":"Doxazosin","bnfChapter":"2.5.4 Alpha-blockers","standardFormulations":["1mg Tab","2mg Tab"],"standardStrengths":["1mg","2mg"],"standardRoutes":["Oral"],"defaultDoses":["1mg","2mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Postural hypotension"],"contraindications":[]},
  {"id":"bnf-flecainide","name":"FLECAINIDE","genericName":"Flecainide","bnfChapter":"2.3.2 Antiarrhythmics","standardFormulations":["50mg Tab","100mg Tab"],"standardStrengths":["50mg","100mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg","100mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Proarrhythmic"],"contraindications":["Structural heart disease"]},
  {"id":"bnf-indapamide","name":"INDAPAMIDE","genericName":"Indapamide","bnfChapter":"2.2.1 Thiazide-like diuretics","standardFormulations":["2.5mg Tab"],"standardStrengths":["2.5mg"],"standardRoutes":["Oral"],"defaultDoses":["2.5mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Hypokalaemia"],"contraindications":["Severe hepatic impairment"]},
  {"id":"bnf-isosorbide-mononitrate","name":"ISOSORBIDE MONONITRATE","genericName":"Isosorbide Mononitrate","bnfChapter":"2.6.1 Nitrates","standardFormulations":["10mg Tab","60mg M/R"],"standardStrengths":["10mg","60mg"],"standardRoutes":["Oral"],"defaultDoses":["60mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Tolerance (needs nitrate-free period)"],"contraindications":["Severe hypotension"]},
  {"id":"bnf-labetalol","name":"LABETALOL","genericName":"Labetalol","bnfChapter":"2.4 Beta-blockers","standardFormulations":["100mg Tab","200mg Tab","50mg/10mL IV"],"standardStrengths":["100mg","200mg","50mg/10mL"],"standardRoutes":["Oral","IV"],"defaultDoses":["100mg","200mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Postural hypotension"],"contraindications":["Asthma"]},
  {"id":"bnf-losartan","name":"LOSARTAN","genericName":"Losartan","bnfChapter":"2.5.5.2 ARBs","standardFormulations":["50mg Tab","100mg Tab"],"standardStrengths":["50mg","100mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Hyperkalaemia"],"contraindications":["Pregnancy"]},
  {"id":"bnf-ticagrelor","name":"TICAGRELOR","genericName":"Ticagrelor","bnfChapter":"2.9 Antiplatelets","standardFormulations":["90mg Tab"],"standardStrengths":["90mg"],"standardRoutes":["Oral"],"defaultDoses":["90mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Dyspnoea"],"contraindications":["Active bleeding"]},
  {"id":"bnf-verapamil","name":"VERAPAMIL","genericName":"Verapamil","bnfChapter":"2.6.2 Calcium-channel blockers","standardFormulations":["40mg Tab","80mg Tab"],"standardStrengths":["40mg","80mg"],"standardRoutes":["Oral"],"defaultDoses":["40mg","80mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Heart failure exacerbation"],"contraindications":["Concomitant beta-blocker use"]},
  {"id":"bnf-aciclovir","name":"ACICLOVIR","genericName":"Aciclovir","bnfChapter":"5.3.2.1 Antivirals","standardFormulations":["200mg Tab","400mg Tab","250mg IV"],"standardStrengths":["200mg","400mg","250mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["400mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Ensure adequate hydration (IV)"],"contraindications":[]},
  {"id":"bnf-ceftriaxone","name":"CEFTRIAXONE","genericName":"Ceftriaxone","bnfChapter":"5.1.2 Cephalosporins","standardFormulations":["1g IV","2g IV"],"standardStrengths":["1g","2g"],"standardRoutes":["IV"],"defaultDoses":["2g"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Biliary sludge"],"contraindications":["Cephalosporin allergy"]},
  {"id":"bnf-clarithromycin","name":"CLARITHROMYCIN","genericName":"Clarithromycin","bnfChapter":"5.1.5 Macrolides","standardFormulations":["250mg Tab","500mg Tab"],"standardStrengths":["250mg","500mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["500mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Strong CYP3A4 inhibitor","QT prolongation"],"contraindications":["Long QT syndrome"],"allergyGroup":"MACROLIDE"},
  {"id":"bnf-ciprofloxacin","name":"CIPROFLOXACIN","genericName":"Ciprofloxacin","bnfChapter":"5.1.12 Quinolones","standardFormulations":["250mg Tab","500mg Tab","400mg IV"],"standardStrengths":["250mg","500mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["500mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Tendon rupture risk","Lower seizure threshold"],"contraindications":["History of tendon disorders"]},
  {"id":"bnf-fluconazole","name":"FLUCONAZOLE","genericName":"Fluconazole","bnfChapter":"5.2.1 Antifungals","standardFormulations":["50mg Cap","150mg Cap"],"standardStrengths":["50mg","150mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Liver toxicity"],"contraindications":[]},
  {"id":"bnf-meropenem","name":"MEROPENEM","genericName":"Meropenem","bnfChapter":"5.1.2 Carbapenems","standardFormulations":["500mg IV","1g IV"],"standardStrengths":["500mg","1g"],"standardRoutes":["IV"],"defaultDoses":["1g"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Lowers seizure threshold"],"contraindications":["Penicillin anaphylaxis (cross-reactivity)"]},
  {"id":"bnf-tazocin--pip-taz-","name":"TAZOCIN (PIP-TAZ)","genericName":"Piperacillin/Tazobactam","bnfChapter":"5.1.1 Penicillins","standardFormulations":["4.5g IV"],"standardStrengths":["4.5g"],"standardRoutes":["IV"],"defaultDoses":["4.5g"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Broad spectrum"],"contraindications":["Penicillin allergy"],"allergyGroup":"PENICILLIN"},
  {"id":"bnf-amitriptyline","name":"AMITRIPTYLINE","genericName":"Amitriptyline","bnfChapter":"4.3.1 Tricyclic antidepressants","standardFormulations":["10mg Tab","25mg Tab"],"standardStrengths":["10mg","25mg"],"standardRoutes":["Oral"],"defaultDoses":["10mg","25mg"],"typicalFrequencies":[{"label":"ONCE a day at 22:00","times":["22:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Anticholinergic side effects"],"contraindications":["Recent MI"]},
  {"id":"bnf-aripiprazole","name":"ARIPIPRAZOLE","genericName":"Aripiprazole","bnfChapter":"4.2.1 Antipsychotics","standardFormulations":["5mg Tab","10mg Tab"],"standardStrengths":["5mg","10mg"],"standardRoutes":["Oral"],"defaultDoses":["10mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Akathisia"],"contraindications":[]},
  {"id":"bnf-carbamazepine","name":"CARBAMAZEPINE","genericName":"Carbamazepine","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["100mg Tab","200mg Tab"],"standardStrengths":["100mg","200mg"],"standardRoutes":["Oral"],"defaultDoses":["200mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Agranulocytosis","Autoinducer"],"contraindications":["AV conduction abnormalities"]},
  {"id":"bnf-clozapine","name":"CLOZAPINE","genericName":"Clozapine","bnfChapter":"4.2.1 Antipsychotics","standardFormulations":["25mg Tab","100mg Tab"],"standardStrengths":["25mg","100mg"],"standardRoutes":["Oral"],"defaultDoses":["100mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Strict blood monitoring required (agranulocytosis)"],"contraindications":["Severe cardiac disease"]},
  {"id":"bnf-duloxetine","name":"DULOXETINE","genericName":"Duloxetine","bnfChapter":"4.3.4 SNRIs","standardFormulations":["30mg Cap","60mg Cap"],"standardStrengths":["30mg","60mg"],"standardRoutes":["Oral"],"defaultDoses":["60mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Hepatotoxicity"],"contraindications":["Severe hepatic impairment"]},
  {"id":"bnf-lamotrigine","name":"LAMOTRIGINE","genericName":"Lamotrigine","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["25mg Tab","50mg Tab"],"standardStrengths":["25mg","50mg"],"standardRoutes":["Oral"],"defaultDoses":["25mg","50mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Stevens-Johnson syndrome (escalate dose slowly)"],"contraindications":[]},
  {"id":"bnf-levetiracetam","name":"LEVETIRACETAM","genericName":"Levetiracetam","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["250mg Tab","500mg Tab"],"standardStrengths":["250mg","500mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["500mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Mood changes/irritability"],"contraindications":[]},
  {"id":"bnf-lithium","name":"LITHIUM","genericName":"Lithium","bnfChapter":"4.2.3 Mood stabilisers","standardFormulations":["200mg Tab","400mg Tab"],"standardStrengths":["200mg","400mg"],"standardRoutes":["Oral"],"defaultDoses":["400mg"],"typicalFrequencies":[{"label":"ONCE a day at 22:00","times":["22:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Narrow therapeutic index (monitor levels)"],"contraindications":["Severe renal impairment"]},
  {"id":"bnf-midazolam","name":"MIDAZOLAM","genericName":"Midazolam","bnfChapter":"15.1.4 Benzodiazepines","standardFormulations":["10mg/2mL IV","10mg Buccal"],"standardStrengths":["10mg/2mL","10mg Buccal"],"standardRoutes":["IV","Buccal"],"defaultDoses":["2.5mg","5mg","10mg Buccal"],"typicalFrequencies":[{"label":"When required (PRN)","times":["PRN"],"type":"PRN"}],"isControlledDrug":true,"isHighAlert":true,"cautions":["Respiratory depression"],"contraindications":["Severe respiratory failure"]},
  {"id":"bnf-mirtazapine","name":"MIRTAZAPINE","genericName":"Mirtazapine","bnfChapter":"4.3.4 Antidepressants","standardFormulations":["15mg Tab","30mg Tab"],"standardStrengths":["15mg","30mg"],"standardRoutes":["Oral"],"defaultDoses":["15mg","30mg"],"typicalFrequencies":[{"label":"ONCE a day at 22:00","times":["22:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Increased appetite and weight gain","Sedation"],"contraindications":[]},
  {"id":"bnf-phenytoin","name":"PHENYTOIN","genericName":"Phenytoin","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["100mg Cap"],"standardStrengths":["100mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["100mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Non-linear pharmacokinetics (monitor levels)"],"contraindications":["Porphyria"]},
  {"id":"bnf-pregabalin","name":"PREGABALIN","genericName":"Pregabalin","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["50mg Cap","75mg Cap","150mg Cap"],"standardStrengths":["50mg","75mg","150mg"],"standardRoutes":["Oral"],"defaultDoses":["75mg","150mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":true,"isHighAlert":false,"cautions":["Dependency risk","Sedation"],"contraindications":[]},
  {"id":"bnf-sodium-valproate","name":"SODIUM VALPROATE","genericName":"Sodium Valproate","bnfChapter":"4.8.1 Antiepileptics","standardFormulations":["200mg Tab","500mg Tab"],"standardStrengths":["200mg","500mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["500mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Highly teratogenic","Hepatotoxicity"],"contraindications":["Pregnancy/women of childbearing potential","Liver disease"]},
  {"id":"bnf-venlafaxine","name":"VENLAFAXINE","genericName":"Venlafaxine","bnfChapter":"4.3.4 SNRIs","standardFormulations":["37.5mg Tab","75mg Tab"],"standardStrengths":["37.5mg","75mg"],"standardRoutes":["Oral"],"defaultDoses":["75mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Hypertension at higher doses"],"contraindications":["High risk of arrhythmias"]},
  {"id":"bnf-methadone","name":"METHADONE","genericName":"Methadone","bnfChapter":"4.10.3 Opioid dependence","standardFormulations":["5mg Tab","1mg/1mL Oral Sol"],"standardStrengths":["5mg","1mg/1mL"],"standardRoutes":["Oral"],"defaultDoses":["10mg","20mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":true,"isHighAlert":true,"cautions":["Long half-life (accumulation)","QT prolongation"],"contraindications":["Respiratory depression"],"allergyGroup":"OPIOID"},
  {"id":"bnf-tapentadol","name":"TAPENTADOL","genericName":"Tapentadol","bnfChapter":"4.7.2 Opioids","standardFormulations":["50mg Tab","100mg M/R"],"standardStrengths":["50mg","100mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":true,"isHighAlert":true,"cautions":["Lowers seizure threshold"],"contraindications":["Respiratory depression"],"allergyGroup":"OPIOID"},
  {"id":"bnf-allopurinol","name":"ALLOPURINOL","genericName":"Allopurinol","bnfChapter":"10.1.4 Gout","standardFormulations":["100mg Tab","300mg Tab"],"standardStrengths":["100mg","300mg"],"standardRoutes":["Oral"],"defaultDoses":["100mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Skin reactions (DRESS syndrome)"],"contraindications":["Acute gout attack (do not initiate)"]},
  {"id":"bnf-azathioprine","name":"AZATHIOPRINE","genericName":"Azathioprine","bnfChapter":"8.2.1 Immunosuppressants","standardFormulations":["25mg Tab","50mg Tab"],"standardStrengths":["25mg","50mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Bone marrow suppression (monitor FBC)"],"contraindications":["Severe infection"]},
  {"id":"bnf-budesonide","name":"BUDESONIDE","genericName":"Budesonide","bnfChapter":"3.2 Corticosteroids","standardFormulations":["200mcg Inhaler","400mcg Inhaler"],"standardStrengths":["200mcg","400mcg"],"standardRoutes":["Inhaled"],"defaultDoses":["200mcg","400mcg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Oral candidiasis (rinse mouth)"],"contraindications":[]},
  {"id":"bnf-carbimazole","name":"CARBIMAZOLE","genericName":"Carbimazole","bnfChapter":"6.2.2 Antithyroid","standardFormulations":["5mg Tab","20mg Tab"],"standardStrengths":["5mg","20mg"],"standardRoutes":["Oral"],"defaultDoses":["20mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Neutropenia / Agranulocytosis (warn to report sore throat)"],"contraindications":["Severe hepatic impairment"]},
  {"id":"bnf-colchicine","name":"COLCHICINE","genericName":"Colchicine","bnfChapter":"10.1.4 Gout","standardFormulations":["500mcg Tab"],"standardStrengths":["500mcg"],"standardRoutes":["Oral"],"defaultDoses":["500mcg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Highly toxic in overdose","GI toxicity"],"contraindications":["Severe renal impairment"]},
  {"id":"bnf-dapagliflozin","name":"DAPAGLIFLOZIN","genericName":"Dapagliflozin","bnfChapter":"6.1.2.3 SGLT2i","standardFormulations":["10mg Tab"],"standardStrengths":["10mg"],"standardRoutes":["Oral"],"defaultDoses":["10mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Fournier gangrene","Euglycaemic DKA"],"contraindications":[]},
  {"id":"bnf-ferrous-fumarate","name":"FERROUS FUMARATE","genericName":"Ferrous Fumarate","bnfChapter":"9.1.1 Iron","standardFormulations":["210mg Tab"],"standardStrengths":["210mg"],"standardRoutes":["Oral"],"defaultDoses":["210mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["GI upset","Black stools"],"contraindications":["Iron overload"]},
  {"id":"bnf-folic-acid","name":"FOLIC ACID","genericName":"Folic Acid","bnfChapter":"9.1.2 Megaloblastic anaemia","standardFormulations":["5mg Tab"],"standardStrengths":["5mg"],"standardRoutes":["Oral"],"defaultDoses":["5mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Never give alone in undiagnosed B12 deficiency (subacute combined degeneration of cord)"],"contraindications":[]},
  {"id":"bnf-formoterol","name":"FORMOTEROL","genericName":"Formoterol","bnfChapter":"3.1.1.2 LABA","standardFormulations":["12mcg Inhaler"],"standardStrengths":["12mcg"],"standardRoutes":["Inhaled"],"defaultDoses":["12mcg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Tremor","Palpitations"],"contraindications":[]},
  {"id":"bnf-hyoscine-butylbromide","name":"HYOSCINE BUTYLBROMIDE","genericName":"Hyoscine Butylbromide (Buscopan)","bnfChapter":"1.2 Antispasmodics","standardFormulations":["10mg Tab","20mg/1mL IV"],"standardStrengths":["10mg","20mg/1mL"],"standardRoutes":["Oral","IV"],"defaultDoses":["10mg","20mg"],"typicalFrequencies":[{"label":"FOUR times a day","times":["08:00","12:00","18:00","22:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Anticholinergic effects (dry mouth, blurred vision)"],"contraindications":["Glaucoma","Myasthenia gravis"]},
  {"id":"bnf-lactulose","name":"LACTULOSE","genericName":"Lactulose","bnfChapter":"1.8.3 Osmotic laxatives","standardFormulations":["3.1g/5mL Oral Sol"],"standardStrengths":["3.1g/5mL"],"standardRoutes":["Oral"],"defaultDoses":["15mL"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Flatulence","Cramps"],"contraindications":["Galactosaemia","Obstruction"]},
  {"id":"bnf-linagliptin","name":"LINAGLIPTIN","genericName":"Linagliptin","bnfChapter":"6.1.2.3 DPP-4 inhibitors","standardFormulations":["5mg Tab"],"standardStrengths":["5mg"],"standardRoutes":["Oral"],"defaultDoses":["5mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Pancreatitis risk"],"contraindications":[]},
  {"id":"bnf-mebeverine","name":"MEBEVERINE","genericName":"Mebeverine","bnfChapter":"1.2 Antispasmodics","standardFormulations":["135mg Tab","200mg M/R Cap"],"standardStrengths":["135mg","200mg"],"standardRoutes":["Oral"],"defaultDoses":["135mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Take 20 mins before meals"],"contraindications":["Paralytic ileus"]},
  {"id":"bnf-mesalazine","name":"MESALAZINE","genericName":"Mesalazine","bnfChapter":"1.5.1 Aminosalicylates","standardFormulations":["400mg Tab","800mg Tab"],"standardStrengths":["400mg","800mg"],"standardRoutes":["Oral","Rectal"],"defaultDoses":["800mg"],"typicalFrequencies":[{"label":"THREE times a day","times":["08:00","14:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Nephrotoxicity (monitor U&Es)"],"contraindications":["Aspirin hypersensitivity"]},
  {"id":"bnf-methotrexate","name":"METHOTREXATE","genericName":"Methotrexate","bnfChapter":"10.1.3 DMARDs","standardFormulations":["2.5mg Tab","10mg Tab"],"standardStrengths":["2.5mg","10mg"],"standardRoutes":["Oral","SC"],"defaultDoses":["15mg ONCE WEEKLY"],"typicalFrequencies":[{"label":"ONCE a week (Specify Day)","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["FATAL ERROR RISK: Must be dosed WEEKLY, never daily","Folic acid rescue needed"],"contraindications":["Pregnancy","Severe infection"]},
  {"id":"bnf-montelukast","name":"MONTELUKAST","genericName":"Montelukast","bnfChapter":"3.3.2 Leukotriene receptor antagonists","standardFormulations":["10mg Tab"],"standardStrengths":["10mg"],"standardRoutes":["Oral"],"defaultDoses":["10mg"],"typicalFrequencies":[{"label":"ONCE a day at 22:00","times":["22:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Neuropsychiatric reactions (nightmares, aggression)"],"contraindications":[]},
  {"id":"bnf-phosphate-enema","name":"PHOSPHATE ENEMA","genericName":"Phosphate Enema","bnfChapter":"1.8.3 Laxatives","standardFormulations":["128mL Enema"],"standardStrengths":["128mL"],"standardRoutes":["Rectal"],"defaultDoses":["1 Enema"],"typicalFrequencies":[{"label":"STAT Once Only","times":["STAT"],"type":"STAT"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Risk of electrolyte imbalance (hyperphosphataemia, hypocalcaemia)"],"contraindications":["Renal impairment","Inflammatory bowel disease"]},
  {"id":"bnf-pioglitazone","name":"PIOGLITAZONE","genericName":"Pioglitazone","bnfChapter":"6.1.2.3 Thiazolidinediones","standardFormulations":["15mg Tab","30mg Tab"],"standardStrengths":["15mg","30mg"],"standardRoutes":["Oral"],"defaultDoses":["15mg","30mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Heart failure risk","Bladder cancer risk"],"contraindications":["Heart failure","Active bladder cancer"]},
  {"id":"bnf-propylthiouracil","name":"PROPYLTHIOURACIL","genericName":"Propylthiouracil","bnfChapter":"6.2.2 Antithyroid","standardFormulations":["50mg Tab"],"standardStrengths":["50mg"],"standardRoutes":["Oral"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Hepatotoxicity (monitor LFTs)"],"contraindications":["Severe hepatic impairment"]},
  {"id":"bnf-sitagliptin","name":"SITAGLIPTIN","genericName":"Sitagliptin","bnfChapter":"6.1.2.3 DPP-4 inhibitors","standardFormulations":["100mg Tab"],"standardStrengths":["100mg"],"standardRoutes":["Oral"],"defaultDoses":["100mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Pancreatitis risk"],"contraindications":[]},
  {"id":"bnf-theophylline","name":"THEOPHYLLINE","genericName":"Theophylline","bnfChapter":"3.1.3 Xanthines","standardFormulations":["200mg M/R","300mg M/R"],"standardStrengths":["200mg","300mg"],"standardRoutes":["Oral"],"defaultDoses":["200mg","300mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Narrow therapeutic index (monitor levels)","Interacts with smoking"],"contraindications":["Porphyria"]}
,
  {"id":"bnf-hydromorphone","name":"HYDROMORPHONE","genericName":"Hydromorphone","bnfChapter":"4.7.2 Opioids","standardFormulations":["2mg Tab","2mg/1mL IV"],"standardStrengths":["2mg"],"standardRoutes":["Oral","IV","SC"],"defaultDoses":["1mg","2mg"],"typicalFrequencies":[{"label":"When required (PRN)","times":["PRN"],"type":"PRN"}],"isControlledDrug":true,"isHighAlert":true,"preAdminRequirement":{"type":"RESP_RATE","label":"Resp Rate","unit":"breaths/min","minNormal":10,"warningText":"RR < 10. Risk of respiratory depression.","hardStop":true},"cautions":["Highly potent opioid"],"contraindications":["Respiratory depression"],"allergyGroup":"OPIOID"},
  {"id":"bnf-cefepime","name":"CEFEPIME","genericName":"Cefepime","bnfChapter":"5.1.2 Cephalosporins","standardFormulations":["1g IV","2g IV"],"standardStrengths":["1g","2g"],"standardRoutes":["IV"],"defaultDoses":["1g","2g"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"cautions":["Neurotoxicity in renal failure"],"contraindications":["Cephalosporin allergy"]},
  {"id":"bnf-metoprolol","name":"METOPROLOL","genericName":"Metoprolol","bnfChapter":"2.4 Beta-blockers","standardFormulations":["50mg Tab","100mg Tab","5mg/5mL IV"],"standardStrengths":["50mg","100mg","5mg"],"standardRoutes":["Oral","IV"],"defaultDoses":["50mg"],"typicalFrequencies":[{"label":"TWICE a day (08:00, 20:00)","times":["08:00","20:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Masks hypoglycaemia"],"contraindications":["Asthma","Heart block"]},
  {"id":"bnf-lisinopril","name":"LISINOPRIL","genericName":"Lisinopril","bnfChapter":"2.5.5.1 ACEi","standardFormulations":["5mg Tab","10mg Tab","20mg Tab"],"standardStrengths":["5mg","10mg","20mg"],"standardRoutes":["Oral"],"defaultDoses":["10mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Dry cough","Hyperkalaemia"],"contraindications":["Angioedema"]},
  {"id":"bnf-prednisone","name":"PREDNISONE","genericName":"Prednisone","bnfChapter":"6.3.2 Corticosteroids","standardFormulations":["5mg Tab","10mg Tab","20mg Tab"],"standardStrengths":["5mg","10mg","20mg"],"standardRoutes":["Oral"],"defaultDoses":["40mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Hyperglycaemia"],"contraindications":["Systemic fungal infection"]},
  {"id":"bnf-methylprednisolone","name":"METHYLPREDNISOLONE","genericName":"Methylprednisolone","bnfChapter":"6.3.2 Corticosteroids","standardFormulations":["40mg IV","125mg IV","500mg IV"],"standardStrengths":["40mg","125mg","500mg"],"standardRoutes":["IV"],"defaultDoses":["40mg","125mg"],"typicalFrequencies":[{"label":"ONCE a day at 08:00","times":["08:00"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Rapid IV push can cause arrhythmias"],"contraindications":[]},
  {"id":"bnf-propofol","name":"PROPOFOL","genericName":"Propofol","bnfChapter":"15.1.1 Intravenous anaesthetics","standardFormulations":["1% (10mg/mL) IV","2% (20mg/mL) IV"],"standardStrengths":["10mg/mL","20mg/mL"],"standardRoutes":["IV"],"defaultDoses":["10-50mg/hr (Infusion)","1-2mg/kg (Induction)"],"typicalFrequencies":[{"label":"CONTINUOUS IV Infusion","times":["CONTINUOUS"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"RESP_RATE","label":"Resp Rate","unit":"breaths/min","minNormal":10,"warningText":"RR < 10. Risk of respiratory depression.","hardStop":true},"cautions":["Propofol infusion syndrome","Respiratory depression"],"contraindications":["Egg/soy allergy"]},
  {"id":"bnf-dexmedetomidine","name":"DEXMEDETOMIDINE","genericName":"Dexmedetomidine","bnfChapter":"15.1.4 Sedatives","standardFormulations":["100mcg/mL IV"],"standardStrengths":["100mcg/mL"],"standardRoutes":["IV"],"defaultDoses":["0.2-1.4mcg/kg/hr"],"typicalFrequencies":[{"label":"CONTINUOUS IV Infusion","times":["CONTINUOUS"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"PULSE","label":"Heart Rate","unit":"bpm","minNormal":55,"warningText":"HR < 55. Risk of bradycardia.","hardStop":false},"cautions":["Bradycardia","Hypotension"],"contraindications":["Advanced heart block"]},
  {"id":"bnf-sodium-chloride-0-9-","name":"SODIUM CHLORIDE 0.9%","genericName":"Sodium Chloride","bnfChapter":"9.2.2 IV Fluids","standardFormulations":["500mL Bag","1000mL Bag"],"standardStrengths":["0.9%"],"standardRoutes":["IV"],"defaultDoses":["500mL","1000mL"],"typicalFrequencies":[{"label":"STAT Once Only","times":["STAT"],"type":"STAT"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Fluid overload","Hyperchloraemic acidosis"],"contraindications":["Pulmonary oedema"]},
  {"id":"bnf-lactated-ringers--hartmanns-","name":"LACTATED RINGERS (HARTMANNS)","genericName":"Compound Sodium Lactate","bnfChapter":"9.2.2 IV Fluids","standardFormulations":["500mL Bag","1000mL Bag"],"standardStrengths":["Compound"],"standardRoutes":["IV"],"defaultDoses":["500mL","1000mL"],"typicalFrequencies":[{"label":"STAT Once Only","times":["STAT"],"type":"STAT"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Contains potassium (caution in renal failure)"],"contraindications":["Severe hyperkalaemia"]},
  {"id":"bnf-dextrose-5---glucose-5--","name":"DEXTROSE 5% (GLUCOSE 5%)","genericName":"Glucose","bnfChapter":"9.2.2 IV Fluids","standardFormulations":["500mL Bag","1000mL Bag"],"standardStrengths":["5%"],"standardRoutes":["IV"],"defaultDoses":["500mL","1000mL"],"typicalFrequencies":[{"label":"STAT Once Only","times":["STAT"],"type":"STAT"}],"isControlledDrug":false,"isHighAlert":false,"cautions":["Hyponatraemia if given excessively without sodium"],"contraindications":["Water intoxication"]},
  {"id":"bnf-norepinephrine--levophed-","name":"NOREPINEPHRINE (LEVOPHED)","genericName":"Noradrenaline","bnfChapter":"2.7.3 Vasopressors","standardFormulations":["4mg/4mL Ampoule","8mg/8mL Ampoule"],"standardStrengths":["1mg/mL"],"standardRoutes":["IV (Central Line Only)"],"defaultDoses":["0.01-3mcg/kg/min"],"typicalFrequencies":[{"label":"CONTINUOUS IV Infusion","times":["CONTINUOUS"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Tissue necrosis if extravasation occurs (Requires Central Line)"],"contraindications":["Hypovolaemia (uncorrected)"]},
  {"id":"bnf-nicardipine","name":"NICARDIPINE","genericName":"Nicardipine","bnfChapter":"2.6.2 Calcium-channel blockers","standardFormulations":["10mg/10mL Ampoule"],"standardStrengths":["1mg/mL"],"standardRoutes":["IV"],"defaultDoses":["5-15mg/hr (Infusion)"],"typicalFrequencies":[{"label":"CONTINUOUS IV Infusion","times":["CONTINUOUS"],"type":"REGULAR"}],"isControlledDrug":false,"isHighAlert":true,"preAdminRequirement":{"type":"BLOOD_PRESSURE","label":"Systolic BP","unit":"mmHg","minNormal":90,"warningText":"BP < 90. Risk of hypotension.","hardStop":false},"cautions":["Reflex tachycardia"],"contraindications":["Advanced aortic stenosis"]}
];

export function findBNFDrug(nameOrId: string): DrugFormularyItem | undefined {
  const query = nameOrId.toLowerCase().trim();
  return BNF_FORMULARY.find(d => 
    d.id.toLowerCase() === query || 
    d.name.toLowerCase() === query || 
    d.genericName.toLowerCase() === query || 
    d.name.toLowerCase().includes(query) || 
    d.genericName.toLowerCase().includes(query)
  );
}

export function searchBNFFormulary(keyword: string): DrugFormularyItem[] {
  if (!keyword || keyword.trim() === '') return BNF_FORMULARY;
  const q = keyword.toLowerCase().trim();
  return BNF_FORMULARY.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.genericName.toLowerCase().includes(q) || 
    item.bnfChapter.toLowerCase().includes(q) || 
    (item.cautions && item.cautions.some(c => c.toLowerCase().includes(q))) || 
    (item.contraindications && item.contraindications.some(ci => ci.toLowerCase().includes(q)))
  );
}

export function checkPrescribingConflicts(drug: DrugFormularyItem, existingPrescriptions: any[], allergies: any[], weight: number, eGFR: number): any[] {
  // Find current active prescriptions
  const activePrescriptions = existingPrescriptions.filter(p => p.status === 'ACTIVE');
  const conflicts = [];
  
  for (const existing of activePrescriptions) {
    if (existing.drugName.includes(drug.name) || (existing.genericName && drug.genericName.toLowerCase() === existing.genericName.toLowerCase())) {
      conflicts.push({
        severity: 'HIGH',
        type: 'DUPLICATE',
        message: `Patient is already prescribed ${existing.drugName}. Duplicate therapy alert.`
      });
    }
  }

  // Triple Whammy (ACEi + Diuretic + NSAID)
  const hasNSAID = activePrescriptions.some(p => p.genericName?.toLowerCase().includes('ibuprofen') || p.genericName?.toLowerCase().includes('naproxen') || p.genericName?.toLowerCase().includes('ketorolac') || p.genericName?.toLowerCase().includes('aspirin'));
  const hasDiuretic = activePrescriptions.some(p => p.genericName?.toLowerCase().includes('furosemide') || p.genericName?.toLowerCase().includes('bumetanide') || p.genericName?.toLowerCase().includes('spironolactone'));
  const hasACEi = activePrescriptions.some(p => p.genericName?.toLowerCase().includes('ramipril') || p.genericName?.toLowerCase().includes('valsartan'));
  
  if (drug.allergyGroup === 'NSAID' || drug.name.includes('IBUPROFEN') || drug.name.includes('NAPROXEN') || drug.name.includes('KETOROLAC')) {
    if (hasDiuretic && hasACEi) conflicts.push({ severity: 'HIGH', type: 'INTERACTION', message: 'Triple Whammy Alert: NSAID + ACEi + Diuretic significantly increases the risk of Acute Kidney Injury (AKI).' });
  }
  if (drug.bnfChapter.includes('ACEi') || drug.genericName.toLowerCase().includes('ramipril') || drug.genericName.toLowerCase().includes('valsartan')) {
    if (hasNSAID && hasDiuretic) conflicts.push({ severity: 'HIGH', type: 'INTERACTION', message: 'Triple Whammy Alert: ACEi + NSAID + Diuretic significantly increases the risk of Acute Kidney Injury (AKI).' });
  }
  if (drug.bnfChapter.includes('Diuretic') || drug.genericName.toLowerCase().includes('furosemide') || drug.genericName.toLowerCase().includes('spironolactone') || drug.genericName.toLowerCase().includes('bumetanide')) {
    if (hasNSAID && hasACEi) conflicts.push({ severity: 'HIGH', type: 'INTERACTION', message: 'Triple Whammy Alert: Diuretic + NSAID + ACEi significantly increases the risk of Acute Kidney Injury (AKI).' });
  }

  // Opioid duplication
  const hasOpioid = activePrescriptions.some(p => p.genericName?.toLowerCase().includes('morphine') || p.genericName?.toLowerCase().includes('codeine') || p.genericName?.toLowerCase().includes('oxycodone') || p.genericName?.toLowerCase().includes('tramadol') || p.genericName?.toLowerCase().includes('fentanyl') || p.genericName?.toLowerCase().includes('buprenorphine'));
  if (drug.allergyGroup === 'OPIOID' || drug.name.includes('MORPHINE') || drug.name.includes('CODEINE') || drug.name.includes('OXYCODONE') || drug.name.includes('TRAMADOL') || drug.name.includes('FENTANYL')) {
    if (hasOpioid) conflicts.push({ severity: 'MEDIUM', type: 'INTERACTION', message: 'Multiple Opioids: Check total opiate load and risk of respiratory depression.' });
  }

  return conflicts;
}
