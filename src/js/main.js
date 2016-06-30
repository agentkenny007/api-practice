/* Import Script Modules */
import $ from 'jquery'; //
import getDango from './dango';
import {selectTmpl} from "./templates/select";
import {listTeams, listTeamMembers, createIssue} from "./github";

/* Declare Variables */
var fetchTimeout;

/* Declare Functions */
// define a top level callback to display a selectable dropdown menu of teams from the 'github org name' text field.
var addTeamsDropdown = function (event) {
    event.preventDefault();

    var orgName = $(".org-name").val();
    listTeams(orgName).then(function (data) {
        var options = data.map(function (team) {
            return { label: team.name, value: team.id };
        });

        $(".team-selector").html(selectTmpl(options));
    });
};

// define a top level callback to use github's api endpoint to remotely create homework issues
var createHomeworkIssues = function (event) {
    event.preventDefault();

    var teamID = $(".github-team").val();
    listTeamMembers(teamID).then(function (data) {
        var orgName = $(".org-name").val();
        var repo = $(".issue-repo").val();
        var title = $(".issue-title").val();
        var writeup = $(".issue-writeup").val();

        data.forEach(function (member) {
            createIssue(orgName, repo, title, writeup, member.login);
        });
    });
};

// define a top level callback to display emoji, gif, or sticker predictions of the issue's 'mood' from the Dango RRN
var displayMood = function (event) {
    var mood = $('.issue-feels').val();
    getDango(mood).then(function (data) {
        console.log(data);
    });
};

$(document)
/* Register Live Event Handlers for DOM */
    // in order to use github's api endpoint to remotely create homework issues
    .delegate('.hack', 'click', createHomeworkIssues) // when the button element with the class "hack" is clicked.
    // in order to display a selectable dropdown menu of teams from the 'github org name' text field.
    .delegate('.get-teams', 'click', addTeamsDropdown) // when the button element with the class "get-teams" is clicked.
    // in order to display emoji, gif, or sticker predictions of the issue's 'mood' from the Dango RRN
    .delegate('.issue-feels', 'keyup', displayMood); // when the user stops typing a letter in the input field with the class "issue-feels."
