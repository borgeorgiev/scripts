import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.event.type.EventType;
import com.atlassian.jira.event.type.EventTypeManager;
import com.atlassian.jira.notification.NotificationSchemeManager;
import com.atlassian.jira.notification.NotificationTypeManager;
import com.atlassian.jira.notification.NotificationType;
import com.atlassian.jira.scheme.SchemeEntity;
import com.atlassian.jira.scheme.SchemeManager;

def manager = ComponentAccessor.getNotificationSchemeManager();
def typeManager = ComponentAccessor.getComponent(NotificationTypeManager.class);
def eventTypeManager = ComponentAccessor.getComponent(EventTypeManager.class);

//
def schemeName = "OPS Notification Scheme"
def scheme = manager.getScheme(schemeName)
def type = "Group_Dropdown"
def groups = ["administrators", "users"]
def eventTypeIds = [EventType.ISSUE_CREATED_ID, EventType.ISSUE_UPDATED_ID]

//For each event add each group
eventTypeIds.each() {eventTypeId -> 
    groups.each() {groupName ->
        //Add entry for each group
    	def rawValue = typeManager.getNotificationType(type).getArgumentValue(groupName);    
        SchemeEntity schemeEntity = new SchemeEntity(type, rawValue, eventTypeId, null);
        if (!manager.hasEntities(scheme, eventTypeId, type, rawValue, null))
        {
            manager.createSchemeEntity(scheme, schemeEntity);
        }
    }    
};

