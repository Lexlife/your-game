# Своя игра
### Всеми любимая и хорошо знакомая игра по мотивам телевизионной передачи "Своя игра".
###

![Своя игра](public/background.png)

### Инструкция по запуску:

1. Должна быть установлена и запущена база данных ```MongoDB```.
2. ```npm i``` в корневой папке проекта.
3. После установки всех зависимостей идем в ```node_modules/react-scripts/config/webpack.config.js``` и на 763 строчке (в
   разделе ```new ESLintPlugin```) дописываем ```failOnError: false,```.
4. В папке ```api``` запускаем команду ```node gameSeeder.js```.
4. ```npm start``` в корневой папке проекта.
5. Наслаждаемся!

### Коротко о приложении:
```FullStack```приложение написано на ```javaScript``` в среде ```Node.js```. Сервер на ```Express```. База данных ```mongoDB```, 
моделирование с помощью ```Mongoose```. Клиент 
на ```React``` с
использованием стилей ```material-ui```. Взимиодействие клиента с сервером при регистрации осуществляется 
через ```fetch``` (информация записываются в 
```базу данных``` и
сохраняются в ```cookie```), обмен данными во время игры происхоит по ```WebSocket```. В качестве ```state management``` используется
```redux```. 
