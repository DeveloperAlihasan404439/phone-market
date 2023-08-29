/* const phone = ()=>{
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(res => res.json())
    .then(data => displayPhone(data.data))
} */
const phone = async (phone='iphone',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
    const data = await res.json()
    const phones = data.data;
    if(!phones || phones === ""){
        alert('no data ')
    }
    displayPhone(phones,isShowAll)
}
const displayPhone =( phones, isShowAll )=> {
    if(phones === ""){
        alert('no data ')
    }
    const displayP = document.getElementById('phone')
    displayP.innerText = ''
    const showAll = document.getElementById('show-all-button')
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden')
    }
    else {
        // showAll.classList = 'hidden'
        showAll.classList.add('hidden', true)
    }
    console.log('hendel show all ', isShowAll);
    if(!isShowAll){
        phones = phones.slice(0, 12)
    }   
    // phones = phones.slice(0, 12)
    phones.forEach ( phone=> {
        // console.log(phone.slug);
        const createPhone = document.createElement('div');
        // createPhone.classList.add('singlePhone')
        createPhone.innerHTML = `
        <div class="card bg-base-100 p-4 rounded-[15px] shadow-xl">
            <img src="${phone.image}" alt="Shoes" class='h-[450px] mb-3'/>
            <h2 class="text-2xl text-black font-medium  pl-6"> ${phone.brand}</h2>
            <p class = "text-xl text-black font-medium py-2 pl-6 ">${phone.phone_name}</p>
            <button onclick="showDitails('${phone.slug}')" class="mt-4 py-1 px-3 bg-gradient-to-l from-orange-400 via-orange-300 to-[#d4bc6d] text-2xl text-black font-medium rounded-lg">Show Ditails</button>
        </div>
        `
        displayP.appendChild(createPhone)
    })
    loddingSppner(false)
}
// my_modal_5.showModal()
const showDitails = async(phone)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
    const data = await res.json();
    const dataShow = data.data
    showDitailsDisplay(dataShow);
}
const showDitailsDisplay = data =>{
    console.log(data);
    const {image,name, brand,mainFeatures,others } = data;
    const phoneDitails = document.getElementById('phone-show-ditails')
    phoneDitails.innerText = ''
    const phoneCreate = document.createElement('div')
    phoneCreate.classList = 'flex flex-col justify-center'
    phoneCreate.innerHTML = `
    <img src="${image}" alt="Shoes" class='h-[350px]'/>
    <h3 class="font-bold text-2xl mt-2 text-black">Phone Name : ${name}</h3>
    <h3 class="font-bold text-lg text-black m-0">Phone Brand : ${brand}</h3>
    <p class="text-xl font-medium text-black">Phone Display Size : ${mainFeatures?.displaySize}</p>
    <p class="text-xl font-medium text-black">Phone Memory : ${mainFeatures?.memory || 'No Memory Data'}</p>
    <p class="text-xl font-medium text-black">Phone Bluetooth : ${others?.Bluetooth || "No bluetooth"}</p>
    <p class="text-xl font-medium text-black">Phone USB : ${others?.USB || 'No Usb'}</p>
    <div class="modal-action">
        <button class="py-1 w-full bg-blue-500 text-2xl text-white font-medium rounded-lg">Close</button>
    </div>
    `
    phoneDitails.appendChild(phoneCreate)
    my_ditails_modal.showModal()
}

const heldelSearch = (isShowAll) => {
    const searchInputFilt = document.getElementById('search-input-filt');
    const searchText = searchInputFilt.value;
    phone(searchText,isShowAll)
    loddingSppner(true)
    // searchInputFilt.value = ''
}

// show all button not oks
const showAllButton =()=>{
    heldelSearch(true)
}
const loddingSppner = (islodding)=>{
    const lodding = document.getElementById('lodding-button');
    islodding?lodding.classList.remove('hidden'):lodding.classList.add('hidden')
    /* if(islodding){
        lodding.classList.remove('hidden')
    }
    else{
        lodding.classList.add('hidden')
    } */
}
phone()