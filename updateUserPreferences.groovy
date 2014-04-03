import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.user.preferences.ExtendedPreferences;
import com.atlassian.jira.user.preferences.PreferenceKeys;
import com.atlassian.jira.user.ApplicationUser;

ApplicationUser user = ComponentAccessor.getUserManager().getUserByName("test");
ExtendedPreferences prefs = ComponentAccessor.getUserPreferencesManager().getExtendedPreferences(user);
prefs.setString(PreferenceKeys.USER_TIMEZONE, "PST");

