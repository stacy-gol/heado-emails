function getClosest(el, s) {
    var r = undefined;
    while (el) {
        if (el.matches(s)) {
           r = el;
           break;
       } else if (el.tagName.toLowerCase()=='body') {
           break;
       };
       el = el.parentElement;
  };
  return r;
};
document.addEventListener('click', function (e) {
    var validPaths = {
        'https://heado.ru/': 'Заполнил форму главная https://heado.ru/',
        'https://heado.ru/solutions': 'Заполнил форму https://heado.ru/solutions',
        'https://heado.ru/cases': 'Заполнил форму https://heado.ru/cases',
        'https://heado.ru/articles/clients': 'Заполнил форму https://heado.ru/articles/clients',
        'https://heado.ru/articles': 'Заполнил форму https://heado.ru/articles',
        'https://moto.heado.ru/': 'Заполнил форму https://moto.heado.ru/',
        'https://moto.heado.ru/motivaciya': 'Заполнил форму https://moto.heado.ru/motivaciya',
        'https://moto.heado.ru/motivaciya#rec843527074': 'Заполнил форму https://moto.heado.ru/motivaciya#rec843527074',
        'https://moto.heado.ru/motivaciya#rec843535166': 'Заполнил форму https://moto.heado.ru/motivaciya#rec843535166',
        'https://moto.heado.ru/motivaciya#rec846209812': 'Заполнил форму https://moto.heado.ru/motivaciya#rec846209812',
        'https://moto.heado.ru/articles': 'Заполнил форму https://moto.heado.ru/articles',
        'https://moto.heado.ru/charge': 'Заполнил форму https://moto.heado.ru/charge',
        'https://moto.heado.ru/tracker': 'Заполнил форму https://moto.heado.ru/tracker',
        'https://moto.heado.ru/commandwork': 'Заполнил форму https://moto.heado.ru/commandwork',
        'https://moto.heado.ru/paytheseller': 'Заполнил форму https://moto.heado.ru/paytheseller',
        'https://moto.heado.ru/twomotivations': 'Заполнил форму https://moto.heado.ru/twomotivations',
        'https://moto.heado.ru/rightmotivation': 'Заполнил форму https://moto.heado.ru/rightmotivation',
        'https://moto.heado.ru/myths': 'Заполнил форму https://moto.heado.ru/myths',
        'https://moto.heado.ru/howtohelp': 'Заполнил форму https://moto.heado.ru/howtohelp',
        'https://moto.heado.ru/dashboards': 'Заполнил форму https://moto.heado.ru/dashboards',
    };

    if (e.target.matches('[type="submit"]') && validPaths[location.href]) {
        var form = getClosest(e.target, 'form');
        if (!form) return;

        var name = form.querySelector('[name="Name"]')?.value.trim();
        var email = form.querySelector('[name="Email"]')?.value.trim();
        var phone = form.querySelector('[name="Phone"]')?.value.trim();

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

        if (name && emailPattern.test(email) && phonePattern.test(phone)) {
            carrotquest.track(validPaths[location.pathname]);
        }

        carrotquest.identify([
            { op: 'update_or_create', key: '$name', value: name },
            { op: 'update_or_create', key: '$email', value: email },
            { op: 'update_or_create', key: '$phone', value: phone },
            { op: 'update_or_create', key: 'Страница заполнения формы', value: location.href }
        ]);
    }
});


//optimised version

function getClosest(el, selector) {
    while (el && el.tagName.toLowerCase() !== 'body') {
        if (el.matches(selector)) return el;
        el = el.parentElement;
    }
    return null;
}

document.addEventListener('click', function (e) {
    if (!e.target.matches('[type="submit"]')) return;

    var trackablePages = new Set([
        '/',
        '/solutions',
        '/cases',
        '/articles/clients',
        '/articles',
        '/motivaciya',
        '/motivaciya#rec843527074',
        '/motivaciya#rec843535166',
        '/motivaciya#rec846209812',
        '/charge',
        '/tracker',
        '/commandwork',
        '/paytheseller',
        '/twomotivations',
        '/rightmotivation',
        '/myths',
        '/howtohelp',
        '/dashboards'
    ]);

    var host = location.host;
    var pageKey = location.pathname + location.hash;

    if (
        (host === 'heado.ru' || host === 'moto.heado.ru') &&
        trackablePages.has(location.pathname) || trackablePages.has(pageKey)
    ) {
        var form = getClosest(e.target, 'form');
        if (!form) return;

        var name = form.querySelector('[name="Name"]')?.value.trim();
        var email = form.querySelector('[name="Email"]')?.value.trim();
        var phone = form.querySelector('[name="Phone"]')?.value.trim();


        if (name && email && phone) {
            carrotquest.track(`Заполнил форму ${location.href}`);
        }

        carrotquest.identify([
            { op: 'update_or_create', key: '$name', value: name },
            { op: 'update_or_create', key: '$email', value: email },
            { op: 'update_or_create', key: '$phone', value: phone },
            { op: 'update_or_create', key: 'Страница заполнения формы', value: location.href }
        ]);
    }
});
