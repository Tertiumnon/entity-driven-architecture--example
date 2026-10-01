# Архитектура на основе сущностей (Entity Driven Architecture)

Entity Driven Architecture — это способ сделать ваш проект простым и расширяемым.

## Основные правила

Прежде всего, очень важно использовать принципы KISS, SOLID и Clean Architecture.

А затем вам нужно понять, что такое Сущность (Entity).

### Сущность (Entity)

Сущность — это базовая единица, существующая в виде модели.

Сущность (entity) - это объект (структура данных), имеющий характеризующие его свойства.

Понимание сущности даёт нам понимание процессов и того, как написать наиболее простой и понятный код.

Например, мы можем сказать, что есть сущность `User`, имеющая свойства `email` и `name`.

```ts
User
  email
  name
```

User, Post, Comment и другие - это всё базовые сущности, "кирпичики", из которых состоит система.

По сути, сущность - это базовое понятие ООП - абстракция данных, которая нужна для того, чтобы мы могли лучше понять, как работать с имеющимся набором данных.

Сущность - это также Модель данных, которая может/должна соответствовать таблице в базе данных.

Например, в случае с User - это должна быть таблица в БД на стороне сервера. Однако, есть и другие кейсы. Например, сущность LocalStorage для браузера - это тоже сущность, но она не будет иметь своей таблицы в БД на сервере.

```ts
class LocalStorageService {
  setItem() {}
  getItem() {}
}
```

## Другие правила

- Нет вложенных компонентов
- Правильное именование
- Компонентный стиль

### Нет вложенных папок/компонентов/и т.д.

Вы должны использовать 3 уровня.

```text
# ПЛОХО
entities/              -> 1-й уровень
  user.interface.ts    -> 2-й уровень
```

```text
# ХОРОШО
entities/              -> 1-й уровень
  user/                -> 2-й уровень
    user.interface.ts  -> 3-й уровень
```

То же самое для URL, но по возможности меньше.

```text
# ХОРОШО
/users                       -> 1-й уровень
/users/{{id}}                -> 2-й уровень
/profile/settings            -> 2-й уровень
/profile/email/confirmation  -> 3-й уровень
```

### Компонентный стиль

Вы должны разместить все файлы сущности в одной директории, включая тесты. Так вы сможете разделить ваше приложение на части, которые можно перемещать или удалять без проблем.

```text
entities/
  user/
    user.interface.ts
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
```

## Структура файлов

```text
core          -> Классы и интерфейсы первого уровня (абстрактные) (SOLID)
components    -> Компоненты, которые можно переиспользовать (DRY)
entities      -> Классы и интерфейсы для сущностей
pages         -> Компоненты для представлений
```

### Пример

```text
core/
  local-storage/
    local-storage.service.ts
    local-storage.service.spec.ts
components/
  navbar/
    navbar.component.ts
    navbar.component.spec.ts
    navbar.css
    navbar.service.ts
    navbar.service.spec.jts
    navbar.mockup.ts
    navbar.constant.ts
  header/
    header.component.ts
    header.component.spec.ts
    header.css
    header.service.ts
    header.service.spec.jts
    header.mockup.ts
    header.constant.ts
entities/
  user/
    user.interface.ts
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
pages/
  home/                       -> "/"
    home.component.ts
    home.component.spec.ts
    home.css
    home.service.ts
    home.service.spec.ts
    home.mockup.ts
    home.constant.ts
  users/                       -> "/users"
    users.component.ts
    users.component.spec.ts
    users.css
    users.service.ts
    users.service.spec.ts
    users.mockup.ts
    users.constant.ts
  user/                        -> "/users/{{id}}"
    user.component.ts
    user.component.spec.ts
    user.css
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
```

## Методы "find"

Если мы не можем найти что-то, а тип возвращаемого значения — примитив, мы должны вернуть примитив того же типа.

Например, базовые методы JS:

```ts
"car".search("a"); // 1
"car".search("c"); // 0
"car".search("d"); // -1
```

Или, может быть:

```ts
function getUserLastName(user: User): string {}
```

Если мы не можем найти что-то, а тип возвращаемого значения — объект, мы должны вернуть `null`.

```ts
function findUser(filters: Filter[]): User | null {}
```

Если вы работаете с JS, вы можете использовать значение `undefined`. Но когда вы получаете данные из API, вы не можете получить `undefined`. Поэтому вы получите значение `null`. Вот почему я считаю, что значение `null` предпочтительнее.

