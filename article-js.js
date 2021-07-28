(() => {
    if (localStorage.getItem("theme") == null) {
        localStorage.setItem("theme", "0")
    }
    function func1() {
        if (document.getElementById("theme").selectedIndex == 0) {
            document.documentElement.style.setProperty("--bg", "#fff")
            document.documentElement.style.setProperty("--fg", "#000")
        } else {
            document.documentElement.style.setProperty("--bg", "#000")
            document.documentElement.style.setProperty("--fg", "#fff")
        }
    }
    document.getElementById("theme").selectedIndex = parseInt(localStorage.getItem("theme"));
    document.getElementById("theme").onchange = (e) => {
        localStorage.setItem("theme", document.getElementById("theme").selectedIndex);
        func1()
    }
    func1()
    setTimeout(() => {
        document.querySelectorAll("a").forEach((elem) => {
            elem.addEventListener("click", (e) => {
                console.log(e)
                e.preventDefault();
                document.getElementById("loadingOverlay").style.width = "100%";
                setTimeout(() => {
                    window.location.href = elem.href;
                }, 500)
            })
        })
    }, 1000)
    document.getElementById("loadingOverlay").style.transition = "width 0.5s";
    document.getElementById("loadingOverlay").style.width = "0";
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    var blogId = getParameterByName("id");
    fetch("/article.json")
        .then(res => res.json())
        .then(res_json => {
            fetch(res_json[blogId]?.link)
                .then(res => {
                    if (res.status == 200) {
                        res.text().then(res_text => {
                            var converter = new showdown.Converter();
                            var html = converter.makeHtml(res_text);
                            console.log(html)
                            document.getElementById("theActualContent").insertAdjacentHTML("beforeend", html)
                        })
                    } else {
                        document.getElementById("error").style.display = "block";
                        document.getElementById("blogName").innerHTML = blogId;
                    }
                    document.getElementById("loadArticle").remove()
                })
        })
})()