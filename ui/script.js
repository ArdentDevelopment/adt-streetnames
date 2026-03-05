let widthTimeout;

window.addEventListener('message', function (event) {
    const data = event.data;
    const container = document.getElementById('street-container');
    const streetNameElem = document.getElementById('street-name');

    if (data.type === 'show') {
        let themeClass = data.theme ? 'theme-' + data.theme : 'theme-1';
        let posClass = data.position ? 'pos-' + data.position : 'pos-bottom-right';
        document.body.className = themeClass + ' ' + posClass;

        const streetIcon = document.getElementById('street-icon');
        if (data.mapicon !== false) {
            streetIcon.style.display = 'flex';
        } else {
            streetIcon.style.display = 'none';
        }

        if (data.street && data.street.trim() !== "") {
            if (streetNameElem.innerText !== data.street) {
                if (!container.classList.contains('hidden')) {
                    const oldWidth = container.offsetWidth;
                    container.style.transition = 'none';
                    container.style.width = oldWidth + 'px';

                    streetNameElem.innerText = data.street;

                    container.style.width = 'auto';
                    const newWidth = container.offsetWidth;

                    container.style.width = oldWidth + 'px';
                    container.offsetHeight;

                    container.style.transition = '';
                    container.style.width = newWidth + 'px';

                    if (widthTimeout) clearTimeout(widthTimeout);
                    widthTimeout = setTimeout(() => {
                        container.style.width = '';
                    }, 400);
                } else {
                    streetNameElem.innerText = data.street;
                    container.classList.remove('hidden');
                }
            } else {
                container.classList.remove('hidden');
            }
        } else {
            container.classList.add('hidden');
        }
    } else if (data.type === 'hide') {
        container.classList.add('hidden');
    }
});
