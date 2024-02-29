window.onload = function() {
    var form = document.getElementById("myForm");

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var search = document.getElementById("search").value;
        var originalName = search.split('').join('');
        
        fetch("https://api.github.com/users/" + originalName)
            .then((result) => result.json())
            .then((data) => {
                console.log(data);

                // Check if avatar_url exists and is not null
                if (data.avatar_url && data.avatar_url !== 'null') {
                    document.getElementById("result").innerHTML = `
                        <a target="_blank" href="${data.html_url}"> 
                            <img src="${data.avatar_url}" alt="GitHub Avatar" />
                        </a>
                    `;
                } else {
                    // If avatar_url is not available, display a message
                    document.getElementById("result").innerHTML = `
                        <p>No avatar found for user ${originalName}</p>
                    `;
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    });
};

