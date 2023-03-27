let bannerForm = document.querySelectorAll(".banner-form")
let container = document.querySelector("#form-container")
let addBanner = document.querySelector("#add-banner")
let totalFormsBanner = document.querySelector("#id_form-TOTAL_FORMS")
let removeBanner = document.querySelector('#removeBanner')
let bannerNum = bannerForm.length-1

function addFormBanner(e){
    e.preventDefault()

    let newForm = bannerForm[0].cloneNode(true)
    let bannerRegex = RegExp(`form-(\\d){1}-`,'g')

    bannerNum++
    newForm.innerHTML = newForm.innerHTML.replace(bannerRegex, `form-${bannerNum}-`)
    container.insertBefore(newForm, addBanner)
    totalFormsBanner.setAttribute('value', `${bannerNum+1}`)
    let divData=document.getElementById("showCount")
    divData.innerHTML="Количество афиш: "+ totalFormsBanner.getAttribute('value') +""

    if (bannerNum === 14){
        addBanner.setAttribute('disabled', true)
    }
}

function deleteBanner(e){
    e.preventDefault()

    bannerNum--
    totalFormsBanner.setAttribute('value', `${bannerNum+1}`)

    let lastForm = Array.from(document.querySelectorAll('.banner-form'))
    let delEl = lastForm.pop()
    delEl.remove()
    let divData=document.getElementById("showCount");
    divData.innerHTML="Количество афиш: "+ totalFormsBanner.getAttribute('value') +""

    if (bannerNum != 14){
        addBanner.removeAttribute('disabled', true)
    }
}

addBanner.addEventListener('click', addFormBanner)
removeBanner.addEventListener('click', deleteBanner)