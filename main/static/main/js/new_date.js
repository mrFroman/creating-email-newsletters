/******/
(function () { // webpackBootstrap
  /******/
  "use strict";
  var __webpack_exports__ = {};

  const app = document.createElement('div');
  const template = document.createElement('div');
  const eventList = document.createElement('div');

  app.id = 'app';
  template.classList.add('template');
  eventList.classList.add('event__list');

  const createMail = () => {
    const root = document.createElement('div');
    const header = document.createElement('div');
    const footer = document.createElement('div');

    root.id = 'root';
    header.id = 'header';
    footer.id = 'footer';
    header.textContent = 'ШАПКА';
    footer.textContent = "ПОДВАЛ";

    root.append(header);

    for (let i = 0; i < 15; i++) {
      let div = document.createElement('div');
      let posterBody = document.createElement('div')
      let img = document.createElement('img')
      let title = document.createElement('div')
      let description = document.createElement('div')
      let date = document.createElement('span')
      let topdate = document.createElement('div')
      let time = document.createElement('span')
      let rate = document.createElement('span')
      let place = document.createElement('div')
      let button = document.createElement('a')
      let inputImg = document.createElement('input')
      let wrapImg = document.createElement('div')

      div.classList.add('root__card')
      posterBody.classList.add('poster__body')
      title.setAttribute('contenteditable', 'true')
      description.setAttribute('contenteditable', 'true')
      description.classList.add('description')
      inputImg.type = 'file'
      inputImg.style.display = 'none'
      wrapImg.classList.add('img__wrap')

      wrapImg.append(img)

      if (i === 0) {
        div.id = `top_1`;
        topdate.classList.add('top__date')
        div.append(wrapImg, inputImg, description, topdate, button)
      }
      else if (i < 7 && i !== 7 && i !== 0) {
        div.id = `poster_${i}`

        img.classList.add('poster__img')
        title.classList.add('poster__title')
        date.classList.add('poster__date')
        time.classList.add('poster__time')
        rate.classList.add('poster__rate')
        place.classList.add('poster__venue')
        button.classList.add('poster__price')
        posterBody.append(title, date, time, rate, place, button)
        div.append(wrapImg, posterBody)
      }
      else if (i === 7) div.id = `top_2`;
      else if (i > 7 && i !== 7 && i !== 14) {
        div.id = `poster_${i - 1}`

        img.classList.add('poster__img')
        title.classList.add('poster__title')
        date.classList.add('poster__date')
        time.classList.add('poster__time')
        rate.classList.add('poster__rate')
        place.classList.add('poster__venue')
        button.classList.add('poster__price')
        posterBody.append(title, date, time, rate, place, button)
        div.append(wrapImg, posterBody)
      }
      else if (i === 14) div.id = `top_3`;

      div.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      });

      div.addEventListener('drop', e => {
        let data = JSON.parse(e.dataTransfer.getData('text/plain'));

        if(e.target.id.startsWith('poster') || e.target.className.startsWith('poster')) {
          title.textContent = `${data.name_event.replace(/^./, data.name_event[0].toUpperCase())}`
          button.textContent = `от ${data.price.split(' — ')[0].trim()}`
          date.textContent = `${data.date_event} `
          time.textContent = `в ${data.time_event} `
          rate.textContent = `${data.rate}`
          place.textContent = `${data.venue}`
        } else {
          description.textContent = `${data.content_text}`
          button.textContent = 'Выбрать место'
          topdate.textContent = `${data.date_event} в ${data.time_event} ${data.venue}`
        }
      });

      wrapImg.addEventListener('click', () => {
        inputImg.click()
        inputImg.addEventListener('change', () => {
          console.log(URL.createObjectURL(inputImg.files[0]))
  
          img.src = URL.createObjectURL(inputImg.files[0])
      })
      
      })

      root.append(div);
    }
    root.append(footer);
    return root;
  };

  const createEventsList = (events) => {
    let eventsArray = []
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
      eventsArray.push(card);
    }
    return eventsArray;
  };

  document.addEventListener('DOMContentLoaded', () => {

    const events = JSON.parse(document.querySelector('#jsonData').dataset.json)
    
    document.body.append(app);
    app.append(template, eventList);
    let mailTemplate = createMail();
    let eventsList = createEventsList(events);
    template.append(mailTemplate);
    eventList.append(...eventsList);
  });
  /******/
})();