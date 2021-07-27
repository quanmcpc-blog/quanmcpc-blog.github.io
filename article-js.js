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
})()