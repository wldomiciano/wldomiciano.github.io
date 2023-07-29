---
title: Métodos obsoletos da HttpSecurity no Spring Security 6.1
description:
  Alguns métodos da HttpSecurity tornaram-se obsoletos no Spring Security 6.1.
  Conheça as alternativas e veja dicas de utilização
tags: [Java, 'Spring Security']
---

No Spring Security 6.1 vários métodos da classe [`HttpSecurity`][http]
tornaram-se obsoletos e isto afeta projetos criados com Spring Boot a partir da
versão 3.1.

Métodos como [`cors()`][cors], [`csrf()`][csrf],
[`authorizeHttpRequests()`][auth], etc... não devem mais ser usados, pois a
expectativa é de que sejam removidos no Spring Security 7.

O que devemos usar atualmente é a versão destes métodos que aceita um
[`Customizer`][custom] como argumento, o que a documentação chama de _Lambda
DSL_.

Então, o que antes seria configurado assim:

```java
http
  .authorizeHttpRequests()
    .requestMatchers("/blog/**").permitAll()
    .anyRequest().authenticated()
    .and()
  .cors()
    .and()
  .csrf()
    .disable()
```

Hoje deve ser feito assim:

```java
import static org.springframework.security.config.Customizer.withDefaults;
// ...
http
  .authorizeHttpRequests(
    customizer -> customizer
      .requestMatchers("/blog/**").permitAll()
      .anyRequest().authenticated()
  )
  .cors(withDefaults())
  .csrf(customizer -> customizer.disable())
```

Este não é um jeito novo, pois está presente desde o Spring Security 5.2, que
saiu em 2019. Apenas o que era opcional, hoje é recomendado e logo será
requerido e uma das justificativas é de que o estilo de configuração antigo é
bastante confuso.

O uso do método estático `withDefaults()` indica que estamos ativando aquela
funcionalidade com suas configurações padrão, mas ele é opcional.

Você poderia usá-lo sem a importação estática.

```java
import org.springframework.security.config.Customizer;
// ...
http
  // ...
  .formLogin(Customizer.withDefaults())
  // ...
```

Ou apenas usando uma expressão lambda com o corpo vazio.

```java
http
  // ...
  .httpBasic(customizer -> {})
  // ...
```

E para desabilitar uma funcionalidade é possível usar _method references_, que
eu, particularmente, acho mais elegante.

```java
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
// ..
http
  // ...
  .csrf(CsrfConfigurer::disable)
  // ...
```

Para mais informações, visite esta página da documentação oficial:

https://docs.spring.io/spring-security/reference/migration-7/configuration.html

Embora eu tenha focado nos métodos da `HttpSecurity`, outras coisas se tornaram
obsoletas nesta versão e a lista completa esta na página abaixo.

https://docs.spring.io/spring-security/site/docs/6.1.2/api/deprecated-list.html#method

---

Vale destacar que para configurar o `HttpSecurity` não é necessário encadear os
métodos como nos exemplos acima. O mesmo resultado pode ser alcançado da
seguinte forma:

```java
http
  .authorizeHttpRequests(
    customizer -> {
      customizer.requestMatchers("/blog/**").permitAll();

      customizer.anyRequest().authenticated();
    }
  );

http.cors(withDefaults());

http.csrf(customizer -> customizer.disable());

// ...

return http.build();
```

Assim, se você estiver com problemas para entender a Lambda DSL, fazer
invocações separadas como acima pode lhe ajudar a entendê-la melhor.

[cors]:
  https://docs.spring.io/spring-security/site/docs/6.1.2/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#cors()
[csrf]:
  https://docs.spring.io/spring-security/site/docs/6.1.2/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#csrf()
[auth]:
  https://docs.spring.io/spring-security/site/docs/6.1.2/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#authorizeHttpRequests()
[http]:
  https://docs.spring.io/spring-security/site/docs/6.1.2/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html
[custom]:
  https://docs.spring.io/spring-security/site/docs/6.1.2/api/org/springframework/security/config/Customizer.html
