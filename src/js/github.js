import $ from 'jquery';
import {gh_token} from "./credentials";

var baseURL = "https://api.github.com";

$.ajaxSetup({
  headers: {
    Authorization: `token ${gh_token}`
  },
  dataType: 'json'
});

function listTeams (org) {
  return $.ajax({
    url: `${baseURL}/orgs/${org}/teams`
  });
};

function listTeamMembers (id) {
  return $.ajax({
    url: `${baseURL}/teams/${id}/members`
  });
};

function createIssue (owner, repo, title, body, assignee) {
  return $.ajax({
    url: `${baseURL}/repos/${owner}/${repo}/issues`,
    method: "POST",
    data: JSON.stringify({
      title: title,
      body: body,
      assignee: assignee
    })
  });
};

export {listTeams, listTeamMembers, createIssue};
