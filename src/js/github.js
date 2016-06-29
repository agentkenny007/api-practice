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

function createIssueComment (settings) {
    return $.ajax({
        url: `${baseURL}/repos/${settings.owner}/${settings.repo}/issues/${settings.number}/comments`,
        method: "POST",
        data: JSON.stringify({
            body: settings.comment
        })
    });
};

function closeIssue (settings) {
    return $.ajax({
        url: `${baseURL}/repos/${settings.owner}/${settings.repo}/issues/${settings.number}`,
        method: "PATCH",
        data: JSON.stringify({ state: "closed" })
    })
};

function createGist (files, settings) {
    var settings = settings || { description: '', public: false };
    return $.ajax({
        url: `${baseURL}/gists`,
        method: "POST",
        data: JSON.stringify({
            files: files,
            description: settings.description,
            public: settings.public
        })
    });
};

export {listTeams, listTeamMembers, createIssue};
