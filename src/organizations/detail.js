import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Router, Factory.of(ApiService))
export class Detail {
    constructor(router, apiService) {
        this.router = router
        this.organizationService = apiService("organization")
        this.organization = {}
    }

    activate(params, route) {
        return this.organizationService.getById(params.id)
            .then((org) => {
                this.organization = org
                Object.assign(route.navModel, { title: org.name })
            })
    }

    delete() {
        this.organizationService.delete(this.organization.id)
            .then(() =>
                this.router.navigateToRoute("organizations"))
    }
}
