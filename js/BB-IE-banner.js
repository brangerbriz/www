// detect IE via https://stackoverflow.com/a/9851769/1104148
if( /*@cc_on!@*/false || !!document.documentMode ){

    // create banner for Internet Explorer
    // it's for their own good!!!
    var bb_ie_ban = document.createElement('span');
    bb_ie_ban.style.display = 'block';
    bb_ie_ban.style.width = '100%';
    bb_ie_ban.style.height = '100%';
    bb_ie_ban.style.fontFamily = 'sans-serif';
    bb_ie_ban.style.position = 'absolute';
    bb_ie_ban.style.left = '0px;'
    bb_ie_ban.style.top = '0px';
    bb_ie_ban.style.zIndex = '999999999';
    bb_ie_ban.style.background = '#e40477';

    var bb_ie_ban1 = document.createElement('span');
    bb_ie_ban1.style.display = 'block';
    bb_ie_ban1.style.color = '#fff';
    bb_ie_ban1.style.margin = '50px auto';
    bb_ie_ban1.style.width = '100%';
    bb_ie_ban1.style.maxWidth = '500px';
    bb_ie_ban1.innerHTML = 'You are using an <strong>outdated</strong> browser. Please <a style="color:#fff" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.';

    var bb_ie_ban2 = document.createElement('span');
    bb_ie_ban2.style.display = 'block';
    bb_ie_ban2.style.color = '#fff';
    bb_ie_ban2.style.margin = '50px auto';
    bb_ie_ban2.style.width = '100%';
    bb_ie_ban2.style.maxWidth = '500px';
    bb_ie_ban2.innerHTML = 'In the meantime, you can check out some of the work on our <a style="color:#fff" href="https://vimeo.com/user7431710" target="_blank">vimeo page</a>. or get in touch via email <strong>u<span></span>s@branger<span></span>briz.com</strong> or phone <strong>30<span></span>5.8<span></span>93.8<span></span>858</strong> ';

    bb_ie_ban.appendChild(bb_ie_ban1);
    bb_ie_ban.appendChild(bb_ie_ban2);
    document.body.appendChild(bb_ie_ban);
}
