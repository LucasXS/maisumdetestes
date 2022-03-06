(function() {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id = "699ed661fee0252d76cd";
    const client_secret = "ca10a66c051017efb362c349a9db2137132f98f7";
    const count = 10;
    const sort = "";
  
    async function getUser(user) {
      const profileResponse = await fetch(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      );
      const reposResponse = await fetch(
        `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
      );
  
      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
  
      return { profile, repos };
    }
  
    function showProfile(user) {
      profile.innerHTML = `
      <div class="row">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${
                  user.avatar_url
                }" alt="Card image cap">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Repositórios: <span class="badge badge-success float-right">${
                      user.public_repos
                    }</span></li>
                    <li class="list-group-item">Seguidores: <span class="badge badge-primary float-right"> ${
                      user.followers
                    }</span></li>
                    <li class="list-group-item">Seguindo:<span class="badge badge-info float-right">${
                      user.following
                    }</span></li>
                </ul>
                <div class="card-body">
                <a href="${
                  user.html_url
                }" target="_blank" class="btn btn-warning btn-block">Ver Perfil</a>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div id="repos"></div>
        </div>
      </div>
      `;
    }
  
    function showRepos(repos) {
      let output = "";
  
      repos.forEach(repo => {
        output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${
          repo.name
        }</a>
                    </div>
                    <div class="col-md-6 float-right">
                        <span class="badge badge-primary">Stars: ${
                          repo.stargazers_count
                        }</span>
                        <span class="badge badge-secondary">Watch: ${
                          repo.watchers_count
                        }</span>
                        <span class="badge badge-success">Forks: ${
                          repo.forks_count
                        }</span>
                    </div>
                </div>
            </div>
        `;
      });
  
      document.getElementById("repos").innerHTML = output;
    }
  
    search.addEventListener("keyup", e => {
      const user = e.target.value;
  
      if (user.length > 0) {
        getUser(user).then(data => {
          console.log(data);
          if (data.message !== "Not Found") {
            showProfile(data.profile);
            showRepos(data.repos);
          }
        });
      }
    });
  })();