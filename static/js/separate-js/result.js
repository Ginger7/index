$(function () {


    function changeFilter() {
        let tags = [];
        $(".active-tags__item").each(function (index) {
            tags.push($(this).text());
        });

        $.ajax({
            url: 'https://portal.inno.msk.ru/api/v1/crm-company-project/get-companies-data-by-project-id/?id=48',
            method: 'post',
            /*data: {
                tags: JSON.stringify(tags)
            },*/
            success: function (resp) {
                console.log(resp)

                let data = JSON.parse(resp);
                if (!data.error) {
                    program.removeAllSlides();
                    $.each(data.slides, function (index, value) {
                        let slide = '<div class="swiper-slide program-item">' +
                            '                    <figure class="program-item__img">' +
                            '                        <img src=" ' + value.img + ' ">' +
                            '                    </figure>' +
                            '                    <p class="program-item__title">' + value.title + '</p>' +
                            '                    <p class="program-item__text">' + value.text + '</p>' +
                            '                    <div class="tags">';
                        $.each(value.tags, function (index, tag) {
                            slide += '<div class="tags__item">' + tag + '</div>';
                        });
                        slide += '</div>' +
                            '<div class="program-item__btns">';

                        $.each(value.links, function (index, link) {
                            slide += '<a href="https://' + link + '" class="btn btn-outline-dark btn-sm">' + link + '</a>';
                        });
                        slide += '</div>' +
                            '</div>'
                        program.appendSlide(slide);

                    })
                }
            }
        });
    }

    $(document).on('click', '.active-tags__item', function (e) {
        $(this).remove();
        $('.tags__item[data-value="' + $(this).text() + '"]').removeClass('active');
        changeFilter();
    });
    $('.tags__item').click(function () {
        let title = $(this).attr('data-value');
        $(this).addClass('active');
        $('.active-tags').append('<div class="active-tags__item">' + title + '</div>');
        changeFilter();
    })
})
