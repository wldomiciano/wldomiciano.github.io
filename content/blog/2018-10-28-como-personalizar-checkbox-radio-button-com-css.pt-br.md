---
title: Como criar checkbox e radio buttons personalizados com CSS
description: Como criar elementos de formulários mais interessantes apenas com CSS
tags: [CSS]
---

Quando criando formulários, é fácil personalizar caixas de texto e botões, mas é necessário algum trabalho adicional para fazer o mesmo com checkboxes e radio buttons.

Neste artigo, mostro o passo-a-passo para a personalização da checkbox e, ao final, apresento o código pronto juntamente com um exemplo usando radio button.

## Primeiros passos

O segredo para começar está na interação entre o elemento `<input>` e o elemento `<label>` associado a ele.

```html
<input id="teste" type="checkbox" />
<label for="teste">Testando checkbox</label>
```

Eis o resultado do código acima:

<p>
<input id="teste" type="checkbox">
<label for="teste">Testando checkbox</label>
</p>

Perceba que o valor do atributo `for` do `<label>` é igual ao `id` do `<input>`, é desse jeito que associamos os dois elementos.

O resultado disso, além das implicações na acessibilidade, é que não é necessário clicar diretamente em cima da checkbox para ativá-la, basta clicar no label associado a ela.

Desta forma, precisamos apenas esconder o `<input>` e definir estilos básicos pro nosso `<label>`.

```css
input[type="checkbox"] {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

input[type="checkbox"] + label {
  position: relative;
  cursor: pointer;
  padding-left: 30px;
}
```

Perceba que usamos o seletor + ([Next-sibling combinator](https://www.w3.org/TR/selectors-3/#adjacent-sibling-combinators)) e o [Attribute Selector](https://www.w3.org/TR/selectors-3/#attribute-selectors), pois queremos selecionar apenas elementos `<label>` que sucedem um `<input>` do tipo **checkbox**.

Assim ficamos livres para criar nossa própria checkbox usando os pseudo-elementos `::before` e `::after`.

## Criando a checkbox

A caixa será representada pelo `::before`.

```css
input[type="checkbox"] + label::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  bottom: 0;
  border: solid 2px;
  vertical-align: bottom;
}
```

O check será o `::after`. Aqui o truque é o uso do pseudo-seletor `:checked`.

```css
input[type="checkbox"]:checked + label::after {
  content: "";
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 10px;
  height: 20px;
  border-right: solid 3px green;
  border-bottom: solid 3px green;
  transform: rotate(45deg);
}
```

Basicamente, aqui estamos dizendo "Aplique o seguinte estilo à todo `label::after` que precede um input checado". Ou seja, o estilo é aplicado apenas quando a checkbox estiver marcada.

O resultado final você confere no Pen abaixo.

<p data-height="265" data-theme-id="0" data-slug-hash="PyLLRL" data-default-tab="css,result" data-user="wldomiciano" data-pen-title="Checkbox e Radio Button Personalizados" class="codepen">See the Pen <a href="https://codepen.io/wldomiciano/pen/PyLLRL/">Checkbox e Radio Button Personalizados</a> by Wellington Domiciano (<a href="https://codepen.io/wldomiciano">@wldomiciano</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
