const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://instagram.fjdo10-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.90.720.720a/s320x320/54247286_339023136739183_1491741290301274317_n.jpg?_nc_ht=instagram.fjdo10-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=LmhPOxVw5B8AX8-xMkY&oh=7cd90affb0a34dd1ebacae1cc17286a4&oe=5EDACAB6",
        name: "Vinicius Oliveira",
        role: "Desenvolvedor Software",
        description: 'Desenvolvedor front-end, futuro full-stack, focado em melhorias. Veja alguns dos meus <a href="https://www.github.com/ViniciusOliveira18" target="blank">projetos.',
        links: [
            {
                name: "GitHub",
                url: "https://www.github.com/ViniciusOliveira18/"
            },
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/viniciusoliveiira/"
            },
            {
                name: "Twitter",
                url: "https://www.twitter.com/"
            }

        ]
    }

    return res.render("sobre", { about })
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video Not Found")
    }

    return res.render("video", { item: video })
})
server.listen(5000, function () {
    console.log("Server is running");
})
