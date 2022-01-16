---
title: Como usar o decorator @Attribute em Angular
description: Aprenda como usar o decorator @Attribute em Angular e sua diferença em relação ao @Input
tags: [Angular]
---

O _decorator_ [`@Attribute`][2] permite passar dados de um componente pai para um componente filho de forma bem parecida com como é feito com o decorator [`@Input`][1].

Mas `@Attribute` é bastante limitado em comparação com `@Input` já que ele permite apenas `string` estática.

## Como usar

Primeiro, você deve decorar um parâmetro do _constructor_.

No código abaixo eu usei a palavra-chave `readonly` apenas por questão de preferência, seu parâmetro não precisa ser "read-only" e você pode usar qualquer modificador de acesso que quiser.

```ts
@Component({
  selector: "app-hello",
  template: `{{ parameter }}`,
})
export class HelloComponent {
  constructor(@Attribute("message") readonly parameter: string) {}
}
```

Então você pode passar uma simples `string` estática como se fosse um atributo HTML normal. Note que o nome do atributo deve ser igual ao argumento passado para `@Attribute`.

```ts
@Component({
  selector: "app-root",
  template: `<app-hello message="Hello"></app-hello>`,
})
export class AppComponent {}
```

## Como NÃO usar

Você não pode usar _data binding_ com `@Attribute`. O código abaixo mostra 4 formas **ERRADAS** de usar este decorator.

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

## Considerações finais

Embora o decorator `@Input` seja mais flexível, algumas vezes uma simples `string` estática pode ser mais adequada. Nestas ocasiões o decorator `@Attribute` pode ser bastante útil.

Eu espero que este artigo tenha sido útil.

[1]: https://angular.io/api/core/Input
[2]: https://angular.io/api/core/Attribute
[3]: /how-to-use-attribute-decorator-in-angular/
