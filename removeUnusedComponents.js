AJS.$.getJSON( "/rest/api/2/project/SD/components", function( data) {
  AJS.$(data).each(function(i,e) {
		AJS.$.getJSON( "/rest/api/2/component/"+e.id+"/relatedIssueCounts", function(data) {
				if(data.issueCount == 0) {					
					AJS.$.ajax({
					  url: '/rest/api/2/component/'+e.id,
					  type: 'DELETE'
					});				
				}				
		});
	});
});
