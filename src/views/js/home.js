const generate = document.getElementById('generate');

const getElement = (element) => document.getElementById(element)

const url = getElement('url');
const image = getElement('image');
const title = getElement('title');
const color = getElement('color');
const author = getElement('author');
const redirection = getElement('redirection');
const output = getElement('output');
const outputValue = getElement('outputValue');
const items = document.querySelector('.uk-form-stacked');

title.addEventListener('input', () => {
    if (title.value.length >= 1) progress.setAttribute('value', '40')
    else progress.setAttribute('value', '0')
});

generate.addEventListener('click', () => {

    if (!title.value) {
        const err = document.createElement('div');
        err.classList.add('uk-alert-danger');
        err.setAttribute('uk-alert', true)
        const a = document.createElement('a');
        a.classList.add('uk-alert-close');
        a.setAttribute('uk-close', true)
        const p = document.createElement('p');
        p.innerText = 'Please enter a title!';
        err.append(a, p);
        items.prepend(err)
        generate.disabled = true;
        let cooldownTimer = 5;
        const generateText = generate.innerText;
        generate.innerText = generateText + ' ' + cooldownTimer
        const cooldown = setInterval(() => generate.innerText = generateText + ' ' + --cooldownTimer, 1000)
        setTimeout(() => {
            generate.innerText = generateText;
            clearInterval(cooldown)
            err.remove();
            generate.disabled = false;
        }, 5000)
        return;
    }

    if (redirection.checked)  window.location = urlGenerator(url, image, title, color, author)

    else {
        output.style.display = 'block';
        outputValue.value = window.location.protocol + '//' + window.location.hostname + urlGenerator(url, image, title, color, author);
        outputValue.addEventListener('click', () => {

            outputValue.select();
            if (!navigator.clipboard) document.execCommand('copy');
            else navigator.clipboard.writeText(outputValue.value).then(text => console.log(text));

        });
    }

});

const checker = (a, b) => b.value ? `${a}=${b.value}&` : ''

const urlGenerator = (url, image, title, color, author) => {
    const replaceColor = color.value ? 'color=' + color.value.replace('#', '%23') + '&' : '';
    return `/${title.value}?${checker('url', url)}${checker('image', image)}${replaceColor}${checker('author', author)}`
}
