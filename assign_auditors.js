var rawData = bq_codes.data
var assign = assign_array.data
var fs = formsite_data.data
var array = []

  for (var i=0; i < rawData.length; i++) 
     {//start i loop
  
      var row = rawData[i]
      
      var appointment_id = rawData[i].appointment_id
      var appointment_date = rawData[i].appointment_date
      var nth_note = rawData[i].nth_note
      var doctor_id = rawData[i].doctor_id
      var group_id = rawData[i].group_id
      var extractor_id = rawData[i].extractor_id
      var doctor_name = rawData[i].doctor_name
      var group_name = rawData[i].group_name
      
      var em_code = rawData[i].e_m_code
      var em_modifiers = rawData[i].em_modifiers_string
      var icd_codes = rawData[i].icd10_codes
      var procedures = rawData[i].procedures_string

      var work_email = rawData[i].work_email
      var auditor = ""
         
      
      	for (var c=0; c < assign.length; c++) 
            {//start c loop
               var gpAsgn = assign[c].group_id
              
              //if group (raw data) matches group (in auto assign tab)
              if(group_id == gpAsgn){
                
                var allAuditors = [assign[c].auditor, 
                                    assign[c].auditor_2, 
                                    assign[c].auditor_3, 
                                    assign[c].auditor_4, 
                                    assign[c].auditor_5]
                
                var numAuditors = allAuditors.filter(Boolean).length
                                
                var mult = audit_level.value
                
                //var rm = (nth_note % mult)
                var rmAud = (nth_note/mult) % numAuditors

                  
                if(numAuditors == 5)
                  {
                       if(rmAud == 0){var auditor = (assign[c].auditor_5)}
                  else if(rmAud == 1){var auditor = (assign[c].auditor_4)}
                  else if(rmAud == 2){var auditor = (assign[c].auditor_3)}
                  else if(rmAud == 3){var auditor = (assign[c].auditor_2)}
                  else if(rmAud == 4){var auditor = (assign[c].auditor)}
                  }
                               
                else if(numAuditors == 4)
                  {
                       if(rmAud == 0){var auditor = (assign[c].auditor_4)}
                  else if(rmAud == 1){var auditor = (assign[c].auditor_3)}
                  else if(rmAud == 2){var auditor = (assign[c].auditor_2)}
                  else if(rmAud == 3){var auditor = (assign[c].auditor)}
                  }
                
                else if(numAuditors == 3)
                  {
                       if(rmAud == 0){var auditor = (assign[c].auditor_3)}
                  else if(rmAud == 1){var auditor = (assign[c].auditor_2)}
                  else if(rmAud == 2){var auditor = (assign[c].auditor)}
                  
                  }

                else if(numAuditors == 2)
                  {
                  if(rmAud == 0){var auditor = (assign[c].auditor_2)}
                  else if(rmAud == 1){var auditor = (assign[c].auditor)}
                  }
                
                else if(numAuditors == 1)
                  {
                  if(rmAud == 0){var auditor = (assign[c].auditor)}
                  }
                  
               
              }
            }
       
            //reset appt_id and status
            var appt_id = ""
        		var status = ""
        		var ts = ""            
       
          for (var j=0; j < fs.length; j++){
            
            var pre_appt_id = fs[j].appt_id
              
              if(appointment_id == pre_appt_id){
                 var status = fs[j].status
                 var appt_id = fs[j].appt_id
                 var ts = fs[j].timestamp
               break;}
              
           }
              

    
         //array of values to push:   
       array.push([appointment_id, appointment_date, nth_note, doctor_id, group_id, extractor_id, doctor_name, group_name, em_code, em_modifiers, icd_codes, procedures, work_email, auditor, status]);
        

     }//end i loop

return array
