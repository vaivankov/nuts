'use strict'

const componentParams = {
  template: `
  <div class="card-slider" @mousedown="setStartCoordinates($event)" @touchstart="setStartCoordinates($event)">
      <div class="card-slider__heading-wrapper">
        <div class="card-slider__heading">
          <h3 class="card-slider__title"><slot></slot></h3>
        </div>
        <div class="card-slider__controls-wrapper">
          <div class="progress-bar" style="--progress: 0%;"></div>
          <div class="card-slider__controls">
            <button class="button button--left" @click="validateDirection(-100)">&#5176;</button>
            <button class="button button--right" @click="validateDirection(100)">&#5171;</button>
          </div>
        </div>
      </div>
      <div class="card-slider__content">
        <article class="card" v-for="card of cardScopes" :key="card.id">
          <figure class="card__image-wrapper">
            <div class="card__image">
              <svg fill="#ffffff" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 -36 512 511">
                <defs />
                <path d="M232 199a51 51 0 100-103 51 51 0 000 103zm0-73a21 21 0 110 43 21 21 0 010-43zm0 0" />
                <path
                  d="M493 1H19C8 1 0 9 0 19v402c0 10 8 19 19 19h474c11 0 19-9 19-19V19c0-10-8-18-19-18zm-11 30v237l-94-94c-7-7-17-7-23 0L232 307l-85-85a16 16 0 00-23 0l-94 94V31zM30 410v-51l106-106 85 85a16 16 0 0022 0l134-133 105 105v100zm0 0" />
              </svg>
            </div>
            <figcaption class="card__date" v-text="new Date(card.pubDate).toLocaleDateString() + ' г.'"></figcaption>
          </figure>
          <h4 class="card__title" v-text="card.title"></h4>
          <div class="card__body" v-text="card.description"></div>
        </article>
      </div>
    </div>
  `,
  props: ['itemWidth', 'sliderSpeed'],
  data() {
    return {
      itemsPerPage: 4,
      componentWidth: null,
      currentPage: null,
      currentItem: 0,
      pageChanged: 0,
      backward: false,
      startCoordinates: null,
      cards: [

        {
          title: "Максимальная частота GPU AMD Radeon RX 6900 XT достигнет 3 ГГц",
          description: "Флагманская видеокарта Radeon RX 6900 XT будет иметь самый высокий показатель максимальной тактовой частоты графического процессора среди всех ускорителей Big Navi (RDNA 2). По крайней мере, согласно данным информатора Патрика Шура (Patrick Schur), опубликованным в Твиттере.",
          pubDate: "Sun, 29 Nov 2020 22:57:00 +0300"
        },


        {
          title: "AMD ожидает, что цены Radeon RX 6800 опустятся до рекомендованных через 1–2 месяца",
          description: "Проблема с видеокартами NVIDIA Ampere и AMD RDNA 2 заключается в том, что купить их по заявленным ценам почти нереально. Интересной информацией поделился канал Hardware Unboxed во время ноябрьской сессии вопросов и ответов. Похоже, даже в США видеокарты Radeon RX 6800 от партнёров AMD можно будет купить по рекомендованным розничным ценам не ранее чем через несколько недель.",
          pubDate: "Sun, 29 Nov 2020 15:55:00 +0300"
        },


        {
          title: "NZXT приостановила продажи корпуса H1 из-за угрозы короткого замыкания у PCIe-райзера",
          description: "Корпус NZXT H1 стал популярным выбором для сборщиков ПК, желающих получить компактные и стильные системы. Однако компания NZXT обнаружила, что в очень редких случаях он может представлять угрозу безопасности для потребителей. NZXT призвала владельцев H1 в довольно коротком сообщении на Reddit обратиться в службу поддержки клиентов компании по электронной почте h1support@nzxt.com.",
          pubDate: "Sun, 29 Nov 2020 13:37:00 +0300"
        },


        {
          title: "Блогер распаковал и показал все модели Gigabyte GeForce RTX 3060 Ti до их официального анонса",
          description: "В руки китайского видеоблогера с платформы Bilibili попал весь ассортимент графических ускорителей GeForce GeForce RTX 3060 Ti производства компании Gigabyte, который поступит в продажу 2 декабря. Владелец поспешил поделиться видео с распаковкой новинок, а также сообщил их технические характеристики. Вскоре само видео с распаковкой видеокарт было удалено.",
          pubDate: "Sun, 29 Nov 2020 05:43:00 +0300"
        },


        {
          title: "Процессор Intel Xeon 3-го поколения Ice Lake-SP 10 нм+ с 14 ядрами хорошо показывает себя в тестах",
          description: "Просочилось довольно много тестов процессора Intel Ice Lake-SP Xeon 3-го поколения, которые показывают в действии 14-ядерную 28-поточную модель и соответствующие результаты в различных тестах. 10 нм+ серия Xeon Ice Lake-SP будет выпущена в следующем году, как недавно подтвердила Intel, и основана на новой архитектуре ядра Ice Lake &mdash; Sunny Cove.",
          pubDate: "Sat, 28 Nov 2020 21:06:00 +0300"
        },


        {
          title: "С этим процессором что-то не так: отключение защиты от уязвимостей снижает производительность Intel Tiger Lake",
          description: "Основатель сайта Phoronix и специалист по программному обеспечению с открытым кодом, Майкл Ларабел (Michael Larabel), обнаружил необъяснимую пока особенность в поведении новых 10-нм процессоров Intel Tiger Lake. Вместо того чтобы работать быстрее после отключения защиты от связанных со спекулятивным исполнением команд уязвимостей, Tiger Lake внезапно начинал работать медленнее, да ещё нередко уступал старым процессорам.",
          pubDate: "Sat, 28 Nov 2020 18:42:00 +0300"
        },


        {
          title: "Старт продаж Radeon RX 6800 и 6800 XT в России прошёл незамеченным. Карт не будет ещё долго",
          description: "Несмотря на заверения представителей AMD, острый дефицит не миновал новые видеокарты Radeon RX 6800 и 6800 XT. Вышедшие на прошлой неделе эталонные модели разлетелись в считанные минуты, а дебютировавшие на днях собственные версии партнёров AMD пропали с прилавков магазинов ещё быстрее. Ниже мы разберём ситуацию подробнее, а также приведём комментарии зарубежных и отечественных ретейлеров.",
          pubDate: "Sat, 28 Nov 2020 17:45:00 +0300"
        },


        {
          title: "Модули DIMM и накопители Micron на чипах 3D XPoint станут массовыми через год или два",
          description: "На днях на конференции Sanford C. Bernstein финансовый директор компании Micron Дэвид Зинснер (David Zinsner) выразил уверенность, что широкий ассортимент фирменных модулей памяти и накопителей на чипах 3D XPoint появится через год или два. В настоящий момент SSD Micron на памяти 3D XPoint фактически представлен только на бумаге, а все выпущенные на заводе компании пластины с микросхемами 3D XPoint уходят компании Intel.",
          pubDate: "Sat, 28 Nov 2020 16:52:00 +0300"
        },


        {
          title: "Пользователи Intel получат свою Smart Access Memory — ASUS уже добавила поддержку в платы Z490",
          description: "Технология изменения размера регистров BAR (Base Address Registers), являющаяся частью PCI Express и лежащая в основе AMD Smart Access Memory (SAM), больше не является эксклюзивной для владельцев новых процессоров Ryzen. Компания ASUS выпустила ряд новых прошивок для различных материнских плат с чипсетом Intel Z490, которые добавляют поддержку изменения размера BAR.",
          pubDate: "Sat, 28 Nov 2020 12:29:00 +0300"
        },


        {
          title: "CD Projekt RED разыграет особую версию NVIDIA GeForce RTX 3080 в стиле Cyberpunk 2077",
          description: "Сейчас уже вряд ли что-то приведёт к очередному переносу Cyberpunk 2077 &mdash; после многократных задержек 10 декабря мы, наконец, увидим следующий проект от разработчиков The Witcher 3: Wild Hunt. Cyberpunk 2077 &mdash; это ролевой боевик в мрачном альтернативном будущем, который выйдет на системах прошлого и нового поколений.",
          pubDate: "Sat, 28 Nov 2020 09:54:00 +0300"
        },


        {
          title: "Одноплатный компьютер Boardcon EMH6 выполнен на жёлтом текстолите и поддерживает накопители M.2 NVMe",
          description: "Полку одноплатных компьютеров для разработчиков прибыло: дебютировало решение Boardcon EMH6, на основе которого могут создаваться телевизионные приставки, игровые устройства, а также оборудование с функциями проводного и беспроводного обмена данными.",
          pubDate: "Fri, 27 Nov 2020 16:05:00 +0300"
        },


        {
          title: "Palit готовит доступную GeForce RTX 3060 Ti Dual и продвинутую GeForce RTX 3060 Ti GamingPro",
          description: "Компания Palit готовит две версии нового графического ускорителя GeForce RTX 3060 Ti. Новинки будут представлены в рамках серий Dual и GamingPro тайваньского производителя.",
          pubDate: "Fri, 27 Nov 2020 12:49:00 +0300"
        },


        {
          title: "Контроллер подсветки Gelid Amber5 ценой в $15 может управлять 600 светодиодами",
          description: "Компания Gelid Solutions анонсировала контроллер многоцветной подсветки Amber5, предназначенный для использования в игровых настольных станциях с эффектным обликом. Новинка уже доступна для заказа по ориентировочной цене 15 долларов США.",
          pubDate: "Fri, 27 Nov 2020 09:49:00 +0300"
        },


        {
          title: "Вентилятор Lian Li ST120 с подсветкой предстал в белом и чёрном исполнениях",
          description: "Компания Lian Li анонсировала вентилятор охлаждения ST120, подходящий для монтажа на радиаторы систем жидкостного охлаждения (СЖО). Новинка, как отмечается, обеспечивает высокий уровень статического давления.",
          pubDate: "Fri, 27 Nov 2020 08:19:00 +0300"
        },


        {
          title: "В этом году рынок игровых ПК вырастет минимум на 30 %",
          description: "Феномен резкого спроса на периферийные устройства, необходимые для организации видеоконференций, уже не раз отмечала компания Logitech. Конкурирующая Corsair тоже признаёт, что на игровом направлении удвоила объёмы поставок, а рынок игровых ПК по итогам года может вырасти на 30&ndash;35&nbsp;%.",
          pubDate: "Fri, 27 Nov 2020 08:18:00 +0300"
        },


        {
          title: "Выход игровых консолей сильно ограничил возможности TSMC выпускать процессоры AMD",
          description: "Редкий квартальный отчёт AMD обходится без вопросов о нехватке производственных мощностей в адрес руководства компании. Наличие дефицита 7-нм компонентов главой AMD обсуждается неохотно, Лиза Су старается внушить собеседникам мысль, что вместе с TSMC компания держит всё под контролем. Независимые источники утверждают, что в этом плане не всё так хорошо.",
          pubDate: "Fri, 27 Nov 2020 07:49:00 +0300"
        },


        {
          title: "В Европе GeForce RTX 3060 Ti предварительно оценили в среднем в 550 евро",
          description: "По данным ресурса VideoCardz, европейские ретейлеры начали массово готовиться к запуску продаж нового графического ускорителя GeForce RTX 3060 Ti. В ассортименте различных европейских продавцов появились модели от компаний Gigabyte, Inno3D и Zotac. Правда, купить эти видеокарты ранее 2 декабря будет нельзя.",
          pubDate: "Fri, 27 Nov 2020 02:38:00 +0300"
        },


        {
          title: "MSI представила бюджетную версию GeForce RTX 3070 серии Twin Fan",
          description: "Компания Micro-Star International представила новую бюджетную серию графических ускорителей Twin Fan. На данный момент в неё входит только одна модель GeForce RTX 3070.",
          pubDate: "Fri, 27 Nov 2020 02:26:00 +0300"
        },


        {
          title: "Alphacool выпустила водоблоки для видеокарт Radeon RX 6800 (XT) в исполнении MSI и Sapphire",
          description: "Компания Alphacool представила водоблоки Eisblock Aurora Acryl GPX-A для видеокарт MSI Radeon RX 6800 (XT) Gaming X Trio и Sapphire Radeon RX 6800 XT Nitro+. Ранее аналогичное решение производитель анонсировал для эталонных версий данных графических ускорителей.",
          pubDate: "Thu, 26 Nov 2020 21:26:00 +0300"
        },


        {
          title: "Цена флеш-памяти NAND продолжит падать до конца года из-за перепроизводства. SSD должны подешеветь",
          description: "Аналитики TrendForce поделились оценкой состояния рынка флеш-памяти NAND в третьем квартале и дали прогноз по рынку на последнюю четверть 2020 года. Общий вывод неутешителен для производителей &mdash; памяти выпускается больше, чем она требуется. Для нас с вами это означает, что цены на продукцию с памятью NAND снижаются и в ближайшем будущем продолжат снижаться.",
          pubDate: "Thu, 26 Nov 2020 18:57:00 +0300"
        },

      ],
      cardScopes: []
    }
  },
  methods: {
    setStartCoordinates(evt) {
      if (evt.clientX) {
        this.startCoordinates = evt.clientX
        window.addEventListener('mouseup', this.getScrollDirection)
      } else {
        this.startCoordinates = evt.touches[0].clientX
        window.addEventListener('touchend', this.getScrollDirection)
      }
    },
    getScrollDirection(evt) {
      let endCords;
      if (evt.clientX) {
        endCords = evt.clientX
        window.removeEventListener('mouseup', this.getScrollDirection)
      } else {
        endCords = evt.changedTouches[0].clientX
        window.removeEventListener('touchend', this.getScrollDirection)
      }
      const direction = this.startCoordinates - endCords
      this.validateDirection(direction)
    },
    validateDirection(direction) {
      if (direction < 50 && direction > -50) return
      if (direction < -50) {
        this.backward = true
        this.currentItem -= this.itemsPerPage
      }
      if (direction > 50) {
        this.backward = false
        this.currentItem += this.itemsPerPage
      }
      this.updatePage()
    },
    updatePage() {
      this.currentItem < 0
        && (this.currentItem = this.cards.length - (this.currentItem * -1))
      this.currentItem >= this.cards.length
        && (this.currentItem = 0)
      this.pageChanged++
    },
    setResizeData() {
      this.componentWidth = this.$el.clientWidth
      let itemsPerPage = Math.floor(this.componentWidth / this.itemWidth)
      itemsPerPage > 4 && (itemsPerPage = 4)
      itemsPerPage < 1 && (itemsPerPage = 1)
      this.itemsPerPage = itemsPerPage
    },
    updateButtonBlocks() {
      let sortedCards = []
      let currentItem = this.currentItem
      while (sortedCards.length < this.itemsPerPage) {
        currentItem < 0 && (currentItem = this.cards.length + currentItem)
        let item = this.cards[currentItem]
        sortedCards.push(item)
        this.backward ? currentItem-- : currentItem++
      }
      this.cardScopes = sortedCards
    }
  },
  watch: {
    itemsPerPage: function () {
      this.updateButtonBlocks()
    },
    pageChanged: function () {
      const progressBar = this.$el.querySelector('.progress-bar')
      const percent = this.currentItem * 100 / this.cards.length;
      progressBar.style = `--progress: ${percent}%;`
      this.updateButtonBlocks()
    }
  },
  created() {
    this.getScrollDirection = this.getScrollDirection.bind(this)
  },
  mounted() {
    window.addEventListener('resize', this.setResizeData)
    this.setResizeData()
    setInterval(() => {
      // this.pageChanged++
    }, this.sliderSpeed)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setResizeData)
  }
}

new Vue({
  el: "#page-content",
  data: {},
  components: {
    appSlider: componentParams
  }
})
