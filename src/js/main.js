import $ from 'jquery';
import {selectTmpl} from "./templates/select";
import {listTeams, listTeamMembers, createIssue} from "./github";

function addTeamsDropdown (event) {
  event.preventDefault();

  var orgName = $(".org-name").val();
  listTeams(orgName).then(function (data) {
    var options = data.map(function (team) {
      return { label: team.name, value: team.id };
    });

    $(".team-selector").html(selectTmpl(options));
  });
};

$(".submit").on("click", addTeamsDropdown);

function createHomeworkIssues (event) {
  event.preventDefault();

  var teamID = $(".github-team").val();
  listTeamMembers(teamID).then(function (data) {
    var title = $(".issue-title").val();
    var writeup = $(".issue-writeup").val();
    var orgName = $(".org-name").val();

    data.forEach(function (member) {
      createIssue(orgName, "assignments", title, writeup, member.login);
    });
  });
};

$(".hack").on("click", createHomeworkIssues);
