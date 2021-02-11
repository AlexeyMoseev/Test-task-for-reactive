$(document).ready(function () {
    var currentTab = 0;
    showTab(currentTab);

    //Обработка нажатий на кнопки

    $('.js-reg-form__button-1').on('click', function (e) {
        e.preventDefault();
        nextPrev(1);
    });

    $('.js-reg-form__button-2').on('click', function (e) {
        let x = $('.reg-form__old-checkbox');
        removeErrors();
        if (x[0].checked && x[1].checked) {
            $('.js-reg-form__basic').css('display', 'none');
            $('.js-reg-form__title').removeClass('reg-form_display_none');
            $('.js-reg-form__circle').removeClass('reg-form_display_none');
            $('.js-reg-form__step').css('display', 'block');
            var $form = $('.reg-form__submit');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
            })
                .done(function () {
                    //console.log('success')
                })
                .fail(function () {
                    //console.log('fail')
                });
        } else {
            let error = generateError('Нужно выбрать оба варианта');
            error.style.marginBottom = '10px';
            $('.js-reg-form__container-2')[0].before(error);
        }

        //отмена действия по умолчанию для кнопки submit
        e.preventDefault();
    });

    $('.js-reg-form__button-3').on('click', function (e) {
        $('.js-reg-form__button-3').css('border-style', 'solid');
        $('.js-reg-form__button-3').css('border-color', '#0050B2');
        $('.js-reg-form__button-3').css('border-width', '2px');
        e.preventDefault();
    });

    //Выделение активных/неактивных элементов

    $('.js-reg-form__container-1').on('click', function () {
        removeErrors();
        let item = $('.js-reg-form__container-1');
        item.removeClass('reg-form__container_active');
        $(this).addClass('reg-form__container_active');
    });

    $('.js-reg-form__container-2').on('click', function (e) {
        removeErrors();
        if (e.target.tagName == 'LABEL') {
            if ($(this).hasClass('reg-form__container_active')) {
                $(this).removeClass('reg-form__container_active');
            } else {
                $(this).addClass('reg-form__container_active');
            }
        }
    });

    //Переключение активных элементов

    function showTab(n) {
        let x = $('.reg-form__step');
        let y = $('.reg-form__circle');
        let z = $('.reg-form__title');
        x[n].style.display = 'block';
        y[n].style.backgroundColor = '#0061D9';
        z[n].style.color = '#3B4256';
    }

    function nextPrev(n) {
        removeErrors();
        let x = $('.reg-form__step');
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        x[currentTab].style.display = 'none';
        currentTab = currentTab + n;
        // Otherwise, display the correct tab:
        showTab(currentTab);
        fixStepIndicator(currentTab - 1);
    }

    function fixStepIndicator(n) {
        let x = $('.reg-form__circle');
        x[n].style.backgroundColor = '#1BC400';
        $(`.reg-form__numeral:eq(${n})`).empty();
        $(`.reg-form__circle:eq(${n})`).append(
            $('<img class="js-img" src="../images/Vector2.svg"></img>')
        );
    }

    //Валидация данных

    $('.reg-form__input').on('input', function () {
        $(this).css('background-color', 'white');
        removeErrors();
    });

    function validateForm() {
        var x,
            y,
            i,
            valid = false;
        x = $('.reg-form__input');
        y = $('.reg-form__old-checkmark');

        if (y[0].checked || y[1].checked) {
            valid = true;
        } else {
            let error = generateError('Нужно выбрать хотя бы один вариант');
            error.style.marginBottom = '10px';
            $('.js-reg-form__step-1').before(error);
        }

        // A loop that checks every input field in the current tab:
        for (i = 0; i < x.length; i++) {
            if ((x[i].value == '') === true) {
                x[i].style.backgroundColor = '#ffc0cb';
                let error = generateError('Это поле не может быть пустым');
                x[i].after(error);
                valid = false;
            }
        }

        //Валидация email
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        let z = $('.js-reg-form__input-email');
        if (testEmail.test(z.val()) === false) {
            z[0].style.backgroundColor = '#ffc0cb';
            valid = false;
            if (z.val() !== '') {
                let error = generateError('Введите корректный email');
                z.after(error);
            }
        }

        return valid; // return the valid status
    }

    let generateError = function (text) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };

    let removeErrors = function () {
        var errors = $('.error');

        for (var i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };

    $('.js-reg-form__input-phone').mask('+7 (999) 999-9999');
    $('.js-reg-form__input-pasport-series').mask('9999');
    $('.js-reg-form__input-pasport-number').mask('999-999');
    $('.js-reg-form__input-date').mask('99');
});
