// ==UserScript==
// @name       Answers notifications
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://answers.atlassian.com/
// @copyright  2012+, You
// ==/UserScript==


function generateQuestions(questions) {
    var opt = {
        type: "list",
        title: "Atlassian Answers",
        message: "New questions were posted",
        iconUrl: "https://answers.atlassian.com/m/atlassian/media/images/favicon.ico",
        items: new Array()
      }
    var questionString = "";
    $(questions).each(function(i,e){
        var q = {
            "question": $(e).text(), 
            "body": $(e).attr('title'),
            "href": $(e).attr('href')
        };
        
        var item = { title: q.question, message: q.body };
        opt.items.push(item);
        questionString+="   " + q.question;
    	
    });
    return opt;
}

function attachNotificationsButton() {
	$('#askaquestion').parent().append('<li><a id="enableNotifications" class="aui-button aui-button-primary aui-style" href="/questions/ask/" id="enableNotifications">Enable Notifications</a></li');
    $('#enableNotifications').click(function(){
        if (window.webkitNotifications.checkPermission() != 0) {
			window.webkitNotifications.requestPermission()
        }
    });
}
// Start
attachNotificationsButton();
// retrieve questions
var last = localStorage.getItem('lastQuestion');
if(last) {
  console.log(last);
  var current = $('.questionrow>h2>a').first().attr('href');
    if(last != current) {
    	//get new questions
        var newQuestions = $('.questionrow>h2>a[href="'+last+'"]').parent().parent().prevAll().children('h2').children('a');
        $('.questionrow>h2>a[href="'+last+'"]').parent().parent().prevAll().css('background','lightyellow');
        var opt = generateQuestions(newQuestions);
        
        if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
            // function defined in step 2
            window.webkitNotifications.createNotification("https://developer.atlassian.com/download/thumbnails/23691302/answers.png?version=2&modificationDate=1380151380681&api=v2",
                                                          "New Questions Posted",opt.items.length+ "new questions were posted since last check.").show();
        }
    }
}

//Store last question
localStorage.setItem('lastQuestion', $('.questionrow>h2>a').first().attr('href'));
function a_reload(){
    window.clearInterval(reloadInterval);
    location.reload();
}
reloadInterval = window.setInterval(a_reload,20000);
