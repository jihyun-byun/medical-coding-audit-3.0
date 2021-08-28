SELECT 
DISTINCT(notes.appointment_id),
MAX(notes.nth_note) AS nth_note,
notes.doctor_id,
notes.group_id,
notes.appointment_date,
notes.completion_date,

ext.extractor_id,
bhr.full_name,
bhr.work_email,

provs_orgs.doctor_name,
provs_orgs.group_name,

em.e_m_code,
em_mods.em_modifiers_string,
icd.icd10_codes,
procedures.procedures_string

FROM `prod-data-lake-clean.notes.provider_note_counts` AS notes

LEFT JOIN `prod-data-lake-clean.notes.notes_extractor` AS ext
ON ext.appointment_id = notes.appointment_id

LEFT JOIN `prod-data-lake-clean.employees.bhr_employees` AS bhr
ON bhr.scribe_id = ext.extractor_id

LEFT JOIN `prod-data-lake-clean.providers.providers_and_orgs` AS provs_orgs
ON provs_orgs.doctor_id = notes.doctor_id

LEFT JOIN `prod-data-lake-clean.coding.em_codes` AS em
ON em.appointment_id = notes.appointment_id

LEFT JOIN `prod-data-lake-clean.coding.em_modifiers_concatenated` AS em_mods
ON em_mods.appointment_id = notes.appointment_id

LEFT JOIN `prod-data-lake-clean.coding.icd10_codes_concatenated` AS icd
ON icd.appointment_id = notes.appointment_id

LEFT JOIN `prod-data-lake-clean.coding.procedures_concatenated` AS procedures
ON procedures.appointment_id = notes.appointment_id

WHERE
  notes.completion_date BETWEEN 
DATE_ADD(CURRENT_DATE(), INTERVAL -7 DAY) AND CURRENT_DATE()

GROUP BY 
notes.appointment_id,
notes.nth_note,
notes.doctor_id,
notes.group_id,
notes.appointment_date,
notes.completion_date,
ext.extractor_id,
bhr.full_name,
bhr.work_email,
provs_orgs.doctor_name,
provs_orgs.group_name,
em.e_m_code,
em_mods.em_modifiers_string,
icd.icd10_codes,
procedures.procedures_string

