$(document).ready(() => {
  const element = document.querySelector("form");
  element.addEventListener("submit", sendInfoRequest);
  $.get("/info?fields=phone,email")
    .done(parseData)
    .catch(handleError);
});

function parseData(data) {
  if (data) {
    $("#phone").text(data.phone);
    $("#email").text(data.email);
    $("#email").attr("href", `mailto://${data.email}`);
  }
}

function sendInfoRequest(event) {
  event.preventDefault();
  let request = {
    email: $("#emailInput").val(),
    message: $("#messageInput").val()
  };
  $.post("/requests", request)
    .then(handleSuccess)
    .catch(handleError);
}

function handleSuccess() {
  alert("Request sent!");
}
