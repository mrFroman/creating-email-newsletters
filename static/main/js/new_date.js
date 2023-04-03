(function () {

  let events

  const createImg = (imgClass) => {
    let img = document.createElement('img')
    let imgWrap = document.createElement('div')
    let imgUpload = document.createElement('input')

    img.classList.add(`${imgClass}`)
    imgWrap.classList.add('img__wrap')
    imgUpload.classList.add('img__upload')

    imgUpload.type = 'file'
    imgUpload.style.display = 'none'

    imgWrap.addEventListener('click', () => {
      imgUpload.click()
      imgUpload.addEventListener('change', () => {
        img.src = URL.createObjectURL(imgUpload.files[0])
    })
    
    })

    imgWrap.append(img)

    return imgWrap
  }

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  const createPoster = (i) => {
    let root = document.createElement('div');
    let rootBody = document.createElement('div')
    let img = createImg('poster__img')
    let eventTitle = document.createElement('div')
    let eventDate = document.createElement('span')
    let eventTime = document.createElement('span')
    let eventRate = document.createElement('span')
    let eventVenue = document.createElement('div')
    let button = document.createElement('a')
    let posterCategory = document.createElement('div')

    root.id = `poster_${i}`
    rootBody.classList.add('poster__body')
    eventTitle.classList.add('poster__title')
    eventDate.classList.add('poster__date')
    eventTime.classList.add('poster__time')
    eventRate.classList.add('poster__rate')
    eventVenue.classList.add('poster__venue')
    button.classList.add('poster__price')
    posterCategory.classList.add('poster__category')

    rootBody.append(posterCategory, eventTitle, eventDate, eventTime, eventRate, eventVenue, button)
    root.append(img, rootBody)

    eventTitle.contentEditable = 'true'
    eventVenue.contentEditable = 'true'

    posterCategory.textContent = `Категория`

    root.addEventListener('dragover', dragOver);

    root.addEventListener('drop', e => {
      let data = JSON.parse(e.dataTransfer.getData('text/plain'));

      eventTitle.textContent = `${data.name_event.replace(/^./, data.name_event[0].toUpperCase())}`
      eventDate.textContent = `${data.date_event} `
      eventTime.textContent = `в ${data.time_event} `
      eventRate.textContent = `${data.rate}`
      eventVenue.textContent = `${data.venue}`
      button.textContent = `от ${data.price.split(' — ')[0].trim()} ₽`
    });

    return root
  }

  const createTop = (i) => {
    let root = document.createElement('div');
    let img = createImg('top__img')

    root.classList.add('top')
    root.id = `top_${i}`

    root.append(img)

    return root
  }

  const createTopWithText = (i) => {
    let root = createTop(i)
    let description = document.createElement('div')
    let date = document.createElement('div')
    let eventDate = document.createElement('span')
    let eventTime = document.createElement('span')
    let eventVenue = document.createElement('div')
    let button = document.createElement('a')

    description.classList.add('top__description')
    date.classList.add('top__date')
    eventDate.classList.add('top__event-date')
    eventTime.classList.add('top__event-time')
    eventVenue.classList.add('top__event-venue')
    button.classList.add('top__button')

    description.contentEditable = 'true'
    eventVenue.contentEditable = 'true'
    button.textContent = 'Выбрать место'
    
    date.append(eventDate, eventTime, eventVenue)
    root.append(description, date, button)

    root.addEventListener('dragover', dragOver);

    root.addEventListener('drop', e => {
      let data = JSON.parse(e.dataTransfer.getData('text/plain'));

      description.textContent = `${data.content_text}`
      eventDate.textContent = `${data.date_event} `
      eventTime.textContent = `в ${data.time_event} `
      eventVenue.textContent = `${data.venue}`
      button.textContent = 'Выбрать место'
    });

    return root
  }

  const createMailing = () => {
    const root = document.createElement('div');
    const rootTitle = document.createElement('h1')

    root.id = 'root';
    rootTitle.classList.add('root__title')
    rootTitle.textContent = 'Афиша Города'

    root.append(rootTitle)

    if (events.length < 4) {
      for (let i = 0; i < events.length; i++) {
        let rootPlace = createTopWithText(i + 1)
        root.append(rootPlace)
      }
    } else if (events.length === 5 || events.length === 6 ) {
      for (let i = 0; i < events.length; i++) {
        let rootPlace
  
        if (i === 0) {
          rootPlace = createTopWithText(i + 1)
        }
        else if (i === 4) {
          rootPlace = createTop(i + 1)
        }
        else {
          rootPlace = createPoster(i)
        }
  
        root.append(rootPlace);
      }
    } else {
      let x = events.length
      if(events.length === 6 || events.length === 9 || events.length === 12) x = events.length - 1 
      if(events.length === 10 || events.length === 13) x = events.length - 2
      for (let i = 0; i < x; i++) {
        let rootPlace
  
        if (i === 0) {
          rootPlace = createTopWithText(i + 1)
        }
        else if (i < 7 && i !== 7 && i !== 0) {
          rootPlace = createPoster(i)
        }
        else if (i === 7) {
          rootPlace = createTop(2)
        }
        else if (i > 7 && i !== 7 && i !== 14) {
          rootPlace = createPoster(i - 1)
        }
        else if (i === 14) {
          rootPlace = createTop(3)
        }
  
        root.append(rootPlace);
      }
    }

    return root;
  };
  
  const createEventList = () => {
    const eventList = document.createElement('div');
  
    eventList.id = 'event__list';

    
    
      for (let event of events) {
        
        const card = document.createElement('div');
        const title = document.createElement('h4');
        const date = document.createElement('span');
        const price = document.createElement('span')
        const rate = document.createElement('span')
        let rateArray = ['0+', '6+', '12+','16+', '18+']        

        card.classList.add('card');
        rate.classList.add('card__rate')
  
        card.addEventListener('dragend', e => {
          e.target.classList.remove('selected');
        });
  
        title.textContent = `${event.name_event.replace(/^./, event.name_event[0].toUpperCase())}`;
        date.textContent = event.date_event;
        price.textContent = event.price
        rate.textContent = event.rate

        rateArray.includes(event.rate) ? card.draggable = true : rate.style.cssText = 'background-color: red; color: #fff'
        
        card.addEventListener('dragstart', e => {
          e.dataTransfer.dropEffect = "copy";
          e.dataTransfer.effectAllowed = "copy";

          e.dataTransfer.setData('text/plain', JSON.stringify(event));
          e.target.classList.add('selected');
        });

        card.append(title, date, price, rate);
        eventList.append(card);
      }
  
    return eventList
  }

  const createFooter = () => {
    const footer = document.createElement('div');
    const img = document.createElement('img')

    footer.id = 'footer';
    img.src = `static/main/img/footer.jpg`

    footer.append(img)

    return footer
  }

  const createHeader = () => {
    const header = document.createElement('div');
    const img = document.createElement('img')

    header.id = 'header';
    img.src = `static/main/img/header.jpg`

    header.append(img)

    return header
  }

  const createTemplate = () => {

    const template = document.createElement('div');
    const header = createHeader()
    const main = createMailing()
    const footer = createFooter()
    
    template.id = 'template';
  
    template.append(header, main, footer)
  
    return template
  }

  const createApp = () => {
    const app = document.createElement('div');
    const template = createTemplate()
    const eventList = createEventList()

    app.id = 'app';

    app.append(template, eventList)

    return app
  }

  document.addEventListener('DOMContentLoaded', () => {
    events = JSON.parse(document.querySelector('#jsonData').dataset.json)

    const app = createApp()

    document.body.append(app);
  });
})();