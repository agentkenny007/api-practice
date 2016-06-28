import $ from 'jquery';
import {gh_token} from "./credentials";

var username = "tonyjsouthern";
var baseURL = "https://api.github.com";

$.ajaxSetup({
  headers: {
    Authorization: `token ${gh_token}`
  }
});

function getRepos (username) {
  $.ajax({
    url: `${baseURL}/users/${username}/repos`,
    // method: "GET",
    dataType: 'json',
    data: {
      type: "owner",
      sort: "updated"
    }
  }).then(function (data) {
    console.log("the repos are", data);
  });
};

function changeEmail (newEmail) {
  $.ajax({
    url: `${baseURL}/user`,
    method: "PATCH",
    data: JSON.stringify({
      email: newEmail
    })
  }).then(function (data) {
    console.log("updated user", data);
  });
};

changeEmail("brit@kingcons.io");

// var requestWithParams = $.ajax({
//   url: baseURL + 'user/repos',
//   data: {
//     access_token: gh_token
//   }
// });
