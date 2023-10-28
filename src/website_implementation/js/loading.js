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

// UserComment API Documentation
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";

// Fetch and display comments
function fetchComments() {
  const getCommentsURL = `${baseURL}?website_code=example123`;

  fetch(getCommentsURL, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    const commentsDiv = document.getElementById('comments-section');
    commentsDiv.innerHTML = ''; // Clear previous comments
    data.forEach(comment => {
      commentsDiv.innerHTML += `<p><strong>${comment.username}</strong>: ${comment.comment}</p>`;
    });
  });
}

// Post a comment
document.getElementById('comment-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;

  const postCommentBody = JSON.stringify({
    username: username,
    comment: comment,
    website_code: "example123",
  });

  fetch(baseURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: postCommentBody
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    fetchComments(); // Refresh the comments after adding a new one
  });
});

// Fetch comments when the page loads
window.onload = fetchComments;


// API Generic Events
function fetchEvents() {
  const my_website_code = 'Pete_123';
  const queryParams = {
    website_code: my_website_code,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = baseURL + "?" + queryString;

  fetch(urlWithParams, {
    method: 'GET',
    redirect: 'follow'
  })
  .then(response => response.json())
  .then(data => {
    // Display events (this is a basic display, you can format it better)
    const eventContainer = document.createElement('div');
    data.forEach(event => {
      eventContainer.innerHTML += `
        <h3>${event.event_name}</h3>
        <p>${event.description}</p>
        <img src="${event.genericevent_photo}" alt="${event.event_name}">
        <hr>
      `;
    });
    document.body.appendChild(eventContainer);
  })
  .catch(error => {
    console.log('Error:', error);
    alert('Error fetching events.');
  });
}

// Fetch events when the page loads
window.onload = fetchEvents;

