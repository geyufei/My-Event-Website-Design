 // Display the loading animation initially
 document.getElementById("loading-spinner").style.display = "block";

 // After a delay, hide the loading animation and show the content with a fade-in effect
 setTimeout(function () {
   var content = document.getElementById("login-form");
   content.style.display = "block";
   content.style.opacity = 0;
   var fadeInInterval = setInterval(function () {
     content.style.opacity = parseFloat(content.style.opacity) + 0.1;
     if (parseFloat(content.style.opacity) >= 1) {
       clearInterval(fadeInInterval);
     }
   }, 100); // Adjust the interval duration as needed
   document.getElementById("loading-spinner").style.display = "none";
 }, 500); // Adjust the delay (in milliseconds) as needed 