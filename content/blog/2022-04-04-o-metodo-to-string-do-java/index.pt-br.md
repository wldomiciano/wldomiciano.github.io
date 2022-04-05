---
title: O método toString do Java
description: Aprenda como sobrescrever o método toString em Java
tags: [Java]
---

Criou uma classe maneira e na hora de mostrar o resultado com `print()` viu uns números estranhos?

```java
class User {
  private String name;
  private int age;

  User(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

public class Main {
  public static void main(String... args) {
    User user = new User("João", 29);

    System.out.println(user); // Apenas um ex.: User@1a2b3c
  }
}
```

Não se preocupe, a sua classe está apenas usando o método `toString()` implementado na classe `Object`.

Nesta implementação é usado o nome da classe seguindo pelo símbolo @ e finalizando com o hashcode do objeto (mas em hexadecimal).

Dá para atestar isso com o código abaixo.

```java
class User {
  private String name;
  private int age;

  User(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

public class Main {
  public static void main(String... args) {
    User user = new User("João", 29);

    String className = user.getClass().getName();
    int hashCode = user.hashCode();
    String myToString = className + '@' + Integer.toHexString(hashCode);

    System.out.println(user.toString().equals(myToString)); // true
  }
}
```

Ou olhando [a documentação](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#toString()>).

Ou olhando [o código fonte](https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/lang/Object.java#L255).

Porém, somos livres para sobrescrever este método e deixar do jeito que quisermos.

```java
class User {
  private String name;
  private int age;

  User(String name, int age) {
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return "User[name=" + name + ", age=" + age + "]";
  }
}
```

O jeito mostrado no exemplo acima é parecido com o que algumas IDEs geram automaticamente. Mas, na minha opinião, há formas mais elegantes de obter o mesmo resultado, veja:

```java
@Override
public String toString() {
  return String.format("User[name=%s, age=%d]", name, age);
}
```

Ou, com Java 17 ou mais recente:

```java
@Override
public String toString() {
  return "User[name=%s, age=%d]".formatted(name, age);
}
```

O que achou? Não ficou muito mais fácil de ler?

Arrays também usam a implementação padrão e uma das opções mais simples que temos para mostrar o seu conteúdo é com o método [`Arrays.toString()`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html#toString(int%5B%5D)>), veja:

```java
import java.util.Arrays;

public class Main {
  public static void main(String... args) {
    int[] numbers = { 1, 2, 3 };

    System.out.println(Arrays.toString(numbers)); // [1, 2, 3]
  }
}
```

Se for uma array de arrays, `toString()` não é o bastante. Precisamos do [`deepToString()`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html#deepToString(java.lang.Object%5B%5D)>):

```java
import java.util.Arrays;

public class Main {
  public static void main(String... args) {
    int[][] numbers = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };

    System.out.println(Arrays.deepToString(numbers)); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  }
}
```

Agora estamos prontos para deixarmos os nossos objetos mais apresentáveis!