```ts
function findUser(filters: Filter[]): User | null {}
```

И последний случай — массив. Если вы не можете найти, вы получите пустой массив.

```ts
function findUsers(filters: Filter[]): User[] {}
```

### Если вы хотите вернуть массив сущностей

```ts
function getUsers(filters: Filter[]): User[] {}
```

### Бросание ошибок в методах

Как вы думаете, эти методы корректны?

```ts
// если мы знаем, что первый ID — это 0
function getUserIdByName(name: string): number {
  return userList.find(user => user.name === name)?.id || -1;
}

function getUserNameById(id: number): string {
  return userList.find(user => user.id === id)?.name || "";
}
```

Давайте создадим более корректные методы!

```ts
function findUserIdByName(name: string): number {
  const user = userList.find(user => user.name === name);
  if (!user) throw new Error(`Пользователь с именем ${name} не найден.`);
  return user.id;
}

function findUserNameById(id: number): string {
  const user = userList.find(user => user.id === id);
  if (!user) throw new Error(`Пользователь с id ${id} не найден.`);
  return user.name;
}
```

Это правильно? Не думаю.

## Метод как часть класса

Если метод является частью класса, то в целях сокращения лучше сократить названия методов, исходя из того, что нам уже известна сущность и нам не нужно повторяться.

```ts
class UserService {
  find(): User[] {}
}
```

## Классы и методы API

### Типичный CRUD-сервис

```ts
// ХОРОШО
class UserService {
  find(filters: Filter[]): User[] {} // найти всех пользователей (используя параметры/фильтры или без них)
  create(dto: UserCreateDto): User {} // создать пользователя
  get(id: string): User {} // получить пользователя по ID или GUID
  update(id: string, dto: UserUpdateDto): User {} // обновить пользователя
  delete(id: string): boolean {} // удалить пользователя
}

// НЕ ОЧЕНЬ ХОРОШО
class UserService {
  findAll(filters: Filter[]): User[] {} // найти всех пользователей (используя параметры/фильтры или без них)
  findUnique(filters: Filter[]): User {} // найти уникального пользователя (используя параметры/фильтры)
  create(dto: UserCreateDto): User {} // создать пользователя
  get(id: string): User {} // получить пользователя по ID или GUID
  update(id: string, dto: UserUpdateDto): User {} // обновить пользователя
  delete(id: string): boolean {} // удалить пользователя
}

// ПЛОХО, потому что это сложно
class UserService {
  findAll(filters: Filter[]): User[] {} // найти всех пользователей (используя параметры/фильтры или без них)
  findUnique(filters: Filter[]): User {} // найти уникального пользователя (используя параметры/фильтры)
  search(query: string): User[] {} // найти уникального пользователя (используя параметры/фильтры)
  create(dto: UserCreateDto): User {} // создать пользователя
  get(id: string): User {} // получить пользователя по ID или GUID
  update(id: string, dto: UserUpdateDto): User {} // обновить пользователя
  delete(id: string): boolean {} // удалить пользователя
}
```

В случае, когда мы используем специальное слово "find", мы понимаем, что хотим найти что-то, но не знаем результат. Если мы не получаем его, мы должны ожидать пустой массив `[]` для "findAll" и `null` — для методов "find".

В случае, когда мы используем специальное слово "get", мы понимаем, что хотим получить существующий объект с уникальным идентификатором. Если мы не получаем его, мы должны ожидать ошибку.

Методы `create`, `get`, `update` и `delete` — это типичные методы для операций CRUD. Каждый раз, когда мы используем эти методы, мы всегда используем ID существующего объекта (кроме `create`), поэтому нам не нужно дублировать "ByID" в этих методах.

Если класс является утилитарным, то лучше конкретизировать методы, так как они могут быть самые разнообразные.

```ts
class UserUtility {
  findAllFriends() {}
}
```

### Вложенные методы

Не создавайте вложенные методы с одним вложенным методом внутри — это чрезмерно сложно для понимания.

```ts
function getUsers() {
  return UserService.getAll();
}
```

К сожалению, иногда нам нужно использовать вложенные методы в случаях, когда вложенный метод является приватным.

```ts
class SomeComponent {
  construction(private userService: UserService) {}

  public getUsers() {
    return this.userService.getAll();
  }
}
```
