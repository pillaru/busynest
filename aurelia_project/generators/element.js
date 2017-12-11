import { inject } from "aurelia-dependency-injection"
import { Project, ProjectItem, CLIOptions, UI } from "aurelia-cli"

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
    constructor(project, options, ui) {
        this.project = project
        this.options = options
        this.ui = ui
    }

    execute() {
        return this.ui
      .ensureAnswer(this.options.args[0], "What would you like to call the custom element?")
      .then((name) => {
          const fileName = this.project.makeFileName(name)
          const className = this.project.makeClassName(name)

          this.project.elements.add(
          ProjectItem.text(`${fileName}.js`, this.generateJSSource(className)),
          ProjectItem.text(`${fileName}.html`, this.generateHTMLSource(className)),
        )

          return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName}.`))
      })
    }

    generateJSSource(className) {
        return `import {bindable} from 'aurelia-framework';

export class ${className} {
  @bindable value;

  valueChanged(newValue, oldValue) {

  }
}

`
    }

    generateHTMLSource(className) {
        return `<template>
  <h1>\${value}</h1>
</template>`
    }
}
