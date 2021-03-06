import { App } from "./app"

class RouterStub {
    constructor() {
        this.options = {}
    }

    map(routes) {
        this.routes = routes
    }

    mapUnknownRoutes(route) {
        this.unKnownRoute = route
    }

    addAuthorizeStep() {} // eslint-disable-line class-methods-use-this
}

describe("the App module", () => {
    let sut
    let mockedRouter

    beforeEach(() => {
        mockedRouter = new RouterStub()
        sut = new App()
        sut.configureRouter(mockedRouter, mockedRouter)
    })

    it("contains a router property", () => {
        expect(sut.router).toBeDefined()
    })

    it("configures the router title", () => {
        expect(sut.router.title).toEqual("Busy Nest")
    })

    it("should have a home route", () => {
        expect(sut.router.routes).toContainEqual({
            route: ["", "home"],
            name: "home",
            title: "Home",
            moduleId: "home/index",
        })
    })

    it("should have a not-found route", () => {
        expect(sut.router.unKnownRoute).toEqual("not-found")
    })
})
