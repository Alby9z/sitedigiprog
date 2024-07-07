function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
function acceptAllCookies() {
  setCookie("cookies_accepted", "true", 365);
  setCookie("preferences_accepted", "true", 365);
  setCookie("analytics_accepted", "true", 365);
  document.getElementById("cookie-banner").style.display = "none";
  alert("Tous les cookies acceptés.");
}
function declineAllCookies() {
  eraseCookie("cookies_accepted");
  eraseCookie("preferences_accepted");
  eraseCookie("analytics_accepted");
  document.getElementById("cookie-banner").style.display = "none";
  alert("Tous les cookies refusés.");
}
function managePreferences() {
  document.getElementById("cookie-preferences-modal").style.display = "block";
}
function closePreferences() {
  document.getElementById("cookie-preferences-modal").style.display = "none";
}
function savePreferences() {
  var preferencesAccepted = document.getElementById(
    "preferences-cookies"
  ).checked;
  var analyticsAccepted = document.getElementById("analytics-cookies").checked;

  setCookie("preferences_accepted", preferencesAccepted.toString(), 365);
  setCookie("analytics_accepted", analyticsAccepted.toString(), 365);

  document.getElementById("cookie-preferences-modal").style.display = "none";
  document.getElementById("cookie-banner").style.display = "none";
  alert("Vos préférences ont été enregistrées.");
}
window.onloa;
