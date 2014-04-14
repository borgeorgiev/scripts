import com.atlassian.jira.component.ComponentAccessor
import com.atlassian.sal.api.ApplicationProperties
import com.atlassian.jira.config.properties.APKeys

def attachments = ComponentAccessor.getAttachmentManager().getAttachments(issue)
def basurl = ComponentAccessor.getApplicationProperties().getString(APKeys.JIRA_BASEURL)
def names = "";

attachments.each() {
  def text= '<a href='+basurl+'/secure/attachment/'+ it.id +'/'+it.filename+'">'+it.filename+'</a>'
  text+='<br/>'
  names+=text
}

return names
