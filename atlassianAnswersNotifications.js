// ==UserScript==
// @name       Answers notifications
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://answers.atlassian.com/
// @match      https://answers.atlassian.com/questions/?sort=recent&status=both&type=all
// @match      https://answers.atlassian.com/questions/?sort=recent&status=unanswered&type=tagged
// @match      https://answers.atlassian.com/questions/?sort=recent&status=both&type=tagged
// @copyright  2012+, You
// ==/UserScript==


function attachNotificationsButton() {
    if (window.webkitNotifications.checkPermission() != 0) {
        $('#askaquestion').parent().append('<li><a id="enableNotifications" class="aui-button aui-button-primary aui-style" href="/questions/ask/" id="enableNotifications">Enable Notifications</a></li');
            $('#enableNotifications').click(function(){
            if (window.webkitNotifications.checkPermission() != 0) {
                window.webkitNotifications.requestPermission()
            }
        });
    }
}

function getCurrentQuestions() {
    var result = new Array();
    $('.questionrow>h2>a').each(function(i,e){result.push($(e).attr('href'))});   
    return result;
}

function initReload(timeoutInterval) {    
    function a_reload(){
        window.clearInterval(reloadInterval);
        location.reload();
	}
	reloadInterval = window.setInterval(a_reload, timeoutInterval);
    console.log('Notifications script successfully loaded. Will reload the page in '+ timeoutInterval+' milliseconds');
}

// Start
attachNotificationsButton();
// retrieve questions
var last = localStorage.getItem('lastQuestion');
var currentQuestions = getCurrentQuestions();
//Store last question
localStorage.setItem('lastQuestion',window.JSON.stringify(currentQuestions));

if(last) {
    var lastQuestions = window.JSON.parse(last);
       
    var newQuestions = currentQuestions.filter(function(e){
        return !lastQuestions.some(function(o){return o === e})
    });
    
    if(newQuestions.length !=0) {
        $(newQuestions).each(function(i,e){
        	$('.questionrow>h2>a[href="'+e+'"]').parent().parent().css('background','lightyellow');
        });
        if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
            // function defined in step 2
            window.webkitNotifications.createNotification("https://developer.atlassian.com/download/thumbnails/23691302/answers.png?version=2&modificationDate=1380151380681&api=v2",
                                                          "New Questions Posted", newQuestions.length+ " new questions were posted since last check.").show();
        }
        initReload(120000);
    } else {
    	initReload(20000);    
    }
    
} else {
    initReload(20000);
}
