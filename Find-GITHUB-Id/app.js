const form = document.querySelector("#form");
const mainDiv = document.querySelector("#main-div");
const messageDiv = document.querySelector("#message");
const imgTag = mainDiv.querySelector("img");
const name = mainDiv.querySelector("#name");
const repos = mainDiv.querySelector("#repos");
const link = mainDiv.querySelector("#profile-link");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = event.target.children[0].value;
  const API_URI = `https://api.github.com/users/${username}`;

  try {
    const response = await axios.get(API_URI);

    imgTag.src = response.data.avatar_url;
    name.innerText = response.data.name || "No name available";
    repos.innerText = `Public repos: ${response.data.public_repos}`;
    link.href = response.data.html_url;
    link.innerText = "View GitHub Profile";

    messageDiv.innerText = "";
    mainDiv.style.display = "block"; 

  } catch (err) {
    console.log(err.response.data.message);

    messageDiv.innerText = err.response.data.message;
    mainDiv.style.display = "none"; 
  }
});