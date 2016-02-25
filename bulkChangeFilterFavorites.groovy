import com.atlassian.jira.favourites.FavouritesManager;
import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.issue.search.SearchRequestManager;
import com.atlassian.jira.util.Visitor;
import com.atlassian.jira.issue.search.SearchRequestEntity;
import com.atlassian.jira.exception.PermissionException;

def fm = ComponentAccessor.getComponent(FavouritesManager.class)
def srm = ComponentAccessor.getComponent(SearchRequestManager.class)
def user = ComponentAccessor.getJiraAuthenticationContext().getUser()
srm.visitAll(new Visitor<SearchRequestEntity>(){
  void  visit(SearchRequestEntity sr) {
      try {
      	fm.addFavourite(user, srm.getSearchRequestById(sr.id));
      } catch (PermissionException e) {
        //ignore  
      }
  }
    
})

