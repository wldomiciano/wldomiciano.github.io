---
title: Como ler e escrever arquivos de texto com Java
description: Aprenda a ler e escrever arquivos de texto com Java
tags: [Java]
---

Neste artigo eu apresento alguns casos de usos simples de leitura e escrita de arquivos de texto com Java.

## Leitura

O código abaixo mostra como retornar todo o conteúdo de um arquivo de texto como uma `String`.

```java
import static java.nio.charset.StandardCharsets.UTF_16;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ReadingAllContent {
  public static void main(String... args) {
    try {
      Path path = Paths.get("text.txt");
      byte[] bytes = Files.readAllBytes(path);
      String content = new String(bytes, UTF_16);
      System.out.println(content);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

Com Java 11 ou mais recente o código fica mais simples usando o método [`Files#readString`][readstring]:

```java
Path path = Path.of("text.txt");
String content = Files.readString(path, UTF_16);
```

Também é possível retornar todas as linhas do arquivo como uma lista de `String` usando o método [`Files#readAllLines`][readalllines].

```java
Path path = Paths.get("text.txt");
List<String> lines = Files.readAllLines(path, UTF_16);
lines.forEach(System.out::println);
```

Os métodos acima carregam todo o conteúdo do arquivo na memória de uma só vez, por isso só devem ser usados quando o arquivo não for tão grande.

Para ler arquivos maiores, linha a linha, podemos usar o método [`Files#lines`][lines] que retorna uma `Stream` que lê as linhas conforme é consumida.

```java
import static java.nio.charset.StandardCharsets.UTF_16;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class ReadingAsStream {
  public static void main(String... args) {
    Path path = Paths.get("text.txt");

    try (Stream<String> stream = Files.lines(path, UTF_16)) {
      stream.forEach(System.out::println);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

A `Stream` retornada precisa ser fechada quando não for mais útil, por isso, no exemplo eu utilizei o [_try-with-resource_][try] que garante seu fechamento.

## Escrita

O código abaixo mostra como escrever uma `String` em um arquivo.

```java
import static java.nio.charset.StandardCharsets.UTF_16;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class WritingString {
  public static void main(String... args) {
    try {
      Path path = Paths.get("text.txt");
      String content = "abc";
      byte[] bytes = content.getBytes(UTF_16);
      Files.write(path, bytes);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

Com Java 11 ou mais recente o código fica mais simples usando o método [`Files#writeString`][writestring].

```java
Path path = Path.of("text.txt");
Files.writeString(path, "abc", UTF_16);
```

O método [`Files#write`][write-list] também aceita uma lista de `String` como argumento.

```java
Path path = Paths.get("text.txt");
List<String> lines = Arrays.asList("a", "b", "c");
Files.write(path, lines, UTF_16);
```

Neste caso, cada `String` da lista será escrita como uma nova linha no arquivo.

## Observação 1: Escolhendo o charset

Nos exemplos acima eu passei o `Charset` [UTF-16][utf16] explicitamente apenas para mostrar que é possível, pois nem sempre é necessário.

O método [`Files#readString`][readstring], por exemplo, poderia ser invocado assim:

```java
Path path = Paths.get("text.txt");
String content = Files.readString(path);
```

Neste caso o charset usado por padrão será o UTF-8 e o mesmo vale para os métodos mostrados abaixo:

```java
Path path = Paths.get("text.txt");

String a = Files.readString(path);

List<String> b = Files.readAllLines(path);

Stream<String> c = Files.lines(path);

Files.writeString(path, "abc");

Files.write(path, Arrays.asList("a", "b", "c"));
```

Já no método [`String#getBytes`][getbytes], se o charset não for passado explicitamente, será usado o charset padrão da sua plataforma. Para obter o charset padrão, você pode usar o método abaixo:

```java
Charset charset = Charset.defaultCharset();
```

Por fim, a classe [`StandardCharsets`][standardcharsets] possui constantes apenas para os charsets que são requeridos por qualquer implementação da plataforma Java. Se você precisar de um charset não definido nesta classe, é possível obter da seguinte forma:

```java
Charset charset = Charset.forName("UTF-32");
```

Se o charset desejado for suportado pela JVM, uma instância de `Charset` será retornada, caso contrário uma exceção será lançada.

## Observação 2: Outras opções

Os métodos de escrita `Files#writeString` e `Files#write` também aceitam opções extras.

Por padrão eles criarão um novo arquivo caso não exista ou sobrescreverão o conteúdo de um arquivo existente, mas é possível mudar este comportamento.

Considere o código abaixo:

```java
import static java.nio.file.StandardOpenOption.APPEND;
import static java.nio.file.StandardOpenOption.CREATE;
import static java.nio.file.StandardOpenOption.CREATE_NEW;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class WritingWithOptions {
  public static void main(String... args) throws IOException {
    byte[] content = "abc".getBytes();

    /* 1 */ Files.write(Paths.get("a.txt"), content, APPEND);
    /* 2 */ Files.write(Paths.get("b.txt"), content, CREATE, APPEND);
    /* 3 */ Files.write(Paths.get("c.txt"), content, CREATE_NEW);
  }
}
```

O **exemplo 1** acrescentará `content` à um arquivo existente e lançará uma exceção caso o arquivo não exista.

O **exemplo 2** é parecido com o primeiro, mas criará um novo arquivo caso não exista ao invés de lançar uma exceção.

Já no **exemplo 3** ele sempre tentará criar um novo arquivo e lançará uma exceção se o arquivo já existir.

Há outras opções disponíveis na classe [`StandardOpenOption`][standardopenoption], consulte a documentação para saber mais.

## Conclusão

Há outras formas de ler e escrever arquivos em Java e compreender os métodos acima é um bom ponto de partida antes de partir para casos mais complexos.

Se encontrar algum erro ou tiver alguma informação adicional, não deixe de usar os comentários.

[try]: https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
[lines]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path,java.nio.charset.Charset)
[utf16]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/charset/StandardCharsets.html#UTF_16
[standardopenoption]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/StandardOpenOption.html

[write-bytes]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#write(java.nio.file.Path,byte[],java.nio.file.OpenOption...)
[write-list]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#write(java.nio.file.Path,java.lang.Iterable,java.nio.charset.Charset,java.nio.file.OpenOption...)
[writestring]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#writeString(java.nio.file.Path,java.lang.CharSequence,java.nio.charset.Charset,java.nio.file.OpenOption...)
[readstring]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#readString(java.nio.file.Path,java.nio.charset.Charset)
[readalllines]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#readAllLines(java.nio.file.Path)
[readallbytes]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/file/Files.html#readAllBytes(java.nio.file.Path)
[getbytes]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/lang/String.html#getBytes()
[standardcharsets]: https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/nio/charset/StandardCharsets.html
