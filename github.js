const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");


getUser("fabpot");
getUser(APIURL);

async function getUser(username){
const resp = await fetch (APIURL + username);
const respData =  await resp.json();


createUser(respData);
getRepos(username);
}

async function getRepos(username){
    const resp = await fetch (APIURL + username + "/repos");
    const respData =  await resp.json();
    addReposTocard(respData);

    console.log(addReposTocard(respData));
}

function createUser(user){
    cardHTML =
    `
    <div class="card">
    <div class="image-container">
        <img class="avatar" src="${user.avatar_url}" 
        alt="${user.name}">
    </div>
    <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>followers</strong></li>
          
            <li>${user.following}<strong>following</strong></li>
           
            <li>${user.public_repos}<strong>Repos</strong></li>
           
            </ul>
      <div id="repos"></div>
</div>

</div>
    `;
    main.innerHTML = cardHTML;
}

function addReposTocard(repos){
    const reposEL = document.getElementById("repos");
    console.log(repos);

    repos
     .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0,9).forEach((repo) => {
        const repoEL = document.createElement("a");
        repoEL.classList.add("repo");
        repoEL.href = repo.html_url;
        repo.target = "_blank";
        repoEL.innerHTML = repo.name;
        

        reposEL.appendChild(repoEL);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;
   if(user){
       getUser(user);

       search.value = "";
   }
});