import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStarLevel]',
  standalone: true
})
export class LevelDirectiveDirective {
  @Input() set appStarLevel(level: number) {
    this.viewContainer.clear();
    for (let i = 0; i < level; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}
}
