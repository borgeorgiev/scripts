def ren = new com.onresolve.jira.groovy.canned.admin.RenameUser();
def input = [ 
    ["admin","newname"],
        ["asd", "usernew"]
        ];
def result = ""
for (e in input) {
    def args = [
                   (com.onresolve.jira.groovy.canned.admin.RenameUser.FIELD_FROM_USER_ID): e[0],
               (com.onresolve.jira.groovy.canned.admin.RenameUser.FIELD_TO_USER_ID): e[1],
                (com.onresolve.jira.groovy.canned.admin.RenameUser.FIELD_MERGE): false
                ];
        result+=ren.getDescription(args, true)
        //Uncomment to actualy execute, the line above is for preview
        //result+=ren.doScript(args)
         
}
result
