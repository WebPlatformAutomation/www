Feature: [E2E][CC Uber App Recommender v2.1]

    @MWPW-CC-1001
    Scenario Outline: Single App Recommendations | CCX
        Given I go to this page /creativecloud/quiz-recommender.html
        #Then I close the geo overlay if present
        And I select each quiz recommender answer "<Answers>"
        # And I should see "/creativecloud/quiz-recommender/result.html#type=<Result>" in current url
        And I should see quiz recommender single result title is "Adobe Express"
        
        Examples:
        | Answers                                								   	  | Result 														 		|
		| Photography > Edit quickly and customize templates > Personal projects    | cc:app-reco&selectedOptions=CCX/category_photo/plan_personal 		| 
		#| Video > Using templates to create content fast > Personal projects 		  | cc:app-reco&selectedOptions=CCX/category_video/plan_personal 		| 
		#| Graphic design > Using templates to create content fast > Personal projects | cc:app-reco&selectedOptions=CCX/category_design/plan_personal 		| 
		#| Illustration > Using templates to create content fast > Personal projects   | cc:app-reco&selectedOptions=CCX/category_illustration/plan_personal | 
		#| PDFs > Using templates to create content fast > Personal projects 		  | cc:app-reco&selectedOptions=CCX/category_pdf/plan_personal 			| 
		#| Photography > Using templates to create content fast > School projects 	  | cc:app-reco&selectedOptions=CCX/category_photo/plan_school 			| 
		#| Video > Using templates to create content fast > School projects 	 		  | cc:app-reco&selectedOptions=CCX/category_video/plan_school 			| 
		#| Graphic design > Using templates to create content fast > School projects   | cc:app-reco&selectedOptions=CCX/category_design/plan_school 		| 
		#| Illustration > Using templates to create content fast > School projects     | cc:app-reco&selectedOptions=CCX/category_illustration/plan_school 	| 
		#| PDFs > Using templates to create content fast > School projects  			  | cc:app-reco&selectedOptions=CCX/category_pdf/plan_school 			| 
		#| Photography > Using templates to create content fast > Business projects 	  | cc:app-reco&selectedOptions=CCX/category_photo/plan_business 		| 
		#| Video > Using templates to create content fast > Business projects 		  | cc:app-reco&selectedOptions=CCX/category_video/plan_business        | 
		#| Graphic design > Using templates to create content fast > Business projects | cc:app-reco&selectedOptions=CCX/category_design/plan_business       | 
		#| Illustration > Using templates to create content fast > Business projects   | cc:app-reco&selectedOptions=CCX/category_illustration/plan_business | 
		#| PDFs > Using templates to create content fast > Business projects 		  | cc:app-reco&selectedOptions=CCX/category_pdf/plan_business 		    | 