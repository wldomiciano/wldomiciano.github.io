---
title: A classe Boolean do Java
description: Aprenda como trabalhar com a classe Boolean em Java
tags: [Java]
---

A partir do Java 9 os construtores da classe [`Boolean`][boolean] tornaram-se
obsoletos e quando queremos usar instâncias de `Boolean` usamos as constantes
[`Boolean.TRUE`][true] ou [`Boolean.FALSE`][false].

Podemos obter uma destas constantes a partir de um primitivo usando o método
[`Boolean.valueOf()`][valueof].

```java
System.out.println(Boolean.valueOf(true) == Boolean.TRUE); // true
System.out.println(Boolean.valueOf(false) == Boolean.FALSE); // true
```

Este método também aceita uma `String` que, se for igual a palavra **true**
ignorando se as letras são maiúsculas ou minúsculas, o resultado será igual a
`Boolean.TRUE`, caso contrário será `Boolean.FALSE`.

```java
System.out.println(Boolean.valueOf("true") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("TRUE") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("TrUe") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("false") == Boolean.FALSE); // true
System.out.println(Boolean.valueOf("") == Boolean.FALSE); // true
System.out.println(Boolean.valueOf(null) == Boolean.FALSE); // true
```

O método [`Boolean.parseBoolean()`][parseboolean] também aceita uma `String` e
funciona da mesma forma, mas retorna um primitivo ao invés de um objeto.

## Uso em expressões

Podemos usar um `Boolean` diretamente em locais em que expressões booleanas são
esperadas, como nas condições do `if` ou do `while`.

```java
Boolean value = Boolean.TRUE;

if (value) {
  // ...
}

while (value) {
  // ...
}
```

Mas fique atento, pois como um `Boolean` pode ser `null`, uma
`NullPointerException` pode ser lançada.

```java
Boolean value = null;

if (value) { // vai lançar NullPointerException
  // ...
}
```

## Outros métodos estáticos legais

O método [`Boolean.logicalAnd()`][logicaland] é equivalente ao uso do operador
`&&` e retorna `true` apenas se **ambos** os valores forem `true`.

```java
System.out.println(Boolean.logicalAnd(true, true));   // true
System.out.println(Boolean.logicalAnd(true, false));  // false
System.out.println(Boolean.logicalAnd(false, true));  // false
System.out.println(Boolean.logicalAnd(false, false)); // false
```

O método [`Boolean.logicalOr()`][logicalor] é equivalente ao uso do operador
`||` e retorna `true` se **pelo menos um** dos valores forem `true`.

```java
System.out.println(Boolean.logicalOr(true, true));   // true
System.out.println(Boolean.logicalOr(true, false));  // true
System.out.println(Boolean.logicalOr(false, true));  // true
System.out.println(Boolean.logicalOr(false, false)); // false
```

O método [`Boolean.logicalXor()`][logicalxor] é equivalente ao uso do operador
`^` e retorna `true` apenas se **um** dos valores forem `true`.

```java
System.out.println(Boolean.logicalXor(true, true));   // false
System.out.println(Boolean.logicalXor(true, false));  // true
System.out.println(Boolean.logicalXor(false, true));  // true
System.out.println(Boolean.logicalXor(false, false)); // false
```

O método [`Boolean.getBoolean()`][getboolean] é usado para retornar uma
_System Property_ como um primitivo `boolean` seguindo as mesmas regras do
método `Boolean.parseBoolean()`.

É possível passar para o programa System Properties arbitrárias usando a opção
`-D` na hora de executar.

```java
// Compile e execute com o comando abaixo.
// java -Daaa=true -Dbbb=false Program
public class Program {
  public static void main(String... args) {
    System.out.println(Boolean.getBoolean("aaa")); // true
    System.out.println(Boolean.getBoolean("bbb")); // false
  }
}
```

[boolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html
[true]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#TRUE
[false]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#FALSE
[valueof]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#valueOf(boolean)
[parseboolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#parseBoolean(java.lang.String)
[logicaland]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalAnd(boolean,boolean)
[logicalor]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalOr(boolean,boolean)
[logicalxor]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalXor(boolean,boolean)
[getboolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#getBoolean(java.lang.String)
