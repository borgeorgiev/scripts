AJS.$.getJSON( "/rest/api/2/project/MKT/versions", function( data) {
AJS.$(data).each(function(i,e) {
console.log(e.id);
AJS.$.ajax({
  url: '/rest/api/2/version/'+e.id,
  type: 'DELETE'
      });
});
});

AJS.$.getJSON( "/rest/api/2/project/MKT/components", function( data) {
  AJS.$(data).each(function(i,e) {
AJS.$.ajax({
  url: '/rest/api/2/component/'+e.id,
  type: 'DELETE'
      });
});
});
