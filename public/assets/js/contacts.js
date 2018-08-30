$(document).ready(() => {
  const element = document.querySelector("form");
  element.addEventListener("submit", sendInfoRequest);
});

function sendInfoRequest(event) {
  event.preventDefault();
  let request = {
    email: $("#emailInput").val(),
    message: $("#messageInput").val()
  };
  $.post("/requests", request)
    .then(alert("Request sent!"))
    .catch(handleError);
}
