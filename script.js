const circle = document.querySelector('.circle')
const radius = circle.offsetWidth / 2
const count = document.querySelector('.count')
const swiperTitle = document.querySelector('.swiper-title')
const firstTitle = document.querySelector('.hero__title-date__blue')
const secondTitle = document.querySelector('.hero__title-date__purple')
const dataFirstTitle = [1984, 1989, 1994, 1998, 2006, 2017]
const dataSecondTitle = [1988, 1993, 1997, 2005, 2016, 2024]
const titlesForPoints = ['Кино', 'Комедия', 'Боевики', 'Про войну', 'Родина', 'Патриот']



    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        slidesPerView: 1,
        speed: 900,
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
    });
    const swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 20,
        slidesPerView: 3,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            545: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3 
            }
        }
    });

    const allSlidesLength = swiper.slides.length
    const activeSlide = swiper.activeIndex

    count.textContent = `0${activeSlide + 1}/0${allSlidesLength}`
    swiperTitle.textContent = titlesForPoints[activeSlide]

    circleCreate(allSlidesLength)
    titlesCreate()
    circleRotate(allSlidesLength, activeSlide)



    const buttonNextToo = document.querySelector('.button-next-too')

    buttonNextToo.addEventListener('click', () => {
        swiper.slideNext()
        swiperTitle.textContent = titlesForPoints[activeSlide]
    })



    const swiperControllerUpdateCount = document.querySelectorAll('.swiper-controller')

    swiperControllerUpdateCount.forEach((el) => {
        el.addEventListener('click', () => {
            const allSlidesLength = swiper.slides.length
            const activeSlide = swiper.activeIndex
            count.textContent = `0${activeSlide + 1}/0${allSlidesLength}`

            circleRotate(allSlidesLength, activeSlide)
            titlesUpdate(activeSlide)

            swiperTitle.textContent = titlesForPoints[activeSlide]
        })
    })



    function updateActiveFromCircle (index) {
        swiper.activeIndex = index 
        swiper.slideTo(index)
        swiper.update()
        circleRotate(allSlidesLength, index)
        titlesUpdate(index)
        count.textContent = `0${index + 1}/0${allSlidesLength}`
    }
    function circleCreate(slides) {

        for (let i = 0; i < slides; i++) {
            const point = document.createElement('div')

            const pointIndex = document.createElement('span')
            pointIndex.classList.add('dot__index')
            pointIndex.textContent = (i + 1)

            const pointTitle = document.createElement('h5')
            pointTitle.textContent = titlesForPoints[i]
            pointTitle.classList.add('dot__title')

            point.addEventListener('click', () => {
                updateActiveFromCircle(i)
            })

            circle.appendChild(point)
            point.appendChild(pointIndex)
            point.appendChild(pointTitle)
        }
    }
    function circleRotate (slides, activeIndex) {
        const points = circle.children
        const arrayPoints = [...points]

        arrayPoints.forEach((el, index) => {
            el.className = 'dot'
        })

        for (let i = 0;  i < slides; i++) {
            const angle = (2 * Math.PI / slides) * i
            const x = radius + radius * Math.cos(angle)
            const y = radius + radius * Math.sin(angle)

            let rotateCircle = 360 - ((activeIndex + 1) * 60)
            let rotateDot = 360 - rotateCircle
            
            if ((i + 1) == (activeIndex + 1)) {
                circle.style.transform = `rotate(${rotateCircle}deg)`

                arrayPoints[i].style.transform = `rotate(${rotateDot}deg)`
    
                arrayPoints[i].className = 'dot-active'
                arrayPoints[i].style.left = `${x - 17}px`;
                arrayPoints[i].style.top = `${y - 17}px`;
            } else {
                arrayPoints[i].classList.add('dot')
                arrayPoints[i].style.left = `${x - 6}px`;
                arrayPoints[i].style.top = `${y - 6}px`;
                arrayPoints[i].style.transform = `rotate(${rotateDot}deg)`
            }
        }
    }


    function titlesCreate() {
        firstTitle.textContent = dataFirstTitle[0]
        secondTitle.textContent = dataSecondTitle[0]
    }

    function titlesUpdate (activeIndex) { 
        let numberFirst = Number(firstTitle.textContent)
        let numberSecond = Number(secondTitle.textContent)
        let duration = 35


            const intercal = setInterval(() => {
                if (dataFirstTitle[activeIndex] >= numberFirst && dataSecondTitle[activeIndex] >= numberSecond) {

                    numberFirst += 1
                    numberSecond += 1

                    secondTitle.textContent = numberSecond
                    firstTitle.textContent = numberFirst
                } else {
                    clearInterval(intercal)
                }
            }, duration)


            const intercal1 = setInterval(() => {
                if (dataFirstTitle[activeIndex] <= numberFirst && dataSecondTitle[activeIndex] <= numberSecond) {

                    numberFirst -= 1
                    numberSecond -= 1

                    secondTitle.textContent = numberSecond
                    firstTitle.textContent = numberFirst
                } else {
                    clearInterval(intercal1)
                }
            }, duration)
        
    }
