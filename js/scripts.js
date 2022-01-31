$(() => {
	 $("form").submit(function() {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = document.getElementById(formID);
        $.ajax({
            type: "POST",
            url: 'send.php',
            data: new FormData(formNm),
            processData: false,
            contentType: false,
            beforeSend: function() {
                // Вывод текста в процессе отправки
                //$(formNm).html('<p style="text-align:center">Отправка...</p>');
            },
            success: function(data) {
                // Вывод текста результата отправки
                //$(formNm).html('<p style="text-align:center">' + data + '</p>');

                Fancybox.close()

				Fancybox.show([{
					src: "#callback_modal2",
					type: 'inline'
				}])

              
                $(formNm).trigger('reset');

            },
            error: function(jqXHR, text, error) {
                // Вывод текста ошибки отправки
                //$(formNm).html(error);
            }
        });
        return false;
    });


	// Варианты зашивки
	if ($('.sewing_variants .swiper-container').length) {
		let sliders = []

		$('.sewing_variants .swiper-container').each(function (i) {
			let slides = $(this).find('.slide').length,
				parent = $(this).closest('.sewing_variants'),
				this_ID = $(this).attr('id'),
				options = {
					loop: false,
					speed: 500,
					autoplay: {
					   delay: 3000,
					 },
					spaceBetween: 24,
					slidesPerView: 1,
					watchSlidesVisibility: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					on: {
						slideChange: swiper => {
							setTimeout(() => {
								parent.find('.thumbs button').removeClass('active')
								parent.find('.thumbs button').eq(swiper.activeIndex).addClass('active')
							})
						}
					}
				}

			sliders[i] = new Swiper('#' + this_ID, options)

			if (slides > sliders[i].params.slidesPerView) {
				options.loop = true
				sliders[i].destroy(true, true)
				sliders[i] = new Swiper('#' + this_ID, options)
			}

			parent.find('.thumbs button').click(function (e) {
				e.preventDefault()

				sliders[i].slideTo($(this).data('slide-index'), 500)
			})
		})
	}


	// Выполненные нами объекты
	if ($('.portfolio .swiper-container').length) {
		let sliders = []

		$('.portfolio .swiper-container').each(function (i) {
			let slides = $(this).find('.slide').length,
				this_ID = $(this).attr('id'),
				options = {
					loop: false,
					speed: 500,
					watchSlidesVisibility: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					breakpoints: {
						0: {
							spaceBetween: 12,
							slidesPerView: 2
						},
						768: {
							spaceBetween: 16,
							slidesPerView: 3
						},
						1024: {
							spaceBetween: 24,
							slidesPerView: 3
						},
						1188: {
							spaceBetween: 30,
							slidesPerView: 3
						}
					}
				}

			sliders[i] = new Swiper('#' + this_ID, options)

			if (slides > sliders[i].params.slidesPerView) {
				options.loop = true
				sliders[i].destroy(true, true)
				sliders[i] = new Swiper('#' + this_ID, options)
			}
		})
	}


	// Parallax
	const rellax = new Rellax('.rellax', {
		center: false,
		wrapper: null,
		round: true,
		vertical: true,
		horizontal: false
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.frame_variants .row').each(function () {
		frameVariantHeight($(this), parseInt($(this).css('--frame_variants_count')))
	})

	$('.services .row').each(function () {
		serviceHeight($(this), parseInt($(this).css('--services_count')))
	})

	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})

	setHeight($('.options .option'))
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.frame_variants .row').each(function () {
		frameVariantHeight($(this), parseInt($(this).css('--frame_variants_count')))
	})

	$('.services .row').each(function () {
		serviceHeight($(this), parseInt($(this).css('--services_count')))
	})

	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



// Выравнивание вариантов исполнения каркаса
function frameVariantHeight(context, step) {
	let start = 0,
		finish = step,
		$items = context.find('.item')

	$items.find('.name').height('auto')

	$items.each(function () {
		setHeight($items.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}


// Выравнивание услуг
function serviceHeight(context, step) {
	let start = 0,
		finish = step,
		$services = context.find('.service')

	$services.find('.name').height('auto')

	$services.each(function () {
		setHeight($services.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}


// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}