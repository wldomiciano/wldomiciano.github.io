---
title: Como agrupar asserts no JUnit
description: Sem julgamentos, veja uma forma melhor de agrupar múltiplos asserts em um mesmo teste
tags: [Java]
---

Pode haver momentos em que precisamos usar múltiplos asserts em um mesmo teste. Independente se você considera certo ou errado, afinal não estamos aqui para julgar, eu gostaria de apresentar uma forma de lidar melhor com estes asserts agrupando-os através do método [`assertAll()`](https://junit.org/junit5/docs/current/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html#assertAll(org.junit.jupiter.api.function.Executable...)).

No código abaixo eu tenho 2 testes, cada um com 2 asserts que falham. No primeiro eu usei asserts individuais enquanto no segundo eu os agrupei.

```java
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;

class AppTest {
  @Test
  void usingIndividualAsserts() {
    fail("Test 1, assert 1");
    fail("Test 1, assert 2");
  }

  @Test
  void usingGroupedAsserts() {
    assertAll(
      () -> fail("Test 2, assert 1"),
      () -> fail("Test 2, assert 2")
    );
  }
}
```

Meu `build.gradle` está assim:

```groovy
plugins {
  id 'java'
}

repositories {
  mavenCentral()
}

dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter-engine:5.8.2'
}

test {
  useJUnitPlatform()

  testLogging {
    showExceptions true
    showCauses false
    showStackTraces false
    exceptionFormat 'FULL'
  }
}
```

E esta é a estrutura do meu projeto de teste:

```
project
├── build.gradle
└── src
    └── test
        └── java
            └── AppTest.java
```

A princípio ambos os testes rodam da mesma forma, porém, veja a saída no console quando eu executo o comando `gradle test`:

```yml
AppTest > usingIndividualAsserts() FAILED
    org.opentest4j.AssertionFailedError: Test 1, assert 1

AppTest > usingGroupedAsserts() FAILED
    org.gradle.internal.exceptions.DefaultMultiCauseException: Multiple Failures (2 failures)
        org.opentest4j.AssertionFailedError: Test 2, assert 1
        org.opentest4j.AssertionFailedError: Test 2, assert 2
```

Veja como no primeiro teste apenas a primeira falha é reportada. Na verdade, ele nem chega a executar o segundo assert, pois o teste é interrompido imediatamente.

Já no segundo teste as 2 falhas são reportadas nos dando a visão completa do que deu errado logo de cara.

Por isso, se vai usar vários asserts num mesmo teste, não deixe de agrupá-los, beleza?
