(function () {

  let events

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  const createPoster = (i) => {
    let root = document.createElement('div');
    let rootBody = document.createElement('div')
    let img = document.createElement('img')
    let eventTitle = document.createElement('div')
    let eventDate = document.createElement('span')
    let eventTime = document.createElement('span')
    let eventRate = document.createElement('span')
    let eventVenue = document.createElement('div')
    let button = document.createElement('a')
    let imgUpload = document.createElement('input')
    let imgWrap = document.createElement('div')
    let posterCategory = document.createElement('div')

    root.id = `poster_${i}`
    img.classList.add('poster__img')
    rootBody.classList.add('poster__body')
    eventTitle.classList.add('poster__title')
    eventDate.classList.add('poster__date')
    eventTime.classList.add('poster__time')
    eventRate.classList.add('poster__rate')
    eventVenue.classList.add('poster__venue')
    button.classList.add('poster__price')
    imgWrap.classList.add('img__wrap')
    imgUpload.classList.add('img__upload')
    posterCategory.classList.add('poster__category')

    rootBody.append(posterCategory, eventTitle, eventDate, eventTime, eventRate, eventVenue, button)
    imgWrap.append(img)
    root.append(imgWrap, rootBody)

    imgUpload.type = 'file'
    imgUpload.style.display = 'none'
    eventTitle.contentEditable = 'true'
    eventVenue.contentEditable = 'true'
    posterCategory.contentEditable = 'true'

    posterCategory.textContent = `Категория`

    root.addEventListener('dragover', dragOver);

    root.addEventListener('drop', e => {
      let data = JSON.parse(e.dataTransfer.getData('text/plain'));

      eventTitle.textContent = `${data.name_event.replace(/^./, data.name_event[0].toUpperCase())}`
      eventDate.textContent = `${data.date_event} `
      eventTime.textContent = `в ${data.time_event} `
      eventRate.textContent = `${data.rate}`
      eventVenue.textContent = `${data.venue}`
      button.textContent = `от ${data.price.split(' — ')[0].trim()}`
      
    });

    imgWrap.addEventListener('click', () => {
      imgUpload.click()
      imgUpload.addEventListener('change', () => {
        img.src = URL.createObjectURL(imgUpload.files[0])
        console.log(img.style.zIndex)
    })
    
    })

    return root
  }

  const createTop = (i) => {
    let root = document.createElement('div');
    let img = document.createElement('img')
    let imgWrap = document.createElement('div')
    let imgUpload = document.createElement('input')

    root.classList.add('top')
    img.classList.add('top__img')
    imgWrap.classList.add('img__wrap')
    imgUpload.classList.add('img__upload')

    imgUpload.type = 'file'
    imgUpload.style.display = 'none'

    root.id = `top_${i}`

    imgWrap.addEventListener('click', () => {
      imgUpload.click()
      imgUpload.addEventListener('change', () => {
        img.src = URL.createObjectURL(imgUpload.files[0])
        console.log(img.style.zIndex)
    })
    
    })

    imgWrap.append(img)
    root.append(imgWrap)

    return root
  }

  const createTopWithText = (i) => {
    let root = document.createElement('div');
    let img = document.createElement('img')
    let imgWrap = document.createElement('div')
    let imgUpload = document.createElement('input')
    let description = document.createElement('div')
    let date = document.createElement('div')
    let eventDate = document.createElement('span')
    let eventTime = document.createElement('span')
    let eventVenue = document.createElement('div')
    let button = document.createElement('a')

    root.classList.add('top')
    img.classList.add('top__img')
    imgWrap.classList.add('img__wrap')
    imgUpload.classList.add('img__upload')
    description.classList.add('top__description')
    date.classList.add('top__date')
    eventDate.classList.add('top__event-date')
    eventTime.classList.add('top__event-time')
    eventVenue.classList.add('top__event-venue')
    button.classList.add('top__button')

    description.contentEditable = 'true'
    imgUpload.type = 'file'
    imgUpload.style.display = 'none'
    eventVenue.contentEditable = 'true'
    button.textContent = 'Выбрать место'
    root.id = `top_${i}`

    imgWrap.append(img)
    date.append(eventDate, eventTime, eventVenue)
    root.append(imgWrap, description, date, button)

    root.addEventListener('dragover', dragOver);

    root.addEventListener('drop', e => {
      let data = JSON.parse(e.dataTransfer.getData('text/plain'));

      description.textContent = `${data.content_text}`
      eventDate.textContent = `${data.date_event} `
      eventTime.textContent = `в ${data.time_event} `
      eventVenue.textContent = `${data.venue}`
      button.textContent = 'Выбрать место'
    });

    imgWrap.addEventListener('click', () => {
      imgUpload.click()
      imgUpload.addEventListener('change', () => {
        img.src = URL.createObjectURL(imgUpload.files[0])
        console.log(img.style.zIndex)
    })
    
    })

    return root
  }

  const createMailing = () => {
    const root = document.createElement('div');
    const rootTitle = document.createElement('h1')
    

    root.id = 'root';
    rootTitle.classList.add('root__title')
    rootTitle.textContent = 'Афиша Города'

    root.append(rootTitle)

    console.log(events.length)

    if (events.length < 4) {
      for (let i = 0; i < events.length; i++) {
        let rootPlace = createTopWithText(i + 1)
        console.log(rootPlace)
        root.append(rootPlace)
      }
    } else {
      for (let i = 0; i < events.length; i++) {
        let rootPlace
  
        if (events.length === 4 && i < 4) {
          rootPlace = createTopWithText(i + 1)
        }
  
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
        const title = document.createElement('div');
        const date = document.createElement('span');
        card.classList.add('card');
        card.draggable = true;
  
        card.addEventListener('dragstart', e => {
  
          e.dataTransfer.dropEffect = "copy";
          e.dataTransfer.effectAllowed = "copy";
          e.dataTransfer.setData('text/plain', JSON.stringify(event));
          e.target.classList.add('selected');
        });
  
        card.addEventListener('dragend', e => {
          e.target.classList.remove('selected');
        });
  
        title.textContent = `${event.name_event.replace(/^./, event.name_event[0].toUpperCase())}`;
        date.textContent = event.date_event;
        card.append(title, date);
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