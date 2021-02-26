---
title: How to use @Attribute decorator in Angular
description: Learn how to use the @Attribute decorator in Angular and its difference from @Input
slug: how-to-use-attribute-decorator-in-angular
tags: [Angular]
---

The [`@Attribute`][2] decorator allows passing data from a parent to a child component in a way very similar to the [`@Input`][1] decorator.

But `@Attribute` is very limited in comparison to `@Input` as it only allows passing simple static `string` data.

## How to use

First, you must decorate a constructor parameter.

In the code below I used the `readonly` keyword just as a preference matter, your parameter doesn’t need to be read-only and you can use any access modifier you want.

```ts
@Component({
  selector: "app-hello",
  template: `{{ parameter }}`,
})
export class HelloComponent {
  constructor(@Attribute("message") readonly parameter: string) {}
}
```

So you can pass a static string as a normal HTML attribute. Note that the attribute name must be the same as the argument passed to `@Attribute`.

```ts
@Component({
  selector: "app-root",
  template: `<app-hello message="Hello"></app-hello>`,
})
export class AppComponent {}
```

## How DO NOT use

You cannot use data binding with `@Attribute`. The code below shows four **WRONG** ways to use this decorator.

```ts
@Component({
  selector: "app-root",
  template: `
    <app-hello [attr.message]="'Hello'"></app-hello>
    <app-hello [message]="'Hello'"></app-hello>
    <app-hello message="{{ hello }}"></app-hello>
    <app-hello [message]="hello"></app-hello>
  `,
})
export class AppComponent {
  hello = "World";
}
```

## Final thoughts

Although the `@Input` decorator is more flexible, sometimes a simple static string may be more suitable. In these times the `@Attribute` decorator may be very useful.

I hope this article was helpful.

[1]: https://angular.io/api/core/Input
[2]: https://angular.io/api/core/Attribute
[3]: /como-usar-decorator-attribute-em-angular/
