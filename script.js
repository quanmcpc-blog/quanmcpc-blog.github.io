//@ts-check
window.onload = () => {
    console.log("fdasfdsafdsa")
    fetch("/article.json")
        .then(e => e.json())
        .then(e => {
            Object.keys(e).forEach(idname => {
                /** @type {{ title: string; preview_text: string; created_on: string; link: string; }} */
                var element = e[idname]
                var section = document.createElement("div");
                section.classList.add("blogitem")
                var title = document.createElement("h2");
                title.innerHTML = element.title;
                var preview = document.createElement("p");
                preview.innerHTML = `${element.preview_text}...`;
                var createdon = document.createElement("p");
                createdon.innerHTML = `Created on: ${element.created_on}`;
                var clickhere = document.createElement("a");
                clickhere.href = `/article.html?id=${idname}`;
                clickhere.innerHTML = "Click here to read";
                section.appendChild(title);
                section.appendChild(preview);
                section.appendChild(clickhere);
                section.appendChild(createdon);
                document.getElementById("bloghere").appendChild(section);
                document.getElementById("loadArticle").style.display = "none";
            })
        })
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
}