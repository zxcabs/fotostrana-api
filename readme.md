Fotostrana.ru API
------------------

Это не официальное апи фотостраны. Для работы не требуется получать ключ приложения.

## Тесты

Запуск тестов работы с сервером. Использовать только для проверки работы работоспособности api.
Необходимо иметь работающий аккаунт в фотостране.

Не надо запускать эти тест каждый раз, они лишь для того что бы тестировать правильное взаимодействие api с сервером и быстрым определением того что отвалилось.

````
    fp=<пароль от фотостраны> fu=<логин> make test-server
````

## Документация

Документация генерируется из тестов.

````
	fp=<пароль от фотостраны> fu=<логин> make readme
````

## Методы

# TOC
   - [signup](#signup)
     - [#init()](#signup-init)
     - [#auth()](#signup-auth)
   - [pin](#pin)
     - [#addPhoto()](#pin-addphoto)
     - [#add()](#pin-add)
<a name=""></a>
 
<a name="signup"></a>
# signup
<a name="signup-init"></a>
## #init()
should return infoObject.

```js
return signup
    .init()
    .then(function (initInfo) {
        initInfo.should.have.properties(['csrf', 'cookie']);
        initInfo.csrf.should.not.be.empty.and.be.type('string');
        initInfo.cookie.should.not.be.empty.and.be.type('string');
    });
```

<a name="signup-auth"></a>
## #auth()
should return AuthInfo.

```js
return signup
    .auth(process.env.fu, process.env.fp)
    .then(function (authInfo) {
        authInfo.should.be.an.instanceof(signup.AuthInfo);
    });
```

<a name="pin"></a>
# pin
<a name="pin-addphoto"></a>
## #addPhoto()
should load photo from local path.

```js
return authPromise.then(function (authInfo) {
    return pin.addPhoto({
            query: {
                toAlbum: 1,
                from: 'usernews'
            },
            field: {
                token: 0,
                ownerType: 2,
                from: 'community.profile'
            },
            photo: __dirname + '/cat.jpg'
        }, authInfo)
        .then(function (photo) {
            photo.id.should.be.type('number');
        });
});
```

should load photo from url.

```js
return authPromise.then(function (authInfo) {
    return pin.addPhoto({
            query: {
                toAlbum: 1,
                from: 'usernews'
            },
            field: {
                token: 0,
                ownerType: 2,
                from: 'community.profile'
            },
            photo: 'http://img0.joyreactor.cc/pics/post/full/%D0%BA%D0%BE%D1%82%D0%B8%D0%BA-%D0%BC%D0%B8%D0%BC%D0%B8%D0%BC%D0%B8-%D0%B5%D0%B1%D0%B8%D1%81%D1%8C%D0%BE%D0%BD%D0%BE%D0%B2%D1%81%D0%B5%D0%BA%D0%BE%D0%BD%D0%B5%D0%BC-%D0%BF%D0%B5%D1%81%D0%BE%D1%87%D0%BD%D0%B8%D1%86%D0%B0-1168743.jpeg'
        }, authInfo)
        .then(function (photo) {
            photo.id.should.be.type('number');
        });
});
```

<a name="pin-add"></a>
## #add()
should add pin.

```js
return authPromise.then(function (authInfo) {
    return pin
        .add({
            ownerType: 1,
            ownerId: authInfo.uid,
            viewPlace: 'user.profile',
            viewTarget: 'feed_single',
            ajax: 1,
            pinTitle: 'Всем привет!',
            _fs2ajax: 1
        }, authInfo)
        .then(function (pin) {
            pin.pinId.should.be.type('number');
        });
});
```

