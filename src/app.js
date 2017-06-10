import { AuthenticateStep } from "aurelia-authentication"
import routes from "./routes"

export default class App {

    configureRouter(config, router) {
        this.router = router

        Object.assign(config, { title: "Bizhub" })
        Object.assign(config.options, { pushState: true, root: "/" })

        config.addPipelineStep("authorize", AuthenticateStep)

        config.map(routes)

        config.mapUnknownRoutes("not-found")
    }
}
