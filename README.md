![example workflow](https://github.com/lekseff/AHJ_5_1/actions/workflows/ci_test.yml/badge.svg)

![example workflow](https://github.com/lekseff/AHJ_5_1/actions/workflows/e2e.yml/badge.svg)

![example workflow](https://github.com/lekseff/AHJ_5_1/actions/workflows/deploy.yml/badge.svg)

### Popovers

#### Легенда

Есть замечательный фреймворк Bootstrap, в котором реализовано достаточно много интересных виджетов с использованием jQuery. Но, как говорят современные и модные программисты, "jQuery не нужен", поэтому вам нужно реализовать такой же виджет на чистом JS.

#### Описание

Вот так должен выглядеть виджет в целом, для упрощения будем считать, что виджет всегда должен показываться сверху.

![](./pic/Popovers.png)


У popover'а обязательно должно быть название и текст. Центрироваться он обязательно должен по горизонтали относительно элемента, который вызвал popover'а.

Не забудьте написать авто-тест на взаимодействие с DOM на базе Puppeteer или JSDOM (на ваш выбор).
