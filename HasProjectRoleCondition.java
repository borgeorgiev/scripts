package com.myplugin.conditions;

import java.util.Map;

import com.atlassian.jira.plugin.webfragment.conditions.AbstractWebCondition;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.security.roles.ProjectRole;
import com.atlassian.jira.security.roles.ProjectRoleManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.plugin.PluginParseException;

public class HasProjectRoleCondition extends AbstractWebCondition {

	private ProjectRoleManager roleManager;
	private ProjectRole projectRole;

	public HasProjectRoleCondition(ProjectRoleManager roleManager) {
		this.roleManager = roleManager;
	}

	@Override
	public void init(Map<String, String> params) throws PluginParseException {
		String roleName = params.get("role");
		projectRole = roleManager.getProjectRole(roleName);
		if (projectRole == null) {
			throw new PluginParseException("Could not determine role for: " + params.get("role"));
		}
		super.init(params);
	}

	@Override
	public boolean shouldDisplay(ApplicationUser user, JiraHelper jiraHelper) {
		final Project project = jiraHelper.getProjectObject();
		return roleManager.isUserInProjectRole(user, projectRole, project);
	}

}
