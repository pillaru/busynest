import { bindable, bindingMode, inject, NewInstance } from "aurelia-framework"
import { ValidationRules, ValidationController } from "aurelia-validation"
import { Organization } from "../organization-model"

@inject(Element, NewInstance.of(ValidationController))
export class CreateOrgFormCustomElement {
    element = null
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    organization = new Organization()
    controller = null

    constructor(element, controller) {
        this.element = element
        this.controller = controller

        ValidationRules.ensure("name").required()
            .on(this.organization)
    }

    async createOrg() {
        const result = await this.controller.validate()
        if (result.valid) {
            const event = new CustomEvent("submit", {
                bubbles: false,
            })
            this.element.dispatchEvent(event)
        }
    }
}
